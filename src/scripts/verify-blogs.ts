/**
 * Verification for the 39-blog seed. Run:  npx tsx src/scripts/verify-blogs.ts
 */
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import path from 'path'
import { getPayload } from 'payload'
import { fileURLToPath } from 'url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

function wordCount(node: any): number {
  if (!node) return 0
  let n = 0
  if (typeof node.text === 'string') n += node.text.trim().split(/\s+/).filter(Boolean).length
  if (Array.isArray(node.children)) for (const c of node.children) n += wordCount(c)
  return n
}

async function run(): Promise<void> {
  const configPath = path.resolve(dirname, '../payload.config.ts')
  const configUrl = new URL(`file:///${configPath.replace(/\\/g, '/')}`)
  const payload = await getPayload({ config: (await import(configUrl.href)).default })

  const res = await payload.find({ collection: 'blog-posts', limit: 500, depth: 0, sort: 'publishedDate' })
  console.log(`\nTotal blog posts in DB: ${res.totalDocs}\n`)

  let published = 0
  let thin = 0
  let h2total = 0
  for (const post of res.docs) {
    const status = (post as any).status
    if (status === 'published') published++
    const words = wordCount((post as any).body?.root)
    const children = (post as any).body?.root?.children ?? []
    const h2s = children.filter((c: any) => c.type === 'heading' && c.tag === 'h2').length
    h2total += h2s
    if (words < 1400) thin++
    const flag = words < 1400 ? '  <-- THIN' : ''
    console.log(
      `  ${String(words).padStart(4)}w  ${String(h2s).padStart(2)}xH2  [${status}]  ${(post as any).slug}${flag}`,
    )
  }

  console.log(`\n────────────────────────────────────────`)
  console.log(`Posts: ${res.totalDocs}  |  Published: ${published}  |  Thin (<1400w): ${thin}`)
  console.log(`Avg H2 per post: ${(h2total / res.totalDocs).toFixed(1)}`)
  console.log(`────────────────────────────────────────\n`)
  process.exit(0)
}

run().catch((err) => {
  console.error('Verify failed:', err)
  process.exit(1)
})
