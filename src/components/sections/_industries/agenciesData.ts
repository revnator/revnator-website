export interface IndustryHeroData {
  breadcrumbLabel: string
  badge: string
  heading: string
  description: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
  builtForLabel: string
  builtForTags: string[]
}

export interface IndustryStat {
  number: string
  label: string
}

export interface IndustrySocialProofData {
  stats: IndustryStat[]
}

export interface IndustryUseCaseCard {
  number: string
  title: string
  description: string
  tagLabel: string
}

export interface IndustryUseCasesData {
  label: string
  heading: string
  cards: IndustryUseCaseCard[]
}

export interface IndustryWorkflowStep {
  number: number
  title: string
  description: string
}

export interface IndustryWorkflowData {
  label: string
  heading: string
  subheading: string
  steps: IndustryWorkflowStep[]
}

export interface IndustryTestimonialData {
  quote: string
  authorName: string
  authorTitle: string
  authorInitials: string
}

export interface IndustryStackModule {
  icon: string
  name: string
  why: string
  href: string
}

export interface IndustryStackData {
  label: string
  heading: string
  modules: IndustryStackModule[]
}

export interface IndustryCTAData {
  heading: string
  subheading: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
}

export interface IndustryPageData {
  hero: IndustryHeroData
  socialProof: IndustrySocialProofData
  useCases: IndustryUseCasesData
  workflow: IndustryWorkflowData
  testimonial: IndustryTestimonialData
  stack: IndustryStackData
  cta: IndustryCTAData
}

export const agenciesData: IndustryPageData = {
  hero: {
    breadcrumbLabel: 'For Agencies',
    badge: 'FOR AGENCIES',
    heading: 'The sales OS built for client-first agencies',
    description:
      'Manage prospects, pitch new business, and onboard clients without juggling 5 different tools. Built for agencies that win by being responsive.',
    primaryCta: { label: 'Start free trial', href: '/signup' },
    secondaryCta: { label: 'See agency case studies', href: '/resources' },
    builtForLabel: 'Trusted by agency teams of all sizes',
    builtForTags: ['Marketing agencies', 'Creative studios', 'PR firms', 'Consulting groups'],
  },

  socialProof: {
    stats: [
      { number: '200+', label: 'agencies use Revnator' },
      { number: '3.2x', label: 'faster proposal turnaround' },
      { number: '47%', label: 'more pitches per week' },
      { number: '$0', label: 'agency pricing to start' },
    ],
  },

  useCases: {
    label: 'BUILT FOR HOW AGENCIES WORK',
    heading: 'Three workflows agencies love',
    cards: [
      {
        number: '01',
        title: 'New business pitches',
        description:
          'Track every prospect from first touch to signed contract. See where every pitch stands at a glance, and never let a hot lead go cold.',
        tagLabel: 'Pitch tracking',
      },
      {
        number: '02',
        title: 'Client onboarding',
        description:
          'Turn signed contracts into structured onboarding workflows. Standardize how you welcome new clients and reduce ramp time by weeks.',
        tagLabel: 'Onboarding flows',
      },
      {
        number: '03',
        title: 'Account expansion',
        description:
          'Identify upsell opportunities across your client base. Automate quarterly check-ins and surface accounts ready for expansion.',
        tagLabel: 'Expansion plays',
      },
    ],
  },

  workflow: {
    label: 'HOW IT WORKS',
    heading: 'Your agency, end-to-end in Revnator',
    subheading:
      'From first cold email to client renewal — one workspace handles it all.',
    steps: [
      { number: 1, title: 'Capture leads', description: 'Forms on your site flow into Revnator' },
      {
        number: 2,
        title: 'Qualify & nurture',
        description: 'Email sequences automate first contact',
      },
      { number: 3, title: 'Pitch & close', description: 'Pipeline tracks every active pitch' },
      {
        number: 4,
        title: 'Onboard clients',
        description: 'Mission templates standardize handoff',
      },
      { number: 5, title: 'Grow & retain', description: 'Account view monitors client health' },
    ],
  },

  testimonial: {
    quote:
      'Revnator replaced our spreadsheets, our CRM, and our project management tool. We pitch faster, onboard cleaner, and retain better. It\u2019s the only tool I\u2019ve kept after a year.',
    authorName: 'Sarah Mitchell',
    authorTitle: 'CEO, Lighthouse Marketing Agency',
    authorInitials: 'SM',
  },

  stack: {
    label: 'RECOMMENDED STACK',
    heading: 'The modules every agency uses',
    modules: [
      {
        icon: 'GitBranch',
        name: 'Pipeline & Deals',
        why: 'Track every pitch from lead to signed contract',
        href: '/platform/pipeline',
      },
      {
        icon: 'Mail',
        name: 'Email Outreach',
        why: 'Cold outreach for new business',
        href: '/platform/outreach',
      },
      {
        icon: 'LayoutDashboard',
        name: 'Sales Operations',
        why: 'Mission templates for client onboarding',
        href: '/platform/sales-ops',
      },
      {
        icon: 'FileText',
        name: 'Integrated Forms',
        why: 'Capture leads from your website',
        href: '/platform/forms',
      },
    ],
  },

  cta: {
    heading: 'Ready to streamline your agency?',
    subheading: 'Free for up to 3 users. No credit card. Built for agencies.',
    primaryCta: { label: 'Start free trial', href: '/signup' },
    secondaryCta: { label: 'Talk to our team', href: '/demo' },
  },
}
