import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { NewsArticleHeader } from '@/components/sections/NewsArticleHeader'
import { NewsArticleBody } from '@/components/sections/NewsArticleBody'
import { NewsArticleFooter } from '@/components/sections/NewsArticleFooter'
import { newsItems } from '@/components/sections/_news/newsData'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const item = newsItems.find((n) => n.slug === slug)
  if (!item) return {}

  return {
    title: `${item.title} | Revnator News`,
    description: item.excerpt,
  }
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<React.ReactElement> {
  const { slug } = await params
  const item = newsItems.find((n) => n.slug === slug)

  if (!item) notFound()

  const related = newsItems.filter((n) => n.id !== item.id).slice(0, 3)

  return (
    <main>
      <NewsArticleHeader item={item} />
      <NewsArticleBody body={item.body} />
      <NewsArticleFooter relatedItems={related} />
    </main>
  )
}
