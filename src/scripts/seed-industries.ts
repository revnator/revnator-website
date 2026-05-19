/**
 * Seed script for industries (Agencies only).
 *
 * Run from project root:
 *   npx tsx src/scripts/seed-industries.ts
 */
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import path from 'path'
import { getPayload } from 'payload'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

async function seed(): Promise<void> {
  const configPath = path.resolve(dirname, '../payload.config.ts')
  const configUrl = new URL(`file:///${configPath.replace(/\\/g, '/')}`)

  const payload = await getPayload({
    config: (await import(configUrl.href)).default,
  })

  console.log('Seeding industries...\n')

  // Check existing
  const existing = await payload.find({
    collection: 'industries',
    limit: 100,
  })
  const existingSlugs = new Set(existing.docs.map((d) => d.slug))

  if (existingSlugs.has('agencies')) {
    console.log('  SKIP  "Agencies" (already exists)')
    console.log('\n✅ Industries seeded!')
    process.exit(0)
  }

  // Resolve module slugs to IDs
  const allModules = await payload.find({
    collection: 'modules',
    limit: 100,
  })
  const moduleIdBySlug: Record<string, number> = {}
  for (const mod of allModules.docs) {
    moduleIdBySlug[mod.slug] = mod.id
  }

  await payload.create({
    collection: 'industries',
    data: {
      name: 'Agencies',
      slug: 'agencies',
      order: 1,
      isPublished: true,
      badge: 'FOR AGENCIES',
      heroHeading: 'The sales OS built for client-first agencies',
      heroDescription:
        'Manage prospects, pitch new business, and onboard clients without juggling 5 different tools. Built for agencies that win by being responsive.',
      primaryCtaText: 'Start free trial',
      primaryCtaHref: '/get-started',
      secondaryCtaText: 'See agency case studies',
      secondaryCtaHref: '/resources',
      builtForLabel: 'Trusted by agency teams of all sizes',
      builtForTags: [
        { text: 'Marketing agencies' },
        { text: 'Creative studios' },
        { text: 'PR firms' },
        { text: 'Consulting groups' },
      ],
      socialProofLabel: 'BY THE NUMBERS',
      stats: [
        { number: '200+', label: 'agencies use Revnator' },
        { number: '3.2x', label: 'faster proposal turnaround' },
        { number: '47%', label: 'more pitches per week' },
        { number: '$0', label: 'agency pricing to start' },
      ],
      useCasesSectionLabel: 'BUILT FOR HOW AGENCIES WORK',
      useCasesHeading: 'Three workflows agencies love',
      useCaseCards: [
        {
          number: '01',
          title: 'New business pitches',
          description:
            'Track every prospect from first touch to signed contract. See where every pitch stands at a glance, and never let a hot lead go cold.',
          tagLabel: 'Pitch tracking',
        },
        {
          number: '02',
          title: 'Client onboarding',
          description:
            'Turn signed contracts into structured onboarding workflows. Standardize how you welcome new clients and reduce ramp time by weeks.',
          tagLabel: 'Onboarding flows',
        },
        {
          number: '03',
          title: 'Account expansion',
          description:
            'Identify upsell opportunities across your client base. Automate quarterly check-ins and surface accounts ready for expansion.',
          tagLabel: 'Expansion plays',
        },
      ],
      workflowSectionLabel: 'HOW IT WORKS',
      workflowHeading: 'Your agency, end-to-end in Revnator',
      workflowSubheading:
        'From first cold email to client renewal — one workspace handles it all.',
      workflowSteps: [
        { number: '1', title: 'Capture leads', description: 'Forms on your site flow into Revnator' },
        { number: '2', title: 'Qualify & nurture', description: 'Email sequences automate first contact' },
        { number: '3', title: 'Pitch & close', description: 'Pipeline tracks every active pitch' },
        { number: '4', title: 'Onboard clients', description: 'Mission templates standardize handoff' },
        { number: '5', title: 'Grow & retain', description: 'Account view monitors client health' },
      ],
      testimonialQuote:
        'Revnator replaced our spreadsheets, our CRM, and our project management tool. We pitch faster, onboard cleaner, and retain better. It\u2019s the only tool I\u2019ve kept after a year.',
      testimonialAuthorName: 'Sarah Mitchell',
      testimonialAuthorTitle: 'CEO, Lighthouse Marketing Agency',
      testimonialAuthorInitials: 'SM',
      stackLabel: 'RECOMMENDED STACK',
      stackHeading: 'The modules every agency uses',
      stackModules: [
        { module: moduleIdBySlug['pipeline'], reason: 'Track every pitch from lead to signed contract' },
        { module: moduleIdBySlug['outreach'], reason: 'Cold outreach for new business' },
        { module: moduleIdBySlug['sales-ops'], reason: 'Mission templates for client onboarding' },
        { module: moduleIdBySlug['forms'], reason: 'Capture leads from your website' },
      ].filter((sm) => sm.module),
      ctaHeading: 'Ready to streamline your agency?',
      ctaSubheading: 'Free for up to 3 users. No credit card. Built for agencies.',
      ctaPrimaryText: 'Start free trial',
      ctaPrimaryHref: '/get-started',
      ctaSecondaryText: 'Talk to our team',
      ctaSecondaryHref: '/demo',
    },
  })
  console.log('  CREATE "Agencies"')

  console.log('\n✅ Industries seeded!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
