/**
 * One-time script to update all CTA URLs in the database from
 * `/signup` (or `/sign-up`) to `/get-started`.
 *
 * Run from project root:
 *   npx tsx src/scripts/fix-cta-urls.ts
 */
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const PAGE_GLOBAL_SLUGS = [
  'home-page',
  'pricing-page',
  'why-revnator',
  'about-page',
  'platform-page',
  'support-page',
  'contact-page',
  'news-page',
  'resources-page',
  'legal-page',
] as const

const COLLECTION_SLUGS = ['modules', 'use-cases', 'industries'] as const

type Replaceable = Record<string, unknown>

function replaceInJson<T>(obj: T): { fixed: T; changed: boolean } {
  const json = JSON.stringify(obj)
  if (!json.includes('/signup') && !json.includes('/sign-up')) {
    return { fixed: obj, changed: false }
  }
  const replaced = json
    .replace(/\/signup/g, '/get-started')
    .replace(/\/sign-up/g, '/get-started')
  return { fixed: JSON.parse(replaced) as T, changed: true }
}

function stripSystemFields(doc: Replaceable): Replaceable {
  const { id: _id, globalType: _g, createdAt: _c, updatedAt: _u, ...rest } = doc as Replaceable & {
    id?: unknown
    globalType?: unknown
    createdAt?: unknown
    updatedAt?: unknown
  }
  void _id
  void _g
  void _c
  void _u
  return rest
}

async function fixGlobal(payload: Awaited<ReturnType<typeof getPayload>>, slug: string): Promise<void> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doc = await payload.findGlobal({ slug: slug as any })
    const { fixed, changed } = replaceInJson(doc as Replaceable)
    if (!changed) {
      console.log(`  Skipped: ${slug} (no /signup or /sign-up found)`)
      return
    }
    const data = stripSystemFields(fixed)
    await payload.updateGlobal({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      slug: slug as any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: data as any,
      context: { disableRevalidate: true },
    })
    console.log(`✓ Fixed global: ${slug}`)
  } catch (err) {
    console.error(`✗ Failed global: ${slug}`, err instanceof Error ? err.message : err)
  }
}

async function fixCollection(
  payload: Awaited<ReturnType<typeof getPayload>>,
  slug: string,
): Promise<void> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await payload.find({ collection: slug as any, limit: 200, depth: 0 })
    let touched = 0
    for (const doc of result.docs as Replaceable[]) {
      const { fixed, changed } = replaceInJson(doc)
      if (!changed) continue
      const data = stripSystemFields(fixed)
      await payload.update({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        collection: slug as any,
        id: (doc as { id: number | string }).id,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: data as any,
        context: { disableRevalidate: true },
      })
      touched++
      console.log(`✓ Fixed ${slug}: ${(doc as { slug?: string }).slug ?? (doc as { id: unknown }).id}`)
    }
    if (touched === 0) {
      console.log(`  Skipped collection: ${slug} (no /signup or /sign-up found)`)
    }
  } catch (err) {
    console.error(`✗ Failed collection: ${slug}`, err instanceof Error ? err.message : err)
  }
}

async function main(): Promise<void> {
  const configPath = path.resolve(dirname, '../payload.config.ts')
  const configUrl = new URL(`file:///${configPath.replace(/\\/g, '/')}`)
  const payload = await getPayload({
    config: (await import(configUrl.href)).default,
  })

  console.log('--- Globals ---')
  await fixGlobal(payload, 'header')
  await fixGlobal(payload, 'footer')
  for (const slug of PAGE_GLOBAL_SLUGS) {
    await fixGlobal(payload, slug)
  }

  console.log('\n--- Collections ---')
  for (const slug of COLLECTION_SLUGS) {
    await fixCollection(payload, slug)
  }

  console.log('\n✅ Done. All CTA URLs updated to /get-started.')
  process.exit(0)
}

main().catch((err) => {
  console.error('Script failed:', err)
  process.exit(1)
})
