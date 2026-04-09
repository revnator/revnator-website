// ── Plan card types ──

export type BillingPeriod = 'monthly' | 'annual'

export interface PlanFeature {
  text: string
  included: boolean
}

export interface PricingPlan {
  name: string
  monthlyPrice: number
  annualPrice: number
  period: string
  description: string
  features: PlanFeature[]
  ctaLabel: string
  ctaHref: string
  highlighted: boolean
}

// ── Comparison table types ──

export interface ComparisonFeatureRow {
  feature: string
  free: string
  starter: string
  growth: string
  pro: string
}

export interface ComparisonCategory {
  name: string
  rows: ComparisonFeatureRow[]
}

// ── FAQ types ──

export interface FAQItem {
  question: string
  answer: string
}

// ── Data ──

export const pricingHeroData = {
  label: 'PRICING',
  heading: 'Simple pricing. No surprises.',
  subheading:
    'Start free. Upgrade when you\'re ready. Every plan includes unlimited contacts.',
  trialNote:
    'All paid plans include a 14-day free trial. No credit card required.',
} as const

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Free',
    monthlyPrice: 0,
    annualPrice: 0,
    period: 'forever',
    description: 'For individuals exploring Revnator',
    features: [
      { text: 'Up to 100 contacts', included: true },
      { text: '1 user', included: true },
      { text: 'Basic contact management', included: true },
      { text: '1 email sequence', included: true },
      { text: '50 emails per day', included: true },
      { text: 'Basic pipeline (1 pipeline)', included: true },
      { text: 'Community support', included: true },
      { text: 'No custom fields', included: false },
      { text: 'No reports', included: false },
      { text: 'No calendar booking', included: false },
    ],
    ctaLabel: 'Get started free',
    ctaHref: '/signup',
    highlighted: false,
  },
  {
    name: 'Starter',
    monthlyPrice: 19,
    annualPrice: 15,
    period: '/user/mo',
    description: 'For small teams getting started with outreach',
    features: [
      { text: 'Up to 2,500 contacts', included: true },
      { text: 'Up to 5 users', included: true },
      { text: 'Full CRM with custom fields', included: true },
      { text: '5 email sequences', included: true },
      { text: '500 emails per day', included: true },
      { text: 'Pipeline with 1 pipeline', included: true },
      { text: 'Basic reports', included: true },
      { text: 'Calendar + 1 booking page', included: true },
      { text: 'Email support', included: true },
      { text: 'No AI features', included: false },
      { text: 'No team chat', included: false },
    ],
    ctaLabel: 'Start free trial',
    ctaHref: '/signup',
    highlighted: false,
  },
  {
    name: 'Growth',
    monthlyPrice: 39,
    annualPrice: 31,
    period: '/user/mo',
    description: 'Full platform for growing sales teams',
    features: [
      { text: 'Unlimited contacts', included: true },
      { text: 'Up to 15 users', included: true },
      { text: 'Full CRM + account management', included: true },
      { text: 'Unlimited sequences', included: true },
      { text: '2,000 emails per day', included: true },
      { text: 'Multiple pipelines + forecasting', included: true },
      { text: 'Full reports + exports', included: true },
      { text: 'Calendar + unlimited booking pages', included: true },
      { text: 'Team chat', included: true },
      { text: 'Integrated forms', included: true },
      { text: 'Integrations', included: true },
      { text: 'Priority support', included: true },
    ],
    ctaLabel: 'Start free trial',
    ctaHref: '/signup',
    highlighted: true,
  },
  {
    name: 'Pro',
    monthlyPrice: 69,
    annualPrice: 55,
    period: '/user/mo',
    description: 'Advanced tools for high-velocity teams',
    features: [
      { text: 'Everything in Growth', included: true },
      { text: 'Unlimited users', included: true },
      { text: 'AI SDR features', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'API access + webhooks', included: true },
      { text: 'Custom roles & permissions', included: true },
      { text: 'Dedicated onboarding', included: true },
      { text: 'Phone + chat support', included: true },
      { text: 'Custom integrations', included: true },
      { text: 'SLA guarantee', included: true },
    ],
    ctaLabel: 'Start free trial',
    ctaHref: '/signup',
    highlighted: false,
  },
]

