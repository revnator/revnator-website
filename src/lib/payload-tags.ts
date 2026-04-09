/**
 * Cache tag constants for ISR revalidation.
 *
 * Globals use the `global_${slug}` convention to match the existing
 * getCachedGlobal utility in src/utilities/getGlobals.ts.
 *
 * Collections use `collection_${slug}` for list-level revalidation
 * and `collection_${slug}_${id}` for document-level revalidation.
 */

// Global cache tags
export const CACHE_TAGS = {
  SITE_SETTINGS: 'global_site-settings',
  HEADER: 'global_header',
  FOOTER: 'global_footer',
  GLOBAL_LAYOUT: 'global-layout',
} as const

// Collection cache tag helpers
export function collectionTag(slug: string): string {
  return `collection_${slug}`
}

export function collectionDocTag(slug: string, id: string | number): string {
  return `collection_${slug}_${id}`
}
