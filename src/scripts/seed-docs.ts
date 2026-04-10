/**
 * Seed script for documentation sections and pages.
 *
 * Run from project root:
 *   npx tsx src/scripts/seed-docs.ts
 */
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import path from 'path'
import { getPayload } from 'payload'
import { fileURLToPath } from 'url'
import type { DocPage, DocSection } from '../payload-types'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

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

function codeBlock(code: string, language?: string): Record<string, unknown> {
  return {
    type: 'block',
    version: 2,
    format: '',
    fields: {
      blockType: 'code',
      code,
      language: language || '',
      blockName: '',
    },
  }
}

function bannerBlock(style: 'info' | 'warning', content: string): Record<string, unknown> {
  return {
    type: 'block',
    version: 2,
    format: '',
    fields: {
      blockType: 'banner',
      style,
      content: {
        root: {
          type: 'root',
          children: [paragraph(text(content))],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      blockName: '',
    },
  }
}

function lexicalBody(children: Record<string, unknown>[]): DocPage['body'] {
  return { root: { type: 'root', children, direction: 'ltr', format: '', indent: 0, version: 1 } } as DocPage['body']
}

function placeholderBody(): DocPage['body'] {
  return lexicalBody([
    paragraph(text('Documentation for this page is being written. Check back soon or contact support@revnator.com for help.')),
  ])
}

// ── Section data ──

interface SectionSeed {
  title: string
  slug: string
  order: number
  icon: string
}

const sections: SectionSeed[] = [
  { title: 'Getting Started', slug: 'getting-started', order: 1, icon: 'Rocket' },
  { title: 'Contacts', slug: 'contacts', order: 2, icon: 'Users' },
  { title: 'Accounts', slug: 'accounts', order: 3, icon: 'Building2' },
  { title: 'Email & Sequences', slug: 'email', order: 4, icon: 'Mail' },
  { title: 'Pipeline', slug: 'pipeline', order: 5, icon: 'GitBranch' },
  { title: 'Calendar', slug: 'calendar', order: 6, icon: 'Calendar' },
  { title: 'Tasks & Missions', slug: 'tasks', order: 7, icon: 'LayoutDashboard' },
  { title: 'Reports', slug: 'reports', order: 8, icon: 'BarChart3' },
  { title: 'Forms', slug: 'forms', order: 9, icon: 'FileText' },
  { title: 'Integrations', slug: 'integrations', order: 10, icon: 'Plug' },
  { title: 'API Reference', slug: 'api', order: 11, icon: 'Code' },
]

// ── Page data ──

interface PageSeed {
  title: string
  slug: string
  sectionSlug: string
  order: number
  body: DocPage['body']
}

const pages: PageSeed[] = [
  // ── Getting Started ──
  {
    title: 'Welcome',
    slug: 'welcome',
    sectionSlug: 'getting-started',
    order: 1,
    body: lexicalBody([
      paragraph(text('Welcome to the Revnator documentation. Revnator is a unified B2B Sales OS that replaces your disconnected stack of CRM, outreach, pipeline, calendar, and reporting tools with a single, intelligent platform.')),
      heading('h2', 'What is Revnator?'),
      paragraph(text('Revnator combines nine core modules into one seamless experience. Instead of switching between tabs and tools, your sales team gets a single workspace where every action — from the first cold email to the signed contract — is connected.')),
      heading('h2', 'Core modules'),
      unorderedList([
        'Contacts — Your single source of truth for every lead and customer',
        'Accounts — Company-level views with health scoring and stakeholder maps',
        'Email & Sequences — Multi-step outreach with built-in warm-up',
        'Pipeline — Visual deal tracking with AI-powered forecasting',
        'Calendar — Scheduling with booking pages and round-robin',
        'Tasks & Missions — Action items and guided playbooks',
        'Reports — Real-time dashboards and custom analytics',
        'Forms — Lead capture with CRM auto-routing',
        'Integrations — Connect your existing tools and data sources',
      ]),
      heading('h2', 'Where to start'),
      paragraph(text('If you\'re new to Revnator, we recommend starting with the Quick Start Guide. It walks you through setup in under 10 minutes. If you\'re migrating from another CRM, check out the Importing Contacts guide.')),
    ]),
  },
  {
    title: 'Quick Start Guide',
    slug: 'quick-start',
    sectionSlug: 'getting-started',
    order: 2,
    body: lexicalBody([
      paragraph(text('Get up and running with Revnator in under 10 minutes. This guide walks you through the essential first steps.')),
      heading('h2', 'Step 1: Create your workspace'),
      paragraph(text('Sign up at revnator.com and create your workspace. Choose a name that your team will recognise — you can always change it later.')),
      heading('h2', 'Step 2: Connect your email'),
      paragraph(text('Navigate to Settings → Email Accounts and click "Connect email". Revnator supports Gmail, Outlook, and any IMAP provider. Once connected, your emails sync automatically.')),
      bannerBlock('info', 'Tip: Connect your email before importing contacts so that existing email threads are matched automatically.'),
      heading('h2', 'Step 3: Import your contacts'),
      paragraph(text('Go to Contacts → Import and upload a CSV file. Revnator auto-maps common column names and deduplicates against existing records.')),
      heading('h2', 'Step 4: Create your first sequence'),
      paragraph(text('Head to Email → Sequences and click "New sequence". Add 3-5 steps with a mix of emails and tasks. Set your sending schedule and add contacts to start outreach.')),
      heading('h2', 'Step 5: View your pipeline'),
      paragraph(text('As contacts reply and engage, they\'ll appear in your pipeline. Navigate to Pipeline to see deals by stage, forecast revenue, and identify stalled opportunities.')),
    ]),
  },
  {
    title: 'Connecting Your Email',
    slug: 'connecting-email',
    sectionSlug: 'getting-started',
    order: 3,
    body: placeholderBody(),
  },

  // ── Contacts ──
  {
    title: 'Overview',
    slug: 'overview',
    sectionSlug: 'contacts',
    order: 1,
    body: placeholderBody(),
  },
  {
    title: 'Importing Contacts',
    slug: 'importing-contacts',
    sectionSlug: 'contacts',
    order: 2,
    body: lexicalBody([
      paragraph(text('Revnator makes it easy to bring your existing contacts into the platform. Whether you\'re migrating from another CRM or importing from a spreadsheet, the import tool handles mapping, deduplication, and validation automatically.')),
      heading('h2', 'Supported file formats'),
      paragraph(text('You can import contacts from several file types. We recommend CSV for the best results, but the following formats are all supported:')),
      unorderedList([
        'CSV (.csv) — recommended, most flexible field mapping',
        'Excel (.xlsx) — multi-sheet files use the first sheet only',
        'Google Sheets — paste a public sharing link',
        'vCard (.vcf) — best for individual contacts',
      ]),
      heading('h2', 'Step-by-step import'),
      orderedList([
        'Navigate to Contacts → Import in the sidebar. Click "Upload file" and select your CSV or Excel file. Files up to 10 MB are supported.',
        'Map your columns to Revnator fields. The importer auto-detects common column names like "Email", "First Name", and "Company". Review each mapping and correct any mismatches.',
        'Click "Start import" to begin processing. You\'ll see a progress bar and a summary of new, updated, and skipped contacts once complete.',
      ]),
      bannerBlock('info', 'Tip: If your file contains a column that doesn\'t match any existing field, Revnator will offer to create a new custom field automatically.'),
      heading('h2', 'Field mapping'),
      paragraph(text('The field mapper shows your file\'s column headers on the left and Revnator\'s contact fields on the right. Here\'s an example of the expected CSV structure:')),
      codeBlock('first_name,last_name,email,company,phone,lifecycle_stage\nJane,Smith,jane@acme.com,Acme Corp,+1-555-0101,Lead\nJohn,Doe,john@globex.com,Globex Inc,+1-555-0202,Qualified', 'csv'),
      heading('h2', 'Troubleshooting'),
      bannerBlock('warning', 'If your import fails with a "duplicate email" error, enable the "Update existing contacts" toggle in the import settings. This merges new data into existing records instead of skipping them.'),
      heading('h3', 'Common errors'),
      unorderedList([
        'File too large — split files over 10 MB into smaller batches',
        'Invalid email format — ensure every row has a valid email address',
        'Encoding issues — save your CSV as UTF-8 to avoid garbled characters',
        'Missing required field — every contact must have at least an email address',
      ]),
    ]),
  },
  {
    title: 'Custom Fields',
    slug: 'custom-fields',
    sectionSlug: 'contacts',
    order: 3,
    body: placeholderBody(),
  },
  {
    title: 'Lists & Filters',
    slug: 'lists-and-filters',
    sectionSlug: 'contacts',
    order: 4,
    body: placeholderBody(),
  },
  {
    title: 'Lifecycle Stages',
    slug: 'lifecycle-stages',
    sectionSlug: 'contacts',
    order: 5,
    body: placeholderBody(),
  },

  // ── Accounts ──
  {
    title: 'Overview',
    slug: 'overview',
    sectionSlug: 'accounts',
    order: 1,
    body: placeholderBody(),
  },
  {
    title: 'Account Health',
    slug: 'account-health',
    sectionSlug: 'accounts',
    order: 2,
    body: placeholderBody(),
  },

  // ── Email & Sequences ──
  {
    title: 'Overview',
    slug: 'overview',
    sectionSlug: 'email',
    order: 1,
    body: placeholderBody(),
  },
  {
    title: 'Creating Sequences',
    slug: 'creating-sequences',
    sectionSlug: 'email',
    order: 2,
    body: placeholderBody(),
  },
  {
    title: 'Personalization',
    slug: 'personalization',
    sectionSlug: 'email',
    order: 3,
    body: placeholderBody(),
  },

  // ── Pipeline ──
  {
    title: 'Overview',
    slug: 'overview',
    sectionSlug: 'pipeline',
    order: 1,
    body: placeholderBody(),
  },
  {
    title: 'Creating Deals',
    slug: 'creating-deals',
    sectionSlug: 'pipeline',
    order: 2,
    body: placeholderBody(),
  },
  {
    title: 'Forecasting',
    slug: 'forecasting',
    sectionSlug: 'pipeline',
    order: 3,
    body: placeholderBody(),
  },

  // ── Calendar ──
  {
    title: 'Overview',
    slug: 'overview',
    sectionSlug: 'calendar',
    order: 1,
    body: placeholderBody(),
  },
  {
    title: 'Booking Pages',
    slug: 'booking-pages',
    sectionSlug: 'calendar',
    order: 2,
    body: placeholderBody(),
  },

  // ── Tasks & Missions ──
  {
    title: 'Tasks Overview',
    slug: 'tasks-overview',
    sectionSlug: 'tasks',
    order: 1,
    body: placeholderBody(),
  },
  {
    title: 'Mission Templates',
    slug: 'mission-templates',
    sectionSlug: 'tasks',
    order: 2,
    body: placeholderBody(),
  },

  // ── Reports ──
  {
    title: 'Overview',
    slug: 'overview',
    sectionSlug: 'reports',
    order: 1,
    body: placeholderBody(),
  },
  {
    title: 'Custom Reports',
    slug: 'custom-reports',
    sectionSlug: 'reports',
    order: 2,
    body: placeholderBody(),
  },

  // ── Forms ──
  {
    title: 'Creating Forms',
    slug: 'creating-forms',
    sectionSlug: 'forms',
    order: 1,
    body: placeholderBody(),
  },
  {
    title: 'Embedding Forms',
    slug: 'embedding-forms',
    sectionSlug: 'forms',
    order: 2,
    body: placeholderBody(),
  },

  // ── Integrations ──
  {
    title: 'Available Integrations',
    slug: 'available-integrations',
    sectionSlug: 'integrations',
    order: 1,
    body: placeholderBody(),
  },
  {
    title: 'Setting Up Integrations',
    slug: 'setup',
    sectionSlug: 'integrations',
    order: 2,
    body: placeholderBody(),
  },

  // ── API Reference ──
  {
    title: 'Authentication',
    slug: 'authentication',
    sectionSlug: 'api',
    order: 1,
    body: lexicalBody([
      paragraph(text('To use the Revnator API, you\'ll need an API key. API keys are scoped to your workspace and can be generated from your account settings.')),
      heading('h2', 'Getting your API key'),
      orderedList([
        'Navigate to Settings → API Keys in the Revnator admin',
        'Click "Generate new key"',
        'Give your key a descriptive name (e.g., "Production CRM sync")',
        'Copy the key immediately — you won\'t be able to see it again',
      ]),
      heading('h2', 'Making your first request'),
      paragraph(text('All API requests are made to https://api.revnator.com/v1. Here\'s a simple example to fetch your contacts:')),
      codeBlock('curl -X GET https://api.revnator.com/v1/contacts \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -H "Content-Type: application/json"', 'bash'),
      heading('h2', 'Authentication header'),
      paragraph(text('All requests must include your API key in the Authorization header using the Bearer token scheme.')),
      codeBlock('Authorization: Bearer rev_live_a1b2c3d4e5f6...', 'http'),
      heading('h2', 'Token security'),
      paragraph(text('Treat your API key like a password. Never expose it in client-side code, public repositories, or shared documents.')),
      bannerBlock('warning', 'If your API key is exposed, rotate it immediately from Settings → API Keys. Old keys will continue to work for 24 hours after rotation to prevent service disruption.'),
      heading('h3', 'Rotating tokens'),
      paragraph(text('You can rotate your API key at any time without service interruption. Generated tokens have a 24-hour grace period where both old and new keys work simultaneously.')),
    ]),
  },
  {
    title: 'Rate Limits',
    slug: 'rate-limits',
    sectionSlug: 'api',
    order: 2,
    body: placeholderBody(),
  },
  {
    title: 'Endpoints',
    slug: 'endpoints',
    sectionSlug: 'api',
    order: 3,
    body: placeholderBody(),
  },
  {
    title: 'Webhooks',
    slug: 'webhooks',
    sectionSlug: 'api',
    order: 4,
    body: placeholderBody(),
  },
]

// ── Main seed function ──

async function seed(): Promise<void> {
  const configPath = path.resolve(dirname, '../payload.config.ts')
  const configUrl = new URL(`file:///${configPath.replace(/\\/g, '/')}`)

  const payload = await getPayload({
    config: (await import(configUrl.href)).default,
  })

  console.log('🗑  Clearing existing doc pages and sections...')

  // Delete pages first (they reference sections)
  const existingPages = await payload.find({ collection: 'doc-pages', limit: 500 })
  for (const page of existingPages.docs) {
    await payload.delete({ collection: 'doc-pages', id: page.id })
  }

  const existingSections = await payload.find({ collection: 'doc-sections', limit: 100 })
  for (const section of existingSections.docs) {
    await payload.delete({ collection: 'doc-sections', id: section.id })
  }

  // ── Create sections ──
  console.log('📁 Creating doc sections...')
  const sectionMap = new Map<string, number>()

  for (const s of sections) {
    const created = await payload.create({
      collection: 'doc-sections',
      data: {
        title: s.title,
        slug: s.slug,
        order: s.order,
        isPublished: true,
        icon: s.icon as DocSection['icon'],
      },
    })
    sectionMap.set(s.slug, created.id)
    console.log(`  ✓ Section: ${s.title}`)
  }

  // ── Create pages (first pass — no prev/next) ──
  console.log('📄 Creating doc pages...')
  const pageMap = new Map<string, number>()

  for (const p of pages) {
    const sectionId = sectionMap.get(p.sectionSlug)
    if (!sectionId) {
      console.error(`  ✗ Section not found for page: ${p.title} (section: ${p.sectionSlug})`)
      continue
    }

    const created = await payload.create({
      collection: 'doc-pages',
      data: {
        title: p.title,
        slug: p.slug,
        section: sectionId,
        order: p.order,
        isPublished: true,
        lastUpdated: '2026-04-10',
        body: p.body as DocPage['body'],
      },
    })
    const key = `${p.sectionSlug}/${p.slug}`
    pageMap.set(key, created.id)
    console.log(`  ✓ Page: ${p.title} (${key})`)
  }

  // ── Second pass: set prev/next relationships ──
  console.log('🔗 Setting prev/next navigation links...')

  // Group pages by section in order
  const sectionPages = new Map<string, string[]>()
  for (const p of pages) {
    const key = `${p.sectionSlug}/${p.slug}`
    if (!sectionPages.has(p.sectionSlug)) {
      sectionPages.set(p.sectionSlug, [])
    }
    sectionPages.get(p.sectionSlug)!.push(key)
  }

  // Build a flat ordered list across all sections
  const allPageKeys: string[] = []
  for (const s of sections) {
    const sPages = sectionPages.get(s.slug) || []
    allPageKeys.push(...sPages)
  }

  for (let i = 0; i < allPageKeys.length; i++) {
    const currentKey = allPageKeys[i]
    const currentId = pageMap.get(currentKey)
    if (!currentId) continue

    const prevId = i > 0 ? pageMap.get(allPageKeys[i - 1]) : undefined
    const nextId = i < allPageKeys.length - 1 ? pageMap.get(allPageKeys[i + 1]) : undefined

    if (prevId || nextId) {
      await payload.update({
        collection: 'doc-pages',
        id: currentId,
        data: {
          previousPage: prevId ?? null,
          nextPage: nextId ?? null,
        },
      })
    }
  }

  console.log(`\n✅ Done! Created ${sectionMap.size} sections and ${pageMap.size} pages.`)
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
