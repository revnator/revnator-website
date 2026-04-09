import type { LucideIcon } from 'lucide-react'
import {
  Users,
  Building2,
  Mail,
  GitBranch,
  LayoutDashboard,
  Calendar,
  MessageCircle,
  Sparkles,
  FileText,
} from 'lucide-react'

export interface ModuleItem {
  name: string
  description: string
  href: string
  icon: LucideIcon
}

export interface NavLinkItem {
  label: string
  href: string
}

export interface ResourceColumn {
  label: string
  links: NavLinkItem[]
}

export const modules: ModuleItem[] = [
  {
    name: 'Contacts',
    description: 'Manage your contact lifecycle',
    href: '/platform/contacts',
    icon: Users,
  },
  {
    name: 'Accounts',
    description: '360° view of every account',
    href: '/platform/accounts',
    icon: Building2,
  },
  {
    name: 'Email Outreach',
    description: 'Sequences and campaigns',
    href: '/platform/outreach',
    icon: Mail,
  },
  {
    name: 'Pipeline',
    description: 'Visual deal management',
    href: '/platform/pipeline',
    icon: GitBranch,
  },
  {
    name: 'Sales Ops',
    description: 'Tasks, missions, workflows',
    href: '/platform/sales-ops',
    icon: LayoutDashboard,
  },
  {
    name: 'Calendar',
    description: 'Booking pages and scheduling',
    href: '/platform/calendar',
    icon: Calendar,
  },
  {
    name: 'Chat',
    description: 'Internal team communication',
    href: '/platform/chat',
    icon: MessageCircle,
  },
  {
    name: 'AI SDR',
    description: 'AI-powered sales development',
    href: '/platform/ai-sdr',
    icon: Sparkles,
  },
  {
    name: 'Forms',
    description: 'Lead capture and routing',
    href: '/platform/forms',
    icon: FileText,
  },
]

export interface FeaturedCaseStudy {
  type: string
  title: string
  href: string
}

export interface SalesOSDropdownData {
  useCases: NavLinkItem[]
  industries: NavLinkItem[]
  featuredCaseStudy: FeaturedCaseStudy
  footerLink: NavLinkItem
}

export const salesOSDropdown: SalesOSDropdownData = {
  useCases: [
    { label: 'Sales Operations', href: '/use-cases/sales-operations' },
    { label: 'CRM', href: '/use-cases/crm' },
    { label: 'Lead Generation', href: '/use-cases/lead-generation' },
    { label: 'Forecast & Plan', href: '/use-cases/forecast-and-plan' },
    { label: 'Prospect & Manage Accounts', href: '/use-cases/prospect-and-manage' },
  ],
  industries: [
    { label: 'Agencies', href: '/for/agencies' },
    { label: 'SaaS Sales', href: '/for/saas' },
    { label: 'Consultancies', href: '/for/consultancies' },
    { label: 'Recruiters', href: '/for/recruiters' },
    { label: 'Real Estate', href: '/for/real-estate' },
  ],
  featuredCaseStudy: {
    type: 'CASE STUDY',
    title: 'How Lighthouse Agency 3x their pipeline with Revnator',
    href: '/resources/case-studies/lighthouse-agency',
  },
  footerLink: { label: 'Why Revnator', href: '/why-revnator' },
}

export interface CompanyDropdownItem {
  name: string
  description: string
  icon: string
  href: string
}

export const companyDropdownItems: CompanyDropdownItem[] = [
  { name: 'About', description: 'Our story and mission', icon: 'Info', href: '/about' },
  { name: 'Contact', description: 'Get in touch with our team', icon: 'Mail', href: '/contact' },
  { name: 'News', description: 'Product updates and announcements', icon: 'Newspaper', href: '/news' },
  { name: 'Legal', description: 'Privacy, terms, and policies', icon: 'Shield', href: '/legal' },
]

export const resourceColumns: ResourceColumn[] = [
  {
    label: 'LEARN',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Documentation', href: '/docs' },
      { label: 'Case Studies', href: '/resources/case-studies' },
      { label: 'Webinars', href: '/resources/webinars' },
    ],
  },
  {
    label: 'DOWNLOAD',
    links: [
      { label: 'Ebooks', href: '/resources/ebooks' },
      { label: 'Whitepapers', href: '/resources/whitepapers' },
      { label: 'Sales Templates', href: '/resources/templates' },
      { label: 'Success Stories', href: '/resources/success-stories' },
    ],
  },
]

export const featuredResource = {
  pill: 'EBOOK',
  title: 'The 2026 Cold Email Playbook',
  linkLabel: 'Download free →',
  href: '/resources/ebooks/cold-email-playbook',
}

export interface NavItem {
  label: string
  href: string
  hasDropdown: boolean
}

export const navItems: NavItem[] = [
  { label: 'Platform', href: '/platform', hasDropdown: true },
  { label: 'Sales OS', href: '/use-cases', hasDropdown: true },
  { label: 'Resources', href: '/resources', hasDropdown: true },
  { label: 'Pricing', href: '/pricing', hasDropdown: false },
  { label: 'Company', href: '/about', hasDropdown: true },
  { label: 'Docs', href: '/docs', hasDropdown: false },
]
