import type { Metadata } from 'next'
import type { AboutPage as AboutPageType } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getImageUrl } from '@/lib/getImageUrl'

import { AboutHero } from '@/components/sections/AboutHero'
import { AboutMission } from '@/components/sections/AboutMission'
import { AboutStory } from '@/components/sections/AboutStory'
import { AboutValues } from '@/components/sections/AboutValues'
import { AboutTeam } from '@/components/sections/AboutTeam'
import { AboutCTA } from '@/components/sections/AboutCTA'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = (await getCachedGlobal('about-page', 1)()) as AboutPageType
    return {
      title: page.meta?.title || 'About',
      description:
        page.meta?.description ||
        'Learn about Revnator — the sales OS built for closers.',
    }
  } catch {
    return { title: 'About', description: 'Learn about Revnator — the sales OS built for closers.' }
  }
}

export default async function AboutPage(): Promise<React.ReactElement> {
  let page: AboutPageType
  try {
    page = (await getCachedGlobal('about-page', 1)()) as AboutPageType
  } catch (error) {
    console.error('Failed to fetch about-page global:', error)
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted">This page is temporarily unavailable.</p>
      </main>
    )
  }

  const heroData = {
    label: page.heroLabel || 'ABOUT REVNATOR',
    heading: page.heroHeading || 'Built by a closer, for closers',
    subheading:
      page.heroSubheading ||
      'Revnator is the sales OS that was born from frustration with bloated tools and fragmented workflows.',
  }

  const missionData = {
    label: page.missionLabel || 'OUR MISSION',
    heading: page.missionHeading || 'Sales tools should help you sell, not slow you down.',
    paragraphs: (page.missionParagraphs ?? []).map((p) => p.text),
  }

  const storyData = {
    label: page.storyLabel || 'OUR STORY',
    heading: page.storyHeading || 'How we got here',
    milestones: (page.milestones ?? []).map((m) => ({
      year: m.year,
      title: m.title,
      description: m.description,
    })),
  }

  const valuesData = {
    label: page.valuesLabel || 'WHAT WE BELIEVE',
    heading: page.valuesHeading || 'The principles that guide every decision',
    values: (page.values ?? []).map((v) => ({
      icon: v.icon,
      title: v.title,
      description: v.description,
    })),
  }

  const teamData = {
    label: page.teamLabel || 'THE TEAM',
    heading: page.teamHeading || 'Meet the founder',
    subheading:
      page.teamSubheading ||
      'Revnator is currently a solo-founder operation. We\'re growing soon.',
    founder: {
      initials: page.founder?.initials || 'S',
      name: page.founder?.name || 'Sabareesh S R',
      title: page.founder?.title || 'Founder & CEO',
      bio: page.founder?.bio || '',
      avatarUrl: getImageUrl(page.founder?.avatar, 'avatar'),
    },
  }

  const ctaData = {
    heading: page.ctaHeading || 'Join us on the journey',
    subheading:
      page.ctaSubheading ||
      'We\'re just getting started. Try Revnator free and see why sales teams love it.',
    primaryCta: {
      label: page.ctaPrimaryCta?.label || 'Start free trial',
      href: page.ctaPrimaryCta?.href || '/signup',
    },
    secondaryCta: {
      label: page.ctaSecondaryCta?.label || 'Contact us',
      href: page.ctaSecondaryCta?.href || '/contact',
    },
  }

  return (
    <main>
      <AboutHero data={heroData} />
      {missionData.paragraphs.length > 0 && <AboutMission data={missionData} />}
      {storyData.milestones.length > 0 && <AboutStory data={storyData} />}
      {valuesData.values.length > 0 && <AboutValues data={valuesData} />}
      <AboutTeam data={teamData} />
      <AboutCTA data={ctaData} />
    </main>
  )
}
