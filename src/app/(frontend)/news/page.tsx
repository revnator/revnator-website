import type { Metadata } from 'next'
import Link from 'next/link'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { NewsArticle, NewsPage as NewsPageType } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'

import { NewsHero } from '@/components/sections/NewsHero'
import { NewsListingClient } from '@/components/sections/NewsListingClient'
import { NewsPressKit } from '@/components/sections/NewsPressKit'
import type { NewsCard } from '@/components/sections/NewsListingClient'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = (await getCachedGlobal('news-page', 1)()) as NewsPageType
    return {
      title: page.meta?.title || 'News & Updates | Revnator',
      description:
        page.meta?.description ||
        'Product launches, company milestones, and announcements from the Revnator team.',
    }
  } catch {
    return { title: 'News & Updates | Revnator', description: 'Product launches, company milestones, and announcements from the Revnator team.' }
  }
}

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

const getNewsData = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'news-articles',
      where: {
        status: { equals: 'published' },
      },
      sort: '-publishedDate',
      limit: 100,
      depth: 2,
    })
    return result.docs as NewsArticle[]
  },
  ['news-listing'],
  { tags: ['news-articles'] },
)

const newsCategories = ['All', 'Product Updates', 'Company News', 'Press Releases', 'Funding', 'Awards']

export default async function NewsPage(): Promise<React.ReactElement> {
  try {
    const [articles, page] = await Promise.all([
      getNewsData(),
      getCachedGlobal('news-page', 1)() as Promise<NewsPageType>,
    ])
    const cards = articles.map(toCard)

    const heroData = {
      sectionLabel: page.sectionLabel || 'NEWSROOM',
      heading: page.heading || 'News & Updates',
      subheading: page.subheading || 'Product launches, company milestones, and announcements from the Revnator team.',
    }

    const pressKitData = {
      enabled: page.pressKitEnabled ?? true,
      label: page.pressKitLabel || 'FOR JOURNALISTS',
      heading: page.pressKitHeading || 'Looking for media assets?',
      description: page.pressKitDescription || 'Download our press kit including logos, product screenshots, founder photos, and brand guidelines.',
      buttonText: page.pressKitButtonText || 'Download press kit',
      buttonHref: page.pressKitButtonHref || '#',
      contactHeading: page.pressContactHeading || 'Media inquiries',
      contactEmail: page.pressContactEmail || 'press@revnator.com',
      contactResponse: page.pressContactResponse || 'We typically respond within 12 hours.',
    }

    return (
      <main>
        <NewsHero data={heroData} />
        <NewsListingClient items={cards} categories={newsCategories} />
        {pressKitData.enabled && <NewsPressKit data={pressKitData} />}
      </main>
    )
  } catch (error) {
    console.error('Failed to render news listing:', error)
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
