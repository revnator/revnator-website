import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { LegalDocLayout } from '@/components/sections/LegalDocLayout'
import { legalDocs } from '@/components/sections/_legal/legalData'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const doc = legalDocs.find((d) => d.slug === slug)
  if (!doc) return {}

  return {
    title: `${doc.title} | Revnator`,
    description: doc.description,
  }
}

export default async function LegalDocPage({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<React.ReactElement> {
  const { slug } = await params
  const doc = legalDocs.find((d) => d.slug === slug)

  if (!doc) notFound()

  return (
    <main>
      <LegalDocLayout doc={doc} />
    </main>
  )
}
