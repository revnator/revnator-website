export interface PlatformModule {
  icon: string
  name: string
  description: string
  features: string[]
  href: string
}

export const platformModules: PlatformModule[] = [
  {
    icon: 'Users',
    name: 'Contact Lifecycle Management',
    description:
      'Your single source of truth for every contact. Import, enrich, segment, and track interactions.',
    features: ['Smart lists & filters', 'Custom fields', 'Lifecycle stages'],
    href: '/platform/contacts',
  },
  {
    icon: 'Building2',
    name: 'Account Management',
    description:
      'See the full picture for every company. Health scores, stakeholder mapping, and account timelines.',
    features: ['360° account view', 'Health indicators', 'Contact grouping'],
    href: '/platform/accounts',
  },
  {
    icon: 'Mail',
    name: 'Email Outreach',
    description:
      'Send campaigns and multi-step sequences with personalization, tracking, and deliverability tools built in.',
    features: ['Sequences & campaigns', 'Open/click tracking', 'SendGrid integration'],
    href: '/platform/outreach',
  },
  {
    icon: 'GitBranch',
    name: 'Pipeline & Deals',
    description:
      'Visual Kanban pipeline with deal tracking, stage progression, and revenue forecasting.',
    features: ['Drag-and-drop Kanban', 'Forecasting dashboard', 'Pipeline reports'],
    href: '/platform/pipeline',
  },
  {
    icon: 'LayoutDashboard',
    name: 'Sales Operations',
    description:
      'Your daily command center. Tasks, missions, team coordination, and productivity tracking.',
    features: ['Task management', 'Mission templates', 'Team workspace'],
    href: '/platform/sales-ops',
  },
  {
    icon: 'Calendar',
    name: 'Calendar & Scheduling',
    description:
      'Full calendar with Calendly-style booking pages. Let prospects book directly into your schedule.',
    features: ['Booking pages at /book/slug', 'Multi-view calendar', 'Timezone detection'],
    href: '/platform/calendar',
  },
  {
    icon: 'MessageCircle',
    name: 'Internal Communication',
    description:
      'Real-time team chat built into your sales workspace. No more switching to Slack for quick questions.',
    features: ['Real-time messaging', 'Channels', '@mentions'],
    href: '/platform/chat',
  },
  {
    icon: 'Sparkles',
    name: 'AI SDR',
    description:
      'Your AI teammate that handles research, email drafting, and next-step suggestions automatically.',
    features: ['AI email personalization', 'Account research', 'Smart suggestions'],
    href: '/platform/ai-sdr',
  },
  {
    icon: 'FileText',
    name: 'Integrated Forms',
    description:
      'Capture leads from anywhere. Embed forms on your site, link them to lists, and automate follow-ups.',
    features: ['Drag-and-drop builder', 'API embed', 'Auto-routing to lists'],
    href: '/platform/forms',
  },
]

export interface ConnectedStat {
  value: string
  label: string
}

export const connectedStats: ConnectedStat[] = [
  { value: '9', label: 'Integrated modules' },
  { value: '0', label: 'External tools needed' },
  { value: '1', label: 'Unified workspace' },
]

export interface PricingPill {
  name: string
  price: string
}

export const pricingPills: PricingPill[] = [
  { name: 'Free', price: '$0' },
  { name: 'Growth', price: '$39/mo' },
  { name: 'Pro', price: '$69/mo' },
]
