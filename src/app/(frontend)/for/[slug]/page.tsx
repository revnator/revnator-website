import { notFound } from 'next/navigation'
import Link from 'next/link'
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

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  try {
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
  } catch {
    return { title: 'Revnator', description: 'The sales OS for closers' }
  }
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<React.ReactElement> {
  try {
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
  } catch (error) {
    console.error('Failed to render industry page:', error)
    return (
      <main className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold text-dark">Page temporarily unavailable</h1>
          <p className="mt-4 font-body text-muted">Please try again in a moment.</p>
          <Link href="/" className="mt-6 inline-block font-body text-sm font-semibold text-primary hover:underline">Go to homepage</Link>
        </div>
      </main>
    )
  }
}
