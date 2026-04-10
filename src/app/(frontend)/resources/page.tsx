import type { Metadata } from 'next'
import Link from 'next/link'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'
import type {
  Ebook,
  CaseStudy,
  Webinar,
  Whitepaper,
  Template,
  SuccessStory,
  ResourcesPage as ResourcesPageType,
} from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'

import { ResourcesHub } from '@/components/sections/ResourcesHub'
import { ResourcesHubClient, type ResourceCard } from '@/components/sections/ResourcesHubClient'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = (await getCachedGlobal('resources-page', 1)()) as ResourcesPageType
    return {
      title: page.meta?.title || 'Resources | Revnator',
      description:
        page.meta?.description ||
        'Free ebooks, templates, case studies, webinars, and more to help your sales team close more deals.',
    }
  } catch {
    return { title: 'Resources | Revnator', description: 'Free ebooks, templates, case studies, webinars, and more to help your sales team close more deals.' }
  }
}

const getEbooks = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'ebooks',
      where: { status: { equals: 'published' } },
      limit: 100,
      depth: 1,
    })
    return result.docs as Ebook[]
  },
  ['resources-ebooks'],
  { tags: ['ebooks'] },
)

const getCaseStudies = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'case-studies',
      where: { status: { equals: 'published' } },
      limit: 100,
      depth: 1,
    })
    return result.docs as CaseStudy[]
  },
  ['resources-case-studies'],
  { tags: ['case-studies'] },
)

const getWebinars = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'webinars',
      where: { status: { equals: 'published' } },
      limit: 100,
      depth: 1,
    })
    return result.docs as Webinar[]
  },
  ['resources-webinars'],
  { tags: ['webinars'] },
)

const getWhitepapers = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'whitepapers',
      where: { status: { equals: 'published' } },
      limit: 100,
      depth: 1,
    })
    return result.docs as Whitepaper[]
  },
  ['resources-whitepapers'],
  { tags: ['whitepapers'] },
)

const getTemplates = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'templates',
      where: { status: { equals: 'published' } },
      limit: 100,
      depth: 1,
    })
    return result.docs as Template[]
  },
  ['resources-templates'],
  { tags: ['templates'] },
)

const getSuccessStories = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'success-stories',
      where: { status: { equals: 'published' } },
      limit: 100,
      depth: 1,
    })
    return result.docs as SuccessStory[]
  },
  ['resources-success-stories'],
  { tags: ['success-stories'] },
)

function toCard(
  doc: { id: number; slug: string; title: string; description: string },
  type: ResourceCard['type'],
  filterCategory: ResourceCard['filterCategory'],
): ResourceCard {
  return {
    id: String(doc.id),
    slug: doc.slug,
    title: doc.title,
    description: doc.description,
    type,
    filterCategory,
  }
}

export default async function ResourcesPage(): Promise<React.ReactElement> {
  try {
    const [ebooks, caseStudies, webinars, whitepapers, templates, successStories, page] =
      await Promise.all([
        getEbooks(),
        getCaseStudies(),
        getWebinars(),
        getWhitepapers(),
        getTemplates(),
        getSuccessStories(),
        getCachedGlobal('resources-page', 1)() as Promise<ResourcesPageType>,
      ])

    const cards: ResourceCard[] = [
      ...ebooks.map((d) => toCard(d, 'ebooks', 'Ebooks')),
      ...caseStudies.map((d) => toCard(d, 'case-studies', 'Case Studies')),
      ...webinars.map((d) => toCard(d, 'webinars', 'Webinars')),
      ...whitepapers.map((d) => toCard(d, 'whitepapers', 'Whitepapers')),
      ...templates.map((d) => toCard(d, 'templates', 'Templates')),
      ...successStories.map((d) => toCard(d, 'success-stories', 'Success Stories')),
    ]

    const heroData = {
      heading: page.heading || 'Resources',
      subheading: page.subheading || 'Guides, templates, and insights to help your team sell smarter',
    }

    return (
      <main>
        <ResourcesHub data={heroData} />
        <ResourcesHubClient resources={cards} />
      </main>
    )
  } catch (error) {
    console.error('Failed to render resources hub:', error)
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
