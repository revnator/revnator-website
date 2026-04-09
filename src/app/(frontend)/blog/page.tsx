import type { Metadata } from 'next'
import { BlogHero } from '@/components/sections/BlogHero'
import { BlogFeaturedPost } from '@/components/sections/BlogFeaturedPost'
import { BlogListingClient } from '@/components/sections/BlogListingClient'
import { blogPosts } from '@/components/sections/_blog/blogData'

export const metadata: Metadata = {
  title: 'Blog | Revnator',
  description:
    'Insights on sales, outreach, pipeline management, and growing revenue. Tips and best practices from the Revnator team.',
}

export default function BlogPage(): React.ReactElement {
  const featuredPost = blogPosts[0]
  const remainingPosts = blogPosts.slice(1)

  return (
    <main>
      <BlogHero />
      {featuredPost && <BlogFeaturedPost post={featuredPost} />}
      <BlogListingClient posts={remainingPosts} />
    </main>
  )
}
