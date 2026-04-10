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
