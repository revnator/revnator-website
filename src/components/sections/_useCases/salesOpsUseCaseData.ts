// ── Types ──

export interface UseCaseHeroData {
  breadcrumbParent: string
  breadcrumbCurrent: string
  badge: string
  heading: string
  description: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
}

export interface UseCasePainPointCard {
  icon: string
  title: string
  description: string
}

export interface UseCasePainPointsData {
  label: string
  heading: string
  cards: UseCasePainPointCard[]
}

export interface UseCaseSolutionBlock {
  label: string
  heading: string
  description: string
  bullets: string[]
  learnMoreHref?: string
}

export interface UseCaseRelatedModule {
  icon: string
  name: string
  description: string
  href: string
}

export interface UseCaseRelatedModulesData {
  label: string
  heading: string
  modules: UseCaseRelatedModule[]
}

export interface UseCaseCTAData {
  heading: string
  subheading: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
}

export interface UseCasePageData {
  hero: UseCaseHeroData
  painPoints: UseCasePainPointsData
  solutions: UseCaseSolutionBlock[]
  relatedModules: UseCaseRelatedModulesData
  cta: UseCaseCTAData
}

// ── Sales Operations use case data ──

export const salesOpsUseCaseData: UseCasePageData = {
  hero: {
    breadcrumbParent: 'Use Cases',
    breadcrumbCurrent: 'Sales Operations',
    badge: 'USE CASE',
    heading: 'Streamline your sales operations from day one',
    description:
      'Automate daily workflows, manage tasks, run missions, and coordinate your team — all from one command center.',
    primaryCta: { label: 'Start free trial', href: '/signup' },
    secondaryCta: { label: 'See pricing', href: '/pricing' },
  },

  painPoints: {
    label: "WHAT YOU'RE FACING",
    heading: 'What sales ops teams struggle with',
    cards: [
      {
        icon: 'ListX',
        title: 'Manual task tracking',
        description:
          "Reps forget follow-ups. Managers can't see who's doing what. Productivity falls through the cracks.",
      },
      {
        icon: 'Unlink',
        title: 'Disconnected tools',
        description:
          "Tasks in Asana. Pipeline in sheets. Calendar in Google. Nothing talks to each other and data falls through the cracks.",
      },
      {
        icon: 'EyeOff',
        title: 'No visibility',
        description:
          'Leadership has no real-time view into daily sales activity or team productivity. Decisions made in the dark.',
      },
    ],
  },

  solutions: [
    {
      label: 'UNIFIED TASKS',
      heading: 'Every task in one place',
      description:
        'Stop switching between task tools. Revnator gives you a unified task management system tied directly to your contacts, deals, and calendar.',
      bullets: [
        'Tasks linked to contacts and deals',
        'Daily, weekly, and project views',
        'Automatic reminders and follow-ups',
        'Team task assignment with ownership',
      ],
      learnMoreHref: '#',
    },
    {
      label: 'MISSION-BASED SELLING',
      heading: 'Templated workflows that scale',
      description:
        'Pre-built mission templates for common sales workflows. New employee onboarding, account expansion, win-back campaigns — all automated.',
      bullets: [
        'Pre-built mission templates',
        'Custom workflow builder',
        'Progress tracking across team members',
        'Mission analytics and reports',
      ],
      learnMoreHref: '#',
    },
  ],

  relatedModules: {
    label: 'POWERED BY',
    heading: 'Modules that power your sales ops',
    modules: [
      {
        icon: 'LayoutDashboard',
        name: 'Sales Operations',
        description: 'Tasks, missions, and team coordination',
        href: '/platform/sales-ops',
      },
      {
        icon: 'Calendar',
        name: 'Calendar & Scheduling',
        description: 'Team calendar and booking pages',
        href: '/platform/calendar',
      },
      {
        icon: 'GitBranch',
        name: 'Pipeline & Deals',
        description: 'Visual pipeline tied to your tasks',
        href: '/platform/pipeline',
      },
    ],
  },

  cta: {
    heading: 'Take control of your sales operations',
    subheading: 'Free for up to 3 users. No credit card required.',
    primaryCta: { label: 'Start free trial', href: '/signup' },
    secondaryCta: { label: 'Book a demo', href: '/demo' },
  },
}
