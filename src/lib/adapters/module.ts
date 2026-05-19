import type { Module } from '@/payload-types'
import type { ModuleHeroData } from '@/components/sections/ModuleHero/Data'
import type { ModuleCapabilitiesStripData } from '@/components/sections/ModuleCapabilitiesStrip/Data'
import type { ModuleFeatureBlockData } from '@/components/sections/ModuleFeatureBlock/Data'
import type { ModuleComparisonData } from '@/components/sections/ModuleComparison/Data'
import type { RelatedModulesData } from '@/components/sections/RelatedModules/Data'
import type { ModuleCTAData } from '@/components/sections/ModuleCTA/Data'
import { getImageUrl, getImageAlt } from '@/lib/getImageUrl'

function resolveImage(
  field: Module['heroImage'],
  preferredSize: 'heroProduct' | 'featureScreenshot',
): { url: string; alt: string } | null {
  const url = getImageUrl(field, preferredSize)
  if (!url) return null
  return { url, alt: getImageAlt(field) }
}

export function toHeroData(mod: Module): ModuleHeroData {
  return {
    breadcrumbParent: 'Platform',
    breadcrumbParentHref: '/platform',
    breadcrumbCurrent: mod.name,
    categoryBadge: mod.badge,
    heading: mod.heroHeading,
    description: mod.heroDescription,
    primaryCta: {
      label: mod.heroPrimaryCtaText ?? 'Start free trial',
      href: mod.heroPrimaryCtaHref ?? '/get-started',
    },
    secondaryCta: {
      label: mod.heroSecondaryCtaText ?? 'See all features',
      href: mod.heroSecondaryCtaHref ?? '#features',
    },
    image: resolveImage(mod.heroImage, 'heroProduct'),
  }
}

export function toCapabilitiesData(mod: Module): ModuleCapabilitiesStripData {
  return {
    items: mod.capabilities.map((cap) => ({
      icon: cap.icon,
      title: cap.title,
    })),
  }
}

export function toFeatureBlocksData(mod: Module): ModuleFeatureBlockData[] {
  return mod.featureBlocks.map((block) => ({
    label: block.label,
    heading: block.heading,
    description: block.description,
    bullets: block.features.map((f) => f.text),
    cta: {
      text: block.ctaText,
      href: block.ctaHref,
    },
    image: resolveImage(block.image, 'featureScreenshot'),
  }))
}

export function toComparisonData(mod: Module): ModuleComparisonData {
  return {
    label: mod.comparisonLabel ?? 'WHY REVNATOR',
    heading: mod.comparisonHeading,
    cards: (mod.comparisonCards ?? []).map((card) => ({
      title: card.title,
      description: card.description,
    })),
    stats: (mod.comparisonStats ?? []).map((stat) => ({
      value: stat.number,
      label: stat.label,
    })),
  }
}

export function toRelatedModulesData(mod: Module): RelatedModulesData {
  const modules = (mod.relatedModules ?? [])
    .map((rel) => {
      const related = rel.module
      if (!related || typeof related === 'number') return null
      return {
        icon: related.icon,
        name: related.name,
        description: related.shortDescription ?? related.heroDescription,
        href: `/platform/${related.slug}`,
      }
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)

  return {
    label: 'EXPLORE MORE',
    heading: 'Works even better with these modules',
    modules,
  }
}

export function toCTAData(mod: Module): ModuleCTAData {
  return {
    heading: mod.ctaHeading,
    subheading: mod.ctaSubheading,
    primaryCta: {
      label: mod.ctaPrimaryText ?? 'Start free trial',
      href: mod.ctaPrimaryHref ?? '/get-started',
    },
    secondaryCta: {
      label: mod.ctaSecondaryText ?? 'Book a demo',
      href: mod.ctaSecondaryHref ?? '/demo',
    },
  }
}
