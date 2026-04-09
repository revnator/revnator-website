import type { Metadata } from 'next'
import { WhyHero } from '@/components/sections/WhyHero'
import { PainPoints } from '@/components/sections/PainPoints'
import { BeforeAfter } from '@/components/sections/BeforeAfter'
import { ValueProps } from '@/components/sections/ValueProps'
import { WhyFAQ } from '@/components/sections/WhyFAQ'
import { WhyCTA } from '@/components/sections/WhyCTA'

export const metadata: Metadata = {
  title: 'Why Revnator | The Sales OS That Replaces Your Entire Stack',
  description:
    'Stop juggling 5-7 sales tools. Revnator gives you CRM, sequences, pipeline, calendar, analytics, and AI in one workspace. Save up to 80%.',
}

export default function WhyRevnatorPage(): React.ReactElement {
  return (
    <main>
      <WhyHero />
      <PainPoints />
      <BeforeAfter />
      <ValueProps />
      <WhyFAQ />
      <WhyCTA />
    </main>
  )
}
