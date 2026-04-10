import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidateTag } from 'next/cache'

function safeRevalidateTag(tag: string): void {
  try {
    revalidateTag(tag)
  } catch {
    // revalidateTag only works inside a Next.js request context.
  }
}

export const revalidateEbook: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc.slug) {
    payload.logger.info(`Revalidating ebook: ${doc.slug}`)
    safeRevalidateTag(`ebook-${doc.slug}`)
    safeRevalidateTag('ebooks')
  }

  if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
    safeRevalidateTag(`ebook-${previousDoc.slug}`)
  }

  return doc
}

export const revalidateEbookDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { payload },
}) => {
  if (doc?.slug) {
    payload.logger.info(`Revalidating deleted ebook: ${doc.slug}`)
    safeRevalidateTag(`ebook-${doc.slug}`)
    safeRevalidateTag('ebooks')
  }
}
