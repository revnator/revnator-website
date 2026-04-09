import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { DocsLayout } from '@/components/sections/DocsLayout/DocsLayout'
import { DocsBreadcrumb } from '@/components/sections/DocsLayout/DocsBreadcrumb'
import { DocsContent } from '@/components/sections/DocsLayout/DocsContent'
import { DocsBottomNav } from '@/components/sections/DocsLayout/DocsBottomNav'
import { DocsFeedback } from '@/components/sections/DocsLayout/DocsFeedback'
import { getDocPage } from '@/components/sections/_docs/docsData'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
  const { slug } = await params
  const fullSlug = slug.join('/')
  const page = getDocPage(fullSlug)
  if (!page) return {}

  return {
    title: `${page.title} — Revnator Docs`,
    description: `Documentation for ${page.title} in Revnator.`,
  }
}

export default async function DocsSlugPage({
  params,
}: {
  params: Promise<{ slug: string[] }>
}): Promise<React.ReactElement> {
  const { slug } = await params
  const fullSlug = slug.join('/')
  const page = getDocPage(fullSlug)

  if (!page) notFound()

  return (
    <DocsLayout activeSlug={page.slug} tocHeadings={page.tocHeadings}>
      <DocsBreadcrumb category={page.category} pageTitle={page.title} />

      <h1 className="font-heading text-h2 font-bold text-dark">{page.title}</h1>
      <p className="mt-2 font-body text-xs text-muted">
        Updated {page.lastUpdated}
      </p>

      <div className="mt-8">
        <DocsContent body={page.body} />
      </div>

      <DocsBottomNav prev={page.prev} next={page.next} />
      <DocsFeedback />
    </DocsLayout>
  )
}
