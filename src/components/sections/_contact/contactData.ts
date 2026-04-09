export interface ContactOption {
  icon: string
  title: string
  linkLabel: string
  href: string
}

export interface ContactInfoBlock {
  icon: string
  label: string
  text: string
}

export const contactOptions: ContactOption[] = [
  {
    icon: 'Mail',
    title: 'Sales inquiries',
    linkLabel: 'sales@revnator.com',
    href: 'mailto:sales@revnator.com',
  },
  {
    icon: 'HelpCircle',
    title: 'Customer support',
    linkLabel: 'support@revnator.com',
    href: 'mailto:support@revnator.com',
  },
  {
    icon: 'Briefcase',
    title: 'Partnerships',
    linkLabel: 'hello@revnator.com',
    href: 'mailto:hello@revnator.com',
  },
]

export const contactInfoBlocks: ContactInfoBlock[] = [
  {
    icon: 'MapPin',
    label: 'OFFICE',
    text: 'Coimbatore, Tamil Nadu, India',
  },
  {
    icon: 'Clock',
    label: 'SUPPORT HOURS',
    text: 'Monday \u2013 Friday, 9:00 AM \u2013 6:00 PM IST',
  },
  {
    icon: 'Zap',
    label: 'RESPONSE TIME',
    text: 'Usually within 24 hours, often sooner.',
  },
]

export const subjectOptions = [
  'General inquiry',
  'Sales question',
  'Demo request',
  'Partnership',
  'Other',
] as const
