import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'
import {
  BookOpen,
  BarChart3,
  Video,
  FileText,
  FileCode,
  Trophy,
} from 'lucide-react'

const validTypes = [
  'ebooks',
  'case-studies',
  'webinars',
  'whitepapers',
  'templates',
  'success-stories',
] as const

type ResourceType = (typeof validTypes)[number]

type CollectionSlug =
  | 'ebooks'
  | 'case-studies'
  | 'webinars'
  | 'whitepapers'
  | 'templates'
  | 'success-stories'

const typeConfig: Record<
  ResourceType,
  {
    label: string
    displayLabel: string
    cta: string
    icon: React.ComponentType<{ size?: number; className?: string }>
  }
> = {
  ebooks: { label: 'Ebooks', displayLabel: 'Ebook', cta: 'Download free', icon: BookOpen },
  'case-studies': { label: 'Case Studies', displayLabel: 'Case Study', cta: 'Read', icon: BarChart3 },
  webinars: { label: 'Webinars', displayLabel: 'Webinar', cta: 'Watch now', icon: Video },
  whitepapers: { label: 'Whitepapers', displayLabel: 'Whitepaper', cta: 'Download free', icon: FileText },
  templates: { label: 'Templates', displayLabel: 'Template', cta: 'Get template', icon: FileCode },
  'success-stories': { label: 'Success Stories', displayLabel: 'Success Story', cta: 'Read', icon: Trophy },
}

function isValidType(type: string): type is ResourceType {
  return validTypes.includes(type as ResourceType)
}

async function getResources(type: ResourceType): Promise<{ id: number; slug: string; title: string; description: string }[]> {
  const fetcher = unstable_cache(
    async () => {
      const payload = await getPayload({ config })
      const result = await payload.find({
        collection: type as CollectionSlug,
        where: { status: { equals: 'published' } },
        sort: '-publishedDate',
        limit: 100,
        depth: 1,
      })
      return result.docs as { id: number; slug: string; title: string; description: string }[]
    },
    [`resources-${type}`],
    { tags: [type], revalidate: false },
  )
  return fetcher()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>
}): Promise<Metadata> {
  const { type } = await params
  if (!isValidType(type)) return {}

  const cfg = typeConfig[type]
  return {
    title: `${cfg.label} | Resources | Revnator`,
    description: `Browse all ${cfg.label.toLowerCase()} from Revnator — guides, insights, and tools to help your sales team close more deals.`,
  }
}

export default async function ResourceTypeListingPage({
  params,
}: {
  params: Promise<{ type: string }>
}): Promise<React.ReactElement> {
  const { type } = await params

  if (!isValidType(type)) notFound()

  const cfg = typeConfig[type]
  const resources = await getResources(type)
  const IconComponent = cfg.icon

  return (
    <main>
      {/* Hero */}
      <section className="bg-bg pb-2 pt-16">
        <div className="mx-auto max-w-container px-6 md:px-12">
          <nav className="mb-4 font-body text-sm text-muted">
            <Link href="/resources" className="text-primary hover:underline">
              Resources
            </Link>
            <span className="mx-2">/</span>
            <span className="text-body">{cfg.label}</span>
          </nav>
          <h1 className="font-heading text-[40px] leading-[48px] font-bold tracking-[-0.01em] text-dark">
            {cfg.label}
          </h1>
          <p className="mt-2 font-body text-lg text-muted">
            Browse all {cfg.label.toLowerCase()} from Revnator
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-bg pb-20 pt-8">
        <div className="mx-auto max-w-container px-6 md:px-12">
          {resources.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {resources.map((resource) => (
                <Link
                  key={resource.id}
                  href={`/resources/${type}/${resource.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-light bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(19,15,30,0.08)]"
                >
                  {/* Thumbnail */}
                  <div className="flex h-[180px] w-full items-center justify-center bg-light">
                    <IconComponent size={36} className="text-primary/60" />
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-5">
                    <span className="inline-block w-fit rounded-full bg-light px-3 py-0.5 font-heading text-[10px] font-semibold uppercase tracking-[0.1em] text-primary">
                      {cfg.displayLabel}
                    </span>
                    <h3 className="mt-3 line-clamp-2 font-heading text-base font-semibold text-dark">
                      {resource.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 font-body text-[13px] text-muted">
                      {resource.description}
                    </p>
                    <span className="mt-4 font-body text-[13px] font-medium text-primary">
                      {cfg.cta} &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="py-16 text-center font-body text-sm text-muted">
              No {cfg.label.toLowerCase()} available yet.
            </p>
          )}
        </div>
      </section>
    </main>
  )
}
