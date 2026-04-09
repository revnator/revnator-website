import type { Metadata } from 'next'
import { LegalHub } from '@/components/sections/LegalHub'

export const metadata: Metadata = {
  title: 'Legal | Revnator',
  description:
    'Privacy Policy, Terms of Service, Cookie Policy, and other legal documents for Revnator.',
}

export default function LegalPage(): React.ReactElement {
  return (
    <main>
      <LegalHub />
    </main>
  )
}
