import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidateTag } from 'next/cache'

function safeRevalidateTag(tag: string): void {
  try {
    revalidateTag(tag)
  } catch {
    // revalidateTag only works inside a Next.js request context.
  }
}

export const revalidateCaseStudy: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc.slug) {
    payload.logger.info(`Revalidating case study: ${doc.slug}`)
    safeRevalidateTag(`case-study-${doc.slug}`)
    safeRevalidateTag('case-studies')
  }

  if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
    safeRevalidateTag(`case-study-${previousDoc.slug}`)
  }

  return doc
}

export const revalidateCaseStudyDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { payload },
}) => {
  if (doc?.slug) {
    payload.logger.info(`Revalidating deleted case study: ${doc.slug}`)
    safeRevalidateTag(`case-study-${doc.slug}`)
    safeRevalidateTag('case-studies')
  }
}
