import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidateTag } from 'next/cache'

function safeRevalidateTag(tag: string): void {
  try {
    revalidateTag(tag)
  } catch {
    // revalidateTag only works inside a Next.js request context.
  }
}

export const revalidateDocPage: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc.slug) {
    payload.logger.info(`Revalidating doc page: ${doc.slug}`)
    safeRevalidateTag(`doc-${doc.slug}`)
    safeRevalidateTag('doc-pages')
    safeRevalidateTag('doc-sections')
  }

  if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
    safeRevalidateTag(`doc-${previousDoc.slug}`)
  }

  return doc
}

export const revalidateDocPageDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { payload },
}) => {
  if (doc?.slug) {
    payload.logger.info(`Revalidating deleted doc page: ${doc.slug}`)
    safeRevalidateTag(`doc-${doc.slug}`)
    safeRevalidateTag('doc-pages')
    safeRevalidateTag('doc-sections')
  }
}
