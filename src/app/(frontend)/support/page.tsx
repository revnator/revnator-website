import type { Metadata } from 'next'
import { SupportHero } from '@/components/sections/SupportHero'
import { SupportChannels } from '@/components/sections/SupportChannels'
import { SupportCategories } from '@/components/sections/SupportCategories'
import { SupportFAQ } from '@/components/sections/SupportFAQ'
import { SupportCTA } from '@/components/sections/SupportCTA'

export const metadata: Metadata = {
  title: 'Support | Revnator',
  description:
    'Get help with Revnator. Browse documentation, email our support team, or join the community.',
}

export default function SupportPage(): React.ReactElement {
  return (
    <main>
      <SupportHero />
      <SupportChannels />
      <SupportCategories />
      <SupportFAQ />
      <SupportCTA />
    </main>
  )
}
