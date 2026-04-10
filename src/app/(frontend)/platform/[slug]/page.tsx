import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Module } from '@/payload-types'
import { getOgImageUrl } from '@/lib/getOgImageUrl'

import { ModuleHero } from '@/components/sections/ModuleHero'
import { ModuleCapabilitiesStrip } from '@/components/sections/ModuleCapabilitiesStrip'
import { ModuleFeatureBlock } from '@/components/sections/ModuleFeatureBlock'
import { ModuleComparison } from '@/components/sections/ModuleComparison'
import { RelatedModules } from '@/components/sections/RelatedModules'
import { ModuleCTA } from '@/components/sections/ModuleCTA'
import {
  toHeroData,
  toCapabilitiesData,
  toFeatureBlocksData,
  toComparisonData,
  toRelatedModulesData,
  toCTAData,
} from '@/lib/adapters/module'

const getModuleBySlug = (slug: string) =>
  unstable_cache(
    async () => {
      const payload = await getPayload({ config })
      const result = await payload.find({
        collection: 'modules',
        where: {
          slug: { equals: slug },
          isPublished: { equals: true },
        },
        limit: 1,
        depth: 2,
      })
      return (result.docs[0] as Module | undefined) ?? null
    },
    [`module-${slug}`],
    { tags: [`module-${slug}`] },
  )

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'modules',
      where: { isPublished: { equals: true } },
      limit: 100,
    })
    return result.docs.map((doc) => ({ slug: doc.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  try {
    const { slug } = await params
    const moduleDoc = await getModuleBySlug(slug)()
    if (!moduleDoc) return {}

    const title = moduleDoc.meta?.title ?? moduleDoc.name
    const description = moduleDoc.meta?.description ?? moduleDoc.heroDescription
    return {
      title,
      description,
      openGraph: {
        title: typeof title === 'string' ? title : undefined,
        description: typeof description === 'string' ? description : undefined,
        images: getOgImageUrl(moduleDoc.meta?.image)
          ? [{ url: getOgImageUrl(moduleDoc.meta?.image)! }]
          : undefined,
      },
    }
  } catch {
    return { title: 'Revnator', description: 'The sales OS for closers' }
  }
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<React.ReactElement> {
  try {
    const { slug } = await params
    const moduleDoc = await getModuleBySlug(slug)()

    if (!moduleDoc) notFound()

    const heroData = toHeroData(moduleDoc)
    const capabilitiesData = toCapabilitiesData(moduleDoc)
    const featureBlocksData = toFeatureBlocksData(moduleDoc)
    const comparisonData = toComparisonData(moduleDoc)
    const relatedModulesData = toRelatedModulesData(moduleDoc)
    const ctaData = toCTAData(moduleDoc)

    return (
      <main>
        <ModuleHero data={heroData} />
        <ModuleCapabilitiesStrip data={capabilitiesData} />
        {featureBlocksData.map((block, i) => (
          <ModuleFeatureBlock key={block.label} data={block} reverse={i % 2 === 1} />
        ))}
        <ModuleComparison data={comparisonData} />
        <RelatedModules data={relatedModulesData} />
        <ModuleCTA data={ctaData} />
      </main>
    )
  } catch (error) {
    console.error('Failed to render module page:', error)
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
