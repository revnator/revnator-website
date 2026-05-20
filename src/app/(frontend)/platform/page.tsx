import type { Metadata } from 'next'
import type { PlatformPage as PlatformPageType } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'

import { PlatformHero } from '@/components/sections/PlatformHero'
import { PlatformModulesGrid } from '@/components/sections/PlatformModulesGrid'
import { PlatformConnected } from '@/components/sections/PlatformConnected'
import { PlatformPricingTeaser } from '@/components/sections/PlatformPricingTeaser'
import { PlatformFinalCTA } from '@/components/sections/PlatformFinalCTA'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = (await getCachedGlobal('platform-page', 1)()) as PlatformPageType
    return {
      title: page.meta?.title || 'Platform',
      description:
        page.meta?.description ||
        'Explore the Revnator platform — 12 integrated modules for contacts, accounts, email, pipeline, social media, AI, and more.',
    }
  } catch {
    return { title: 'Platform', description: 'Explore the Revnator platform — 12 integrated modules for contacts, accounts, email, pipeline, social media, AI, and more.' }
  }
}

export default async function PlatformPage(): Promise<React.ReactElement> {
  let page: PlatformPageType
  try {
    page = (await getCachedGlobal('platform-page', 1)()) as PlatformPageType
  } catch (error) {
    console.error('Failed to fetch platform-page global:', error)
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted">This page is temporarily unavailable.</p>
      </main>
    )
  }

  const heroData = {
    badge: page.heroBadge || 'Platform',
    heading: page.heroHeading || 'One platform. Twelve modules. Zero compromises.',
    subheading:
      page.heroSubheading ||
      'Every tool your revenue team needs — CRM, outreach, pipeline, calendar, docs, chat, forms, and AI — unified in a single workspace.',
    primaryCta: {
      label: page.heroPrimaryCta?.label || 'Start free trial',
      href: page.heroPrimaryCta?.href || '/get-started',
    },
    secondaryCta: {
      label: page.heroSecondaryCta?.label || 'See pricing',
      href: page.heroSecondaryCta?.href || '/pricing',
    },
  }

  const gridData = {
    label: page.gridLabel || 'MODULES',
    heading: page.gridHeading || 'Built for every stage of your sales process',
    subheading: page.gridSubheading || 'Click any module to explore its features in depth',
  }

  const connectedData = {
    label: page.connectedLabel || 'Connected by Design',
    heading: page.connectedHeading || 'One workspace. Everything connected.',
    subheading:
      page.connectedSubheading ||
      'Every module shares the same data layer. No syncing, no exports, no broken integrations — just one unified source of truth.',
    stats: (page.connectedStats ?? []).map((s) => ({
      value: s.value,
      label: s.label,
    })),
  }

  const pricingTeaserData = {
    label: page.pricingLabel || 'Pricing',
    heading: page.pricingHeading || 'Simple, transparent pricing',
    subheading: page.pricingSubheading || "Start free with up to 3 users. Upgrade when you're ready.",
    pills: (page.pricingPills ?? []).map((p) => ({
      name: p.name,
      price: p.price,
    })),
  }

  const ctaData = {
    heading: page.ctaHeading || 'Ready to unify your revenue stack?',
    subheading: page.ctaSubheading || 'Free for up to 3 users. No credit card required.',
    primaryCta: {
      label: page.ctaPrimaryCta?.label || 'Start free trial',
      href: page.ctaPrimaryCta?.href || '/get-started',
    },
    secondaryCta: {
      label: page.ctaSecondaryCta?.label || 'Book a demo',
      href: page.ctaSecondaryCta?.href || '/demo',
    },
  }

  return (
    <main>
      <PlatformHero data={heroData} />
      <PlatformModulesGrid data={gridData} />
      <PlatformConnected data={connectedData} />
      <PlatformPricingTeaser data={pricingTeaserData} />
      <PlatformFinalCTA data={ctaData} />
    </main>
  )
}
