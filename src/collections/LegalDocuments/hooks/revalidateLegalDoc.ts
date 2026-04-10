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

export const revalidateLegalDoc: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc.slug) {
    payload.logger.info(`Revalidating legal doc: ${doc.slug}`)
    safeRevalidateTag(`legal-${doc.slug}`)
    safeRevalidateTag('legal-docs')
  }

  if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
    safeRevalidateTag(`legal-${previousDoc.slug}`)
  }

  return doc
}

export const revalidateLegalDocDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { payload },
}) => {
  if (doc?.slug) {
    payload.logger.info(`Revalidating deleted legal doc: ${doc.slug}`)
    safeRevalidateTag(`legal-${doc.slug}`)
    safeRevalidateTag('legal-docs')
  }
}
