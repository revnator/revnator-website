import type { Media } from '@/payload-types'

type SizeName =
  | 'thumbnail'
  | 'card'
  | 'logo'
  | 'logoLarge'
  | 'favicon'
  | 'heroProduct'
  | 'featureScreenshot'
  | 'blogThumbnail'
  | 'blogFeatured'
  | 'ogImage'
  | 'avatar'
  | 'icon'

export function getImageUrl(
  media: Media | number | null | undefined,
  preferredSize?: SizeName,
): string | null {
  if (!media || typeof media !== 'object') return null

  if (preferredSize && media.sizes) {
    const sized = media.sizes[preferredSize]
    if (sized?.url) return sized.url
  }

  return media.url ?? null
}

export function getImageAlt(
  media: Media | number | null | undefined,
  fallback: string = '',
): string {
  if (!media || typeof media !== 'object') return fallback
  return media.alt || fallback
}
