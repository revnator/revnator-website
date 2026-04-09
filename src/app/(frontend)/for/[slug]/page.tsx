import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { IndustryHero } from '@/components/sections/IndustryHero'
import { IndustrySocialProof } from '@/components/sections/IndustrySocialProof'
import { IndustryUseCases } from '@/components/sections/IndustryUseCases'
import { IndustryWorkflow } from '@/components/sections/IndustryWorkflow'
import { IndustryTestimonial } from '@/components/sections/IndustryTestimonial'
import { IndustryStack } from '@/components/sections/IndustryStack'
import { IndustryCTA } from '@/components/sections/IndustryCTA'
import {
  agenciesData,
  type IndustryPageData,
} from '@/components/sections/_industries/agenciesData'

const industryData: Record<string, IndustryPageData> = {
  agencies: agenciesData,
}

const industryLabels: Record<string, string> = {
  agencies: 'Agencies',
  saas: 'SaaS Sales',
  consultancies: 'Consultancies',
  recruiters: 'Recruiters',
  'real-estate': 'Real Estate',
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const data = industryData[slug]
  const label = industryLabels[slug]

  if (!data || !label) return {}

  return {
    title: `Revnator for ${label} | Revnator`,
    description: data.hero.description,
  }
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<React.ReactElement> {
  const { slug } = await params
  const data = industryData[slug]

  if (!data) notFound()

  return (
    <main>
      <IndustryHero data={data.hero} />
      <IndustrySocialProof data={data.socialProof} />
      <IndustryUseCases data={data.useCases} />
      <IndustryWorkflow data={data.workflow} />
      <IndustryTestimonial data={data.testimonial} />
      <IndustryStack data={data.stack} />
      <IndustryCTA data={data.cta} />
    </main>
  )
}
