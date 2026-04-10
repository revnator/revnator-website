import type { Metadata } from 'next'
import type { WhyRevnator as WhyRevnatorType } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'

import { WhyHero } from '@/components/sections/WhyHero'
import { PainPoints } from '@/components/sections/PainPoints'
import { BeforeAfter } from '@/components/sections/BeforeAfter'
import { ValueProps } from '@/components/sections/ValueProps'
import { WhyFAQ } from '@/components/sections/WhyFAQ'
import { WhyCTA } from '@/components/sections/WhyCTA'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = (await getCachedGlobal('why-revnator', 1)()) as WhyRevnatorType
    return {
      title: page.meta?.title || 'Why Revnator',
      description:
        page.meta?.description ||
        'Stop juggling 5-7 sales tools. Revnator gives you CRM, sequences, pipeline, calendar, analytics, and AI in one workspace.',
    }
  } catch {
    return { title: 'Why Revnator', description: 'Stop juggling 5-7 sales tools. Revnator gives you CRM, sequences, pipeline, calendar, analytics, and AI in one workspace.' }
  }
}

export default async function WhyRevnatorPage(): Promise<React.ReactElement> {
  let page: WhyRevnatorType
  try {
    page = (await getCachedGlobal('why-revnator', 1)()) as WhyRevnatorType
  } catch (error) {
    console.error('Failed to fetch why-revnator global:', error)
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted">This page is temporarily unavailable.</p>
      </main>
    )
  }

  const heroData = {
    label: page.heroLabel || 'WHY REVNATOR',
    heading: page.heroHeading || 'Stop paying for 5 tools that don\'t talk to each other',
    subheading:
      page.heroSubheading ||
      'Revnator replaces your entire sales stack with one connected workspace.',
    primaryCta: {
      label: page.heroPrimaryCta?.label || 'Start free trial',
      href: page.heroPrimaryCta?.href || '/signup',
    },
    secondaryCta: {
      label: page.heroSecondaryCta?.label || 'See pricing',
      href: page.heroSecondaryCta?.href || '/pricing',
    },
  }

  const painPointsData = {
    label: page.painPointsLabel || 'THE PROBLEM',
    heading: page.painPointsHeading || 'Your sales stack is holding you back',
    painPoints: (page.painPoints ?? []).map((p) => ({
      number: p.number,
      title: p.title,
      description: p.description,
    })),
  }

  const beforeAfterData = {
    label: page.beforeAfterLabel || 'THE SWITCH',
    heading: page.beforeAfterHeading || 'Replace your entire stack',
    withoutTools: (page.withoutTools ?? []).map((t) => ({
      name: t.name,
      price: t.price,
    })),
    withCapabilities: (page.withCapabilities ?? []).map((c) => ({
      text: c.text,
    })),
    revnatorPrice: page.revnatorPrice || 'From $0/mo',
  }

  const valuePropsData = {
    label: page.valuePropsLabel || 'WHY TEAMS CHOOSE US',
    heading: page.valuePropsHeading || 'Built for the way you actually sell',
    valueProps: (page.valueProps ?? []).map((vp) => ({
      icon: vp.icon,
      heading: vp.heading,
      description: vp.description,
      bullets: (vp.bullets ?? []).map((b) => b.text),
    })),
  }

  const faqData = {
    heading: page.faqHeading || 'Common questions',
    faqs: (page.faqs ?? []).map((f) => ({
      question: f.question,
      answer: f.answer,
    })),
  }

  const ctaData = {
    heading: page.ctaHeading || 'Ready to simplify your sales stack?',
    subheading:
      page.ctaSubheading || 'Start free. No credit card required. Set up in 5 minutes.',
    primaryCta: {
      label: page.ctaPrimaryCta?.label || 'Start free trial',
      href: page.ctaPrimaryCta?.href || '/signup',
    },
    secondaryCta: {
      label: page.ctaSecondaryCta?.label || 'Compare plans',
      href: page.ctaSecondaryCta?.href || '/pricing',
    },
  }

  return (
    <main>
      <WhyHero data={heroData} />
      {painPointsData.painPoints.length > 0 && <PainPoints data={painPointsData} />}
      {(beforeAfterData.withoutTools.length > 0 || beforeAfterData.withCapabilities.length > 0) && (
        <BeforeAfter data={beforeAfterData} />
      )}
      {valuePropsData.valueProps.length > 0 && <ValueProps data={valuePropsData} />}
      {faqData.faqs.length > 0 && <WhyFAQ data={faqData} />}
      <WhyCTA data={ctaData} />
    </main>
  )
}
