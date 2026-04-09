import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { UseCaseHero } from '@/components/sections/UseCaseHero'
import { UseCasePainPoints } from '@/components/sections/UseCasePainPoints'
import { UseCaseSolution } from '@/components/sections/UseCaseSolution'
import { UseCaseRelatedModules } from '@/components/sections/UseCaseRelatedModules'
import { UseCaseCTA } from '@/components/sections/UseCaseCTA'
import {
  salesOpsUseCaseData,
  type UseCasePageData,
} from '@/components/sections/_useCases/salesOpsUseCaseData'

const useCaseData: Record<string, UseCasePageData> = {
  'sales-operations': salesOpsUseCaseData,
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const data = useCaseData[slug]
  if (!data) return {}

  return {
    title: `${data.hero.breadcrumbCurrent} | Revnator Use Cases`,
    description: data.hero.description,
  }
}

export default async function UseCasePage({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<React.ReactElement> {
  const { slug } = await params
  const data = useCaseData[slug]

  if (!data) notFound()

  return (
    <main>
      <UseCaseHero data={data.hero} />
      <UseCasePainPoints data={data.painPoints} />
      {data.solutions.map((s, i) => (
        <UseCaseSolution key={s.label} data={s} reverse={i % 2 === 1} />
      ))}
      <UseCaseRelatedModules data={data.relatedModules} />
      <UseCaseCTA data={data.cta} />
    </main>
  )
}
