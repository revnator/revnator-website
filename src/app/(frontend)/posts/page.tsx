import { notFound } from 'next/navigation'

// Legacy posts listing from Payload template — disabled in favor of /blog
export default function LegacyPostsPage(): never {
  notFound()
}
