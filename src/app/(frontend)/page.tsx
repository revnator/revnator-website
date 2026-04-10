import type { HomePage as HomePageType } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getImageUrl, getImageAlt } from '@/lib/getImageUrl'

import { Hero } from '@/components/sections/Hero'
import { TrustedBy } from '@/components/sections/TrustedBy'
import { PlatformCapabilities } from '@/components/sections/PlatformCapabilities'
import { FeatureShowcase } from '@/components/sections/FeatureShowcase'
import { StatsBar } from '@/components/sections/StatsBar'
import { Testimonials } from '@/components/sections/Testimonials'
import { Integrations } from '@/components/sections/Integrations'
import { FinalCTA } from '@/components/sections/FinalCTA'

export default async function HomePage(): Promise<React.ReactElement> {
  let page: HomePageType
  try {
    page = (await getCachedGlobal('home-page', 1)()) as HomePageType
  } catch (error) {
    console.error('Failed to fetch home-page global:', error)
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted">This page is temporarily unavailable.</p>
      </main>
    )
  }

  const heroData = {
    badge: page.heroBadge || 'REVENUE ACCELERATOR',
    headline: page.heroHeadline || 'The sales workspace built for',
    headlineAccent: page.heroHeadlineAccent || 'closers',
    subheadline:
      page.heroSubheadline ||
      'Everything your sales team needs in one place — contacts, email sequences, deal pipeline, calendar, and analytics. No more switching between five tools.',
    primaryCta: {
      label: page.heroPrimaryCta?.label || 'Start free trial',
      href: page.heroPrimaryCta?.href || '/signup',
    },
    secondaryCta: {
      label: page.heroSecondaryCta?.label || 'Book a demo',
      href: page.heroSecondaryCta?.href || '/demo',
    },
    trustLine: page.heroTrustLine || 'No credit card required · Free for up to 3 users',
    stats: (page.heroStats ?? []).map((s) => ({
      label: s.label,
      type: s.type as 'trending-up' | 'check-circle',
    })),
  }

  const trustedByData = {
    label: page.trustedByLabel || 'Trusted by fast-growing sales teams',
    logos: (page.trustedByLogos ?? []).map((l) => ({
      name: l.name,
      logoUrl: getImageUrl(l.logo, 'logo'),
    })),
  }

  const capabilities = (page.capabilities ?? []).map((c) => ({
    icon: c.icon,
    title: c.title,
    description: c.description,
    href: c.href,
  }))

  const featureShowcases = (page.featureShowcases ?? []).map((fs, i) => ({
    label: fs.label,
    heading: fs.heading,
    description: fs.description,
    bullets: (fs.bullets ?? []).map((b) => b.text),
    linkLabel: fs.linkLabel,
    linkHref: fs.linkHref,
    reverse: fs.reverse ?? false,
    imageUrl: getImageUrl(fs.image, 'featureScreenshot'),
    imageAlt: getImageAlt(fs.image, fs.heading),
    bgClass: i % 2 === 0 ? 'bg-white' : 'bg-bg',
    frameBgClass: i % 2 === 0 ? 'bg-bg' : 'bg-white',
  }))

  const stats = (page.stats ?? []).map((s) => ({
    value: s.value,
    label: s.label,
  }))

  const testimonials = (page.testimonials ?? []).map((t) => ({
    quote: t.quote,
    name: t.name,
    title: t.title,
    initials: t.initials,
    avatarUrl: getImageUrl(t.avatar, 'avatar'),
  }))

  const integrations = (page.integrations ?? []).map((item) => ({
    name: item.name,
    logoUrl: getImageUrl(item.logo, 'icon'),
  }))

  const ctaData = {
    heading: page.ctaHeading || 'Ready to close more deals?',
    subheading:
      page.ctaSubheading ||
      'Join the early access program. Free for up to 3 users. No credit card required.',
    primaryCta: {
      label: page.ctaPrimaryCta?.label || 'Start free trial',
      href: page.ctaPrimaryCta?.href || '/signup',
    },
    secondaryCta: {
      label: page.ctaSecondaryCta?.label || 'Book a demo',
      href: page.ctaSecondaryCta?.href || '/demo',
    },
  }

  return (
    <main>
      <Hero data={heroData} />
      <TrustedBy data={trustedByData} />
      {capabilities.length > 0 && <PlatformCapabilities capabilities={capabilities} />}
      {featureShowcases.map((fs, i) => (
        <FeatureShowcase key={fs.label + i} data={fs} />
      ))}
      {stats.length > 0 && <StatsBar stats={stats} />}
      {testimonials.length > 0 && <Testimonials testimonials={testimonials} />}
      {integrations.length > 0 && <Integrations integrations={integrations} />}
      <FinalCTA data={ctaData} />
    </main>
  )
}
