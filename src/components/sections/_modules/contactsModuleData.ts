import type { ModuleHeroData } from '../ModuleHero/Data'
import type { ModuleCapabilitiesStripData } from '../ModuleCapabilitiesStrip/Data'
import type { ModuleFeatureBlockData } from '../ModuleFeatureBlock/Data'
import type { ModuleComparisonData } from '../ModuleComparison/Data'
import type { RelatedModulesData } from '../RelatedModules/Data'
import type { ModuleCTAData } from '../ModuleCTA/Data'

export interface ModulePageData {
  hero: ModuleHeroData
  capabilities: ModuleCapabilitiesStripData
  featureBlocks: ModuleFeatureBlockData[]
  comparison: ModuleComparisonData
  relatedModules: RelatedModulesData
  cta: ModuleCTAData
}

export const contactsModuleData: ModulePageData = {
  hero: {
    breadcrumbParent: 'Platform',
    breadcrumbParentHref: '/platform',
    breadcrumbCurrent: 'Contact Lifecycle Management',
    categoryBadge: 'CRM',
    heading: 'Contact Lifecycle Management',
    description:
      'Capture, enrich, and manage every contact in one place. Track lifecycle stages, build dynamic lists, and keep your team aligned on every relationship.',
    primaryCta: { label: 'Start free trial', href: '/signup' },
    secondaryCta: { label: 'See all features', href: '#features' },
  },

  capabilities: {
    items: [
      { icon: 'Database', title: 'Contact database' },
      { icon: 'Filter', title: 'Smart filters & lists' },
      { icon: 'Layers', title: 'Custom fields' },
      { icon: 'RefreshCw', title: 'Lifecycle tracking' },
      { icon: 'Upload', title: 'Bulk import & export' },
    ],
  },

  featureBlocks: [
    {
      label: 'ORGANIZE',
      heading: 'Your single source of truth for every contact',
      description:
        'Import contacts from CSV, enrich profiles automatically, and see every interaction in one timeline. No more scattered spreadsheets.',
      bullets: [
        'Bulk import with smart field mapping',
        'Contact enrichment and deduplication',
        'Full activity timeline per contact',
        'Company and account association',
      ],
      cta: { text: 'Start free trial \u2192', href: '/signup' },
    },
    {
      label: 'SEGMENT',
      heading: 'Slice your contacts any way you need',
      description:
        'Create dynamic lists with advanced filters. Segment by lifecycle stage, engagement level, custom fields, or any combination.',
      bullets: [
        'Advanced filter builder with AND/OR logic',
        'Save and reuse filter presets',
        'Dynamic lists that auto-update',
        'Bulk actions on filtered results',
      ],
      cta: { text: 'See it in action \u2192', href: '/demo' },
    },
    {
      label: 'CUSTOMIZE',
      heading: 'Your CRM, your fields, your rules',
      description:
        'Add unlimited custom fields to capture the data that matters to your business. Text, numbers, dates, dropdowns — whatever you need.',
      bullets: [
        'Unlimited custom field types',
        'Variable engine for email personalization',
        'Field-level permissions per team role',
        'Drag-and-drop field ordering',
      ],
      cta: { text: 'Read the docs \u2192', href: '/docs/contacts' },
    },
    {
      label: 'TRACK',
      heading: 'Know exactly where every contact stands',
      description:
        'Track contacts through your sales lifecycle — from new lead to qualified to customer. Automate stage transitions based on engagement.',
      bullets: [
        'Customizable lifecycle stages',
        'Automatic stage progression rules',
        'Stage-based reporting and analytics',
        'Visual lifecycle funnel dashboard',
      ],
      cta: { text: 'Start free trial \u2192', href: '/signup' },
    },
  ],

  comparison: {
    label: 'WHY REVNATOR',
    heading: 'Not just another CRM. A sales-first contact system.',
    cards: [
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
    stats: [
      { value: '50K+', label: 'contacts supported' },
      { value: '30 sec', label: 'to import' },
      { value: '100%', label: 'self-serve setup' },
    ],
  },

  relatedModules: {
    label: 'EXPLORE MORE',
    heading: 'Works even better with these modules',
    modules: [
      {
        icon: 'Mail',
        name: 'Email Outreach',
        description: 'Send personalized sequences to your contact lists',
        href: '/platform/outreach',
      },
      {
        icon: 'GitBranch',
        name: 'Pipeline & Deals',
        description: 'Convert contacts into deals and track them visually',
        href: '/platform/pipeline',
      },
      {
        icon: 'LayoutDashboard',
        name: 'Sales Operations',
        description: 'Assign tasks and missions tied to your contacts',
        href: '/platform/sales-ops',
      },
    ],
  },

  cta: {
    heading: 'Start managing your contacts today',
    subheading:
      'Free for up to 3 users. No credit card required. Set up in under 5 minutes.',
    primaryCta: { label: 'Start free trial', href: '/signup' },
    secondaryCta: { label: 'Book a demo', href: '/demo' },
  },
}
