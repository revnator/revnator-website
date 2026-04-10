import type { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { LegalDocument, LegalPage as LegalPageType } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'

import { LegalHub } from '@/components/sections/LegalHub'

export async function generateMetadata(): Promise<Metadata> {
  const page = (await getCachedGlobal('legal-page', 1)()) as LegalPageType
  return {
    title: page.meta?.title || 'Legal | Revnator',
    description:
      page.meta?.description ||
      'Privacy Policy, Terms of Service, Cookie Policy, and other legal documents for Revnator.',
  }
}

export interface LegalDocCard {
  slug: string
  title: string
  description: string
  icon: string
  lastUpdated: string
}

const getLegalDocs = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'legal-documents',
      where: { isPublished: { equals: true } },
      limit: 100,
      depth: 1,
    })
    return result.docs as LegalDocument[]
  },
  ['legal-listing'],
  { tags: ['legal-docs'] },
)

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

function toCard(doc: LegalDocument): LegalDocCard {
  return {
    slug: doc.slug,
    title: doc.title,
    description: doc.description,
    icon: doc.icon ?? 'FileText',
    lastUpdated: formatDate(doc.lastUpdated),
  }
}

export default async function LegalPage(): Promise<React.ReactElement> {
  const [docs, page] = await Promise.all([
    getLegalDocs(),
    getCachedGlobal('legal-page', 1)() as Promise<LegalPageType>,
  ])
  const cards = docs.map(toCard)

  const heroData = {
    heading: page.heading || 'Legal documents',
    subheading: page.subheading || 'Everything you need to know about how Revnator operates, protects your data, and respects your privacy.',
    lastUpdatedText: page.lastUpdatedText || '',
  }

  return (
    <main>
      <LegalHub docs={cards} hero={heroData} />
    </main>
  )
}
