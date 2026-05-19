import type { UseCase, Module } from '@/payload-types'
import { getImageUrl, getImageAlt } from '@/lib/getImageUrl'
import type {
  UseCaseHeroData,
  UseCasePainPointsData,
  UseCaseSolutionBlock,
  UseCaseRelatedModulesData,
  UseCaseCTAData,
} from '@/components/sections/_useCases/types'

export function toHeroData(uc: UseCase): UseCaseHeroData {
  const imgUrl = getImageUrl(uc.heroImage, 'heroProduct')
  return {
    breadcrumbParent: 'Use Cases',
    breadcrumbCurrent: uc.name,
    badge: uc.badge ?? 'USE CASE',
    heading: uc.heroHeading,
    description: uc.heroDescription,
    primaryCta: {
      label: uc.primaryCtaText ?? 'Start free trial',
      href: uc.primaryCtaHref ?? '/get-started',
    },
    secondaryCta: {
      label: uc.secondaryCtaText ?? 'See pricing',
      href: uc.secondaryCtaHref ?? '/pricing',
    },
    heroImage: imgUrl
      ? { url: imgUrl, alt: getImageAlt(uc.heroImage, uc.heroHeading) }
      : null,
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
  return (uc.solutions ?? []).map((sol) => {
    const solImgUrl = getImageUrl(sol.image, 'featureScreenshot')
    return {
      label: sol.label,
      heading: sol.heading,
      description: sol.description,
      bullets: (sol.features ?? []).map((f) => f.text),
      image: solImgUrl
        ? { url: solImgUrl, alt: getImageAlt(sol.image, sol.heading) }
        : null,
    }
  })
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
      href: uc.ctaPrimaryHref ?? '/get-started',
    },
    secondaryCta: {
      label: uc.ctaSecondaryText ?? 'Book a demo',
      href: uc.ctaSecondaryHref ?? '/demo',
    },
  }
}