export const comparisonCategories: ComparisonCategory[] = [
  {
    name: 'Contacts & CRM',
    rows: [
      { feature: 'Contacts limit', free: '100', starter: '2,500', growth: 'Unlimited', pro: 'Unlimited' },
      { feature: 'Users', free: '1', starter: '5', growth: '15', pro: 'Unlimited' },
      { feature: 'Custom fields', free: '—', starter: '✓', growth: '✓', pro: '✓' },
      { feature: 'Account management', free: '—', starter: '—', growth: '✓', pro: '✓' },
      { feature: 'Contact enrichment', free: '—', starter: '—', growth: '✓', pro: '✓' },
      { feature: 'Lifecycle tracking', free: '✓', starter: '✓', growth: '✓', pro: '✓' },
    ],
  },
  {
    name: 'Email & Outreach',
    rows: [
      { feature: 'Email sequences', free: '1', starter: '5', growth: 'Unlimited', pro: 'Unlimited' },
      { feature: 'Emails per day', free: '50', starter: '500', growth: '2,000', pro: '5,000' },
      { feature: 'Email campaigns', free: '—', starter: '✓', growth: '✓', pro: '✓' },
      { feature: 'Open & click tracking', free: '✓', starter: '✓', growth: '✓', pro: '✓' },
      { feature: 'A/B testing', free: '—', starter: '—', growth: '✓', pro: '✓' },
      { feature: 'Email warm-up', free: '—', starter: '—', growth: '✓', pro: '✓' },
    ],
  },
  {
    name: 'Pipeline & Deals',
    rows: [
      { feature: 'Pipelines', free: '1', starter: '1', growth: 'Multiple', pro: 'Unlimited' },
      { feature: 'Deal forecasting', free: '—', starter: '—', growth: '✓', pro: '✓' },
      { feature: 'Pipeline reports', free: '—', starter: 'Basic', growth: 'Full', pro: 'Advanced' },
    ],
  },
  {
    name: 'Operations',
    rows: [
      { feature: 'Tasks & missions', free: '✓', starter: '✓', growth: '✓', pro: '✓' },
      { feature: 'Calendar', free: '—', starter: '✓', growth: '✓', pro: '✓' },
      { feature: 'Booking pages', free: '—', starter: '1', growth: 'Unlimited', pro: 'Unlimited' },
      { feature: 'Team chat', free: '—', starter: '—', growth: '✓', pro: '✓' },
      { feature: 'Forms', free: '—', starter: '—', growth: '✓', pro: '✓' },
    ],
  },
  {
    name: 'Analytics & Admin',
    rows: [
      { feature: 'Reports', free: '—', starter: 'Basic', growth: 'Full', pro: 'Advanced' },
      { feature: 'Export data', free: '—', starter: 'CSV', growth: 'CSV + API', pro: 'Full API' },
      { feature: 'Integrations', free: '—', starter: '2', growth: 'All', pro: 'All + Custom' },
      { feature: 'AI SDR features', free: '—', starter: '—', growth: '—', pro: '✓' },
      { feature: 'Roles & permissions', free: '—', starter: '—', growth: '—', pro: '✓' },
      { feature: 'SSO / SCIM', free: '—', starter: '—', growth: '—', pro: '✓' },
    ],
  },
  {
    name: 'Support',
    rows: [
      { feature: 'Support channel', free: 'Community', starter: 'Email', growth: 'Priority', pro: 'Dedicated' },
      { feature: 'Onboarding', free: 'Self-serve', starter: 'Self-serve', growth: 'Guided', pro: 'Dedicated' },
      { feature: 'SLA', free: '—', starter: '—', growth: '—', pro: '✓' },
    ],
  },
]

export const pricingFAQs: FAQItem[] = [
  {
    question: 'Is there really a free plan?',
    answer:
      'Yes — Revnator\'s free plan includes up to 100 contacts, 1 email sequence, and basic pipeline management. It\'s free forever, no credit card required.',
  },
  {
    question: 'Can I switch plans at any time?',
    answer:
      'Absolutely. Upgrade, downgrade, or cancel anytime from your account settings. Changes take effect at the start of your next billing cycle.',
  },
  {
    question: 'What happens when my trial ends?',
    answer:
      'After your 14-day trial, you\'ll automatically move to the Free plan unless you choose to upgrade. No charges, no surprises.',
  },
  {
    question: 'Do you offer discounts for annual billing?',
    answer:
      'Yes — all annual plans come with a 20% discount compared to monthly billing. The savings are applied automatically when you select annual billing.',
  },
  {
    question: 'Can I import my contacts from another CRM?',
    answer:
      'Yes. Revnator supports CSV import with smart field mapping. We also have import guides for HubSpot, Salesforce, Pipedrive, and spreadsheet-based CRMs.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Your data is encrypted at rest and in transit. We use industry-standard security with row-level isolation, ensuring each workspace\'s data is completely separate.',
  },
  {
    question: 'Do you offer refunds?',
    answer:
      'We offer a full refund within the first 30 days of any paid plan if you\'re not satisfied. No questions asked.',
  },
  {
    question: 'What if I need more than what Pro offers?',
    answer:
      'Our Enterprise plan includes custom limits, SSO, SCIM, dedicated onboarding, SLA guarantees, and a dedicated account manager. Contact our sales team to discuss.',
  },
]
