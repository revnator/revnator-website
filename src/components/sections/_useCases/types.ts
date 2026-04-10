export interface UseCaseHeroData {
  breadcrumbParent: string
  breadcrumbCurrent: string
  badge: string
  heading: string
  description: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
  heroImage?: { url: string; alt: string } | null
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
  image?: { url: string; alt: string } | null
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
