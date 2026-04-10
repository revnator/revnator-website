/**
 * Seed script for all 9 Revnator modules.
 *
 * Run from project root:
 *   npx tsx src/collections/Modules/seedAllModules.ts
 *
 * Requires DATABASE_URI and PAYLOAD_SECRET in .env.local
 */
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import path from 'path'
import { getPayload } from 'payload'
import type { Module } from '@/payload-types'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

type ModuleIcon = Module['icon']

interface ModuleSeed {
  name: string
  slug: string
  badge: string
  icon: ModuleIcon
  order: number
  shortDescription: string
  cardFeatures: { text: string }[]
  heroHeading: string
  heroDescription: string
  heroPrimaryCtaText: string
  heroPrimaryCtaHref: string
  heroSecondaryCtaText: string
  heroSecondaryCtaHref: string
  capabilities: { icon: ModuleIcon; title: string }[]
  featureBlocks: {
    label: string
    heading: string
    description: string
    features: { text: string }[]
    ctaText: string
    ctaHref: string
  }[]
  comparisonLabel: string
  comparisonHeading: string
  comparisonCards: { title: string; description: string }[]
  comparisonStats: { number: string; label: string }[]
  ctaHeading: string
  ctaSubheading: string
  ctaPrimaryText: string
  ctaPrimaryHref: string
  ctaSecondaryText: string
  ctaSecondaryHref: string
}

interface RelationMap {
  [slug: string]: string[]
}

