import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { DocPage, DocSection } from '@/payload-types'
import { DocsLayout } from '@/components/sections/DocsLayout/DocsLayout'
import { DocsBreadcrumb } from '@/components/sections/DocsLayout/DocsBreadcrumb'
import { DocsContent } from '@/components/sections/DocsLayout/DocsContent'
import { DocsBottomNav } from '@/components/sections/DocsLayout/DocsBottomNav'
import { DocsFeedback } from '@/components/sections/DocsLayout/DocsFeedback'
import { getDocsSidebar } from '@/lib/getDocsSidebar'

// ── Helpers ──

function extractH2Headings(body: DocPage['body']): string[] {
  const headings: string[] = []
  if (!body?.root?.children) return headings

  for (const node of body.root.children) {
    if (
      (node as Record<string, unknown>).type === 'heading' &&
      (node as Record<string, unknown>).tag === 'h2'
    ) {
      const children = (node as Record<string, unknown>).children as
        | { text?: string }[]
        | undefined
      if (children) {
        const text = children.map((c) => c.text || '').join('')
        if (text) headings.push(text)
      }
    }
  }
  return headings
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function getNavLink(
  page: DocPage['previousPage'] | DocPage['nextPage'],
  sections: { slug: string; id: number }[],
): { slug: string; title: string } | undefined {
  if (!page || typeof page === 'number') return undefined
  const docPage = page as DocPage
  const section = docPage.section
  const sectionSlug =
    typeof section === 'object' && section !== null
      ? (section as DocSection).slug
      : sections.find((s) => s.id === section)?.slug
  if (!sectionSlug) return undefined
  return { slug: `${sectionSlug}/${docPage.slug}`, title: docPage.title }
}

// ── Data fetching ──

const getDocPage = unstable_cache(
  async (sectionSlug: string, pageSlug: string) => {
    const payload = await getPayload({ config })

    // Find the section
    const sectionResult = await payload.find({
      collection: 'doc-sections',
      where: { slug: { equals: sectionSlug }, isPublished: { equals: true } },
      limit: 1,
    })
    const section = sectionResult.docs[0]
    if (!section) return null

    // Find the page in this section
    const pageResult = await payload.find({
      collection: 'doc-pages',
      where: {
        slug: { equals: pageSlug },
        section: { equals: section.id },
        isPublished: { equals: true },
      },
      limit: 1,
      depth: 2,
    })
    return pageResult.docs[0] ?? null
  },
  ['doc-page'],
  { tags: ['doc-pages', 'doc-sections'], revalidate: false },
)

const getFirstPageInSection = unstable_cache(
  async (sectionSlug: string): Promise<string | null> => {
    const payload = await getPayload({ config })

    const sectionResult = await payload.find({
      collection: 'doc-sections',
      where: { slug: { equals: sectionSlug }, isPublished: { equals: true } },
      limit: 1,
    })
    const section = sectionResult.docs[0]
    if (!section) return null

    const pageResult = await payload.find({
      collection: 'doc-pages',
      where: {
        section: { equals: section.id },
        isPublished: { equals: true },
      },
      sort: 'order',
      limit: 1,
    })
    const firstPage = pageResult.docs[0]
    if (!firstPage) return null
    return `${sectionSlug}/${firstPage.slug}`
  },
  ['doc-section-first-page'],
  { tags: ['doc-pages', 'doc-sections'], revalidate: false },
)

// ── Metadata ──

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
  try {
    const { slug } = await params

    if (slug.length === 1) return {}

    const [sectionSlug, pageSlug] = slug
    const page = await getDocPage(sectionSlug, pageSlug)
    if (!page) return {}

    return {
      title: `${page.title} — Revnator Docs`,
      description: page.meta?.description || `Documentation for ${page.title} in Revnator.`,
    }
  } catch {
    return { title: 'Revnator', description: 'The sales OS for closers' }
  }
}

// ── Page component ──

export default async function DocsSlugPage({
  params,
}: {
  params: Promise<{ slug: string[] }>
}): Promise<React.ReactElement> {
  try {
    const { slug } = await params

    // Single segment: redirect to first page in section
    if (slug.length === 1) {
      const firstPageSlug = await getFirstPageInSection(slug[0])
      if (!firstPageSlug) notFound()
      redirect(`/docs/${firstPageSlug}`)
    }

    const [sectionSlug, pageSlug] = slug
    const page = await getDocPage(sectionSlug, pageSlug)
    if (!page) notFound()

    const sections = await getDocsSidebar()
    const fullSlug = `${sectionSlug}/${pageSlug}`

    // Extract section title for breadcrumb
    const section = typeof page.section === 'object' ? page.section as DocSection : null
    const sectionTitle = section?.title ?? sectionSlug

    // Extract H2 headings for TOC
    const tocHeadings = extractH2Headings(page.body)

    // Build all section IDs for nav link resolution
    const allSections = sections.map((s) => {
      // We need to find the section ID; use the sidebar data which has slugs
      return { slug: s.slug, id: 0 } // IDs not needed since we populated depth 2
    })

    // Build prev/next nav links
    const prev = getNavLink(page.previousPage, allSections)
    const next = getNavLink(page.nextPage, allSections)

    return (
      <DocsLayout activeSlug={fullSlug} tocHeadings={tocHeadings} sections={sections}>
        <DocsBreadcrumb category={sectionTitle} pageTitle={page.title} />

        <h1 className="font-heading text-h2 font-bold text-dark">{page.title}</h1>
        <p className="mt-2 font-body text-xs text-muted">
          Updated {formatDate(page.lastUpdated)}
        </p>

        <div className="mt-8">
          <DocsContent body={page.body} />
        </div>

        <DocsBottomNav prev={prev} next={next} />
        <DocsFeedback />
      </DocsLayout>
    )
  } catch (error) {
    console.error('Failed to render doc page:', error)
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
