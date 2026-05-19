/**
 * Seed script for use cases.
 *
 * Run from project root:
 *   npx tsx src/scripts/seed-use-cases.ts
 */
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import path from 'path'
import { getPayload } from 'payload'
import type { UseCase } from '../payload-types'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

interface UseCaseSeed {
  name: string
  slug: string
  order: number
  badge: string
  heroHeading: string
  heroDescription: string
  primaryCtaText: string
  primaryCtaHref: string
  secondaryCtaText: string
  secondaryCtaHref: string
  painSectionLabel: string
  painHeading: string
  painCards: { icon: string; title: string; description: string }[]
  solutions: {
    label: string
    heading: string
    description: string
    features: { text: string }[]
  }[]
  relatedModulesLabel: string
  relatedModulesHeading: string
  relatedModuleSlugs: string[]
  ctaHeading: string
  ctaSubheading: string
  ctaPrimaryText: string
  ctaPrimaryHref: string
  ctaSecondaryText: string
  ctaSecondaryHref: string
}

const useCases: UseCaseSeed[] = [
  {
    name: 'Sales Operations',
    slug: 'sales-operations',
    order: 1,
    badge: 'USE CASE',
    heroHeading: 'Streamline your sales operations from day one',
    heroDescription:
      'Automate daily workflows, manage tasks, run missions, and coordinate your team — all from one command center.',
    primaryCtaText: 'Start free trial',
    primaryCtaHref: '/get-started',
    secondaryCtaText: 'See pricing',
    secondaryCtaHref: '/pricing',
    painSectionLabel: "WHAT YOU'RE FACING",
    painHeading: 'What sales ops teams struggle with',
    painCards: [
      {
        icon: 'ListX',
        title: 'Manual task tracking',
        description:
          "Reps forget follow-ups. Managers can't see who's doing what. Productivity falls through the cracks.",
      },
      {
        icon: 'Unlink',
        title: 'Disconnected tools',
        description:
          "Tasks in Asana. Pipeline in sheets. Calendar in Google. Nothing talks to each other and data falls through the cracks.",
      },
      {
        icon: 'EyeOff',
        title: 'No visibility',
        description:
          'Leadership has no real-time view into daily sales activity or team productivity. Decisions made in the dark.',
      },
    ],
    solutions: [
      {
        label: 'UNIFIED TASKS',
        heading: 'Every task in one place',
        description:
          'Stop switching between task tools. Revnator gives you a unified task management system tied directly to your contacts, deals, and calendar.',
        features: [
          { text: 'Tasks linked to contacts and deals' },
          { text: 'Daily, weekly, and project views' },
          { text: 'Automatic reminders and follow-ups' },
          { text: 'Team task assignment with ownership' },
        ],
      },
      {
        label: 'MISSION-BASED SELLING',
        heading: 'Templated workflows that scale',
        description:
          'Pre-built mission templates for common sales workflows. New employee onboarding, account expansion, win-back campaigns — all automated.',
        features: [
          { text: 'Pre-built mission templates' },
          { text: 'Custom workflow builder' },
          { text: 'Progress tracking across team members' },
          { text: 'Mission analytics and reports' },
        ],
      },
    ],
    relatedModulesLabel: 'POWERED BY',
    relatedModulesHeading: 'Modules that power your sales ops',
    relatedModuleSlugs: ['sales-ops', 'calendar', 'pipeline'],
    ctaHeading: 'Take control of your sales operations',
    ctaSubheading: 'Free for up to 3 users. No credit card required.',
    ctaPrimaryText: 'Start free trial',
    ctaPrimaryHref: '/get-started',
    ctaSecondaryText: 'Book a demo',
    ctaSecondaryHref: '/demo',
  },
  {
    name: 'CRM',
    slug: 'crm',
    order: 2,
    badge: 'USE CASE',
    heroHeading: 'A CRM that reps actually want to use',
    heroDescription:
      "Stop fighting your CRM. Revnator's contact management is built for speed, not for admins.",
    primaryCtaText: 'Start free trial',
    primaryCtaHref: '/get-started',
    secondaryCtaText: 'See pricing',
    secondaryCtaHref: '/pricing',
    painSectionLabel: "WHAT YOU'RE FACING",
    painHeading: 'Why reps hate their CRM',
    painCards: [
      {
        icon: 'Clock',
        title: 'Too much data entry',
        description:
          'Reps spend 30% of their time entering data instead of selling.',
      },
      {
        icon: 'Layers',
        title: 'Over-engineered',
        description:
          '50 fields per contact, 20 required. Built for compliance, not closing.',
      },
      {
        icon: 'DollarSign',
        title: 'Overpriced',
        description:
          'Enterprise CRMs cost $75-150/user/month. Most features go unused.',
      },
    ],
    solutions: [
      {
        label: 'FAST',
        heading: 'Data entry in seconds, not minutes',
        description: 'Smart defaults and auto-population.',
        features: [
          { text: 'Auto-populate from email signatures' },
          { text: 'Smart field suggestions' },
          { text: 'Bulk edit and update' },
          { text: 'Import with field mapping' },
        ],
      },
      {
        label: 'SIMPLE',
        heading: 'Only the fields that matter',
        description:
          'Start with what you need, add custom fields as you grow.',
        features: [
          { text: 'Clean default fields' },
          { text: 'Unlimited custom fields' },
          { text: 'Drag-and-drop ordering' },
          { text: 'Field-level permissions' },
        ],
      },
    ],
    relatedModulesLabel: 'POWERED BY',
    relatedModulesHeading: 'Modules that power your CRM',
    relatedModuleSlugs: ['contacts', 'accounts', 'pipeline'],
    ctaHeading: "Try a CRM that doesn't fight you",
    ctaSubheading: 'Free forever for up to 100 contacts.',
    ctaPrimaryText: 'Start free trial',
    ctaPrimaryHref: '/get-started',
    ctaSecondaryText: 'Book a demo',
    ctaSecondaryHref: '/demo',
  },
  {
    name: 'Lead Generation',
    slug: 'lead-generation',
    order: 3,
    badge: 'USE CASE',
    heroHeading: 'Generate, capture, and convert leads in one place',
    heroDescription:
      'Forms, sequences, and pipeline — connected end to end. No more leads falling through the cracks.',
    primaryCtaText: 'Start free trial',
    primaryCtaHref: '/get-started',
    secondaryCtaText: 'See pricing',
    secondaryCtaHref: '/pricing',
    painSectionLabel: "WHAT YOU'RE FACING",
    painHeading: 'Where lead gen breaks down',
    painCards: [
      {
        icon: 'Unlink',
        title: 'Scattered capture points',
        description:
          'Website forms, LinkedIn, events, referrals — leads land in 5 different places.',
      },
      {
        icon: 'Clock',
        title: 'Slow follow-up',
        description:
          'Hours between capture and first contact. Speed-to-lead kills your conversion.',
      },
      {
        icon: 'EyeOff',
        title: 'No attribution',
        description:
          "Can't tell which campaigns generate revenue and which waste money.",
      },
    ],
    solutions: [
      {
        label: 'CAPTURE',
        heading: 'One inbox for every lead source',
        description:
          'Forms, imports, and manual entry all flow to the same place.',
        features: [
          { text: 'Embedded forms with auto-routing' },
          { text: 'CSV import with deduplication' },
          { text: 'Manual quick-add from anywhere' },
          { text: 'Lead source tracking' },
        ],
      },
      {
        label: 'CONVERT',
        heading: 'From lead to deal in record time',
        description: 'Automated sequences and pipeline handoff.',
        features: [
          { text: 'Auto-enroll in sequences on capture' },
          { text: 'Lead scoring and qualification' },
          { text: 'Pipeline handoff automation' },
          { text: 'Source-to-revenue attribution' },
        ],
      },
    ],
    relatedModulesLabel: 'POWERED BY',
    relatedModulesHeading: 'Modules that power your lead gen',
    relatedModuleSlugs: ['forms', 'outreach', 'contacts'],
    ctaHeading: 'Stop losing leads',
    ctaSubheading:
      'Free for up to 3 users. Forms and sequences included.',
    ctaPrimaryText: 'Start free trial',
    ctaPrimaryHref: '/get-started',
    ctaSecondaryText: 'Book a demo',
    ctaSecondaryHref: '/demo',
  },
  {
    name: 'Forecast & Plan',
    slug: 'forecast-and-plan',
    order: 4,
    badge: 'USE CASE',
    heroHeading: 'Know your number before quarter end',
    heroDescription:
      'Weighted pipeline forecasting, revenue projections, and sales planning — all driven by real deal data, not guesswork.',
    primaryCtaText: 'Start free trial',
    primaryCtaHref: '/get-started',
    secondaryCtaText: 'See pricing',
    secondaryCtaHref: '/pricing',
    painSectionLabel: "WHAT YOU'RE FACING",
    painHeading: 'Why forecasting fails',
    painCards: [
      {
        icon: 'FileText',
        title: 'Spreadsheet forecasts',
        description:
          'Managers spend Friday afternoons updating forecast spreadsheets from CRM exports.',
      },
      {
        icon: 'AlertTriangle',
        title: 'Gut feelings',
        description:
          "Reps say 'looking good' but the data tells a different story.",
      },
      {
        icon: 'TrendingDown',
        title: 'Quarter-end surprises',
        description:
          "Deals that were 'closing this month' slip. Every. Single. Quarter.",
      },
    ],
    solutions: [
      {
        label: 'FORECAST',
        heading: 'Data-driven forecasting',
        description:
          'Weighted pipeline based on stage, velocity, and history.',
        features: [
          { text: 'Weighted pipeline by stage probability' },
          { text: 'Best case / commit / worst case views' },
          { text: 'Historical accuracy tracking' },
          { text: 'Rep and team rollups' },
        ],
      },
      {
        label: 'PLAN',
        heading: 'Plan with confidence',
        description: 'Capacity planning and territory management.',
        features: [
          { text: 'Quota tracking per rep' },
          { text: 'Territory assignment' },
          { text: 'Capacity planning tools' },
          { text: 'Goal vs actual dashboards' },
        ],
      },
    ],
    relatedModulesLabel: 'POWERED BY',
    relatedModulesHeading: 'Modules that power your forecasting',
    relatedModuleSlugs: ['pipeline', 'contacts', 'accounts'],
    ctaHeading: 'Forecast with confidence',
    ctaSubheading:
      'Free for up to 3 users. Pipeline forecasting included.',
    ctaPrimaryText: 'Start free trial',
    ctaPrimaryHref: '/get-started',
    ctaSecondaryText: 'Book a demo',
    ctaSecondaryHref: '/demo',
  },
  {
    name: 'Prospect & Manage Accounts',
    slug: 'prospect-and-manage',
    order: 5,
    badge: 'USE CASE',
    heroHeading: 'Find prospects, manage accounts, grow revenue',
    heroDescription:
      'From cold outreach to account expansion — manage the full lifecycle of your B2B relationships.',
    primaryCtaText: 'Start free trial',
    primaryCtaHref: '/get-started',
    secondaryCtaText: 'See pricing',
    secondaryCtaHref: '/pricing',
    painSectionLabel: "WHAT YOU'RE FACING",
    painHeading: 'The prospecting-to-account gap',
    painCards: [
      {
        icon: 'Search',
        title: 'Manual prospecting',
        description:
          'Hours spent on LinkedIn and Google finding the right contacts.',
      },
      {
        icon: 'Unlink',
        title: 'Prospect ≠ account',
        description:
          'Prospects live in one tool, accounts in another. No connection.',
      },
      {
        icon: 'TrendingDown',
        title: 'No expansion signals',
        description:
          "Existing accounts have upsell potential but nobody's tracking it.",
      },
    ],
    solutions: [
      {
        label: 'PROSPECT',
        heading: 'Targeted prospecting workflows',
        description: 'Find, qualify, and reach the right contacts.',
        features: [
          { text: 'Contact enrichment and research' },
          { text: 'Targeted list building' },
          { text: 'Multi-channel outreach' },
          { text: 'Prospect scoring' },
        ],
      },
      {
        label: 'MANAGE',
        heading: 'Full account lifecycle',
        description: 'From first deal to expansion and renewal.',
        features: [
          { text: '360° account views' },
          { text: 'Stakeholder mapping' },
          { text: 'Health scoring' },
          { text: 'Expansion opportunity alerts' },
        ],
      },
    ],
    relatedModulesLabel: 'POWERED BY',
    relatedModulesHeading: 'Modules that power your account management',
    relatedModuleSlugs: ['accounts', 'contacts', 'outreach'],
    ctaHeading: 'Master the full account lifecycle',
    ctaSubheading:
      'Free for up to 3 users. Account management included.',
    ctaPrimaryText: 'Start free trial',
    ctaPrimaryHref: '/get-started',
    ctaSecondaryText: 'Book a demo',
    ctaSecondaryHref: '/demo',
  },
]

