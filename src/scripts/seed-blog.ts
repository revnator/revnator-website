/**
 * Seed script for blog categories and blog posts.
 *
 * Run from project root:
 *   npx tsx src/scripts/seed-blog.ts
 */
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import path from 'path'
import { getPayload } from 'payload'
import { fileURLToPath } from 'url'
import type { BlogPost } from '../payload-types'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const categories = [
  { name: 'Sales', slug: 'sales', order: 1 },
  { name: 'Outreach', slug: 'outreach', order: 2 },
  { name: 'Pipeline', slug: 'pipeline', order: 3 },
  { name: 'Productivity', slug: 'productivity', order: 4 },
  { name: 'Product Updates', slug: 'product-updates', order: 5 },
  { name: 'Tips', slug: 'tips', order: 6 },
]

// ── Lexical JSON helpers ──

function text(content: string, format?: number): Record<string, unknown> {
  return { type: 'text', text: content, format: format ?? 0, detail: 0, mode: 'normal', style: '', version: 1 }
}

function paragraph(...children: Record<string, unknown>[]): Record<string, unknown> {
  return { type: 'paragraph', children, direction: 'ltr', format: '', indent: 0, textFormat: 0, textStyle: '', version: 1 }
}

function heading(tag: 'h2' | 'h3', content: string): Record<string, unknown> {
  return { type: 'heading', tag, children: [text(content)], direction: 'ltr', format: '', indent: 0, version: 1 }
}

function listItem(content: string): Record<string, unknown> {
  return { type: 'listitem', children: [text(content)], direction: 'ltr', format: '', indent: 0, value: 1, version: 1 }
}

function unorderedList(items: string[]): Record<string, unknown> {
  return { type: 'list', listType: 'bullet', tag: 'ul', children: items.map(listItem), direction: 'ltr', format: '', indent: 0, start: 1, version: 1 }
}

function orderedList(items: string[]): Record<string, unknown> {
  return { type: 'list', listType: 'number', tag: 'ol', children: items.map(listItem), direction: 'ltr', format: '', indent: 0, start: 1, version: 1 }
}

function lexicalBody(children: Record<string, unknown>[]): BlogPost['body'] {
  return { root: { type: 'root', children, direction: 'ltr', format: '', indent: 0, version: 1 } } as BlogPost['body']
}

// ── Post data ──

interface PostSeed {
  title: string
  slug: string
  categorySlug: string
  publishedDate: string
  readTime: string
  excerpt: string
  authorName: string
  authorInitials: string
  authorBio: string
  tags: string[]
  body: BlogPost['body']
}

