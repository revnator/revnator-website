import type { Metadata } from 'next'
import type { SupportPage as SupportPageType } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'

import { SupportHero } from '@/components/sections/SupportHero'
import { SupportChannels } from '@/components/sections/SupportChannels'
import { SupportCategories } from '@/components/sections/SupportCategories'
import { SupportFAQ } from '@/components/sections/SupportFAQ'
import { SupportCTA } from '@/components/sections/SupportCTA'

export async function generateMetadata(): Promise<Metadata> {
  const page = (await getCachedGlobal('support-page', 1)()) as SupportPageType
  return {
    title: page.meta?.title || 'Support',
    description:
      page.meta?.description ||
      'Get help with Revnator. Browse documentation, email our support team, or join the community.',
  }
}

export default async function SupportPage(): Promise<React.ReactElement> {
  const page = (await getCachedGlobal('support-page', 1)()) as SupportPageType

  const heroData = {
    label: page.heroLabel || 'SUPPORT',
    heading: page.heroHeading || 'How can we help?',
    subheading:
      page.heroSubheading ||
      'Browse documentation, reach out to our team, or join the community.',
  }

  const channels = (page.channels ?? []).map((ch) => ({
    icon: ch.icon,
    title: ch.title,
    description: ch.description,
    linkText: ch.linkText,
    href: ch.href,
  }))

  const categoriesData = {
    heading: page.kbHeading || 'Knowledge Base',
    categories: (page.kbCategories ?? []).map((cat) => ({
      icon: cat.icon,
      title: cat.title,
      articleCount: cat.articleCount,
      href: cat.href,
    })),
  }

  const faqData = {
    heading: page.faqHeading || 'Frequently asked questions',
    faqs: (page.faqs ?? []).map((f) => ({
      question: f.question,
      answer: f.answer,
    })),
  }

  const ctaData = {
    heading: page.ctaHeading || 'Still need help?',
    subheading:
      page.ctaSubheading || 'Our support team typically responds within 24 hours.',
    primaryCta: {
      label: page.ctaPrimaryCta?.label || 'Email support',
      href: page.ctaPrimaryCta?.href || 'mailto:support@revnator.com',
    },
    secondaryCta: {
      label: page.ctaSecondaryCta?.label || 'Browse docs',
      href: page.ctaSecondaryCta?.href || '/docs',
    },
  }

  return (
    <main>
      <SupportHero data={heroData} />
      {channels.length > 0 && <SupportChannels channels={channels} />}
      {categoriesData.categories.length > 0 && <SupportCategories data={categoriesData} />}
      {faqData.faqs.length > 0 && <SupportFAQ data={faqData} />}
      <SupportCTA data={ctaData} />
    </main>
  )
}
