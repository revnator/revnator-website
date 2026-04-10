import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidateTag } from 'next/cache'

function safeRevalidateTag(tag: string): void {
  try {
    revalidateTag(tag)
  } catch {
    // revalidateTag only works inside a Next.js request context.
  }
}

export const revalidateWebinar: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc.slug) {
    payload.logger.info(`Revalidating webinar: ${doc.slug}`)
    safeRevalidateTag(`webinar-${doc.slug}`)
    safeRevalidateTag('webinars')
  }

  if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
    safeRevalidateTag(`webinar-${previousDoc.slug}`)
  }

  return doc
}

export const revalidateWebinarDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { payload },
}) => {
  if (doc?.slug) {
    payload.logger.info(`Revalidating deleted webinar: ${doc.slug}`)
    safeRevalidateTag(`webinar-${doc.slug}`)
    safeRevalidateTag('webinars')
  }
}
