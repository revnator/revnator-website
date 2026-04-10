import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { LegalDocument } from '@/payload-types'

import { LegalDocLayout } from '@/components/sections/LegalDocLayout'

export interface LegalSidebarItem {
  slug: string
  title: string
}

export interface LegalDocData {
  slug: string
  title: string
  lastUpdated: string
  effectiveDate: string
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

const getLegalDocBySlug = (slug: string) =>
  unstable_cache(
    async () => {
      const payload = await getPayload({ config })
      const result = await payload.find({
        collection: 'legal-documents',
        where: {
          slug: { equals: slug },
          isPublished: { equals: true },
        },
        limit: 1,
        depth: 2,
      })
      return (result.docs[0] as LegalDocument | undefined) ?? null
    },
    [`legal-${slug}`],
    { tags: [`legal-${slug}`] },
  )

const getAllLegalDocs = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'legal-documents',
      where: { isPublished: { equals: true } },
      limit: 100,
      depth: 0,
    })
    return result.docs.map((d) => ({ slug: d.slug, title: d.title }))
  },
  ['legal-sidebar'],
  { tags: ['legal-docs'] },
)

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'legal-documents',
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
  const doc = await getLegalDocBySlug(slug)()
  if (!doc) return {}

  return {
    title: doc.meta?.title ?? `${doc.title} | Revnator`,
    description: doc.meta?.description ?? doc.description,
  }
}

export default async function LegalDocPage({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<React.ReactElement> {
  const { slug } = await params
  const doc = await getLegalDocBySlug(slug)()

  if (!doc) notFound()

  const allDocs = await getAllLegalDocs()

  const docData: LegalDocData = {
    slug: doc.slug,
    title: doc.title,
    lastUpdated: formatDate(doc.lastUpdated),
    effectiveDate: formatDate(doc.effectiveDate),
  }

  return (
    <main>
      <LegalDocLayout doc={docData} body={doc.body} sidebarDocs={allDocs} />
    </main>
  )
}
