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

export const revalidateIndustry: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc.slug) {
    payload.logger.info(`Revalidating industry: ${doc.slug}`)
    safeRevalidateTag(`industry-${doc.slug}`)
    safeRevalidateTag('industries')
  }

  if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
    safeRevalidateTag(`industry-${previousDoc.slug}`)
  }

  return doc
}

export const revalidateIndustryDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { payload },
}) => {
  if (doc?.slug) {
    payload.logger.info(`Revalidating deleted industry: ${doc.slug}`)
    safeRevalidateTag(`industry-${doc.slug}`)
    safeRevalidateTag('industries')
  }
}