async function seed(): Promise<void> {
  const configPath = path.resolve(dirname, '../payload.config.ts')
  const configUrl = new URL(`file:///${configPath.replace(/\\/g, '/')}`)

  const payload = await getPayload({
    config: (await import(configUrl.href)).default,
  })

  console.log('Seeding 5 use cases...\n')

  // Check existing
  const existing = await payload.find({
    collection: 'use-cases',
    limit: 100,
  })
  const existingSlugs = new Set(existing.docs.map((d) => d.slug))

  // Resolve module slugs to IDs
  const allModules = await payload.find({
    collection: 'modules',
    limit: 100,
  })
  const moduleIdBySlug: Record<string, number> = {}
  for (const mod of allModules.docs) {
    moduleIdBySlug[mod.slug] = mod.id
  }

  for (const uc of useCases) {
    if (existingSlugs.has(uc.slug)) {
      console.log(`  SKIP  "${uc.name}" (slug "${uc.slug}" already exists)`)
      continue
    }

    const relatedModules = uc.relatedModuleSlugs
      .map((slug) => ({ module: moduleIdBySlug[slug] }))
      .filter((rm) => rm.module)

    await payload.create({
      collection: 'use-cases',
      data: {
        name: uc.name,
        slug: uc.slug,
        order: uc.order,
        isPublished: true,
        badge: uc.badge,
        heroHeading: uc.heroHeading,
        heroDescription: uc.heroDescription,
        primaryCtaText: uc.primaryCtaText,
        primaryCtaHref: uc.primaryCtaHref,
        secondaryCtaText: uc.secondaryCtaText,
        secondaryCtaHref: uc.secondaryCtaHref,
        painSectionLabel: uc.painSectionLabel,
        painHeading: uc.painHeading,
        painCards: uc.painCards as UseCase['painCards'],
        solutions: uc.solutions,
        relatedModulesLabel: uc.relatedModulesLabel,
        relatedModulesHeading: uc.relatedModulesHeading,
        relatedModules,
        ctaHeading: uc.ctaHeading,
        ctaSubheading: uc.ctaSubheading,
        ctaPrimaryText: uc.ctaPrimaryText,
        ctaPrimaryHref: uc.ctaPrimaryHref,
        ctaSecondaryText: uc.ctaSecondaryText,
        ctaSecondaryHref: uc.ctaSecondaryHref,
      },
    })
    console.log(`  CREATE "${uc.name}"`)
  }

  console.log('\n✅ Use cases seeded!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
