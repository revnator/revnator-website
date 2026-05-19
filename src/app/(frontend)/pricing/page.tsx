import type { Metadata } from 'next'
import type { PricingPage as PricingPageType } from '@/payload-types'
import { getOgImageUrl } from '@/lib/getOgImageUrl'
import { getCachedGlobal } from '@/utilities/getGlobals'

import { PricingPlansSection } from '@/components/sections/PricingPlansSection'
import { EnterpriseBanner } from '@/components/sections/EnterpriseBanner'
import { PricingComparisonTable } from '@/components/sections/PricingComparisonTable'
import { PricingFAQ } from '@/components/sections/PricingFAQ'
import { PricingCTA } from '@/components/sections/PricingCTA'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = (await getCachedGlobal('pricing-page', 1)()) as PricingPageType
    const title = page.meta?.title || 'Pricing'
    const description =
      page.meta?.description ||
      "Simple, transparent pricing for Revnator. Start free, upgrade when you're ready."
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: getOgImageUrl(page.meta?.image)
          ? [{ url: getOgImageUrl(page.meta?.image)! }]
          : undefined,
      },
    }
  } catch {
    return { title: 'Pricing', description: "Simple, transparent pricing for Revnator. Start free, upgrade when you're ready." }
  }
}

export default async function PricingPage(): Promise<React.ReactElement> {
  let page: PricingPageType
  try {
    page = (await getCachedGlobal('pricing-page', 1)()) as PricingPageType
  } catch (error) {
    console.error('Failed to fetch pricing-page global:', error)
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted">This page is temporarily unavailable.</p>
      </main>
    )
  }

  const plansData = {
    label: page.heroLabel || 'PRICING',
    heading: page.heroHeading || 'Simple pricing. No surprises.',
    subheading:
      page.heroSubheading ||
      "Start free. Upgrade when you're ready. Every plan includes unlimited contacts.",
    trialNote:
      page.heroTrialNote ||
      'All paid plans include a 14-day free trial. No credit card required.',
    plans: (page.plans ?? []).map((plan) => ({
      name: plan.name,
      monthlyPrice: plan.monthlyPrice,
      annualPrice: plan.annualPrice,
      period: plan.period,
      description: plan.description,
      features: (plan.features ?? []).map((f) => ({
        text: f.text,
        included: f.included ?? true,
      })),
      ctaLabel: plan.ctaLabel,
      ctaHref: plan.ctaHref,
      highlighted: plan.highlighted ?? false,
    })),
  }

  const enterpriseData = {
    heading: page.enterpriseHeading || 'Need more?',
    description:
      page.enterpriseDescription ||
      'Our Enterprise plan includes custom limits, SSO, SCIM, dedicated onboarding, SLA guarantees, and a dedicated account manager.',
    ctaLabel: page.enterpriseCtaLabel || 'Contact sales',
    ctaHref: page.enterpriseCtaHref || '/contact',
  }

  const comparisonData = {
    heading: page.comparisonHeading || 'Compare plans in detail',
    categories: (page.comparisonCategories ?? []).map((cat) => ({
      name: cat.name,
      rows: (cat.rows ?? []).map((row) => ({
        feature: row.feature,
        free: row.free,
        starter: row.starter,
        growth: row.growth,
        pro: row.pro,
      })),
    })),
  }

  const faqData = {
    heading: page.faqHeading || 'Frequently asked questions',
    faqs: (page.faqs ?? []).map((faq) => ({
      question: faq.question,
      answer: faq.answer,
    })),
  }

  const ctaData = {
    heading: page.ctaHeading || 'Start selling smarter today',
    subheading:
      page.ctaSubheading ||
      'Join thousands of sales teams using Revnator. Free forever for up to 3 users.',
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
      <PricingPlansSection data={plansData} />
      <EnterpriseBanner data={enterpriseData} />
      {comparisonData.categories.length > 0 && (
        <PricingComparisonTable data={comparisonData} />
      )}
      {faqData.faqs.length > 0 && <PricingFAQ data={faqData} />}
      <PricingCTA data={ctaData} />
    </main>
  )
}
