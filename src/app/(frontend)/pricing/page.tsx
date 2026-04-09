import type { Metadata } from 'next'
import { PricingPlansSection } from '@/components/sections/PricingPlansSection'
import { EnterpriseBanner } from '@/components/sections/EnterpriseBanner'
import { PricingComparisonTable } from '@/components/sections/PricingComparisonTable'
import { PricingFAQ } from '@/components/sections/PricingFAQ'
import { PricingCTA } from '@/components/sections/PricingCTA'

export const metadata: Metadata = {
  title: 'Pricing | Revnator',
  description:
    'Simple, transparent pricing for Revnator. Start free, upgrade when you\'re ready. Every plan includes a 14-day free trial.',
}

export default function PricingPage(): React.ReactElement {
  return (
    <main>
      <PricingPlansSection />
      <EnterpriseBanner />
      <PricingComparisonTable />
      <PricingFAQ />
      <PricingCTA />
    </main>
  )
}
