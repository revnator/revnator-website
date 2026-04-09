import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { BlogPostHeader } from '@/components/sections/BlogPostHeader'
import { BlogPostBody } from '@/components/sections/BlogPostBody'
import { BlogPostFooter } from '@/components/sections/BlogPostFooter'
import { RelatedPosts } from '@/components/sections/RelatedPosts'
import { blogPosts } from '@/components/sections/_blog/blogData'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return {}

  return {
    title: `${post.title} | Revnator Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<React.ReactElement> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) notFound()

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id)
    .slice(0, 3)

  return (
    <main>
      <BlogPostHeader post={post} />
      <BlogPostBody body={post.body} />
      <BlogPostFooter post={post} />
      <RelatedPosts posts={relatedPosts} />
    </main>
  )
}
