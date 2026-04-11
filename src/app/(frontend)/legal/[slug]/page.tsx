import { notFound } from 'next/navigation'
import Link from 'next/link'
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

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  try {
    const { slug } = await params
    const doc = await getLegalDocBySlug(slug)()
    if (!doc) return {}

    return {
      title: doc.meta?.title ?? `${doc.title} | Revnator`,
      description: doc.meta?.description ?? doc.description,
    }
  } catch {
    return { title: 'Revnator', description: 'The sales OS for closers' }
  }
}

export default async function LegalDocPage({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<React.ReactElement> {
  try {
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
  } catch (error) {
    console.error('Failed to render legal document:', error)
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
