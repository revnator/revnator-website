import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidateTag } from 'next/cache'

function safeRevalidateTag(tag: string): void {
  try {
    revalidateTag(tag)
  } catch {
    // revalidateTag only works inside a Next.js request context.
  }
}

export const revalidateTemplate: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc.slug) {
    payload.logger.info(`Revalidating template: ${doc.slug}`)
    safeRevalidateTag(`template-${doc.slug}`)
    safeRevalidateTag('templates')
  }

  if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
    safeRevalidateTag(`template-${previousDoc.slug}`)
  }

  return doc
}

export const revalidateTemplateDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { payload },
}) => {
  if (doc?.slug) {
    payload.logger.info(`Revalidating deleted template: ${doc.slug}`)
    safeRevalidateTag(`template-${doc.slug}`)
    safeRevalidateTag('templates')
  }
}
