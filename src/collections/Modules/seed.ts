/**
 * One-time seed script for the Modules collection.
 *
 * Run from project root:
 *   npx tsx src/collections/Modules/seed.ts
 *
 * Requires DATABASE_URI and PAYLOAD_SECRET in .env.local
 */
import 'dotenv/config'
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
  capabilities: { icon: ModuleIcon; title: string }[]
  featureBlocks: {
    label: string
    heading: string
    description: string
    features: { text: string }[]
    ctaText: string
    ctaHref: string
  }[]
  comparisonHeading: string
  comparisonCards: { title: string; description: string }[]
  comparisonStats: { number: string; label: string }[]
  ctaHeading: string
  ctaSubheading: string
}

const modules: ModuleSeed[] = [
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
    heroHeading: 'Contact Lifecycle Management',
    heroDescription:
      'Capture, enrich, and manage every contact in one place. Track lifecycle stages, build dynamic lists, and keep your team aligned on every relationship.',
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
        ctaText: 'Start free trial →',
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
        ctaText: 'See it in action →',
        ctaHref: '/demo',
      },
      {
        label: 'CUSTOMIZE',
        heading: 'Your CRM, your fields, your rules',
        description:
          'Add unlimited custom fields to capture the data that matters to your business. Text, numbers, dates, dropdowns — whatever you need.',
        features: [
          { text: 'Unlimited custom field types' },
          { text: 'Variable engine for email personalization' },
          { text: 'Field-level permissions per team role' },
          { text: 'Drag-and-drop field ordering' },
        ],
        ctaText: 'Read the docs →',
        ctaHref: '/docs/contacts',
      },
      {
        label: 'TRACK',
        heading: 'Know exactly where every contact stands',
        description:
          'Track contacts through your sales lifecycle — from new lead to qualified to customer. Automate stage transitions based on engagement.',
        features: [
          { text: 'Customizable lifecycle stages' },
          { text: 'Automatic stage progression rules' },
          { text: 'Stage-based reporting and analytics' },
          { text: 'Visual lifecycle funnel dashboard' },
        ],
        ctaText: 'Start free trial →',
        ctaHref: '/signup',
      },
    ],
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
  },
  {
    name: 'Account Management',
    slug: 'accounts',
    badge: 'ACCOUNTS',
    icon: 'Building2',
    order: 2,
    shortDescription:
      'See the full picture for every company. Health scores, stakeholder mapping, and account timelines.',
    cardFeatures: [
      { text: '360° account view' },
      { text: 'Health indicators' },
      { text: 'Contact grouping' },
    ],
    heroHeading: 'Account Management',
    heroDescription:
      'Get a 360° view of every account. Track health scores, map stakeholders, and see the full timeline of interactions across your team.',
    capabilities: [
      { icon: 'Building2', title: 'Account profiles' },
      { icon: 'Users', title: 'Stakeholder mapping' },
      { icon: 'TrendingUp', title: 'Health scoring' },
      { icon: 'Layers', title: 'Custom fields' },
      { icon: 'BarChart3', title: 'Account analytics' },
    ],
    featureBlocks: [
      {
        label: 'ORGANIZE',
        heading: 'Every account, fully mapped',
        description:
          'Link contacts to companies automatically. See every deal, email, and meeting in one unified account timeline.',
        features: [
          { text: 'Auto-link contacts to accounts' },
          { text: 'Unified account timeline' },
          { text: 'Custom account fields' },
          { text: 'Hierarchical account structures' },
        ],
        ctaText: 'Start free trial →',
        ctaHref: '/signup',
      },
      {
        label: 'TRACK',
        heading: 'Know the health of every account',
        description:
          'Automated health scores based on engagement, deal progress, and activity recency. Spot at-risk accounts before they churn.',
        features: [
          { text: 'Configurable health score formula' },
          { text: 'At-risk account alerts' },
          { text: 'Engagement trend tracking' },
          { text: 'Account segmentation by health' },
        ],
        ctaText: 'See it in action →',
        ctaHref: '/demo',
      },
    ],
    comparisonHeading: 'Account intelligence that actually helps you sell.',
    comparisonCards: [
      {
        title: 'Beyond basic CRM',
        description:
          'Most CRMs stop at contact records. Revnator gives you true account-level intelligence with health scores and engagement tracking.',
      },
      {
        title: 'No data silos',
        description:
          'Emails, deals, meetings, and notes — all visible in one account view. No switching between tools.',
      },
      {
        title: 'Team alignment',
        description:
          'Everyone on the team sees the same account picture. No more "who talked to them last?" confusion.',
      },
    ],
    comparisonStats: [
      { number: '360°', label: 'account view' },
      { number: '5 min', label: 'setup time' },
      { number: '100%', label: 'self-serve' },
    ],
    ctaHeading: 'Start managing your accounts today',
    ctaSubheading:
      'Free for up to 3 users. No credit card required. Set up in under 5 minutes.',
  },
  {
    name: 'Email Outreach',
    slug: 'outreach',
    badge: 'OUTREACH',
    icon: 'Mail',
    order: 3,
    shortDescription:
      'Send campaigns and multi-step sequences with personalization, tracking, and deliverability tools built in.',
    cardFeatures: [
      { text: 'Sequences & campaigns' },
      { text: 'Open/click tracking' },
      { text: 'SendGrid integration' },
    ],
    heroHeading: 'Email Outreach',
    heroDescription:
      'Send personalized campaigns and multi-step sequences at scale. Track opens, clicks, and replies with built-in deliverability tools.',
    capabilities: [
      { icon: 'Mail', title: 'Email sequences' },
      { icon: 'Zap', title: 'Automation rules' },
      { icon: 'BarChart3', title: 'Open/click tracking' },
      { icon: 'Target', title: 'Personalization' },
      { icon: 'Filter', title: 'Smart sending' },
    ],
    featureBlocks: [
      {
        label: 'SEND',
        heading: 'Multi-step sequences that convert',
        description:
          'Build automated email sequences with delays, conditions, and follow-ups. Personalize every message with contact variables.',
        features: [
          { text: 'Drag-and-drop sequence builder' },
          { text: 'Conditional branching logic' },
          { text: 'Variable personalization engine' },
          { text: 'A/B testing for subject lines' },
        ],
        ctaText: 'Start free trial →',
        ctaHref: '/signup',
      },
      {
        label: 'TRACK',
        heading: 'Know exactly what\'s working',
        description:
          'Real-time tracking for opens, clicks, replies, and bounces. Per-email and per-sequence analytics to optimize your outreach.',
        features: [
          { text: 'Open and click tracking' },
          { text: 'Reply detection' },
          { text: 'Bounce management' },
          { text: 'Sequence performance dashboards' },
        ],
        ctaText: 'See it in action →',
        ctaHref: '/demo',
      },
    ],
    comparisonHeading: 'Outreach built for salespeople, not marketers.',
    comparisonCards: [
      {
        title: 'Not a marketing tool',
        description:
          'Built for 1:1 sales outreach, not mass newsletters. Every email feels personal because it is.',
      },
      {
        title: 'No external tools',
        description:
          'Sequences, tracking, and deliverability — all built in. No Mailchimp or Outreach.io subscription needed.',
      },
      {
        title: 'Connected to your CRM',
        description:
          'Emails link to contacts, accounts, and deals automatically. Full context on every conversation.',
      },
    ],
    comparisonStats: [
      { number: '10x', label: 'faster than manual' },
      { number: '98%', label: 'deliverability' },
      { number: '0', label: 'external tools' },
    ],
    ctaHeading: 'Start your first sequence today',
    ctaSubheading:
      'Free for up to 3 users. No credit card required. Set up in under 5 minutes.',
  },
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
    heroHeading: 'Pipeline & Deals',
    heroDescription:
      'Visual Kanban pipeline for deal management. Track every deal from first meeting to closed-won with stage automation and revenue forecasting.',
    capabilities: [
      { icon: 'GitBranch', title: 'Deal pipeline' },
      { icon: 'LayoutDashboard', title: 'Kanban board' },
      { icon: 'BarChart3', title: 'Forecasting' },
      { icon: 'Target', title: 'Win/loss tracking' },
      { icon: 'Zap', title: 'Stage automation' },
    ],
    featureBlocks: [
      {
        label: 'MANAGE',
        heading: 'Your deals, visually organized',
        description:
          'Drag-and-drop Kanban board with customizable stages. See your entire pipeline at a glance and move deals forward with a click.',
        features: [
          { text: 'Drag-and-drop Kanban board' },
          { text: 'Customizable pipeline stages' },
          { text: 'Deal value and probability tracking' },
          { text: 'Multi-pipeline support' },
        ],
        ctaText: 'Start free trial →',
        ctaHref: '/signup',
      },
      {
        label: 'FORECAST',
        heading: 'Predict revenue with confidence',
        description:
          'Weighted pipeline forecasting with historical accuracy tracking. Know what\'s closing this month and what needs attention.',
        features: [
          { text: 'Weighted revenue forecasts' },
          { text: 'Stage conversion analytics' },
          { text: 'Win/loss analysis' },
          { text: 'Monthly and quarterly views' },
        ],
        ctaText: 'See it in action →',
        ctaHref: '/demo',
      },
    ],
    comparisonHeading: 'A pipeline that works the way you sell.',
    comparisonCards: [
      {
        title: 'Visual first',
        description:
          'See your entire pipeline in one Kanban view. No drilling through menus to find your deals.',
      },
      {
        title: 'Connected data',
        description:
          'Every deal links to contacts, accounts, emails, and meetings. Full context without switching tools.',
      },
      {
        title: 'Smart automation',
        description:
          'Deals move through stages automatically based on activity. Less admin, more selling.',
      },
    ],
    comparisonStats: [
      { number: '2x', label: 'faster deal updates' },
      { number: '100%', label: 'pipeline visibility' },
      { number: '0', label: 'data entry' },
    ],
    ctaHeading: 'Start closing more deals today',
    ctaSubheading:
      'Free for up to 3 users. No credit card required. Set up in under 5 minutes.',
  },
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
    heroHeading: 'Sales Operations',
    heroDescription:
      'Your daily command center for tasks, missions, and team coordination. Keep everyone aligned and productive without the overhead.',
    capabilities: [
      { icon: 'LayoutDashboard', title: 'Command center' },
      { icon: 'Target', title: 'Task management' },
      { icon: 'Users', title: 'Team workspace' },
      { icon: 'Zap', title: 'Mission templates' },
      { icon: 'BarChart3', title: 'Productivity analytics' },
    ],
    featureBlocks: [
      {
        label: 'ORGANIZE',
        heading: 'Tasks and missions, not chaos',
        description:
          'Create tasks, assign them to team members, and track completion. Group related tasks into missions for complex workflows.',
        features: [
          { text: 'Task creation and assignment' },
          { text: 'Mission templates for repeatable workflows' },
          { text: 'Due dates and priority levels' },
          { text: 'Team workload visibility' },
        ],
        ctaText: 'Start free trial →',
        ctaHref: '/signup',
      },
      {
        label: 'TRACK',
        heading: 'Know what everyone is working on',
        description:
          'Real-time team activity feeds, productivity dashboards, and completion tracking. Manage without micromanaging.',
        features: [
          { text: 'Team activity feed' },
          { text: 'Productivity dashboards' },
          { text: 'Completion rate tracking' },
          { text: 'Bottleneck identification' },
        ],
        ctaText: 'See it in action →',
        ctaHref: '/demo',
      },
    ],
    comparisonHeading: 'Sales ops without the spreadsheet juggling.',
    comparisonCards: [
      {
        title: 'Built for sales',
        description:
          'Not a generic project management tool. Tasks and missions designed for sales workflows.',
      },
      {
        title: 'Zero context switching',
        description:
          'Tasks live alongside contacts, deals, and emails. Everything connected in one workspace.',
      },
      {
        title: 'Lightweight ops',
        description:
          'For lean teams that need structure without bureaucracy. Set up in minutes, not weeks.',
      },
    ],
    comparisonStats: [
      { number: '3x', label: 'faster coordination' },
      { number: '100%', label: 'team visibility' },
      { number: '0', label: 'spreadsheets needed' },
    ],
    ctaHeading: 'Streamline your sales operations today',
    ctaSubheading:
      'Free for up to 3 users. No credit card required. Set up in under 5 minutes.',
  },
  {
    name: 'Calendar & Scheduling',
    slug: 'calendar',
    badge: 'CALENDAR',
    icon: 'Calendar',
    order: 6,
    shortDescription:
      'Full calendar with Calendly-style booking pages. Let prospects book directly into your schedule.',
    cardFeatures: [
      { text: 'Booking pages at /book/slug' },
      { text: 'Multi-view calendar' },
      { text: 'Timezone detection' },
    ],
    heroHeading: 'Calendar & Scheduling',
    heroDescription:
      'Full calendar with Calendly-style booking pages built in. Let prospects book directly into your schedule with automatic timezone detection.',
    capabilities: [
      { icon: 'Calendar', title: 'Multi-view calendar' },
      { icon: 'Globe', title: 'Booking pages' },
      { icon: 'Users', title: 'Team scheduling' },
      { icon: 'Zap', title: 'Auto-reminders' },
      { icon: 'RefreshCw', title: 'Timezone detection' },
    ],
    featureBlocks: [
      {
        label: 'SCHEDULE',
        heading: 'Booking pages that just work',
        description:
          'Share a link, let prospects pick a time. Automatic timezone detection, buffer times, and confirmation emails built in.',
        features: [
          { text: 'Custom booking page URLs' },
          { text: 'Automatic timezone detection' },
          { text: 'Buffer time between meetings' },
          { text: 'Confirmation and reminder emails' },
        ],
        ctaText: 'Start free trial →',
        ctaHref: '/signup',
      },
      {
        label: 'MANAGE',
        heading: 'Your calendar, your rules',
        description:
          'Multi-view calendar (day, week, month) with team visibility. See everyone\'s schedule and avoid conflicts.',
        features: [
          { text: 'Day, week, and month views' },
          { text: 'Team calendar overlay' },
          { text: 'Availability rules' },
          { text: 'Meeting type templates' },
        ],
        ctaText: 'See it in action →',
        ctaHref: '/demo',
      },
    ],
    comparisonHeading: 'Built-in scheduling that replaces Calendly.',
    comparisonCards: [
      {
        title: 'No extra tool',
        description:
          'Booking pages built right into your sales OS. No Calendly subscription needed.',
      },
      {
        title: 'Connected context',
        description:
          'Meetings link to contacts and deals automatically. Full context before every call.',
      },
      {
        title: 'Team-ready',
        description:
          'Round-robin scheduling, team calendars, and availability rules for the whole team.',
      },
    ],
    comparisonStats: [
      { number: '0', label: 'scheduling emails' },
      { number: '24/7', label: 'booking availability' },
      { number: '100%', label: 'timezone accuracy' },
    ],
    ctaHeading: 'Let prospects book time with you today',
    ctaSubheading:
      'Free for up to 3 users. No credit card required. Set up in under 5 minutes.',
  },
  {
    name: 'Internal Communication',
    slug: 'chat',
    badge: 'CHAT',
    icon: 'MessageCircle',
    order: 7,
    shortDescription:
      'Real-time team chat built into your sales workspace. No more switching to Slack for quick questions.',
    cardFeatures: [
      { text: 'Real-time messaging' },
      { text: 'Channels' },
      { text: '@mentions' },
    ],
    heroHeading: 'Internal Communication',
    heroDescription:
      'Real-time team chat built into your sales workspace. Discuss deals, share updates, and coordinate without leaving Revnator.',
    capabilities: [
      { icon: 'MessageCircle', title: 'Real-time chat' },
      { icon: 'Users', title: 'Team channels' },
      { icon: 'Target', title: '@mentions' },
      { icon: 'FileText', title: 'File sharing' },
      { icon: 'Zap', title: 'Deal-linked threads' },
    ],
    featureBlocks: [
      {
        label: 'COMMUNICATE',
        heading: 'Team chat without the tool switch',
        description:
          'Real-time messaging built into your sales workspace. Create channels, DM teammates, and discuss deals without opening Slack.',
        features: [
          { text: 'Real-time messaging' },
          { text: 'Public and private channels' },
          { text: 'Direct messages' },
          { text: '@mention notifications' },
        ],
        ctaText: 'Start free trial →',
        ctaHref: '/signup',
      },
      {
        label: 'CONNECT',
        heading: 'Context-aware conversations',
        description:
          'Link chat threads to specific deals, accounts, or contacts. Every conversation has the context it needs.',
        features: [
          { text: 'Deal-linked chat threads' },
          { text: 'Account discussion channels' },
          { text: 'File and screenshot sharing' },
          { text: 'Searchable message history' },
        ],
        ctaText: 'See it in action →',
        ctaHref: '/demo',
      },
    ],
    comparisonHeading: 'Sales-native communication, not another chat tool.',
    comparisonCards: [
      {
        title: 'Built for sales context',
        description:
          'Not a generic chat tool. Conversations link to deals, contacts, and accounts automatically.',
      },
      {
        title: 'Zero app switching',
        description:
          'Chat lives inside your sales workspace. No more Alt-Tab to Slack for a quick question.',
      },
      {
        title: 'Searchable history',
        description:
          'Find any conversation, decision, or shared file instantly. Context never gets lost.',
      },
    ],
    comparisonStats: [
      { number: '0', label: 'app switches' },
      { number: '100%', label: 'context retained' },
      { number: '∞', label: 'message history' },
    ],
    ctaHeading: 'Keep your team aligned today',
    ctaSubheading:
      'Free for up to 3 users. No credit card required. Set up in under 5 minutes.',
  },
  {
    name: 'AI SDR',
    slug: 'ai-sdr',
    badge: 'AI',
    icon: 'Sparkles',
    order: 8,
    shortDescription:
      'Your AI teammate that handles research, email drafting, and next-step suggestions automatically.',
    cardFeatures: [
      { text: 'AI email personalization' },
      { text: 'Account research' },
      { text: 'Smart suggestions' },
    ],
    heroHeading: 'AI SDR',
    heroDescription:
      'Your AI-powered sales development rep. Automates research, drafts personalized emails, and suggests next best actions for every deal.',
    capabilities: [
      { icon: 'Sparkles', title: 'AI email drafts' },
      { icon: 'Target', title: 'Account research' },
      { icon: 'Zap', title: 'Next-step suggestions' },
      { icon: 'BarChart3', title: 'Lead scoring' },
      { icon: 'RefreshCw', title: 'Continuous learning' },
    ],
    featureBlocks: [
      {
        label: 'AUTOMATE',
        heading: 'AI that does the heavy lifting',
        description:
          'AI researches prospects, drafts personalized outreach emails, and suggests the best next action for every deal in your pipeline.',
        features: [
          { text: 'Automated prospect research' },
          { text: 'AI-drafted personalized emails' },
          { text: 'Next-best-action suggestions' },
          { text: 'Smart lead prioritization' },
        ],
        ctaText: 'Start free trial →',
        ctaHref: '/signup',
      },
      {
        label: 'LEARN',
        heading: 'Gets smarter with every interaction',
        description:
          'The AI learns from your team\'s successful patterns. The more you use it, the better its suggestions become.',
        features: [
          { text: 'Pattern learning from top performers' },
          { text: 'Tone and style adaptation' },
          { text: 'Industry-specific suggestions' },
          { text: 'Continuous improvement loop' },
        ],
        ctaText: 'See it in action →',
        ctaHref: '/demo',
      },
    ],
    comparisonHeading: 'AI built for sales, not generic chatbots.',
    comparisonCards: [
      {
        title: 'Sales-trained AI',
        description:
          'Not a generic AI chatbot. Trained specifically for B2B sales workflows, outreach, and deal management.',
      },
      {
        title: 'Your data, your AI',
        description:
          'The AI learns from your team\'s patterns and your CRM data. Personalized to how you sell.',
      },
      {
        title: 'Human in the loop',
        description:
          'AI suggests, you decide. Review and edit every email and action before it goes out.',
      },
    ],
    comparisonStats: [
      { number: '5x', label: 'faster research' },
      { number: '3x', label: 'more personalized' },
      { number: '100%', label: 'human reviewed' },
    ],
    ctaHeading: 'Put AI to work on your pipeline today',
    ctaSubheading:
      'Free for up to 3 users. No credit card required. Set up in under 5 minutes.',
  },
  {
    name: 'Integrated Forms',
    slug: 'forms',
    badge: 'FORMS',
    icon: 'FileText',
    order: 9,
    shortDescription:
      'Capture leads from anywhere. Embed forms on your site, link them to lists, and automate follow-ups.',
    cardFeatures: [
      { text: 'Drag-and-drop builder' },
      { text: 'API embed' },
      { text: 'Auto-routing to lists' },
    ],
    heroHeading: 'Integrated Forms',
    heroDescription:
      'Capture leads from your website, landing pages, or anywhere. Build forms with a drag-and-drop builder, embed them anywhere, and auto-route submissions.',
    capabilities: [
      { icon: 'FileText', title: 'Form builder' },
      { icon: 'Globe', title: 'Embed anywhere' },
      { icon: 'Zap', title: 'Auto-routing' },
      { icon: 'Filter', title: 'Conditional logic' },
      { icon: 'BarChart3', title: 'Submission analytics' },
    ],
    featureBlocks: [
      {
        label: 'BUILD',
        heading: 'Forms that capture the right data',
        description:
          'Drag-and-drop form builder with conditional logic, multi-step flows, and custom fields that map directly to your CRM.',
        features: [
          { text: 'Drag-and-drop form builder' },
          { text: 'Conditional field logic' },
          { text: 'Multi-step forms' },
          { text: 'Custom field mapping to CRM' },
        ],
        ctaText: 'Start free trial →',
        ctaHref: '/signup',
      },
      {
        label: 'ROUTE',
        heading: 'Leads go where they belong',
        description:
          'Auto-route form submissions to the right contact lists, team members, or sequences based on your rules.',
        features: [
          { text: 'Auto-add to contact lists' },
          { text: 'Team member assignment rules' },
          { text: 'Sequence enrollment triggers' },
          { text: 'Webhook integrations' },
        ],
        ctaText: 'See it in action →',
        ctaHref: '/demo',
      },
    ],
    comparisonHeading: 'Lead capture that feeds your pipeline directly.',
    comparisonCards: [
      {
        title: 'No Typeform needed',
        description:
          'Beautiful forms built into your sales OS. No external form tool subscription or embed hassle.',
      },
      {
        title: 'CRM-native data',
        description:
          'Form submissions create contacts and populate fields automatically. No CSV imports required.',
      },
      {
        title: 'Instant follow-up',
        description:
          'Trigger email sequences, task assignments, or notifications the moment a form is submitted.',
      },
    ],
    comparisonStats: [
      { number: '0', label: 'manual data entry' },
      { number: '<1 sec', label: 'to CRM' },
      { number: '100%', label: 'customizable' },
    ],
    ctaHeading: 'Start capturing leads today',
    ctaSubheading:
      'Free for up to 3 users. No credit card required. Set up in under 5 minutes.',
  },
]

