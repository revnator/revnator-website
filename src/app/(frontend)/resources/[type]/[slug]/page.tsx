import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
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
} from '@/payload-types'
import { EbookLayout } from '@/components/sections/EbookLayout'
import { CaseStudyLayout } from '@/components/sections/CaseStudyLayout'
import { WebinarLayout } from '@/components/sections/WebinarLayout'
import { WhitepaperLayout } from '@/components/sections/WhitepaperLayout'
import { TemplateLayout } from '@/components/sections/TemplateLayout'
import { SuccessStoryLayout } from '@/components/sections/SuccessStoryLayout'

const validTypes = ['ebooks', 'case-studies', 'webinars', 'whitepapers', 'templates', 'success-stories'] as const
type ResourceType = (typeof validTypes)[number]

type CollectionSlug = 'ebooks' | 'case-studies' | 'webinars' | 'whitepapers' | 'templates' | 'success-stories'

const cacheTagPrefix: Record<ResourceType, string> = {
  ebooks: 'ebook',
  'case-studies': 'case-study',
  webinars: 'webinar',
  whitepapers: 'whitepaper',
  templates: 'template',
  'success-stories': 'success-story',
}

async function getResource(type: ResourceType, slug: string): Promise<unknown | null> {
  const fetcher = unstable_cache(
    async () => {
      const payload = await getPayload({ config })
      const result = await payload.find({
        collection: type as CollectionSlug,
        where: {
          slug: { equals: slug },
          status: { equals: 'published' },
        },
        limit: 1,
        depth: 2,
      })
      return result.docs[0] ?? null
    },
    [`resource-${type}-${slug}`],
    { tags: [`${cacheTagPrefix[type]}-${slug}`, type] },
  )
  return fetcher()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string; slug: string }>
}): Promise<Metadata> {
  const { type, slug } = await params
  if (!validTypes.includes(type as ResourceType)) return {}

  const resource = (await getResource(type as ResourceType, slug)) as { title?: string; description?: string } | null
  if (!resource) return {}

  return {
    title: `${resource.title} | Revnator Resources`,
    description: resource.description,
  }
}

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ type: string; slug: string }>
}): Promise<React.ReactElement> {
  const { type, slug } = await params

  if (!validTypes.includes(type as ResourceType)) notFound()

  const resource = await getResource(type as ResourceType, slug)
  if (!resource) notFound()

  switch (type) {
    case 'ebooks':
      return <EbookLayout resource={resource as Ebook} />
    case 'case-studies':
      return <CaseStudyLayout resource={resource as CaseStudy} />
    case 'webinars':
      return <WebinarLayout resource={resource as Webinar} />
    case 'whitepapers':
      return <WhitepaperLayout resource={resource as Whitepaper} />
    case 'templates':
      return <TemplateLayout resource={resource as Template} />
    case 'success-stories':
      return <SuccessStoryLayout resource={resource as SuccessStory} />
    default:
      notFound()
  }
}
