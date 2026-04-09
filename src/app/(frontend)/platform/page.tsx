import type { Metadata } from 'next'
import { PlatformHero } from '@/components/sections/PlatformHero'
import { PlatformModulesGrid } from '@/components/sections/PlatformModulesGrid'
import { PlatformConnected } from '@/components/sections/PlatformConnected'
import { PlatformPricingTeaser } from '@/components/sections/PlatformPricingTeaser'
import { PlatformFinalCTA } from '@/components/sections/PlatformFinalCTA'

export const metadata: Metadata = {
  title: 'Platform | Revnator',
  description:
    'Explore the Revnator platform — 9 integrated modules for contacts, accounts, email, pipeline, calendar, chat, AI, and more.',
}

export default function PlatformPage(): React.ReactElement {
  return (
    <main>
      <PlatformHero />
      <PlatformModulesGrid />
      <PlatformConnected />
      <PlatformPricingTeaser />
      <PlatformFinalCTA />
    </main>
  )
}
