import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidateTag } from 'next/cache'

function safeRevalidateTag(tag: string): void {
  try {
    revalidateTag(tag)
  } catch {
    // revalidateTag only works inside a Next.js request context.
    // Silently skip when running from standalone scripts (seed, migrate).
  }
}

export const revalidateBlogPost: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc.slug) {
    payload.logger.info(`Revalidating blog post: ${doc.slug}`)
    safeRevalidateTag(`blog-post-${doc.slug}`)
    safeRevalidateTag('blog-posts')
  }

  if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
    safeRevalidateTag(`blog-post-${previousDoc.slug}`)
  }

  return doc
}

export const revalidateBlogPostDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { payload },
}) => {
  if (doc?.slug) {
    payload.logger.info(`Revalidating deleted blog post: ${doc.slug}`)
    safeRevalidateTag(`blog-post-${doc.slug}`)
    safeRevalidateTag('blog-posts')
  }
}
