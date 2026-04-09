import { Hero } from '@/components/sections/Hero'
import { TrustedBy } from '@/components/sections/TrustedBy'
import { PlatformCapabilities } from '@/components/sections/PlatformCapabilities'
import { FeatureShowcase } from '@/components/sections/FeatureShowcase'
import { StatsBar } from '@/components/sections/StatsBar'
import { Testimonials } from '@/components/sections/Testimonials'
import { Integrations } from '@/components/sections/Integrations'
import { FinalCTA } from '@/components/sections/FinalCTA'
import {
  showcase1Data,
  showcase2Data,
  showcase3Data,
} from '@/components/sections/featureShowcaseData'

export default function HomePage(): React.ReactElement {
  return (
    <main>
      <Hero />
      <TrustedBy />
      <PlatformCapabilities />
      <FeatureShowcase data={showcase1Data} />
      <FeatureShowcase data={showcase2Data} reverse />
      <FeatureShowcase data={showcase3Data} />
      <StatsBar />
      <Testimonials />
      <Integrations />
      <FinalCTA />
    </main>
  )
}
