import type { Metadata } from 'next'
import { NewsHero } from '@/components/sections/NewsHero'
import { NewsListingClient } from '@/components/sections/NewsListingClient'
import { NewsPressKit } from '@/components/sections/NewsPressKit'
import { newsItems } from '@/components/sections/_news/newsData'

export const metadata: Metadata = {
  title: 'News & Updates | Revnator',
  description:
    'Product launches, company milestones, and announcements from the Revnator team.',
}

export default function NewsPage(): React.ReactElement {
  return (
    <main>
      <NewsHero />
      <NewsListingClient items={newsItems} />
      <NewsPressKit />
    </main>
  )
}
