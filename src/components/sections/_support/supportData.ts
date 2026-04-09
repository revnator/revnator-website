// ── Support channels ──

export interface SupportChannel {
  icon: string
  title: string
  description: string
  linkText: string
  href: string
}

export const supportChannels: SupportChannel[] = [
  {
    icon: 'BookOpen',
    title: 'Documentation',
    description: 'Step-by-step guides for every module',
    linkText: 'Browse docs',
    href: '/docs',
  },
  {
    icon: 'Mail',
    title: 'Email us',
    description: 'Get a response within 24 hours',
    linkText: 'support@revnator.com',
    href: 'mailto:support@revnator.com',
  },
  {
    icon: 'Users',
    title: 'Community',
    description: 'Connect with other Revnator users',
    linkText: 'Join community',
    href: '/community',
  },
]

// ── Knowledge base categories ──

export interface KBCategory {
  icon: string
  title: string
  articleCount: string
  href: string
}

export const kbCategories: KBCategory[] = [
  { icon: 'Rocket', title: 'Getting started', articleCount: '12 articles', href: '/docs/getting-started/welcome' },
  { icon: 'Users', title: 'Contacts & CRM', articleCount: '18 articles', href: '/docs/contacts/overview' },
  { icon: 'Mail', title: 'Email & Sequences', articleCount: '15 articles', href: '/docs/email/overview' },
  { icon: 'GitBranch', title: 'Pipeline & Deals', articleCount: '10 articles', href: '/docs/pipeline/overview' },
  { icon: 'Calendar', title: 'Calendar & Scheduling', articleCount: '8 articles', href: '/docs/calendar/overview' },
  { icon: 'BarChart3', title: 'Reports & Analytics', articleCount: '9 articles', href: '/docs/reports/overview' },
  { icon: 'CreditCard', title: 'Account & Billing', articleCount: '6 articles', href: '/docs' },
  { icon: 'Plug', title: 'Integrations', articleCount: '11 articles', href: '/docs/integrations/available-integrations' },
]

// ── Support FAQ ──

export interface SupportFAQItem {
  question: string
  answer: string
}

export const supportFAQs: SupportFAQItem[] = [
  {
    question: 'How do I get started with Revnator?',
    answer:
      'Sign up for free, connect your email, and import your contacts. Our quick start guide walks you through the first 5 minutes.',
  },
  {
    question: 'What if I get stuck during setup?',
    answer:
      'Check our documentation for step-by-step guides, or email support@revnator.com for help. We typically respond within 24 hours.',
  },
  {
    question: 'Can I migrate from another CRM?',
    answer:
      'Yes. We support CSV import with smart field mapping. Migration guides are available for HubSpot, Salesforce, Pipedrive, and others.',
  },
  {
    question: 'How do I report a bug?',
    answer:
      'Use the in-app feedback button or email bugs@revnator.com with a description and screenshot. We track and respond to every report.',
  },
  {
    question: 'Where can I request a new feature?',
    answer:
      'Submit feature requests through our community forum or email feedback@revnator.com. Popular requests get prioritized in our roadmap.',
  },
  {
    question: 'Do you offer paid support plans?',
    answer:
      'Pro and Enterprise plans include priority support with faster response times. Enterprise customers also get a dedicated account manager.',
  },
]
