/**
 * Adds the Reports & Analytics and Integrations & API module pages.
 *
 * Both are real, top-level Revnator app modules (Reports shipped v0.7,
 * Integrations v0.8) that had no marketing page on the website.
 *
 * Idempotent: an existing module with the same slug is updated, not duplicated.
 *
 * Run from project root:
 *   npx tsx src/scripts/add-reports-integrations-modules.ts
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

const reports = {
  slug: 'reports',
  name: 'Reports & Analytics',
  badge: 'ANALYTICS',
  icon: 'BarChart3' as Module['icon'],
  order: 11,
  isPublished: true,
  shortDescription: 'Real-time sales dashboards across revenue, email, pipeline, and tasks.',
  cardFeatures: [
    { text: 'Real-time KPI dashboards' },
    { text: 'AI-written report insights' },
    { text: 'One-click CSV export' },
  ],
  heroHeading: 'Sales Analytics Software That Turns Your Pipeline Into Decisions',
  heroDescription:
    'Real-time dashboards for revenue, email, pipeline, and tasks — with AI that reads every report and writes the insights for you. Sales reporting that tells you what changed and what to do about it.',
  heroPrimaryCtaText: 'Start free trial',
  heroPrimaryCtaHref: GET_STARTED,
  capabilities: [
    { icon: 'BarChart3', title: 'Real-time KPI dashboards' },
    { icon: 'Sparkles', title: 'AI report insights' },
    { icon: 'TrendingUp', title: 'Revenue & pipeline trends' },
    { icon: 'Mail', title: 'Email performance reports' },
    { icon: 'CheckSquare', title: 'Task & activity reports' },
  ] as Module['capabilities'],
  featureBlocks: [
    {
      label: 'OVERVIEW',
      heading: 'Your whole revenue picture on one dashboard',
      description:
        'The Overview report leads with six KPI cards — revenue won, pipeline value, emails sent, reply rate, tasks completed, and new contacts — each with a period-over-period comparison, above revenue and activity charts.',
      features: [
        { text: '6 KPI cards with period-over-period comparison' },
        { text: 'Revenue-won-by-month chart over 12 months' },
        { text: 'Weekly activity across emails, tasks, and deals' },
        { text: 'Flexible date ranges, saved in the URL to share' },
      ],
      ctaText: 'Start free trial',
      ctaHref: GET_STARTED,
    },
    {
      label: 'AI INSIGHTS',
      heading: 'AI reads every report and writes the takeaways',
      description:
        'Every report page carries an AI Insights card that reads the data on screen and returns a headline, key insights, anomalies, and recommendations. You get analysis, not just numbers.',
      features: [
        { text: 'AI-written headline and key insights' },
        { text: 'Automatic anomaly detection on every report' },
        { text: 'Concrete, prioritized recommendations' },
        { text: 'Refreshes for the exact date range you select' },
      ],
      ctaText: 'See AI insights',
      ctaHref: GET_STARTED,
    },
    {
      label: 'EMAIL & PIPELINE',
      heading: 'Deep reporting on outreach and deals',
      description:
        'Dedicated Email and Pipeline reports go far beyond totals — a Sent to Opened to Clicked to Replied funnel, subject-line analysis, a best-time-to-send heatmap, stage conversion, and win/loss breakdowns.',
      features: [
        { text: 'Email performance funnel and subject-line analysis' },
        { text: 'Best-time-to-send engagement heatmap' },
        { text: 'Pipeline stage conversion and win/loss reporting' },
        { text: 'Campaign vs sequence performance comparison' },
      ],
      ctaText: 'Explore reports',
      ctaHref: GET_STARTED,
    },
    {
      label: 'EXPORT',
      heading: 'Take any report with you',
      description:
        'Every report table exports to CSV, the Overview report prints clean for a QBR deck, and a data-export panel pulls contacts, deals, email sends, and tasks out of Revnator whenever you need them.',
      features: [
        { text: 'One-click CSV export on every report table' },
        { text: 'Print-ready Overview report' },
        { text: 'Bulk data export — contacts, deals, emails, tasks' },
        { text: 'Currency and default-date-range preferences' },
      ],
      ctaText: 'Start free trial',
      ctaHref: GET_STARTED,
    },
  ],
  comparisonHeading: 'Sales reporting that explains itself.',
  comparisonCards: [
    {
      title: 'vs. Salesforce Reports',
      description:
        'Salesforce reporting means report builders, dashboard config, and an admin. Revnator reports are ready the moment you have data — and AI writes the takeaways.',
    },
    {
      title: 'vs. a BI tool',
      description:
        'A BI tool needs someone to model your data first. Revnator reports on your live CRM out of the box — no data engineer required.',
    },
    {
      title: 'vs. exporting to a spreadsheet',
      description:
        "A spreadsheet is a snapshot that's stale by morning. Revnator reports are live, and the AI flags exactly what changed.",
    },
  ],
  comparisonStats: [
    { number: '4', label: 'built-in report suites' },
    { number: 'AI', label: 'insights on every report' },
    { number: 'CSV', label: 'export on every table' },
  ],
  ctaHeading: 'Start reporting on your pipeline with AI',
  ctaSubheading:
    'Real-time dashboards and AI insights, included on every plan. Start free — no credit card required.',
  ctaPrimaryText: 'Start free trial',
  ctaPrimaryHref: GET_STARTED,
  ctaSecondaryText: 'Book a demo',
  ctaSecondaryHref: GET_STARTED,
  meta: {
    title: 'Sales Analytics & Reporting Software — Revnator',
    description:
      'Real-time sales dashboards for revenue, email, pipeline, and tasks — with AI that reads every report and writes the insights. Export anything to CSV.',
  },
}

const integrations = {
  slug: 'integrations',
  name: 'Integrations & API',
  badge: 'CONNECT',
  icon: 'Plug' as Module['icon'],
  order: 12,
  isPublished: true,
  shortDescription:
    'Connect your inboxes, calendars, data providers, and AI — plus a full API.',
  cardFeatures: [
    { text: 'Email & calendar connections' },
    { text: 'BYOL enrichment & BYOAI' },
    { text: 'Public REST API + MCP server' },
  ],
  heroHeading: 'CRM Integrations and a Public API That Connect Your Whole Stack',
  heroDescription:
    'Connect your email inboxes, calendars, enrichment providers, and AI keys — then build anything else on a versioned REST API and a published MCP server. Your sales OS, wired into the tools you already run.',
  heroPrimaryCtaText: 'Start free trial',
  heroPrimaryCtaHref: GET_STARTED,
  capabilities: [
    { icon: 'Plug', title: 'Native app integrations' },
    { icon: 'Mail', title: 'Email & calendar connections' },
    { icon: 'Database', title: 'BYOL enrichment providers' },
    { icon: 'Brain', title: 'BYOAI — bring your own AI' },
    { icon: 'Code', title: 'Public REST API + MCP' },
  ] as Module['capabilities'],
  featureBlocks: [
    {
      label: 'CONNECT',
      heading: 'Plug Revnator into the tools you run every day',
      description:
        'Connect Gmail, Outlook, or any SMTP inbox for sending; sync Google Calendar and Outlook Calendar both ways; and browse an expanding directory of native integrations across email, CRM, calendar, productivity, and messaging.',
      features: [
        { text: 'Gmail, Outlook, and SMTP inbox connections' },
        { text: 'Two-way Google and Outlook Calendar sync' },
        { text: 'SendGrid and Stripe built in' },
        { text: 'A growing directory of native integrations' },
      ],
      ctaText: 'Start free trial',
      ctaHref: GET_STARTED,
    },
    {
      label: 'BRING YOUR OWN',
      heading: 'Use your own data and AI providers — no markup',
      description:
        "Revnator's bring-your-own-licence model lets you connect your own enrichment and AI provider keys. You pay the provider directly; Revnator just orchestrates the work.",
      features: [
        { text: 'BYOL enrichment — Apollo, Hunter, ZeroBounce, Clearbit, PDL' },
        { text: 'BYOAI — 6 AI providers, or self-hosted Ollama' },
        { text: 'AES-256-GCM encrypted key storage' },
        { text: 'Zero reseller markup — you pay providers directly' },
      ],
      ctaText: 'Connect your keys',
      ctaHref: GET_STARTED,
    },
    {
      label: 'PUBLIC API',
      heading: 'A versioned REST API for everything in Revnator',
      description:
        'Build custom integrations on a documented REST API covering contacts, accounts, deals, sequences, tasks, pipeline, search, and analytics — authenticated with scoped, revocable API keys.',
      features: [
        { text: 'Versioned /api/v1 REST API' },
        { text: 'Scoped, revocable API keys' },
        { text: 'Consistent JSON request and response shapes' },
        { text: 'Endpoints for contacts, deals, sequences, tasks, and more' },
      ],
      ctaText: 'Explore the API',
      ctaHref: GET_STARTED,
    },
    {
      label: 'MCP SERVER',
      heading: 'Let AI assistants work your CRM directly',
      description:
        'Revnator publishes an MCP server so AI tools like Claude Desktop and Cursor can read and act on your workspace — 33 tools across nine groups, running over the same secure API.',
      features: [
        { text: 'Published @revnator/mcp server' },
        { text: '33 tools across 9 capability groups' },
        { text: 'Works with Claude Desktop, Cursor, and more' },
        { text: 'One API key and a copy-paste setup' },
      ],
      ctaText: 'Start free trial',
      ctaHref: GET_STARTED,
    },
  ],
  comparisonHeading: 'An open sales OS — not a walled garden.',
  comparisonCards: [
    {
      title: 'vs. Salesforce AppExchange',
      description:
        'AppExchange integrations often carry their own license fees and need an admin to wire up. Revnator connects your stack self-serve, on every plan.',
    },
    {
      title: 'vs. closed CRMs',
      description:
        'Many CRMs lock your data behind their own UI. Revnator gives you a public REST API and an MCP server, so your data stays yours.',
    },
    {
      title: 'vs. paying for middleware',
      description:
        'Bring-your-own-licence means you connect enrichment and AI keys directly — you pay the provider, never a reseller markup.',
    },
  ],
  comparisonStats: [
    { number: 'API', label: 'versioned public REST API' },
    { number: '33', label: 'MCP tools for AI assistants' },
    { number: '$0', label: 'markup on BYOL credits' },
  ],
  ctaHeading: 'Connect Revnator to your entire stack',
  ctaSubheading:
    'Email, calendar, enrichment, AI, and a full API — included on every plan. Start free — no credit card required.',
  ctaPrimaryText: 'Start free trial',
  ctaPrimaryHref: GET_STARTED,
  ctaSecondaryText: 'Book a demo',
  ctaSecondaryHref: GET_STARTED,
  meta: {
    title: 'CRM Integrations & Public API — Revnator',
    description:
      'Connect Revnator to your email, calendar, enrichment, and AI providers, and build on a versioned REST API plus a published MCP server for Claude and Cursor.',
  },
}

const modulesToAdd = [reports, integrations]

// ── Create / update ────────────────────────────────────────────────────────

async function run(): Promise<void> {
  const configPath = path.resolve(dirname, '../payload.config.ts')
  const configUrl = new URL(`file:///${configPath.replace(/\\/g, '/')}`)
  const payload = await getPayload({
    config: (await import(configUrl.href)).default,
  })

  for (const data of modulesToAdd) {
    const existing = await payload.find({
      collection: 'modules',
      where: { slug: { equals: data.slug } },
      limit: 1,
    })

    if (existing.docs[0]) {
      await payload.update({
        collection: 'modules',
        id: existing.docs[0].id,
        data,
        context: { disableRevalidate: true },
      })
      console.log(`↻  Updated existing module: ${data.name} (/platform/${data.slug})`)
    } else {
      const created = await payload.create({
        collection: 'modules',
        data,
        context: { disableRevalidate: true },
      })
      console.log(`✚  Created module: ${created.name} (/platform/${created.slug})`)
    }
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
  console.error('Add Reports/Integrations modules failed:', err)
  process.exit(1)
})
