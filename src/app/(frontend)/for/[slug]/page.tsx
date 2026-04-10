import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Industry } from '@/payload-types'

import { IndustryHero } from '@/components/sections/IndustryHero'
import { IndustrySocialProof } from '@/components/sections/IndustrySocialProof'
import { IndustryUseCases } from '@/components/sections/IndustryUseCases'
import { IndustryWorkflow } from '@/components/sections/IndustryWorkflow'
import { IndustryTestimonial } from '@/components/sections/IndustryTestimonial'
import { IndustryStack } from '@/components/sections/IndustryStack'
import { IndustryCTA } from '@/components/sections/IndustryCTA'
import {
  toHeroData,
  toSocialProofData,
  toUseCasesData,
  toWorkflowData,
  toTestimonialData,
  toStackData,
  toCTAData,
} from '@/lib/adapters/industry'

const getIndustryBySlug = (slug: string) =>
  unstable_cache(
    async () => {
      const payload = await getPayload({ config })
      const result = await payload.find({
        collection: 'industries',
        where: {
          slug: { equals: slug },
          isPublished: { equals: true },
        },
        limit: 1,
        depth: 2,
      })
      return (result.docs[0] as Industry | undefined) ?? null
    },
    [`industry-${slug}`],
    { tags: [`industry-${slug}`] },
  )

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'industries',
    where: { isPublished: { equals: true } },
    limit: 100,
  })
  return result.docs.map((doc) => ({ slug: doc.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const industryDoc = await getIndustryBySlug(slug)()
  if (!industryDoc) return {}

  return {
    title: industryDoc.meta?.title ?? `Revnator for ${industryDoc.name} | Revnator`,
    description: industryDoc.meta?.description ?? industryDoc.heroDescription,
    openGraph: {
      images:
        industryDoc.meta?.image && typeof industryDoc.meta.image === 'object'
          ? [{ url: industryDoc.meta.image.url ?? '' }]
          : undefined,
    },
  }
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<React.ReactElement> {
  const { slug } = await params
  const industryDoc = await getIndustryBySlug(slug)()

  if (!industryDoc) notFound()

  const heroData = toHeroData(industryDoc)
  const socialProofData = toSocialProofData(industryDoc)
  const useCasesData = toUseCasesData(industryDoc)
  const workflowData = toWorkflowData(industryDoc)
  const testimonialData = toTestimonialData(industryDoc)
  const stackData = toStackData(industryDoc)
  const ctaData = toCTAData(industryDoc)

  return (
    <main>
      <IndustryHero data={heroData} />
      <IndustrySocialProof data={socialProofData} />
      <IndustryUseCases data={useCasesData} />
      <IndustryWorkflow data={workflowData} />
      <IndustryTestimonial data={testimonialData} />
      <IndustryStack data={stackData} />
      <IndustryCTA data={ctaData} />
    </main>
  )
}
