/**
 * Extract a usable OG image URL from a Payload media object.
 * Strips localhost prefixes so Next.js metadataBase can prepend the production domain.
 */
export function getOgImageUrl(
  media: { url?: string | null } | string | number | null | undefined,
): string | undefined {
  if (!media || typeof media !== 'object' || !media.url) return undefined
  const url = media.url
  // Strip localhost prefix — metadataBase handles the domain
  if (url.startsWith('http://localhost') || url.startsWith('https://localhost')) {
    return url.replace(/^https?:\/\/localhost:\d+/, '')
  }
  return url
}