async function seed(): Promise<void> {
  // Resolve config relative to project root
  const configPath = path.resolve(dirname, '../../payload.config.ts')

  const payload = await getPayload({
    config: (await import(configPath)).default,
  })

  console.log('Seeding modules...')

  // Check for existing modules to avoid duplicates
  const existing = await payload.find({
    collection: 'modules',
    limit: 100,
  })

  const existingSlugs = new Set(existing.docs.map((d) => d.slug))

  // Create the modules that are referenced by relatedModules first,
  // then update relations in a second pass
  const createdModules: Record<string, number> = {}

  for (const mod of modules) {
    if (existingSlugs.has(mod.slug)) {
      console.log(`  Skipping "${mod.name}" (slug "${mod.slug}" already exists)`)
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
    console.log(`  Created "${mod.name}" (id: ${doc.id})`)
  }

  // Second pass: set up related modules
  const relations: Record<string, string[]> = {
    contacts: ['outreach', 'pipeline', 'sales-ops'],
    accounts: ['contacts', 'pipeline', 'sales-ops'],
    outreach: ['contacts', 'pipeline', 'ai-sdr'],
    pipeline: ['contacts', 'outreach', 'sales-ops'],
    'sales-ops': ['pipeline', 'calendar', 'chat'],
    calendar: ['contacts', 'sales-ops', 'chat'],
    chat: ['sales-ops', 'calendar', 'contacts'],
    'ai-sdr': ['outreach', 'contacts', 'pipeline'],
    forms: ['contacts', 'outreach', 'pipeline'],
  }

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
      console.log(`  Updated relations for "${slug}"`)
    }
  }

  console.log('Done! All 9 modules seeded.')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
