import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { NewsArticle } from '@/payload-types'
import { getImageUrl, getImageAlt } from '@/lib/getImageUrl'

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

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'news-articles',
    where: { status: { equals: 'published' } },
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
  const doc = await getNewsArticleBySlug(slug)()
  if (!doc) return {}

  return {
    title: doc.meta?.title ?? `${doc.title} | Revnator News`,
    description: doc.meta?.description ?? doc.excerpt,
    openGraph: {
      images:
        doc.meta?.image && typeof doc.meta.image === 'object'
          ? [{ url: doc.meta.image.url ?? '' }]
          : undefined,
    },
  }
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<React.ReactElement> {
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
}
