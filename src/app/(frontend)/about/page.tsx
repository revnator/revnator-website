import type { Metadata } from 'next'
import { AboutHero } from '@/components/sections/AboutHero'
import { AboutMission } from '@/components/sections/AboutMission'
import { AboutStory } from '@/components/sections/AboutStory'
import { AboutValues } from '@/components/sections/AboutValues'
import { AboutTeam } from '@/components/sections/AboutTeam'
import { AboutCTA } from '@/components/sections/AboutCTA'
import {
  aboutMissionData,
  aboutStoryData,
  aboutValuesData,
  aboutTeamData,
} from '@/components/sections/_about/aboutData'

export const metadata: Metadata = {
  title: 'About | Revnator',
  description:
    'Learn about Revnator — the sales OS built for closers. Our mission, story, values, and the team behind the product.',
}

export default function AboutPage(): React.ReactElement {
  return (
    <main>
      <AboutHero />
      <AboutMission data={aboutMissionData} />
      <AboutStory data={aboutStoryData} />
      <AboutValues data={aboutValuesData} />
      <AboutTeam data={aboutTeamData} />
      <AboutCTA />
    </main>
  )
}
