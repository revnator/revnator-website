import { notFound } from 'next/navigation'

// Legacy catch-all route from Payload template — disabled in favor of explicit Revnator routes
export default function LegacyPage(): never {
  notFound()
}
