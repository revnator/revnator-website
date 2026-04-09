// ── Navigation structure ──

export interface DocsSidebarPage {
  slug: string
  title: string
}

export interface DocsSidebarSection {
  title: string
  pages: DocsSidebarPage[]
  defaultExpanded?: boolean
}

export const docsSections: DocsSidebarSection[] = [
  {
    title: 'Getting Started',
    pages: [
      { slug: 'getting-started/welcome', title: 'Welcome' },
      { slug: 'getting-started/quick-start', title: 'Quick start guide' },
      { slug: 'getting-started/connecting-email', title: 'Connecting your email' },
    ],
  },
  {
    title: 'Contacts',
    defaultExpanded: true,
    pages: [
      { slug: 'contacts/overview', title: 'Overview' },
      { slug: 'contacts/importing-contacts', title: 'Importing contacts' },
      { slug: 'contacts/custom-fields', title: 'Custom fields' },
      { slug: 'contacts/lists-and-filters', title: 'Lists & filters' },
      { slug: 'contacts/lifecycle-stages', title: 'Lifecycle stages' },
    ],
  },
  {
    title: 'Accounts',
    pages: [
      { slug: 'accounts/overview', title: 'Overview' },
      { slug: 'accounts/account-health', title: 'Account health' },
      { slug: 'accounts/stakeholder-mapping', title: 'Stakeholder mapping' },
    ],
  },
  {
    title: 'Email & Sequences',
    pages: [
      { slug: 'email/overview', title: 'Overview' },
      { slug: 'email/creating-sequences', title: 'Creating sequences' },
      { slug: 'email/personalization', title: 'Personalization' },
      { slug: 'email/email-warm-up', title: 'Email warm-up' },
    ],
  },
  {
    title: 'Pipeline',
    pages: [
      { slug: 'pipeline/overview', title: 'Overview' },
      { slug: 'pipeline/creating-deals', title: 'Creating deals' },
      { slug: 'pipeline/stage-management', title: 'Stage management' },
      { slug: 'pipeline/forecasting', title: 'Forecasting' },
    ],
  },
  {
    title: 'Calendar',
    pages: [
      { slug: 'calendar/overview', title: 'Overview' },
      { slug: 'calendar/booking-pages', title: 'Booking pages' },
      { slug: 'calendar/calendar-integrations', title: 'Calendar integrations' },
    ],
  },
  {
    title: 'Tasks & Missions',
    pages: [
      { slug: 'tasks/tasks-overview', title: 'Tasks overview' },
      { slug: 'tasks/mission-templates', title: 'Mission templates' },
      { slug: 'tasks/team-coordination', title: 'Team coordination' },
    ],
  },
  {
    title: 'Reports',
    pages: [
      { slug: 'reports/overview', title: 'Overview' },
      { slug: 'reports/custom-reports', title: 'Custom reports' },
      { slug: 'reports/exports', title: 'Exports' },
    ],
  },
  {
    title: 'Forms',
    pages: [
      { slug: 'forms/creating-forms', title: 'Creating forms' },
      { slug: 'forms/embedding-forms', title: 'Embedding forms' },
      { slug: 'forms/form-submissions', title: 'Form submissions' },
    ],
  },
  {
    title: 'Integrations',
    pages: [
      { slug: 'integrations/available-integrations', title: 'Available integrations' },
      { slug: 'integrations/setting-up', title: 'Setting up integrations' },
      { slug: 'integrations/api-access', title: 'API access' },
    ],
  },
  {
    title: 'API Reference',
    pages: [
      { slug: 'api/authentication', title: 'Authentication' },
      { slug: 'api/rate-limits', title: 'Rate Limits' },
      { slug: 'api/errors', title: 'Errors' },
      { slug: 'api/contacts', title: 'Contacts API' },
      { slug: 'api/accounts', title: 'Accounts API' },
      { slug: 'api/pipelines', title: 'Pipelines API' },
      { slug: 'api/email-sequences', title: 'Email Sequences API' },
      { slug: 'api/webhooks', title: 'Webhooks' },
      { slug: 'api/sdks', title: 'SDKs' },
    ],
  },
]

// ── Doc page content blocks ──

export type DocsBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'code'; language?: string; code: string }
  | { type: 'callout'; variant: 'info' | 'warning'; text: string }

export interface DocsPageData {
  slug: string
  title: string
  category: string
  lastUpdated: string
  body: DocsBlock[]
  tocHeadings: string[]
  prev?: { slug: string; title: string }
  next?: { slug: string; title: string }
}

// ── Example page: Importing contacts ──

