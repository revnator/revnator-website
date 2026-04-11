import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { NewsArticle } from '@/payload-types'
import { getImageUrl, getImageAlt } from '@/lib/getImageUrl'
import { getOgImageUrl } from '@/lib/getOgImageUrl'

import { NewsArticleHeader } from '@/components/sections/NewsArticleHeader'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { NewsArticleFooter } from '@/components/sections/NewsArticleFooter'
import type { NewsCard } from '@/components/sections/NewsListingClient'

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function toCard(doc: NewsArticle): NewsCard {
  return {
    id: doc.id,
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    date: formatDate(doc.publishedDate),
    category: doc.category,
  }
}

export interface NewsArticleHeaderData {
  title: string
  date: string
  category: string
  authorName: string
  featuredImage?: { url: string; alt: string } | null
}

const getNewsArticleBySlug = (slug: string) =>
  unstable_cache(
    async () => {
      const payload = await getPayload({ config })
      const result = await payload.find({
        collection: 'news-articles',
        where: {
          slug: { equals: slug },
          status: { equals: 'published' },
        },
        limit: 1,
        depth: 2,
      })
      return (result.docs[0] as NewsArticle | undefined) ?? null
    },
    [`news-${slug}`],
    { tags: [`news-${slug}`] },
  )

async function getRelatedArticles(currentId: number): Promise<NewsCard[]> {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'news-articles',
    where: {
      status: { equals: 'published' },
      id: { not_equals: currentId },
    },
    sort: '-publishedDate',
    limit: 3,
    depth: 1,
  })
  return result.docs.map(toCard)
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  try {
    const { slug } = await params
    const doc = await getNewsArticleBySlug(slug)()
    if (!doc) return {}

    const title = doc.meta?.title ?? `${doc.title} | Revnator News`
    const description = doc.meta?.description ?? doc.excerpt
    const ogImageUrl = getOgImageUrl(doc.meta?.image) || getOgImageUrl(doc.featuredImage)

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: ogImageUrl ? [{ url: ogImageUrl }] : undefined,
      },
    }
  } catch {
    return { title: 'Revnator', description: 'The sales OS for closers' }
  }
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<React.ReactElement> {
  try {
    const { slug } = await params
    const doc = await getNewsArticleBySlug(slug)()

    if (!doc) notFound()

    const imgUrl = getImageUrl(doc.featuredImage, 'blogFeatured')
    const headerData: NewsArticleHeaderData = {
      title: doc.title,
      date: formatDate(doc.publishedDate),
      category: doc.category,
      authorName: doc.authorName ?? 'Revnator Team',
      featuredImage: imgUrl
        ? { url: imgUrl, alt: getImageAlt(doc.featuredImage, doc.title) }
        : null,
    }

    const relatedArticles = await getRelatedArticles(doc.id)

    return (
      <main>
        <NewsArticleHeader data={headerData} />
        <section className="bg-white pt-8 pb-12">
          <div className="blog-prose mx-auto max-w-prose-narrow px-6 md:px-12">
            <RichText data={doc.body} />
          </div>
        </section>
        <NewsArticleFooter relatedItems={relatedArticles} />
      </main>
    )
  } catch (error) {
    console.error('Failed to render news article:', error)
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
