import type { UseCase, Module } from '@/payload-types'
import type {
  UseCaseHeroData,
  UseCasePainPointsData,
  UseCaseSolutionBlock,
  UseCaseRelatedModulesData,
  UseCaseCTAData,
} from '@/components/sections/_useCases/types'

export function toHeroData(uc: UseCase): UseCaseHeroData {
  return {
    breadcrumbParent: 'Use Cases',
    breadcrumbCurrent: uc.name,
    badge: uc.badge ?? 'USE CASE',
    heading: uc.heroHeading,
    description: uc.heroDescription,
    primaryCta: {
      label: uc.primaryCtaText ?? 'Start free trial',
      href: uc.primaryCtaHref ?? '/signup',
    },
    secondaryCta: {
      label: uc.secondaryCtaText ?? 'See pricing',
      href: uc.secondaryCtaHref ?? '/pricing',
    },
  }
}

export function toPainPointsData(uc: UseCase): UseCasePainPointsData {
  return {
    label: uc.painSectionLabel ?? "WHAT YOU'RE FACING",
    heading: uc.painHeading,
    cards: (uc.painCards ?? []).map((card) => ({
      icon: card.icon,
      title: card.title,
      description: card.description,
    })),
  }
}

export function toSolutionsData(uc: UseCase): UseCaseSolutionBlock[] {
  return (uc.solutions ?? []).map((sol) => ({
    label: sol.label,
    heading: sol.heading,
    description: sol.description,
    bullets: (sol.features ?? []).map((f) => f.text),
  }))
}

export function toRelatedModulesData(uc: UseCase): UseCaseRelatedModulesData {
  const modules = (uc.relatedModules ?? [])
    .map((rm) => {
      const mod = rm.module as Module | null
      if (!mod || typeof mod === 'number') return null
      return {
        icon: mod.icon,
        name: mod.name,
        description: mod.shortDescription ?? mod.heroDescription ?? '',
        href: `/platform/${mod.slug}`,
      }
    })
    .filter(Boolean) as UseCaseRelatedModulesData['modules']

  return {
    label: uc.relatedModulesLabel ?? 'POWERED BY',
    heading: uc.relatedModulesHeading ?? 'Related modules',
    modules,
  }
}

export function toCTAData(uc: UseCase): UseCaseCTAData {
  return {
    heading: uc.ctaHeading ?? 'Get started today',
    subheading: uc.ctaSubheading ?? 'Free for up to 3 users.',
    primaryCta: {
      label: uc.ctaPrimaryText ?? 'Start free trial',
      href: uc.ctaPrimaryHref ?? '/signup',
    },
    secondaryCta: {
      label: uc.ctaSecondaryText ?? 'Book a demo',
      href: uc.ctaSecondaryHref ?? '/demo',
    },
  }
}
