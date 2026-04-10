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

export const revalidateNewsArticle: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc.slug) {
    payload.logger.info(`Revalidating news article: ${doc.slug}`)
    safeRevalidateTag(`news-${doc.slug}`)
    safeRevalidateTag('news-articles')
  }

  if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
    safeRevalidateTag(`news-${previousDoc.slug}`)
  }

  return doc
}

export const revalidateNewsArticleDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { payload },
}) => {
  if (doc?.slug) {
    payload.logger.info(`Revalidating deleted news article: ${doc.slug}`)
    safeRevalidateTag(`news-${doc.slug}`)
    safeRevalidateTag('news-articles')
  }
}