const posts: PostSeed[] = [
  {
    title: 'Why Your Sales Stack Is Costing You Deals',
    slug: 'sales-stack-costing-deals',
    categorySlug: 'sales',
    publishedDate: '2026-03-15',
    readTime: '8 min read',
    excerpt:
      "The average sales rep uses 6.8 tools per day. Here's how that fragmentation is silently killing your pipeline.",
    authorName: 'Sabareesh S R',
    authorInitials: 'SS',
    authorBio: 'Writes about sales, productivity, and building B2B SaaS.',
    tags: ['Sales', 'Productivity', 'Tools'],
    body: lexicalBody([
      paragraph(text('Sales teams today face an unprecedented challenge: too many tools, too little integration. The average sales rep uses 6.8 different tools per day, switching context dozens of times.')),
      heading('h2', 'The hidden cost of context switching'),
      paragraph(text("Studies show that context switching can reduce productivity by up to 40%. When your reps bounce between CRM, email tool, calendar, and Slack, they're not selling — they're navigating software.")),
      heading('h2', 'What unified platforms change'),
      paragraph(text('By consolidating contact management, outreach, pipeline, and analytics into a single workspace, sales teams recover hours of productive time per week.')),
      paragraph(text('Teams using unified sales platforms report '), text('34% higher quota attainment', 1), text(' compared to multi-tool setups.')),
      paragraph(text("The future of sales isn't more tools. It's fewer, better, more connected ones. That's what Revnator is built for.")),
    ]),
  },
  {
    title: '5 Cold Email Sequences That Actually Convert',
    slug: 'cold-email-sequences-convert',
    categorySlug: 'outreach',
    publishedDate: '2026-03-08',
    readTime: '12 min read',
    excerpt:
      'We analyzed 50,000 cold emails to find the sequence structures that get the highest reply rates.',
    authorName: 'Sabareesh S R',
    authorInitials: 'SS',
    authorBio: 'Writes about sales, productivity, and building B2B SaaS.',
    tags: ['Outreach', 'Email', 'Tips'],
    body: lexicalBody([
      paragraph(text("Cold email isn't dead. Bad cold email is dead. The difference between a 2% reply rate and a 25% reply rate comes down to sequence structure, timing, and personalization.")),
      heading('h2', 'The 3-touch awareness sequence'),
      paragraph(text('The simplest sequence that works: three emails over 7 days. Email 1 introduces the problem. Email 2 shares a relevant case study. Email 3 is a soft breakup that creates urgency.')),
      heading('h2', 'The 5-touch nurture sequence'),
      paragraph(text('For higher-value prospects, extend to 5 touches over 14 days. Add a LinkedIn connection between emails 2 and 3, and a value-add resource between emails 4 and 5.')),
      heading('h2', 'Timing matters more than copy'),
      paragraph(text("Our data shows Tuesday and Thursday mornings (9-11 AM recipient's timezone) consistently outperform other times. Avoid Mondays and Fridays.")),
      paragraph(text("Revnator's smart scheduling automatically sends at optimal times based on your recipient's timezone.", 2)),
    ]),
  },
  {
    title: 'Pipeline Management: The Complete Guide for 2026',
    slug: 'pipeline-management-complete-guide',
    categorySlug: 'pipeline',
    publishedDate: '2026-02-28',
    readTime: '15 min read',
    excerpt:
      'Everything you need to know about building, managing, and forecasting your sales pipeline.',
    authorName: 'Sabareesh S R',
    authorInitials: 'SS',
    authorBio: 'Writes about sales, productivity, and building B2B SaaS.',
    tags: ['Pipeline', 'Sales', 'Guide'],
    body: lexicalBody([
      paragraph(text("Your pipeline is the heartbeat of your sales organization. Get it right and you'll forecast accurately, coach effectively, and close consistently.")),
      heading('h2', 'Defining your pipeline stages'),
      paragraph(text("Most teams use 5-7 stages. The key is that each stage represents a verifiable buyer action, not a seller activity. 'Demo scheduled' is a stage. 'Followed up' is not.")),
      heading('h2', 'Pipeline math: coverage ratios'),
      paragraph(text("A healthy pipeline has 3-4x coverage of your quota. If your team's quota is $500K, you need $1.5-2M in weighted pipeline to hit it consistently.")),
      heading('h2', 'Common pipeline mistakes'),
      unorderedList([
        'Letting stale deals sit in the pipeline for months',
        'Not defining clear exit criteria per stage',
        'Forecasting based on rep gut feel, not data',
        'Ignoring velocity metrics (time in stage)',
      ]),
    ]),
  },
  {
    title: "How We Built Revnator's Email Warm-Up System",
    slug: 'email-warmup-system-behind-the-scenes',
    categorySlug: 'product-updates',
    publishedDate: '2026-02-15',
    readTime: '6 min read',
    excerpt:
      'A behind-the-scenes look at how we built automated email warm-up directly into Revnator.',
    authorName: 'Sabareesh S R',
    authorInitials: 'SS',
    authorBio: 'Writes about sales, productivity, and building B2B SaaS.',
    tags: ['Product Updates', 'Email', 'Engineering'],
    body: lexicalBody([
      paragraph(text("Email deliverability is the silent killer of outbound sales. You can write the perfect email, but if it lands in spam, it might as well not exist.")),
      heading('h2', 'Why warm-up matters'),
      paragraph(text('New email accounts and domains start with zero reputation. ISPs like Gmail and Outlook need to see consistent, legitimate sending patterns before they trust your emails.')),
      heading('h2', 'Our approach'),
      paragraph(text("We built warm-up directly into the platform so you don't need a separate tool. When you connect your email, Revnator automatically starts a warm-up sequence.")),
      paragraph(text("Revnator's warm-up is included free in all paid plans. No separate subscription needed.", 2)),
    ]),
  },
  {
    title: '10 Sales Productivity Hacks That Actually Work',
    slug: 'sales-productivity-hacks',
    categorySlug: 'productivity',
    publishedDate: '2026-02-01',
    readTime: '7 min read',
    excerpt:
      'Forget the fluff. These are the 10 habits that high-performing sales reps swear by.',
    authorName: 'Sabareesh S R',
    authorInitials: 'SS',
    authorBio: 'Writes about sales, productivity, and building B2B SaaS.',
    tags: ['Productivity', 'Sales', 'Tips'],
    body: lexicalBody([
      paragraph(text("Productivity in sales isn't about working longer hours. It's about eliminating friction so you spend more time in front of prospects and less time on admin.")),
      heading('h2', '1. Time-block your prospecting'),
      paragraph(text('Dedicate 2 hours every morning exclusively to outbound. No email checking, no Slack, no meetings. Just prospecting.')),
      heading('h2', '2. Use templates, not from-scratch emails'),
      paragraph(text('Start with a proven template and personalize the first two lines. Writing every email from scratch is a productivity trap.')),
      heading('h2', '3. Batch your admin work'),
      paragraph(text("Update your CRM, log notes, and prep for tomorrow in a single 30-minute block at end of day. Don't sprinkle admin throughout the day.")),
    ]),
  },
  {
    title: 'The Ultimate Guide to B2B Sales Metrics',
    slug: 'b2b-sales-metrics-guide',
    categorySlug: 'sales',
    publishedDate: '2026-01-20',
    readTime: '10 min read',
    excerpt:
      'Which sales metrics actually matter? We break down the KPIs every B2B sales team should track.',
    authorName: 'Sabareesh S R',
    authorInitials: 'SS',
    authorBio: 'Writes about sales, productivity, and building B2B SaaS.',
    tags: ['Sales', 'Analytics', 'Guide'],
    body: lexicalBody([
      paragraph(text("Not all sales metrics are created equal. Some drive behavior, others just fill dashboards. Here's how to focus on the ones that actually move the needle.")),
      heading('h2', 'Leading vs lagging indicators'),
      paragraph(text("Revenue is a lagging indicator — by the time you see it, the work is done. Focus on leading indicators: meetings booked, proposals sent, pipeline created.")),
      heading('h2', 'The 5 metrics every team needs'),
      orderedList([
        'Pipeline coverage ratio (3-4x of quota)',
        'Win rate by stage (identify bottlenecks)',
        'Average deal size (trending up or down?)',
        'Sales cycle length (getting faster or slower?)',
        'Activity-to-outcome ratio (calls to meetings, meetings to proposals)',
      ]),
      heading('h2', "Metrics that don't matter"),
      paragraph(text("Number of calls made, emails sent, or hours worked are vanity metrics. They measure effort, not results. A rep who makes 20 calls and books 5 meetings is more valuable than one who makes 100 calls and books 2.")),
    ]),
  },
]

