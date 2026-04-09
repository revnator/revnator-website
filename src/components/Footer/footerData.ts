export interface FooterLink {
  label: string
  href: string
}

export interface FooterColumn {
  title: string
  links: FooterLink[]
}

export const footerColumns: FooterColumn[] = [
  {
    title: 'Platform',
    links: [
      { label: 'Platform overview', href: '/platform' },
      { label: 'Contacts', href: '/platform/contacts' },
      { label: 'Accounts', href: '/platform/accounts' },
      { label: 'Email Outreach', href: '/platform/outreach' },
      { label: 'Pipeline', href: '/platform/pipeline' },
      { label: 'Calendar', href: '/platform/calendar' },
      { label: 'Sales Ops', href: '/platform/sales-ops' },
      { label: 'Forms', href: '/platform/forms' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Documentation', href: '/docs' },
      { label: 'API Reference', href: '/docs/api/authentication' },
      { label: 'Case Studies', href: '/resources/case-studies' },
      { label: 'Ebooks', href: '/resources/ebooks' },
      { label: 'Webinars', href: '/resources/webinars' },
      { label: 'Templates', href: '/resources/templates' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Why Revnator', href: '/why-revnator' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Contact', href: '/contact' },
      { label: 'News', href: '/news' },
      { label: 'Legal', href: '/legal' },
    ],
  },
  {
    title: 'Get started',
    links: [
      { label: 'Sign up free', href: '/signup' },
      { label: 'Book a demo', href: '/demo' },
      { label: 'Login', href: '/login' },
      { label: 'API Docs', href: '/docs/api' },
    ],
  },
]

export const bottomLinks: FooterLink[] = [
  { label: 'Privacy', href: '/legal/privacy-policy' },
  { label: 'Terms', href: '/legal/terms-of-service' },
  { label: 'Cookies', href: '/legal/cookie-policy' },
]
