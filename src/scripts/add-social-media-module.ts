/**
 * Adds the Social Media module page to the Modules collection.
 *
 * Social Media shipped in Revnator v1.2 (compose, content calendar, social
 * inbox, analytics, templates, approval queue) and publishes to LinkedIn,
 * X/Twitter, Facebook, and Instagram. It was missing from the website.
 *
 * Idempotent: if a module with slug "social-media" already exists it is
 * updated rather than duplicated.
 *
 * Run from project root:
 *   npx tsx src/scripts/add-social-media-module.ts
 */
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import path from 'path'
import { getPayload } from 'payload'
import { fileURLToPath } from 'url'
import type { Module } from '../payload-types'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const GET_STARTED = '/get-started'

// ── Module data ────────────────────────────────────────────────────────────

const moduleData = {
  slug: 'social-media',
  name: 'Social Media',
  badge: 'SOCIAL',
  icon: 'Globe' as Module['icon'],
  order: 10,
  isPublished: true,
  shortDescription:
    'Multi-platform social publishing with AI content generation and analytics.',
  cardFeatures: [
    { text: 'Multi-platform publishing' },
    { text: 'AI post generation' },
    { text: 'Content calendar' },
  ],
  heroHeading: 'Build Your Brand on Social Media — Without Leaving Your Sales OS',
  heroDescription:
    'Compose, schedule, and publish to LinkedIn, X/Twitter, Facebook, and Instagram from one dashboard. AI generates posts. Analytics track what works. The social inbox catches every reply.',
  heroPrimaryCtaText: 'Start free trial',
  heroPrimaryCtaHref: GET_STARTED,
  capabilities: [
    { icon: 'Globe', title: 'Multi-platform publishing' },
    { icon: 'Calendar', title: 'Content calendar' },
    { icon: 'Sparkles', title: 'AI post generation' },
    { icon: 'BarChart3', title: 'Social analytics' },
    { icon: 'MessageCircle', title: 'Social inbox' },
  ] as Module['capabilities'],
  featureBlocks: [
    {
      label: 'PUBLISH',
      heading: 'Post to LinkedIn, X, Facebook, and Instagram from one screen',
      description:
        'No more logging into 4 platforms. Compose once, customize per platform, and publish or schedule from Revnator. Supports text posts, images, and platform-specific formatting.',
      features: [
        { text: 'Publish to LinkedIn, X/Twitter, Facebook, Instagram' },
        { text: 'Per-platform content customization' },
        { text: 'Image attachments and rich formatting' },
        { text: 'Draft, review, and approve workflow' },
      ],
      ctaText: 'Start free trial',
      ctaHref: GET_STARTED,
    },
    {
      label: 'SCHEDULE',
      heading: 'Plan your content calendar weeks ahead',
      description:
        'Visual content calendar showing all scheduled posts across platforms. Drag to reschedule, click to edit. Never miss a posting day.',
      features: [
        { text: 'Visual content calendar with drag-and-drop' },
        { text: 'Schedule posts days or weeks ahead' },
        { text: 'Optimal posting time suggestions' },
        { text: 'Bulk scheduling for content batches' },
      ],
      ctaText: 'See it in action',
      ctaHref: GET_STARTED,
    },
    {
      label: 'AI CONTENT',
      heading: 'AI writes your social posts in seconds',
      description:
        'Describe what you want to say and the AI generates platform-optimized posts. Adjust tone, length, and style. Generate a week of content in minutes.',
      features: [
        { text: 'AI post generation from a brief' },
        { text: 'Tone and style controls' },
        { text: 'Hashtag group management' },
        { text: 'Post templates for recurring content types' },
      ],
      ctaText: 'Try AI posting',
      ctaHref: GET_STARTED,
    },
    {
      label: 'ANALYTICS',
      heading: "Track what's working across every platform",
      description:
        'Unified analytics dashboard showing engagement, reach, and growth across all connected platforms. Know which content drives pipeline, not just likes.',
      features: [
        { text: 'Cross-platform analytics dashboard' },
        { text: 'Engagement and reach metrics' },
        { text: 'Best-performing content insights' },
        { text: 'Social inbox for managing replies and mentions' },
      ],
      ctaText: 'Start free trial',
      ctaHref: GET_STARTED,
    },
  ],
  comparisonHeading: 'Social selling without a separate Buffer subscription',
  comparisonCards: [
    {
      title: 'vs. Buffer / Hootsuite',
      description:
        'Why pay $50/month for a standalone social tool? Revnator includes social publishing in your sales OS subscription.',
    },
    {
      title: 'Connected to your CRM',
      description:
        'Social engagement feeds back into contact timelines. See which prospects engage with your content and prioritize outreach accordingly.',
    },
    {
      title: 'AI-powered content',
      description:
        "Buffer makes you write every post. Revnator's AI generates platform-optimized content from a brief. A week of posts in minutes.",
    },
  ],
  comparisonStats: [
    { number: '4', label: 'platforms supported' },
    { number: 'AI', label: 'post generation' },
    { number: '$0', label: 'extra cost' },
  ],
  ctaHeading: 'Start building your brand on social media',
  ctaSubheading:
    'Social publishing included in every Revnator plan. AI content generation included. No extra subscription.',
  ctaPrimaryText: 'Start free trial',
  ctaPrimaryHref: GET_STARTED,
  ctaSecondaryText: 'Book a demo',
  ctaSecondaryHref: GET_STARTED,
  meta: {
    title: 'Social Media Management Software — Revnator',
    description:
      'Compose, schedule, and publish to LinkedIn, X, Facebook, and Instagram from your sales OS. AI generates posts; analytics track what actually drives pipeline.',
  },
}

// ── Create / update ────────────────────────────────────────────────────────

async function run(): Promise<void> {
  const configPath = path.resolve(dirname, '../payload.config.ts')
  const configUrl = new URL(`file:///${configPath.replace(/\\/g, '/')}`)
  const payload = await getPayload({
    config: (await import(configUrl.href)).default,
  })

  console.log('🔍 Checking for an existing "social-media" module...')
  const existing = await payload.find({
    collection: 'modules',
    where: { slug: { equals: 'social-media' } },
    limit: 1,
  })

  if (existing.docs[0]) {
    console.log('  → Found one. Updating it instead of creating a duplicate.')
    await payload.update({
      collection: 'modules',
      id: existing.docs[0].id,
      data: moduleData,
      context: { disableRevalidate: true },
    })
    console.log('✅ Updated module: Social Media (/platform/social-media)')
  } else {
    console.log('  → None found. Creating a new module.')
    const created = await payload.create({
      collection: 'modules',
      data: moduleData,
      context: { disableRevalidate: true },
    })
    console.log(`✅ Created module: ${created.name} (/platform/${created.slug})`)
  }

  const all = await payload.find({
    collection: 'modules',
    limit: 100,
    sort: 'order',
    depth: 0,
  })
  console.log(`\n📦 Modules now in the collection (${all.docs.length}):`)
  for (const m of all.docs) {
    console.log(`   ${String(m.order).padStart(2)}.  ${m.name}  (/platform/${m.slug})`)
  }

  process.exit(0)
}

run().catch((err) => {
  console.error('Add Social Media module failed:', err)
  process.exit(1)
})
