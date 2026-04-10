import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidateTag } from 'next/cache'

function safeRevalidateTag(tag: string): void {
  try {
    revalidateTag(tag)
  } catch {
    // revalidateTag only works inside a Next.js request context.
  }
}

export const revalidateSuccessStory: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc.slug) {
    payload.logger.info(`Revalidating success story: ${doc.slug}`)
    safeRevalidateTag(`success-story-${doc.slug}`)
    safeRevalidateTag('success-stories')
  }

  if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
    safeRevalidateTag(`success-story-${previousDoc.slug}`)
  }

  return doc
}

export const revalidateSuccessStoryDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { payload },
}) => {
  if (doc?.slug) {
    payload.logger.info(`Revalidating deleted success story: ${doc.slug}`)
    safeRevalidateTag(`success-story-${doc.slug}`)
    safeRevalidateTag('success-stories')
  }
}