const modules: ModuleSeed[] = [
  // ── MODULE 1: CONTACTS ──
  {
    name: 'Contact Lifecycle Management',
    slug: 'contacts',
    badge: 'CRM',
    icon: 'Users',
    order: 1,
    shortDescription:
      'Your single source of truth for every contact. Import, enrich, segment, and track interactions.',
    cardFeatures: [
      { text: 'Smart lists & filters' },
      { text: 'Custom fields' },
      { text: 'Lifecycle stages' },
    ],
    heroHeading: 'Manage every contact, from first touch to closed deal',
    heroDescription:
      'Organize, enrich, segment, and track every interaction across your sales pipeline. Custom fields, smart lists, and lifecycle tracking - built for teams that move fast.',
    heroPrimaryCtaText: 'Start free trial',
    heroPrimaryCtaHref: '/signup',
    heroSecondaryCtaText: 'See all features',
    heroSecondaryCtaHref: '#features',
    capabilities: [
      { icon: 'Database', title: 'Contact database' },
      { icon: 'Filter', title: 'Smart filters & lists' },
      { icon: 'Layers', title: 'Custom fields' },
      { icon: 'RefreshCw', title: 'Lifecycle tracking' },
      { icon: 'Upload', title: 'Bulk import & export' },
    ],
    featureBlocks: [
      {
        label: 'ORGANIZE',
        heading: 'Your single source of truth for every contact',
        description:
          'Import contacts from CSV, enrich profiles automatically, and see every interaction in one timeline. No more scattered spreadsheets.',
        features: [
          { text: 'Bulk import with smart field mapping' },
          { text: 'Contact enrichment and deduplication' },
          { text: 'Full activity timeline per contact' },
          { text: 'Company and account association' },
        ],
        ctaText: 'Start free trial',
        ctaHref: '/signup',
      },
      {
        label: 'SEGMENT',
        heading: 'Slice your contacts any way you need',
        description:
          'Create dynamic lists with advanced filters. Segment by lifecycle stage, engagement level, custom fields, or any combination.',
        features: [
          { text: 'Advanced filter builder with AND/OR logic' },
          { text: 'Save and reuse filter presets' },
          { text: 'Dynamic lists that auto-update' },
          { text: 'Bulk actions on filtered results' },
        ],
        ctaText: 'See it in action',
        ctaHref: '/demo',
      },
      {
        label: 'CUSTOMIZE',
        heading: 'Your CRM, your fields, your rules',
        description:
          'Add unlimited custom fields to capture the data that matters to your business. Text, numbers, dates, dropdowns - whatever you need.',
        features: [
          { text: 'Unlimited custom field types' },
          { text: 'Variable engine for email personalization' },
          { text: 'Field-level permissions per team role' },
          { text: 'Drag-and-drop field ordering' },
        ],
        ctaText: 'Read the docs',
        ctaHref: '/docs/contacts',
      },
      {
        label: 'TRACK',
        heading: 'Know exactly where every contact stands',
        description:
          'Track contacts through your sales lifecycle - from new lead to qualified to customer. Automate stage transitions based on engagement.',
        features: [
          { text: 'Customizable lifecycle stages' },
          { text: 'Automatic stage progression rules' },
          { text: 'Stage-based reporting and analytics' },
          { text: 'Visual lifecycle funnel dashboard' },
        ],
        ctaText: 'Start free trial',
        ctaHref: '/signup',
      },
    ],
    comparisonLabel: 'WHY REVNATOR',
    comparisonHeading: 'Not just another CRM. A sales-first contact system.',
    comparisonCards: [
      {
        title: 'Beyond spreadsheets',
        description:
          'Spreadsheets break at 500 contacts. Revnator handles 50,000+ with search, filters, and bulk actions built in.',
      },
      {
        title: 'Without the complexity',
        description:
          'Salesforce needs an admin. HubSpot needs a budget. Revnator is self-serve, fast, and built for lean teams.',
      },
      {
        title: 'Everything connected',
        description:
          'Your contacts feed directly into sequences, pipeline deals, and reports. No CSV exports between tools.',
      },
    ],
    comparisonStats: [
      { number: '50K+', label: 'contacts supported' },
      { number: '30 sec', label: 'to import' },
      { number: '100%', label: 'self-serve setup' },
    ],
    ctaHeading: 'Start managing your contacts today',
    ctaSubheading:
      'Free for up to 3 users. No credit card required. Set up in under 5 minutes.',
    ctaPrimaryText: 'Start free trial',
    ctaPrimaryHref: '/signup',
    ctaSecondaryText: 'Book a demo',
    ctaSecondaryHref: '/demo',
  },

  // ── MODULE 2: ACCOUNTS ──
  {
    name: 'Account Management',
    slug: 'accounts',
    badge: 'ACCOUNTS',
    icon: 'Building2',
    order: 2,
    shortDescription:
      '360\u00B0 view of every company. Health scores, stakeholder mapping, and account timelines.',
    cardFeatures: [
      { text: '360\u00B0 account view' },
      { text: 'Health indicators' },
      { text: 'Contact grouping' },
    ],
    heroHeading: 'See the full picture for every account',
    heroDescription:
      '360\u00B0 account views, health scores, stakeholder mapping, and full account timelines. Built for teams selling to companies, not just individuals.',
    heroPrimaryCtaText: 'Start free trial',
    heroPrimaryCtaHref: '/signup',
    heroSecondaryCtaText: 'See all features',
    heroSecondaryCtaHref: '#features',
    capabilities: [
      { icon: 'Building2', title: 'Account profiles' },
      { icon: 'Activity', title: 'Health indicators' },
      { icon: 'Users', title: 'Stakeholder mapping' },
      { icon: 'Clock', title: 'Account timeline' },
      { icon: 'Layers', title: 'Custom account fields' },
    ],
    featureBlocks: [
      {
        label: 'VISIBILITY',
        heading: 'Every account, fully understood',
        description:
          'See every contact, every deal, every interaction tied to an account. No more piecing together the picture from scattered notes.',
        features: [
          { text: 'Complete account timeline' },
          { text: 'All contacts grouped by company' },
          { text: 'Deal history per account' },
          { text: 'Activity feed across the team' },
        ],
        ctaText: 'Start free trial',
        ctaHref: '/signup',
      },
      {
        label: 'HEALTH',
        heading: 'Catch at-risk accounts before they churn',
        description:
          'Health indicators flag accounts that need attention - stalled deals, dropping engagement, missing touchpoints.',
        features: [
          { text: 'Customizable health scoring' },
          { text: 'Alert rules for at-risk accounts' },
          { text: 'Engagement tracking per account' },
          { text: 'Automated check-in reminders' },
        ],
        ctaText: 'See it in action',
        ctaHref: '/demo',
      },
      {
        label: 'MAPPING',
        heading: 'Know who matters in every deal',
        description:
          'Map every stakeholder, decision maker, champion, and blocker. Never lose track of who you\'re selling to.',
        features: [
          { text: 'Stakeholder relationship mapping' },
          { text: 'Influence and authority tags' },
          { text: 'Champion identification' },
          { text: 'Org chart visualization' },
        ],
        ctaText: 'Read the docs',
        ctaHref: '/docs/accounts',
      },
      {
        label: 'EXPANSION',
        heading: 'Turn customers into bigger customers',
        description:
          'Identify upsell signals, surface expansion opportunities, and run quarterly business reviews from the account view.',
        features: [
          { text: 'Upsell opportunity tracking' },
          { text: 'QBR templates and reminders' },
          { text: 'Expansion playbook integration' },
          { text: 'Account-based reporting' },
        ],
        ctaText: 'Start free trial',
        ctaHref: '/signup',
      },
    ],
    comparisonLabel: 'WHY REVNATOR',
    comparisonHeading: 'Account intelligence, without the enterprise complexity',
    comparisonCards: [
      {
        title: 'Built for B2B reality',
        description:
          'Most CRMs treat contacts as the unit. We treat accounts as the unit, the way B2B sales actually works.',
      },
      {
        title: 'Stakeholder-aware',
        description:
          'Map every decision maker, champion, and blocker. Know who\'s on your side and who you need to win over.',
      },
      {
        title: 'Expansion-ready',
        description:
          'Customer accounts surface upsell signals automatically. Grow revenue without hunting for opportunities.',
      },
    ],
    comparisonStats: [
      { number: '10K+', label: 'accounts per workspace' },
      { number: 'Real-time', label: 'health scoring' },
      { number: 'Unlimited', label: 'stakeholders' },
    ],
    ctaHeading: 'Start managing accounts the right way',
    ctaSubheading:
      'Free for up to 3 users. No credit card required. Built for B2B sales teams.',
    ctaPrimaryText: 'Start free trial',
    ctaPrimaryHref: '/signup',
    ctaSecondaryText: 'Book a demo',
    ctaSecondaryHref: '/demo',
  },

  // ── MODULE 3: OUTREACH ──
  {
    name: 'Email Outreach',
    slug: 'outreach',
    badge: 'SEQUENCES',
    icon: 'Mail',
    order: 3,
    shortDescription:
      'Sequences and campaigns with personalization, tracking, and deliverability tools built in.',
    cardFeatures: [
      { text: 'Sequences & campaigns' },
      { text: 'Open/click tracking' },
      { text: 'Email warm-up' },
    ],
    heroHeading: 'Send emails that actually get replies',
    heroDescription:
      'Multi-step sequences with personalization, A/B testing, and automated follow-ups. Built-in deliverability tools so your emails land in the inbox, not spam.',
    heroPrimaryCtaText: 'Start free trial',
    heroPrimaryCtaHref: '/signup',
    heroSecondaryCtaText: 'See all features',
    heroSecondaryCtaHref: '#features',
    capabilities: [
      { icon: 'Mail', title: 'Multi-step sequences' },
      { icon: 'Send', title: 'One-off campaigns' },
      { icon: 'Activity', title: 'Open & click tracking' },
      { icon: 'Shield', title: 'Email warm-up' },
      { icon: 'SplitSquareHorizontal', title: 'A/B testing' },
    ],
    featureBlocks: [
      {
        label: 'SEQUENCES',
        heading: 'Multi-step outreach on autopilot',
        description:
          'Build cold email sequences with up to 10 steps, conditional logic, and smart scheduling. Set it once and let Revnator handle the follow-ups.',
        features: [
          { text: 'Up to 10-step sequences' },
          { text: 'Conditional branching based on opens and replies' },
          { text: 'Smart send times to maximize delivery' },
          { text: 'Pause sequences automatically when prospects reply' },
        ],
        ctaText: 'Start free trial',
        ctaHref: '/signup',
      },
      {
        label: 'PERSONALIZATION',
        heading: 'Personal at scale',
        description:
          'Use any contact field as a variable. Generate personalized emails for 1,000 prospects in seconds without losing the personal touch.',
        features: [
          { text: 'Variable engine with all custom fields' },
          { text: 'Spintax for natural variation' },
          { text: 'AI-assisted personalization snippets' },
          { text: 'Preview before sending' },
        ],
        ctaText: 'See it in action',
        ctaHref: '/demo',
      },
      {
        label: 'DELIVERABILITY',
        heading: 'Land in the inbox, every time',
        description:
          'Built-in email warm-up, domain authentication checks, and bounce protection. Your reputation stays clean.',
        features: [
          { text: 'Automated email warm-up' },
          { text: 'SPF, DKIM, DMARC monitoring' },
          { text: 'Bounce and complaint protection' },
          { text: 'Inbox placement reports' },
        ],
        ctaText: 'Read the docs',
        ctaHref: '/docs/outreach',
      },
      {
        label: 'ANALYTICS',
        heading: 'Know what\'s working',
        description:
          'Track every open, click, reply, and bounce. A/B test subject lines and email bodies to improve your numbers over time.',
        features: [
          { text: 'Real-time open and click tracking' },
          { text: 'Reply attribution per sequence' },
          { text: 'A/B testing for subject lines and bodies' },
          { text: 'Sequence performance reports' },
        ],
        ctaText: 'Start free trial',
        ctaHref: '/signup',
      },
    ],
    comparisonLabel: 'WHY REVNATOR',
    comparisonHeading: 'Outreach without the agency price tag',
    comparisonCards: [
      {
        title: 'Replaces Outreach.io and Mailchimp',
        description:
          'Get the power of dedicated outreach tools without the $100/user/month price tag.',
      },
      {
        title: 'Connected to your CRM',
        description:
          'Replies, opens, and clicks update your contacts automatically. No syncing, no exports.',
      },
      {
        title: 'Made for senders',
        description:
          'Built by people who hate bad sequences. Smart defaults that protect your reputation.',
      },
    ],
    comparisonStats: [
      { number: '5,000', label: 'emails per day' },
      { number: '47%', label: 'average reply rate' },
      { number: 'Built-in', label: 'warm-up' },
    ],
    ctaHeading: 'Start sending emails that get replies',
    ctaSubheading:
      'Free for up to 3 users. No credit card. Includes warm-up.',
    ctaPrimaryText: 'Start free trial',
    ctaPrimaryHref: '/signup',
    ctaSecondaryText: 'Book a demo',
    ctaSecondaryHref: '/demo',
  },

  // ── MODULE 4: PIPELINE ──
  {
    name: 'Pipeline & Deals',
    slug: 'pipeline',
    badge: 'PIPELINE',
    icon: 'GitBranch',
    order: 4,
    shortDescription:
      'Visual Kanban pipeline with deal tracking, stage progression, and revenue forecasting.',
    cardFeatures: [
      { text: 'Drag-and-drop Kanban' },
      { text: 'Forecasting dashboard' },
      { text: 'Pipeline reports' },
    ],
    heroHeading: 'See every deal. Miss nothing.',
    heroDescription:
      'Visual Kanban pipeline with deal tracking, stage progression, and revenue forecasting. Drag-and-drop simplicity for the closers, powerful reporting for the leaders.',
    heroPrimaryCtaText: 'Start free trial',
    heroPrimaryCtaHref: '/signup',
    heroSecondaryCtaText: 'See all features',
    heroSecondaryCtaHref: '#features',
    capabilities: [
      { icon: 'GitBranch', title: 'Visual Kanban' },
      { icon: 'ArrowRight', title: 'Stage progression' },
      { icon: 'TrendingUp', title: 'Forecasting' },
      { icon: 'BarChart3', title: 'Pipeline reports' },
      { icon: 'Layers', title: 'Multiple pipelines' },
    ],
    featureBlocks: [
      {
        label: 'VISUAL',
        heading: 'Pipeline you can actually see',
        description:
          'Drag-and-drop Kanban board. Move deals between stages with a single drag. See your entire pipeline at a glance.',
        features: [
          { text: 'Drag-and-drop deal management' },
          { text: 'Color-coded by deal value or stage' },
          { text: 'Custom stage configuration' },
          { text: 'Filter by owner, value, date' },
        ],
        ctaText: 'Start free trial',
        ctaHref: '/signup',
      },
      {
        label: 'FORECASTING',
        heading: 'Know your number before quarter end',
        description:
          'Weighted pipeline forecasting based on stage probability. Update your forecast in real time as deals move.',
        features: [
          { text: 'Weighted pipeline by stage' },
          { text: 'Quarter and month forecasting' },
          { text: 'Best case, commit, worst case views' },
          { text: 'Rep-level and team-level rollups' },
        ],
        ctaText: 'See it in action',
        ctaHref: '/demo',
      },
      {
        label: 'DEAL DETAIL',
        heading: 'Every deal, every detail',
        description:
          'Click any deal for a full timeline - emails sent, meetings booked, notes, next steps, stakeholders. Everything in one place.',
        features: [
          { text: 'Full deal timeline with activities' },
          { text: 'Stakeholder mapping per deal' },
          { text: 'Notes and tasks tied to the deal' },
          { text: 'Stage progress visualization' },
        ],
        ctaText: 'Read the docs',
        ctaHref: '/docs/pipeline',
      },
      {
        label: 'REPORTS',
        heading: 'Reports that actually help',
        description:
          'Win rates, sales cycle length, stage conversion, rep performance. Pipeline reports that surface what matters.',
        features: [
          { text: 'Win rate by stage and rep' },
          { text: 'Sales cycle length analysis' },
          { text: 'Stage conversion funnels' },
          { text: 'Custom date range reports' },
        ],
        ctaText: 'Start free trial',
        ctaHref: '/signup',
      },
    ],
    comparisonLabel: 'WHY REVNATOR',
    comparisonHeading: 'Pipeline management built for closers',
    comparisonCards: [
      {
        title: 'Visual by default',
        description:
          'Most CRMs hide your pipeline behind reports. Revnator puts it front and center.',
      },
      {
        title: 'Forecasting that matters',
        description:
          'Real weighted forecasting, not just spreadsheet exports. Always know where you stand.',
      },
      {
        title: 'Built for speed',
        description:
          'Update deals in seconds. Drag-and-drop. Inline edits. No 5-step modals.',
      },
    ],
    comparisonStats: [
      { number: 'Unlimited', label: 'pipelines' },
      { number: 'Real-time', label: 'forecasts' },
      { number: '1 click', label: 'stage updates' },
    ],
    ctaHeading: 'See your pipeline like never before',
    ctaSubheading:
      'Free for up to 3 users. Visual deal management. No credit card.',
    ctaPrimaryText: 'Start free trial',
    ctaPrimaryHref: '/signup',
    ctaSecondaryText: 'Book a demo',
    ctaSecondaryHref: '/demo',
  },

  // ── MODULE 5: SALES-OPS ──
  {
    name: 'Sales Operations',
    slug: 'sales-ops',
    badge: 'OPS',
    icon: 'LayoutDashboard',
    order: 5,
    shortDescription:
      'Your daily command center. Tasks, missions, team coordination, and productivity tracking.',
    cardFeatures: [
      { text: 'Task management' },
      { text: 'Mission templates' },
      { text: 'Team workspace' },
    ],
    heroHeading: 'Your daily command center for selling',
    heroDescription:
      'Tasks, missions, calendar, and team coordination - all in one workspace. Stop juggling Asana, Google Calendar, and Slack. Run your day from Revnator.',
    heroPrimaryCtaText: 'Start free trial',
    heroPrimaryCtaHref: '/signup',
    heroSecondaryCtaText: 'See all features',
    heroSecondaryCtaHref: '#features',
    capabilities: [
      { icon: 'CheckSquare', title: 'Task management' },
      { icon: 'Target', title: 'Mission templates' },
      { icon: 'Users', title: 'Team workspace' },
      { icon: 'Activity', title: 'Productivity tracking' },
      { icon: 'Bell', title: 'Smart notifications' },
    ],
    featureBlocks: [
      {
        label: 'TASKS',
        heading: 'Every task in one place',
        description:
          'Tasks linked to contacts, deals, and accounts. Daily, weekly, and project views. Never miss a follow-up again.',
        features: [
          { text: 'Tasks tied to contacts and deals' },
          { text: 'Daily, weekly, project views' },
          { text: 'Recurring tasks' },
          { text: 'Team task assignment' },
        ],
        ctaText: 'Start free trial',
        ctaHref: '/signup',
      },
      {
        label: 'MISSIONS',
        heading: 'Templated workflows that scale',
        description:
          'Pre-built mission templates for common sales workflows. New hire onboarding, account expansion, win-back campaigns - all systematized.',
        features: [
          { text: 'Pre-built mission templates' },
          { text: 'Custom workflow builder' },
          { text: 'Progress tracking across team' },
          { text: 'Mission analytics' },
        ],
        ctaText: 'See it in action',
        ctaHref: '/demo',
      },
      {
        label: 'WORKSPACE',
        heading: 'One workspace for the whole team',
        description:
          'Real-time team coordination. See what your team is working on, where they need help, and how the day is shaping up.',
        features: [
          { text: 'Live team activity feed' },
          { text: 'Daily standups built in' },
          { text: 'Workload balancing' },
          { text: 'Manager dashboard' },
        ],
        ctaText: 'Read the docs',
        ctaHref: '/docs/sales-ops',
      },
      {
        label: 'PRODUCTIVITY',
        heading: 'Measure what matters',
        description:
          'Activity tracking that helps reps work smarter, not harder. Manager dashboards that surface what to coach on.',
        features: [
          { text: 'Activity scoring per rep' },
          { text: 'Time-on-task analytics' },
          { text: 'Productivity benchmarks' },
          { text: 'Coaching recommendations' },
        ],
        ctaText: 'Start free trial',
        ctaHref: '/signup',
      },
    ],
    comparisonLabel: 'WHY REVNATOR',
    comparisonHeading: 'Sales ops without the SaaS sprawl',
    comparisonCards: [
      {
        title: 'Replaces 4 tools',
        description:
          'Asana, Google Calendar, Slack, and your spreadsheet ops dashboard. All in one place.',
      },
      {
        title: 'Built for sales work',
        description:
          'Generic productivity tools don\'t understand sales. Revnator\'s workflows match how reps actually sell.',
      },
      {
        title: 'Manager-friendly',
        description:
          'Visibility without micromanagement. See team progress without slowing them down.',
      },
    ],
    comparisonStats: [
      { number: '4 tools', label: 'replaced' },
      { number: 'Built-in', label: 'templates' },
      { number: 'Real-time', label: 'coordination' },
    ],
    ctaHeading: 'Take control of your sales operations',
    ctaSubheading:
      'Free for up to 3 users. No credit card required. One unified workspace.',
    ctaPrimaryText: 'Start free trial',
    ctaPrimaryHref: '/signup',
    ctaSecondaryText: 'Book a demo',
    ctaSecondaryHref: '/demo',
  },

  // ── MODULE 6: CALENDAR ──
  {
    name: 'Calendar & Scheduling',
    slug: 'calendar',
    badge: 'SCHEDULING',
    icon: 'Calendar',
    order: 6,
    shortDescription:
      'Full calendar with Calendly-style booking pages and timezone detection.',
    cardFeatures: [
      { text: 'Booking pages at /book/slug' },
      { text: 'Multi-view calendar' },
      { text: 'Timezone detection' },
    ],
    heroHeading: 'Book meetings without the back-and-forth',
    heroDescription:
      'Full calendar with Calendly-style booking pages. Share your link, let prospects book directly into your schedule. No more "what times work for you?" emails.',
    heroPrimaryCtaText: 'Start free trial',
    heroPrimaryCtaHref: '/signup',
    heroSecondaryCtaText: 'See all features',
    heroSecondaryCtaHref: '#features',
    capabilities: [
      { icon: 'Calendar', title: 'Multi-view calendar' },
      { icon: 'Link', title: 'Booking pages' },
      { icon: 'Globe', title: 'Timezone detection' },
      { icon: 'Clock', title: 'Buffer times' },
      { icon: 'Bell', title: 'Smart reminders' },
    ],
    featureBlocks: [
      {
        label: 'BOOKING',
        heading: 'Your personal booking page',
        description:
          'Get a custom URL like revnator.com/book/your-name. Share it in your email signature, on LinkedIn, anywhere.',
        features: [
          { text: 'Personal booking URL' },
          { text: 'Multiple meeting types' },
          { text: 'Customizable availability' },
          { text: 'Branded booking page' },
        ],
        ctaText: 'Start free trial',
        ctaHref: '/signup',
      },
      {
        label: 'CALENDAR',
        heading: 'See your week, your month, your day',
        description:
          'Daily, weekly, and monthly calendar views. All your meetings, tasks, and deadlines in one place.',
        features: [
          { text: 'Day, week, month views' },
          { text: 'Color-coded by event type' },
          { text: 'Drag-and-drop rescheduling' },
          { text: 'Multiple calendar overlays' },
        ],
        ctaText: 'See it in action',
        ctaHref: '/demo',
      },
      {
        label: 'TIMEZONES',
        heading: 'Global teams, local times',
        description:
          'Automatic timezone detection for prospects. Booking pages show times in the visitor\'s local timezone, not yours.',
        features: [
          { text: 'Automatic timezone detection' },
          { text: 'Daylight saving handling' },
          { text: 'Per-user timezone preferences' },
          { text: 'Meeting confirmations in local time' },
        ],
        ctaText: 'Read the docs',
        ctaHref: '/docs/calendar',
      },
      {
        label: 'INTEGRATION',
        heading: 'Connected to everything',
        description:
          'Meetings tied to deals, tasks tied to meetings, follow-ups tied to attendees. The calendar is part of your sales workflow.',
        features: [
          { text: 'Meetings linked to deals and contacts' },
          { text: 'Auto-create follow-up tasks' },
          { text: 'Activity timeline updates' },
          { text: 'Two-way sync with Google/Outlook' },
        ],
        ctaText: 'Start free trial',
        ctaHref: '/signup',
      },
    ],
    comparisonLabel: 'WHY REVNATOR',
    comparisonHeading: 'Booking pages, without the third-party tax',
    comparisonCards: [
      {
        title: 'Replaces Calendly',
        description:
          'Stop paying $15/user for a separate booking tool. It\'s built into Revnator.',
      },
      {
        title: 'Tied to your CRM',
        description:
          'Bookings auto-create contacts and deals. No data entry, no copy-paste.',
      },
      {
        title: 'Branded by default',
        description:
          'Your booking page looks like you, not like everyone else\'s Calendly.',
      },
    ],
    comparisonStats: [
      { number: 'Unlimited', label: 'booking pages' },
      { number: '100%', label: 'customizable' },
      { number: 'Auto', label: 'timezone detection' },
    ],
    ctaHeading: 'Stop the meeting back-and-forth',
    ctaSubheading:
      'Free for up to 3 users. No credit card. Booking pages included.',
    ctaPrimaryText: 'Start free trial',
    ctaPrimaryHref: '/signup',
    ctaSecondaryText: 'Book a demo',
    ctaSecondaryHref: '/demo',
  },

  // ── MODULE 7: CHAT ──
  {
    name: 'Internal Communication',
    slug: 'chat',
    badge: 'CHAT',
    icon: 'MessageCircle',
    order: 7,
    shortDescription:
      'Real-time team chat built into your sales workspace. No more switching to Slack.',
    cardFeatures: [
      { text: 'Real-time messaging' },
      { text: 'Channels' },
      { text: '@mentions' },
    ],
    heroHeading: 'Keep your sales team in sync, instantly',
    heroDescription:
      'Real-time team chat built into your sales workspace. Channels for deals, accounts, and projects. No more switching to Slack for quick questions.',
    heroPrimaryCtaText: 'Start free trial',
    heroPrimaryCtaHref: '/signup',
    heroSecondaryCtaText: 'See all features',
    heroSecondaryCtaHref: '#features',
    capabilities: [
      { icon: 'MessageCircle', title: 'Real-time chat' },
      { icon: 'Hash', title: 'Channels' },
      { icon: 'AtSign', title: '@mentions' },
      { icon: 'Bell', title: 'Notifications' },
      { icon: 'Search', title: 'Message search' },
    ],
    featureBlocks: [
      {
        label: 'REAL-TIME',
        heading: 'Instant messaging, instant answers',
        description:
          'Real-time chat powered by websockets. No refresh, no delay. See messages the moment they\'re sent.',
        features: [
          { text: 'Real-time message delivery' },
          { text: 'Typing indicators' },
          { text: 'Read receipts' },
          { text: 'Message reactions' },
        ],
        ctaText: 'Start free trial',
        ctaHref: '/signup',
      },
      {
        label: 'CHANNELS',
        heading: 'Conversations organized by topic',
        description:
          'Channels for deals, accounts, projects, or anything your team needs to discuss. Public, private, or DM.',
        features: [
          { text: 'Public and private channels' },
          { text: 'Direct messages' },
          { text: 'Channel-per-deal automation' },
          { text: 'Channel pinning and bookmarks' },
        ],
        ctaText: 'See it in action',
        ctaHref: '/demo',
      },
      {
        label: 'CONTEXT',
        heading: 'Chat that knows your work',
        description:
          'Mention any contact, deal, or task inline. The chat understands your sales context, not just generic messages.',
        features: [
          { text: 'Mention contacts, deals, tasks inline' },
          { text: 'Auto-link to relevant records' },
          { text: 'Smart channel suggestions' },
          { text: 'Context preview on hover' },
        ],
        ctaText: 'Read the docs',
        ctaHref: '/docs/chat',
      },
      {
        label: 'SEARCH',
        heading: 'Never lose a conversation',
        description:
          'Full-text search across all channels and DMs. Find that message from 3 weeks ago in seconds.',
        features: [
          { text: 'Full-text message search' },
          { text: 'Filter by channel, user, date' },
          { text: 'Search within attachments' },
          { text: 'Saved searches' },
        ],
        ctaText: 'Start free trial',
        ctaHref: '/signup',
      },
    ],
    comparisonLabel: 'WHY REVNATOR',
    comparisonHeading: 'Internal chat, without leaving your sales workspace',
    comparisonCards: [
      {
        title: 'Replaces internal Slack',
        description:
          'Stop tab-switching to Slack for sales questions. The chat is right next to your pipeline.',
      },
      {
        title: 'Sales-aware',
        description:
          'Mention deals, contacts, and tasks inline. Generic chat tools can\'t do that.',
      },
      {
        title: 'Free for your team',
        description:
          'No per-seat pricing. Included in every Revnator plan, including Free.',
      },
    ],
    comparisonStats: [
      { number: 'Real-time', label: 'messaging' },
      { number: 'Unlimited', label: 'channels' },
      { number: 'Free', label: 'for all plans' },
    ],
    ctaHeading: 'Bring your team chat into your sales workspace',
    ctaSubheading:
      'Free for up to 3 users. Real-time messaging included.',
    ctaPrimaryText: 'Start free trial',
    ctaPrimaryHref: '/signup',
    ctaSecondaryText: 'Book a demo',
    ctaSecondaryHref: '/demo',
  },

  // ── MODULE 8: AI-SDR ──
  {
    name: 'AI SDR',
    slug: 'ai-sdr',
    badge: 'AI',
    icon: 'Sparkles',
    order: 8,
    shortDescription:
      'AI teammate that handles research, email drafting, and next-step suggestions automatically.',
    cardFeatures: [
      { text: 'AI email personalization' },
      { text: 'Account research' },
      { text: 'Smart suggestions' },
    ],
    heroHeading: 'Your AI teammate that never sleeps',
    heroDescription:
      'AI-powered email drafting, account research, and next-step suggestions. Your reps focus on selling. Revnator\'s AI handles the grunt work.',
    heroPrimaryCtaText: 'Start free trial',
    heroPrimaryCtaHref: '/signup',
    heroSecondaryCtaText: 'See all features',
    heroSecondaryCtaHref: '#features',
    capabilities: [
      { icon: 'Sparkles', title: 'AI email drafting' },
      { icon: 'Search', title: 'Account research' },
      { icon: 'Lightbulb', title: 'Next-step suggestions' },
      { icon: 'Zap', title: 'Auto-personalization' },
      { icon: 'Brain', title: 'Smart insights' },
    ],
    featureBlocks: [
      {
        label: 'EMAIL AI',
        heading: 'Personalized emails in seconds',
        description:
          'AI generates personalized first lines, hook sentences, and full email drafts based on your prospect\'s profile and recent activity.',
        features: [
          { text: 'AI-generated personalized openers' },
          { text: 'Full email draft from a brief' },
          { text: 'Tone matching to your style' },
          { text: 'One-click rewrite suggestions' },
        ],
        ctaText: 'Start free trial',
        ctaHref: '/signup',
      },
      {
        label: 'RESEARCH',
        heading: 'Account research, automated',
        description:
          'Point Revnator\'s AI at any account. It pulls news, funding rounds, leadership changes, and tech stack. Hours of research in seconds.',
        features: [
          { text: 'Automatic company news monitoring' },
          { text: 'Funding and growth signals' },
          { text: 'Leadership change alerts' },
          { text: 'Tech stack detection' },
        ],
        ctaText: 'See it in action',
        ctaHref: '/demo',
      },
      {
        label: 'SUGGESTIONS',
        heading: 'Know what to do next, always',
        description:
          'AI-powered next-step suggestions for every contact and deal. Stop guessing what to do. Revnator tells you.',
        features: [
          { text: 'Next-best-action suggestions' },
          { text: 'Optimal send time recommendations' },
          { text: 'Stage progression nudges' },
          { text: 'Stalled deal alerts' },
        ],
        ctaText: 'Read the docs',
        ctaHref: '/docs/ai-sdr',
      },
      {
        label: 'INSIGHTS',
        heading: 'Smart insights from your data',
        description:
          'AI surfaces patterns in your sales data. Which sequences convert. Which subject lines work. Which deals are at risk.',
        features: [
          { text: 'Sequence performance insights' },
          { text: 'Subject line optimization' },
          { text: 'At-risk deal flagging' },
          { text: 'Win/loss pattern analysis' },
        ],
        ctaText: 'Start free trial',
        ctaHref: '/signup',
      },
    ],
    comparisonLabel: 'WHY REVNATOR',
    comparisonHeading: 'AI that helps reps sell, not replace them',
    comparisonCards: [
      {
        title: 'Built for reps',
        description:
          'AI features designed for the daily work of a salesperson, not for marketing teams.',
      },
      {
        title: 'Privacy-first',
        description:
          'Your data isn\'t used to train models. Your prospects\' data stays your data.',
      },
      {
        title: 'Pro plan only',
        description:
          'AI features are part of Revnator Pro - no separate SaaS, no extra subscription.',
      },
    ],
    comparisonStats: [
      { number: '10x', label: 'faster outreach' },
      { number: 'Hours saved', label: 'per week' },
      { number: 'GPT-4', label: 'powered' },
    ],
    ctaHeading: 'Add an AI teammate to your sales floor',
    ctaSubheading:
      'Free trial of all AI features in Pro plan. No credit card.',
    ctaPrimaryText: 'Start free trial',
    ctaPrimaryHref: '/signup',
    ctaSecondaryText: 'Book a demo',
    ctaSecondaryHref: '/demo',
  },

  // ── MODULE 9: FORMS ──
  {
    name: 'Integrated Forms',
    slug: 'forms',
    badge: 'FORMS',
    icon: 'FileText',
    order: 9,
    shortDescription:
      'Capture leads from anywhere. Drag-and-drop builder with API embed and auto-routing.',
    cardFeatures: [
      { text: 'Drag-and-drop builder' },
      { text: 'API embed' },
      { text: 'Auto-routing to lists' },
    ],
    heroHeading: 'Capture leads anywhere, route them everywhere',
    heroDescription:
      'Build forms in Revnator, embed them on your website, and watch leads flow directly into your contact lists. Drag-and-drop builder, no code needed.',
    heroPrimaryCtaText: 'Start free trial',
    heroPrimaryCtaHref: '/signup',
    heroSecondaryCtaText: 'See all features',
    heroSecondaryCtaHref: '#features',
    capabilities: [
      { icon: 'FileText', title: 'Drag-and-drop builder' },
      { icon: 'Code', title: 'API embed' },
      { icon: 'ArrowRight', title: 'Auto-routing' },
      { icon: 'Zap', title: 'Webhook triggers' },
      { icon: 'Shield', title: 'Spam protection' },
    ],
    featureBlocks: [
      {
        label: 'BUILDER',
        heading: 'Build forms in minutes, no code',
        description:
          'Drag-and-drop form builder with all the fields you need: text, email, dropdowns, checkboxes, file uploads, and conditional logic.',
        features: [
          { text: 'Drag-and-drop field builder' },
          { text: 'All standard field types' },
          { text: 'Conditional logic and branching' },
          { text: 'Multi-page forms' },
        ],
        ctaText: 'Start free trial',
        ctaHref: '/signup',
      },
      {
        label: 'EMBED',
        heading: 'Embed anywhere, instantly',
        description:
          'Get an iframe snippet, a JavaScript widget, or a hosted form URL. Paste it into your website, your blog, your landing page.',
        features: [
          { text: 'Iframe and JS widget embeds' },
          { text: 'Hosted form URLs' },
          { text: 'Customizable styling to match your brand' },
          { text: 'Mobile-responsive by default' },
        ],
        ctaText: 'See it in action',
        ctaHref: '/demo',
      },
      {
        label: 'ROUTING',
        heading: 'Leads flow to the right place',
        description:
          'Form submissions automatically create contacts, add them to lists, trigger sequences, or assign to reps. Set the rules once.',
        features: [
          { text: 'Auto-create contacts on submit' },
          { text: 'Add to specific lists by form' },
          { text: 'Trigger sequences automatically' },
          { text: 'Rep assignment rules' },
        ],
        ctaText: 'Read the docs',
        ctaHref: '/docs/forms',
      },
      {
        label: 'PROTECTION',
        heading: 'Spam-proof from day one',
        description:
          'Built-in honeypots, rate limiting, and reCAPTCHA. Stop bots from polluting your CRM without annoying real users.',
        features: [
          { text: 'Honeypot fields' },
          { text: 'Rate limiting per IP' },
          { text: 'Optional reCAPTCHA' },
          { text: 'Custom validation rules' },
        ],
        ctaText: 'Start free trial',
        ctaHref: '/signup',
      },
    ],
    comparisonLabel: 'WHY REVNATOR',
    comparisonHeading: 'Lead capture without the third-party tools',
    comparisonCards: [
      {
        title: 'Replaces Typeform & Jotform',
        description:
          'Stop paying for separate form tools. Forms are part of your CRM.',
      },
      {
        title: 'Auto-flowing',
        description:
          'Submissions become contacts, contacts join lists, lists trigger sequences. Zero glue needed.',
      },
      {
        title: 'Free to build',
        description:
          'Unlimited forms in every Revnator plan, including Free.',
      },
    ],
    comparisonStats: [
      { number: 'Unlimited', label: 'forms' },
      { number: '5 ways', label: 'to embed' },
      { number: 'Auto', label: 'spam protection' },
    ],
    ctaHeading: 'Capture leads from anywhere on the web',
    ctaSubheading:
      'Free for up to 3 users. Unlimited forms. Built into your CRM.',
    ctaPrimaryText: 'Start free trial',
    ctaPrimaryHref: '/signup',
    ctaSecondaryText: 'Book a demo',
    ctaSecondaryHref: '/demo',
  },
]

