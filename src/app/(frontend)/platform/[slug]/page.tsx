import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ModuleHero } from '@/components/sections/ModuleHero'
import { ModuleCapabilitiesStrip } from '@/components/sections/ModuleCapabilitiesStrip'
import { ModuleFeatureBlock } from '@/components/sections/ModuleFeatureBlock'
import { ModuleComparison } from '@/components/sections/ModuleComparison'
import { RelatedModules } from '@/components/sections/RelatedModules'
import { ModuleCTA } from '@/components/sections/ModuleCTA'
import {
  contactsModuleData,
  type ModulePageData,
} from '@/components/sections/_modules/contactsModuleData'

const moduleData: Record<string, ModulePageData> = {
  contacts: contactsModuleData,
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const data = moduleData[slug]
  if (!data) return {}

  return {
    title: `${data.hero.heading} | Revnator`,
    description: data.hero.description,
  }
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<React.ReactElement> {
  const { slug } = await params
  const data = moduleData[slug]

  if (!data) notFound()

  return (
    <main>
      <ModuleHero data={data.hero} />
      <ModuleCapabilitiesStrip data={data.capabilities} />
      {data.featureBlocks.map((block, i) => (
        <ModuleFeatureBlock key={block.label} data={block} reverse={i % 2 === 1} />
      ))}
      <ModuleComparison data={data.comparison} />
      <RelatedModules data={data.relatedModules} />
      <ModuleCTA data={data.cta} />
    </main>
  )
}
