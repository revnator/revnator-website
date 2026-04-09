import type { Metadata } from 'next'
import { ContactHero } from '@/components/sections/ContactHero'
import { ContactOptions } from '@/components/sections/ContactOptions'
import { ContactMain } from '@/components/sections/ContactMain'

export const metadata: Metadata = {
  title: 'Contact | Revnator',
  description:
    'Get in touch with the Revnator team. Sales inquiries, support, or partnership opportunities.',
}

export default function ContactPage(): React.ReactElement {
  return (
    <main>
      <ContactHero />
      <ContactOptions />
      <ContactMain />
    </main>
  )
}
