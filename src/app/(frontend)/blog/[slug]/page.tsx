import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { BlogPost, BlogCategory } from '@/payload-types'

import { BlogPostHeader } from '@/components/sections/BlogPostHeader'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { BlogPostFooter } from '@/components/sections/BlogPostFooter'
import { RelatedPosts } from '@/components/sections/RelatedPosts'
import type { BlogPostCard } from '@/components/sections/_blog/types'

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function toCard(doc: BlogPost): BlogPostCard {
  const cat = typeof doc.category === 'object' ? doc.category : null
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
  }
}

const getBlogPostBySlug = (slug: string) =>
  unstable_cache(
    async () => {
      const payload = await getPayload({ config })
      const result = await payload.find({
        collection: 'blog-posts',
        where: {
          slug: { equals: slug },
          status: { equals: 'published' },
        },
        limit: 1,
        depth: 2,
      })
      return (result.docs[0] as BlogPost | undefined) ?? null
    },
    [`blog-post-${slug}`],
    { tags: [`blog-post-${slug}`] },
  )

async function getRelatedPosts(post: BlogPost): Promise<BlogPostCard[]> {
  const payload = await getPayload({ config })

  // Use manually linked related posts if available
  if (post.relatedPosts && post.relatedPosts.length > 0) {
    const populated = post.relatedPosts.filter(
      (rp): rp is BlogPost => typeof rp === 'object',
    )
    if (populated.length > 0) {
      return populated.slice(0, 3).map(toCard)
    }
  }

  // Fallback: 3 recent posts from the same category
  const categoryId =
    typeof post.category === 'object' ? post.category.id : post.category
  const result = await payload.find({
    collection: 'blog-posts',
    where: {
      status: { equals: 'published' },
      id: { not_equals: post.id },
      category: { equals: categoryId },
    },
    sort: '-publishedDate',
    limit: 3,
    depth: 1,
  })

  if (result.docs.length >= 3) {
    return result.docs.map(toCard)
  }

  // If not enough from same category, fill with recent posts
  const filler = await payload.find({
    collection: 'blog-posts',
    where: {
      status: { equals: 'published' },
      id: { not_equals: post.id },
    },
    sort: '-publishedDate',
    limit: 3,
    depth: 1,
  })

  return filler.docs.map(toCard)
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'blog-posts',
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
  const postDoc = await getBlogPostBySlug(slug)()
  if (!postDoc) return {}

  return {
    title: postDoc.meta?.title ?? `${postDoc.title} | Revnator Blog`,
    description: postDoc.meta?.description ?? postDoc.excerpt,
    openGraph: {
      images:
        postDoc.meta?.image && typeof postDoc.meta.image === 'object'
          ? [{ url: postDoc.meta.image.url ?? '' }]
          : undefined,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<React.ReactElement> {
  const { slug } = await params
  const postDoc = await getBlogPostBySlug(slug)()

  if (!postDoc) notFound()

  const postCard = toCard(postDoc)
  const relatedPosts = await getRelatedPosts(postDoc)

  return (
    <main>
      <BlogPostHeader post={postCard} />
      <section className="bg-white pt-8 pb-12">
        <div className="blog-prose mx-auto max-w-prose-narrow px-6 md:px-12">
          <RichText data={postDoc.body} />
        </div>
      </section>
      <BlogPostFooter post={postCard} />
      <RelatedPosts posts={relatedPosts} />
    </main>
  )
}
