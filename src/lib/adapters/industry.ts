import type { Industry, Module } from '@/payload-types'
import type {
  IndustryHeroData,
  IndustrySocialProofData,
  IndustryUseCasesData,
  IndustryWorkflowData,
  IndustryTestimonialData,
  IndustryStackData,
  IndustryCTAData,
} from '@/components/sections/_industries/types'

export function toHeroData(ind: Industry): IndustryHeroData {
  return {
    breadcrumbLabel: `For ${ind.name}`,
    badge: ind.badge,
    heading: ind.heroHeading,
    description: ind.heroDescription,
    primaryCta: {
      label: ind.primaryCtaText ?? 'Start free trial',
      href: ind.primaryCtaHref ?? '/signup',
    },
    secondaryCta: {
      label: ind.secondaryCtaText ?? '',
      href: ind.secondaryCtaHref ?? '',
    },
    builtForLabel: ind.builtForLabel ?? 'Trusted by teams of all sizes',
    builtForTags: (ind.builtForTags ?? []).map((t) => t.text),
  }
}

export function toSocialProofData(ind: Industry): IndustrySocialProofData {
  return {
    stats: (ind.stats ?? []).map((s) => ({
      number: s.number,
      label: s.label,
    })),
  }
}

export function toUseCasesData(ind: Industry): IndustryUseCasesData {
  return {
    label: ind.useCasesSectionLabel ?? '',
    heading: ind.useCasesHeading ?? '',
    cards: (ind.useCaseCards ?? []).map((card) => ({
      number: card.number,
      title: card.title,
      description: card.description,
      tagLabel: card.tagLabel,
    })),
  }
}

export function toWorkflowData(ind: Industry): IndustryWorkflowData {
  return {
    label: ind.workflowSectionLabel ?? 'HOW IT WORKS',
    heading: ind.workflowHeading ?? '',
    subheading: ind.workflowSubheading ?? '',
    steps: (ind.workflowSteps ?? []).map((step) => ({
      number: Number(step.number),
      title: step.title,
      description: step.description,
    })),
  }
}

export function toTestimonialData(ind: Industry): IndustryTestimonialData {
  return {
    quote: ind.testimonialQuote,
    authorName: ind.testimonialAuthorName ?? '',
    authorTitle: ind.testimonialAuthorTitle ?? '',
    authorInitials: ind.testimonialAuthorInitials ?? '',
  }
}

export function toStackData(ind: Industry): IndustryStackData {
  const modules = (ind.stackModules ?? [])
    .map((sm) => {
      const mod = sm.module as Module | null
      if (!mod || typeof mod === 'number') return null
      return {
        icon: mod.icon,
        name: mod.name,
        why: sm.reason ?? '',
        href: `/platform/${mod.slug}`,
      }
    })
    .filter(Boolean) as IndustryStackData['modules']

  return {
    label: ind.stackLabel ?? 'RECOMMENDED STACK',
    heading: ind.stackHeading ?? '',
    modules,
  }
}

export function toCTAData(ind: Industry): IndustryCTAData {
  return {
    heading: ind.ctaHeading ?? 'Get started today',
    subheading: ind.ctaSubheading ?? '',
    primaryCta: {
      label: ind.ctaPrimaryText ?? 'Start free trial',
      href: ind.ctaPrimaryHref ?? '/signup',
    },
    secondaryCta: {
      label: ind.ctaSecondaryText ?? '',
      href: ind.ctaSecondaryHref ?? '/demo',
    },
  }
}