async function seed(): Promise<void> {
  const configPath = path.resolve(dirname, '../payload.config.ts')
  const configUrl = new URL(`file:///${configPath.replace(/\\/g, '/')}`)

  const payload = await getPayload({
    config: (await import(configUrl.href)).default,
  })

  // ── Seed Categories ──
  console.log('Seeding blog categories...\n')

  const existingCats = await payload.find({
    collection: 'blog-categories',
    limit: 100,
  })
  const existingCatSlugs = new Set(existingCats.docs.map((d) => d.slug))

  for (const cat of categories) {
    if (existingCatSlugs.has(cat.slug)) {
      console.log(`  SKIP  category "${cat.name}" (already exists)`)
      continue
    }
    await payload.create({
      collection: 'blog-categories',
      data: cat,
    })
    console.log(`  CREATE category "${cat.name}"`)
  }

  // Build slug→id map
  const allCats = await payload.find({
    collection: 'blog-categories',
    limit: 100,
  })
  const catIdBySlug: Record<string, number> = {}
  for (const cat of allCats.docs) {
    catIdBySlug[cat.slug] = cat.id
  }

  // ── Delete existing posts (schema changed from blocks to richText) ──
  console.log('\nDeleting existing blog posts (schema migration)...\n')

  const existingPosts = await payload.find({
    collection: 'blog-posts',
    limit: 100,
  })
  for (const post of existingPosts.docs) {
    await payload.delete({
      collection: 'blog-posts',
      id: post.id,
    })
    console.log(`  DELETE "${post.title}"`)
  }

  // ── Seed Posts ──
  console.log('\nSeeding blog posts...\n')

  for (const post of posts) {
    const categoryId = catIdBySlug[post.categorySlug]
    if (!categoryId) {
      console.log(`  SKIP  post "${post.title}" (category "${post.categorySlug}" not found)`)
      continue
    }

    await payload.create({
      collection: 'blog-posts',
      data: {
        title: post.title,
        slug: post.slug,
        status: 'published',
        publishedDate: post.publishedDate,
        category: categoryId,
        excerpt: post.excerpt,
        body: post.body,
        readTime: post.readTime,
        authorName: post.authorName,
        authorInitials: post.authorInitials,
        authorBio: post.authorBio,
        tags: post.tags.map((t) => ({ text: t })),
      },
    })
    console.log(`  CREATE post "${post.title}"`)
  }

  console.log('\nDone!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
