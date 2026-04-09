import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  resourcesData,
  type Resource,
} from '@/components/sections/_resources/resourcesData'
import { EbookLayout } from '@/components/sections/EbookLayout'
import { CaseStudyLayout } from '@/components/sections/CaseStudyLayout'
import { WebinarLayout } from '@/components/sections/WebinarLayout'
import { WhitepaperLayout } from '@/components/sections/WhitepaperLayout'
import { TemplateLayout } from '@/components/sections/TemplateLayout'
import { SuccessStoryLayout } from '@/components/sections/SuccessStoryLayout'

function findResource(type: string, slug: string): Resource | undefined {
  return resourcesData.find((r) => r.type === type && r.slug === slug)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string; slug: string }>
}): Promise<Metadata> {
  const { type, slug } = await params
  const resource = findResource(type, slug)
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
  const resource = findResource(type, slug)

  if (!resource) notFound()

  switch (resource.type) {
    case 'ebooks':
      return <EbookLayout resource={resource} />
    case 'case-studies':
      return <CaseStudyLayout resource={resource} />
    case 'webinars':
      return <WebinarLayout resource={resource} />
    case 'whitepapers':
      return <WhitepaperLayout resource={resource} />
    case 'templates':
      return <TemplateLayout resource={resource} />
    case 'success-stories':
      return <SuccessStoryLayout resource={resource} />
  }
}
