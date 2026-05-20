/**
 * Refreshes the stale module count in the `platform-page` global.
 *
 * The website grew from 9 to 12 modules. Any copy in the platform-page global
 * that still says "Nine modules" / "9 modules" / "9 integrated modules" is
 * updated to "Twelve" / "12". Only fields that actually change are written.
 *
 * Run from project root:
 *   npx tsx src/scripts/update-platform-page-copy.ts
 */
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import path from 'path'
import { getPayload } from 'payload'
import { fileURLToPath } from 'url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

/** Replace stale module counts in a string. Returns the (possibly) new value. */
function fixCount(value: string): string {
  return value
    .replace(/\bNine modules\b/g, 'Twelve modules')
    .replace(/\bnine modules\b/g, 'twelve modules')
    .replace(/\b9 integrated modules\b/g, '12 integrated modules')
    .replace(/\b9 modules\b/g, '12 modules')
}

async function run(): Promise<void> {
  const configPath = path.resolve(dirname, '../payload.config.ts')
  const configUrl = new URL(`file:///${configPath.replace(/\\/g, '/')}`)
  const payload = await getPayload({
    config: (await import(configUrl.href)).default,
  })

  const page = (await payload.findGlobal({
    slug: 'platform-page',
  })) as unknown as Record<string, unknown>

  // Top-level text fields that could carry a module count.
  const textFields = [
    'heroHeading',
    'heroSubheading',
    'gridHeading',
    'gridSubheading',
    'connectedHeading',
    'connectedSubheading',
    'pricingHeading',
    'pricingSubheading',
    'ctaHeading',
    'ctaSubheading',
  ]

  const patch: Record<string, unknown> = {}
  let changes = 0

  for (const field of textFields) {
    const current = page[field]
    if (typeof current === 'string') {
      const fixed = fixCount(current)
      if (fixed !== current) {
        patch[field] = fixed
        changes++
        console.log(`  ✏  ${field}`)
        console.log(`     - ${current}`)
        console.log(`     + ${fixed}`)
      }
    }
  }

  // SEO meta group.
  const meta = page.meta as Record<string, unknown> | undefined
  if (meta) {
    const metaPatch: Record<string, unknown> = {}
    for (const key of ['title', 'description']) {
      const current = meta[key]
      if (typeof current === 'string') {
        const fixed = fixCount(current)
        if (fixed !== current) {
          metaPatch[key] = fixed
          changes++
          console.log(`  ✏  meta.${key}`)
          console.log(`     - ${current}`)
          console.log(`     + ${fixed}`)
        }
      }
    }
    if (Object.keys(metaPatch).length > 0) {
      patch.meta = { ...meta, ...metaPatch }
    }
  }

  if (changes === 0) {
    console.log('✅ No stale module count found in the platform-page global — nothing to update.')
    process.exit(0)
  }

  await payload.updateGlobal({
    slug: 'platform-page',
    data: patch,
    context: { disableRevalidate: true },
  })

  console.log(`\n✅ Updated ${changes} field(s) in the platform-page global.`)
  process.exit(0)
}

run().catch((err) => {
  console.error('Platform page copy update failed:', err)
  process.exit(1)
})
