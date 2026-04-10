import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { BlogPost } from '@/payload-types'
import { getImageUrl, getImageAlt } from '@/lib/getImageUrl'
import { getOgImageUrl } from '@/lib/getOgImageUrl'

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
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'blog-posts',
      where: { status: { equals: 'published' } },
      limit: 100,
    })
    return result.docs.map((doc) => ({ slug: doc.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  try {
    const { slug } = await params
    const postDoc = await getBlogPostBySlug(slug)()
    if (!postDoc) return {}

    const title = postDoc.meta?.title ?? `${postDoc.title} | Revnator Blog`
    const description = postDoc.meta?.description ?? postDoc.excerpt

    // OG image: meta image > featured image > site default (from layout)
    const ogImageUrl =
      getOgImageUrl(postDoc.meta?.image) || getOgImageUrl(postDoc.featuredImage)

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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<React.ReactElement> {
  try {
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
  } catch (error) {
    console.error('Failed to render blog post:', error)
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