export const importingContactsPage: DocsPageData = {
  slug: 'contacts/importing-contacts',
  title: 'Importing contacts',
  category: 'Contacts',
  lastUpdated: 'April 9, 2026',
  tocHeadings: [
    'Supported file formats',
    'Step-by-step import',
    'Field mapping',
    'Troubleshooting',
  ],
  prev: { slug: 'contacts/overview', title: 'Overview' },
  next: { slug: 'contacts/custom-fields', title: 'Custom fields' },
  body: [
    {
      type: 'paragraph',
      text: 'Revnator makes it easy to bring your existing contacts into the platform. Whether you\'re migrating from another CRM or importing from a spreadsheet, the import tool handles mapping, deduplication, and validation automatically.',
    },
    { type: 'h2', text: 'Supported file formats' },
    {
      type: 'paragraph',
      text: 'You can import contacts from several file types. We recommend CSV for the best results, but the following formats are all supported:',
    },
    {
      type: 'list',
      items: [
        'CSV (.csv) — recommended, most flexible field mapping',
        'Excel (.xlsx) — multi-sheet files use the first sheet only',
        'Google Sheets — paste a public sharing link',
        'vCard (.vcf) — best for individual contacts',
      ],
    },
    { type: 'h2', text: 'Step-by-step import' },
    {
      type: 'list',
      ordered: true,
      items: [
        'Navigate to Contacts → Import in the sidebar. Click "Upload file" and select your CSV or Excel file. Files up to 10 MB are supported.',
        'Map your columns to Revnator fields. The importer auto-detects common column names like "Email", "First Name", and "Company". Review each mapping and correct any mismatches.',
        'Click "Start import" to begin processing. You\'ll see a progress bar and a summary of new, updated, and skipped contacts once complete.',
      ],
    },
    {
      type: 'callout',
      variant: 'info',
      text: 'Tip: If your file contains a column that doesn\'t match any existing field, Revnator will offer to create a new custom field automatically.',
    },
    { type: 'h2', text: 'Field mapping' },
    {
      type: 'paragraph',
      text: 'The field mapper shows your file\'s column headers on the left and Revnator\'s contact fields on the right. Here\'s an example of the expected CSV structure:',
    },
    {
      type: 'code',
      language: 'csv',
      code: 'first_name,last_name,email,company,phone,lifecycle_stage\nJane,Smith,jane@acme.com,Acme Corp,+1-555-0101,Lead\nJohn,Doe,john@globex.com,Globex Inc,+1-555-0202,Qualified',
    },
    { type: 'h2', text: 'Troubleshooting' },
    {
      type: 'callout',
      variant: 'warning',
      text: 'If your import fails with a "duplicate email" error, enable the "Update existing contacts" toggle in the import settings. This merges new data into existing records instead of skipping them.',
    },
    { type: 'h3', text: 'Common errors' },
    {
      type: 'list',
      items: [
        'File too large — split files over 10 MB into smaller batches',
        'Invalid email format — ensure every row has a valid email address',
        'Encoding issues — save your CSV as UTF-8 to avoid garbled characters',
        'Missing required field — every contact must have at least an email address',
      ],
    },
  ],
}

// ── API Reference: Authentication ──

export const apiAuthenticationPage: DocsPageData = {
  slug: 'api/authentication',
  title: 'Authentication',
  category: 'API Reference',
  lastUpdated: 'April 9, 2026',
  tocHeadings: [
    'Getting your API key',
    'Making your first request',
    'Authentication header',
    'Token security',
  ],
  prev: undefined,
  next: { slug: 'api/rate-limits', title: 'Rate Limits' },
  body: [
    {
      type: 'paragraph',
      text: 'To use the Revnator API, you\'ll need an API key. API keys are scoped to your workspace and can be generated from your account settings.',
    },
    { type: 'h2', text: 'Getting your API key' },
    {
      type: 'list',
      ordered: true,
      items: [
        'Navigate to Settings → API Keys in the Revnator admin',
        'Click "Generate new key"',
        'Give your key a descriptive name (e.g., "Production CRM sync")',
        'Copy the key immediately — you won\'t be able to see it again',
      ],
    },
    { type: 'h2', text: 'Making your first request' },
    {
      type: 'paragraph',
      text: 'All API requests are made to https://api.revnator.com/v1. Here\'s a simple example to fetch your contacts:',
    },
    {
      type: 'code',
      language: 'bash',
      code: 'curl -X GET https://api.revnator.com/v1/contacts \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -H "Content-Type: application/json"',
    },
    { type: 'h2', text: 'Authentication header' },
    {
      type: 'paragraph',
      text: 'All requests must include your API key in the Authorization header using the Bearer token scheme.',
    },
    {
      type: 'code',
      language: 'http',
      code: 'Authorization: Bearer rev_live_a1b2c3d4e5f6...',
    },
    { type: 'h2', text: 'Token security' },
    {
      type: 'paragraph',
      text: 'Treat your API key like a password. Never expose it in client-side code, public repositories, or shared documents.',
    },
    {
      type: 'callout',
      variant: 'warning',
      text: 'If your API key is exposed, rotate it immediately from Settings → API Keys. Old keys will continue to work for 24 hours after rotation to prevent service disruption.',
    },
    { type: 'h3', text: 'Rotating tokens' },
    {
      type: 'paragraph',
      text: 'You can rotate your API key at any time without service interruption. Generated tokens have a 24-hour grace period where both old and new keys work simultaneously.',
    },
  ],
}

// ── Welcome page quick links ──

export interface DocsQuickLink {
  icon: string
  title: string
  description: string
  href: string
}

export const docsQuickLinks: DocsQuickLink[] = [
  {
    icon: 'Zap',
    title: 'Quick Start',
    description: 'Set up your workspace and send your first sequence in 5 minutes.',
    href: '/docs/getting-started/quick-start',
  },
  {
    icon: 'Layers',
    title: 'Browse by Module',
    description: 'Explore CRM, outreach, pipeline, calendar, and more.',
    href: '/docs/contacts/overview',
  },
  {
    icon: 'Code',
    title: 'API Reference',
    description: 'Authenticate, call endpoints, and set up webhooks.',
    href: '/docs/api/authentication',
  },
  {
    icon: 'Play',
    title: 'Video Tutorials',
    description: 'Watch step-by-step video walkthroughs for every feature.',
    href: '/docs/getting-started/welcome',
  },
]

// ── Utility ──

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function getDocPage(slug: string): DocsPageData | undefined {
  if (slug === 'contacts/importing-contacts') {
    return importingContactsPage
  }
  if (slug === 'api/authentication') {
    return apiAuthenticationPage
  }
  return undefined
}
