import type { Metadata } from 'next'
import Link from 'next/link'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { BlogPost, BlogCategory } from '@/payload-types'
import { getImageUrl, getImageAlt } from '@/lib/getImageUrl'

import { BlogHero } from '@/components/sections/BlogHero'
import { BlogFeaturedPost } from '@/components/sections/BlogFeaturedPost'
import { BlogListingClient } from '@/components/sections/BlogListingClient'
import type { BlogPostCard } from '@/components/sections/_blog/types'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Blog | Revnator',
  description:
    'Insights on sales, outreach, pipeline management, and growing revenue. Tips and best practices from the Revnator team.',
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function toCard(doc: BlogPost): BlogPostCard {
  const cat = typeof doc.category === 'object' ? doc.category : null
  const imgUrl = getImageUrl(doc.featuredImage, 'blogFeatured')
  return {
    id: doc.id,
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    category: cat?.name ?? '',
    date: formatDate(doc.publishedDate),
    readTime: doc.readTime ?? '5 min read',
    author: {
      name: doc.authorName,
      initials: doc.authorInitials,
      bio: doc.authorBio ?? '',
    },
    tags: (doc.tags ?? []).map((t) => t.text),
    featuredImage: imgUrl
      ? { url: imgUrl, alt: getImageAlt(doc.featuredImage, doc.title) }
      : null,
  }
}

const getBlogData = unstable_cache(
  async () => {
    const payload = await getPayload({ config })

    const [categoriesResult, postsResult] = await Promise.all([
      payload.find({
        collection: 'blog-categories',
        sort: 'order',
        limit: 100,
      }),
      payload.find({
        collection: 'blog-posts',
        where: {
          status: { equals: 'published' },
          publishedDate: { less_than_equal: new Date().toISOString() },
        },
        sort: '-publishedDate',
        limit: 100,
        depth: 2,
      }),
    ])

    return {
      categories: categoriesResult.docs as BlogCategory[],
      posts: postsResult.docs as BlogPost[],
    }
  },
  ['blog-listing'],
  { tags: ['blog-posts'] },
)

export default async function BlogPage(): Promise<React.ReactElement> {
  try {
    const { categories, posts } = await getBlogData()

    const categoryNames = ['All', ...categories.map((c) => c.name)]
    const postCards = posts.map(toCard)
    const featuredPost = postCards[0] ?? null
    const remainingPosts = postCards.slice(1)

    return (
      <main>
        <BlogHero />
        {featuredPost && <BlogFeaturedPost post={featuredPost} />}
        <BlogListingClient posts={remainingPosts} categories={categoryNames} />
      </main>
    )
  } catch (error) {
    console.error('Failed to render blog listing:', error)
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
