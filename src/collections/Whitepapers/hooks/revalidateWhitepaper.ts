import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidateTag } from 'next/cache'

function safeRevalidateTag(tag: string): void {
  try {
    revalidateTag(tag)
  } catch {
    // revalidateTag only works inside a Next.js request context.
  }
}

export const revalidateWhitepaper: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc.slug) {
    payload.logger.info(`Revalidating whitepaper: ${doc.slug}`)
    safeRevalidateTag(`whitepaper-${doc.slug}`)
    safeRevalidateTag('whitepapers')
  }

  if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
    safeRevalidateTag(`whitepaper-${previousDoc.slug}`)
  }

  return doc
}

export const revalidateWhitepaperDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { payload },
}) => {
  if (doc?.slug) {
    payload.logger.info(`Revalidating deleted whitepaper: ${doc.slug}`)
    safeRevalidateTag(`whitepaper-${doc.slug}`)
    safeRevalidateTag('whitepapers')
  }
}
