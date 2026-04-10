import type { Metadata } from 'next'
import type { ContactPage as ContactPageType } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'

import { ContactHero } from '@/components/sections/ContactHero'
import { ContactOptions } from '@/components/sections/ContactOptions'
import { ContactMain } from '@/components/sections/ContactMain'

export async function generateMetadata(): Promise<Metadata> {
  const page = (await getCachedGlobal('contact-page', 1)()) as ContactPageType
  return {
    title: page.meta?.title || 'Contact',
    description:
      page.meta?.description ||
      'Get in touch with the Revnator team. Sales inquiries, support, or partnership opportunities.',
  }
}

export default async function ContactPage(): Promise<React.ReactElement> {
  const page = (await getCachedGlobal('contact-page', 1)()) as ContactPageType

  const heroData = {
    label: page.heroLabel || 'CONTACT',
    heading: page.heroHeading || 'Get in touch',
    subheading:
      page.heroSubheading ||
      "Have a question, want a demo, or interested in a partnership? We'd love to hear from you.",
  }

  const options = (page.contactOptions ?? []).map((opt) => ({
    icon: opt.icon,
    title: opt.title,
    linkLabel: opt.linkLabel,
    href: opt.href,
  }))

  const mainData = {
    formHeading: page.formHeading || 'Send us a message',
    subjectOptions: (page.subjectOptions ?? []).map((s) => s.label),
    infoBlocks: (page.contactInfoBlocks ?? []).map((b) => ({
      icon: b.icon,
      label: b.label,
      text: b.text,
    })),
  }

  return (
    <main>
      <ContactHero data={heroData} />
      {options.length > 0 && <ContactOptions options={options} />}
      <ContactMain data={mainData} />
    </main>
  )
}