const relations: RelationMap = {
  contacts: ['outreach', 'pipeline', 'sales-ops'],
  accounts: ['contacts', 'pipeline', 'sales-ops'],
  outreach: ['contacts', 'pipeline', 'ai-sdr'],
  pipeline: ['contacts', 'accounts', 'sales-ops'],
  'sales-ops': ['pipeline', 'calendar', 'chat'],
  calendar: ['sales-ops', 'contacts', 'pipeline'],
  chat: ['sales-ops', 'contacts', 'pipeline'],
  'ai-sdr': ['outreach', 'contacts', 'accounts'],
  forms: ['contacts', 'outreach', 'sales-ops'],
}

async function seed(): Promise<void> {
  const configPath = path.resolve(dirname, '../../payload.config.ts')
  const configUrl = new URL(`file:///${configPath.replace(/\\/g, '/')}`)

  const payload = await getPayload({
    config: (await import(configUrl.href)).default,
  })

  console.log('Seeding all 9 modules...\n')

  // Check for existing modules
  const existing = await payload.find({
    collection: 'modules',
    limit: 100,
  })
  const existingSlugs = new Set(existing.docs.map((d) => d.slug))

  // Pass 1: Create modules (without relatedModules)
  const createdModules: Record<string, number> = {}

  for (const mod of modules) {
    if (existingSlugs.has(mod.slug)) {
      console.log(`  SKIP  "${mod.name}" (slug "${mod.slug}" already exists)`)
      const existingDoc = existing.docs.find((d) => d.slug === mod.slug)
      if (existingDoc) {
        createdModules[mod.slug] = existingDoc.id
      }
      continue
    }

    const doc = await payload.create({
      collection: 'modules',
      data: {
        ...mod,
        isPublished: true,
      },
    })
    createdModules[mod.slug] = doc.id
    console.log(`  CREATE "${mod.name}" (id: ${doc.id})`)
  }

  // Pass 2: Wire up relatedModules
  console.log('\nWiring related modules...\n')

  for (const [slug, relatedSlugs] of Object.entries(relations)) {
    const moduleId = createdModules[slug]
    if (!moduleId) continue

    const relatedModules = relatedSlugs
      .map((rs) => createdModules[rs])
      .filter(Boolean)
      .map((id) => ({ module: id }))

    if (relatedModules.length > 0) {
      await payload.update({
        collection: 'modules',
        id: moduleId,
        data: { relatedModules },
      })
      console.log(
        `  LINK   "${slug}" → [${relatedSlugs.join(', ')}]`,
      )
    }
  }

  console.log('\nDone! All 9 modules seeded with related modules linked.')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
