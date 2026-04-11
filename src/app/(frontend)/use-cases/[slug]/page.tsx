import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { UseCase } from '@/payload-types'

import { UseCaseHero } from '@/components/sections/UseCaseHero'
import { UseCasePainPoints } from '@/components/sections/UseCasePainPoints'
import { UseCaseSolution } from '@/components/sections/UseCaseSolution'
import { UseCaseRelatedModules } from '@/components/sections/UseCaseRelatedModules'
import { UseCaseCTA } from '@/components/sections/UseCaseCTA'
import {
  toHeroData,
  toPainPointsData,
  toSolutionsData,
  toRelatedModulesData,
  toCTAData,
} from '@/lib/adapters/useCase'

const getUseCaseBySlug = (slug: string) =>
  unstable_cache(
    async () => {
      const payload = await getPayload({ config })
      const result = await payload.find({
        collection: 'use-cases',
        where: {
          slug: { equals: slug },
          isPublished: { equals: true },
        },
        limit: 1,
        depth: 2,
      })
      return (result.docs[0] as UseCase | undefined) ?? null
    },
    [`use-case-${slug}`],
    { tags: [`use-case-${slug}`] },
  )

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  try {
    const { slug } = await params
    const useCaseDoc = await getUseCaseBySlug(slug)()
    if (!useCaseDoc) return {}

    return {
      title: useCaseDoc.meta?.title ?? `${useCaseDoc.name} | Revnator Use Cases`,
      description: useCaseDoc.meta?.description ?? useCaseDoc.heroDescription,
      openGraph: {
        images:
          useCaseDoc.meta?.image && typeof useCaseDoc.meta.image === 'object'
            ? [{ url: useCaseDoc.meta.image.url ?? '' }]
            : undefined,
      },
    }
  } catch {
    return { title: 'Revnator', description: 'The sales OS for closers' }
  }
}

export default async function UseCasePage({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<React.ReactElement> {
  try {
    const { slug } = await params
    const useCaseDoc = await getUseCaseBySlug(slug)()

    if (!useCaseDoc) notFound()

    const heroData = toHeroData(useCaseDoc)
    const painPointsData = toPainPointsData(useCaseDoc)
    const solutionsData = toSolutionsData(useCaseDoc)
    const relatedModulesData = toRelatedModulesData(useCaseDoc)
    const ctaData = toCTAData(useCaseDoc)

    return (
      <main>
        <UseCaseHero data={heroData} />
        <UseCasePainPoints data={painPointsData} />
        {solutionsData.map((s, i) => (
          <UseCaseSolution key={s.label} data={s} reverse={i % 2 === 1} />
        ))}
        <UseCaseRelatedModules data={relatedModulesData} />
        <UseCaseCTA data={ctaData} />
      </main>
    )
  } catch (error) {
    console.error('Failed to render use case page:', error)
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
