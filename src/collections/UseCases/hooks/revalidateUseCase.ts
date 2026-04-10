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

export const revalidateUseCase: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc.slug) {
    payload.logger.info(`Revalidating use case: ${doc.slug}`)
    safeRevalidateTag(`use-case-${doc.slug}`)
    safeRevalidateTag('use-cases')
  }

  if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
    safeRevalidateTag(`use-case-${previousDoc.slug}`)
  }

  return doc
}

export const revalidateUseCaseDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { payload },
}) => {
  if (doc?.slug) {
    payload.logger.info(`Revalidating deleted use case: ${doc.slug}`)
    safeRevalidateTag(`use-case-${doc.slug}`)
    safeRevalidateTag('use-cases')
  }
}
