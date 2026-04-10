import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Module } from '@/payload-types'

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
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'modules',
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
  const moduleDoc = await getModuleBySlug(slug)()
  if (!moduleDoc) return {}

  return {
    title: moduleDoc.meta?.title ?? moduleDoc.name,
    description: moduleDoc.meta?.description ?? moduleDoc.heroDescription,
    openGraph: {
      images:
        moduleDoc.meta?.image && typeof moduleDoc.meta.image === 'object'
          ? [{ url: moduleDoc.meta.image.url ?? '' }]
          : undefined,
    },
  }
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<React.ReactElement> {
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
}
