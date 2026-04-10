import { notFound } from 'next/navigation'

// Legacy post detail from Payload template — disabled in favor of /blog/[slug]
export default function LegacyPostPage(): never {
  notFound()
}
