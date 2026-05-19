import type { GlobalConfig } from 'payload'

import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // ── Tab 1: Logo ──
        {
          label: 'Logo',
          fields: [
            {
              name: 'useLogoFromSiteSettings',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description:
                  'Use the logo from Site Settings, or override here.',
              },
            },
            {
              name: 'logoOverride',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description:
                  'Recommended: 480\u00D7160px (PNG, transparent). Overrides Site Settings logo.',
                condition: (_data, siblingData) =>
                  !siblingData?.useLogoFromSiteSettings,
              },
            },
            {
              name: 'logoText',
              type: 'text',
              defaultValue: 'Revnator',
              admin: {
                description:
                  'Wordmark text shown next to or instead of the logo.',
              },
            },
            {
              name: 'showLogoText',
              type: 'checkbox',
              defaultValue: true,
            },
          ],
        },

        // ── Tab 2: Main Nav Items ──
        {
          label: 'Main Nav Items',
          fields: [
            {
              name: 'mainNav',
              type: 'array',
              minRows: 1,
              maxRows: 8,
              admin: {
                initCollapsed: true,
              },
              defaultValue: [
                {
                  label: 'Platform',
                  hasDropdown: true,
                  dropdownType: 'platform',
                },
                {
                  label: 'Sales OS',
                  hasDropdown: true,
                  dropdownType: 'salesOS',
                },
                {
                  label: 'Resources',
                  hasDropdown: true,
                  dropdownType: 'resources',
                },
                {
                  label: 'Pricing',
                  hasDropdown: false,
                  directLink: '/pricing',
                },
                {
                  label: 'Company',
                  hasDropdown: true,
                  dropdownType: 'company',
                },
                {
                  label: 'Docs',
                  hasDropdown: false,
                  directLink: '/docs',
                },
              ],
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'hasDropdown',
                  type: 'checkbox',
                  defaultValue: false,
                },
                {
                  name: 'directLink',
                  type: 'text',
                  admin: {
                    condition: (_data, siblingData) =>
                      !siblingData?.hasDropdown,
                    description:
                      'URL this nav item links to. Used only when there\'s no dropdown.',
                  },
                },
                {
                  name: 'dropdownType',
                  type: 'select',
                  admin: {
                    condition: (_data, siblingData) =>
                      Boolean(siblingData?.hasDropdown),
                    description:
                      "Pick a pre-built dropdown layout. 'Custom' gives you a flexible single-column dropdown.",
                  },
                  options: [
                    { label: 'Platform', value: 'platform' },
                    { label: 'Sales OS', value: 'salesOS' },
                    { label: 'Resources', value: 'resources' },
                    { label: 'Company', value: 'company' },
                    { label: 'Custom', value: 'custom' },
                  ],
                },
              ],
            },
          ],
        },

        // ── Tab 3: Platform Dropdown ──
        {
          label: 'Platform Dropdown',
          fields: [
            {
              name: 'platformLabel',
              type: 'text',
              defaultValue: 'MODULES',
              admin: {
                description: 'Section label shown above the module grid.',
              },
            },
            {
              name: 'platformPromoCard',
              type: 'group',
              fields: [
                {
                  name: 'badge',
                  type: 'text',
                  defaultValue: 'NEW',
                },
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Explore the full platform',
                },
                {
                  name: 'linkText',
                  type: 'text',
                  defaultValue: 'See all features →',
                },
                {
                  name: 'href',
                  type: 'text',
                  defaultValue: '/platform',
                },
              ],
            },
          ],
        },

        // ── Tab 4: Sales OS Dropdown ──
        {
          label: 'Sales OS Dropdown',
          fields: [
            {
              name: 'useCasesLabel',
              type: 'text',
              defaultValue: 'USE CASES',
            },
            {
              name: 'useCasesItems',
              type: 'array',
              admin: { initCollapsed: true },
              defaultValue: [
                { name: 'Sales Operations', href: '/use-cases/sales-operations' },
                { name: 'CRM', href: '/use-cases/crm' },
                { name: 'Lead Generation', href: '/use-cases/lead-generation' },
                { name: 'Forecast & Plan', href: '/use-cases/forecast-and-plan' },
                {
                  name: 'Prospect & Manage Accounts',
                  href: '/use-cases/prospect-and-manage',
                },
              ],
              fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'href', type: 'text', required: true },
              ],
            },
            {
              name: 'industriesLabel',
              type: 'text',
              defaultValue: 'FOR',
            },
            {
              name: 'industriesItems',
              type: 'array',
              admin: { initCollapsed: true },
              defaultValue: [
                { name: 'Agencies', href: '/for/agencies' },
                { name: 'SaaS Sales', href: '/for/saas' },
                { name: 'Consultancies', href: '/for/consultancies' },
                { name: 'Recruiters', href: '/for/recruiters' },
                { name: 'Real Estate', href: '/for/real-estate' },
              ],
              fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'href', type: 'text', required: true },
              ],
            },
            {
              name: 'featuredCaseStudy',
              type: 'group',
              fields: [
                {
                  name: 'typeLabel',
                  type: 'text',
                  defaultValue: 'CASE STUDY',
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  defaultValue:
                    'How Lighthouse Agency 3x their pipeline with Revnator',
                },
                {
                  name: 'href',
                  type: 'text',
                  required: true,
                  defaultValue:
                    '/resources/case-studies/lighthouse-agency',
                },
                {
                  name: 'icon',
                  type: 'select',
                  defaultValue: 'Trophy',
                  options: [
                    { label: 'Trophy', value: 'Trophy' },
                    { label: 'Award', value: 'Award' },
                    { label: 'Star', value: 'Star' },
                    { label: 'TrendingUp', value: 'TrendingUp' },
                  ],
                },
              ],
            },
            {
              name: 'footerLink',
              type: 'group',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  defaultValue: 'Why Revnator →',
                },
                {
                  name: 'href',
                  type: 'text',
                  defaultValue: '/why-revnator',
                },
              ],
            },
          ],
        },

        // ── Tab 5: Resources Dropdown ──
        {
          label: 'Resources Dropdown',
          fields: [
            {
              name: 'learnLabel',
              type: 'text',
              defaultValue: 'LEARN',
            },
            {
              name: 'learnItems',
              type: 'array',
              admin: { initCollapsed: true },
              defaultValue: [
                { name: 'Blog', href: '/blog' },
                { name: 'Documentation', href: '/docs' },
                { name: 'Case Studies', href: '/resources/case-studies' },
                { name: 'Webinars', href: '/resources/webinars' },
              ],
              fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'href', type: 'text', required: true },
              ],
            },
            {
              name: 'downloadLabel',
              type: 'text',
              defaultValue: 'DOWNLOAD',
            },
            {
              name: 'downloadItems',
              type: 'array',
              admin: { initCollapsed: true },
              defaultValue: [
                { name: 'Ebooks', href: '/resources/ebooks' },
                { name: 'Whitepapers', href: '/resources/whitepapers' },
                { name: 'Sales Templates', href: '/resources/templates' },
                { name: 'Success Stories', href: '/resources/success-stories' },
              ],
              fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'href', type: 'text', required: true },
              ],
            },
            {
              name: 'featuredResource',
              type: 'group',
              fields: [
                {
                  name: 'typeLabel',
                  type: 'text',
                  defaultValue: 'EBOOK',
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  defaultValue: 'The 2026 Cold Email Playbook',
                },
                {
                  name: 'linkText',
                  type: 'text',
                  defaultValue: 'Download free →',
                },
                {
                  name: 'href',
                  type: 'text',
                  required: true,
                  defaultValue: '/resources/ebooks/cold-email-playbook',
                },
                {
                  name: 'thumbnailIcon',
                  type: 'select',
                  defaultValue: 'BookOpen',
                  options: [
                    { label: 'BookOpen', value: 'BookOpen' },
                    { label: 'FileText', value: 'FileText' },
                    { label: 'Video', value: 'Video' },
                    { label: 'BarChart3', value: 'BarChart3' },
                    { label: 'Trophy', value: 'Trophy' },
                    { label: 'FileCode', value: 'FileCode' },
                  ],
                },
              ],
            },
            {
              name: 'viewAllLink',
              type: 'group',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  defaultValue: 'View all resources →',
                },
                {
                  name: 'href',
                  type: 'text',
                  defaultValue: '/resources',
                },
              ],
            },
          ],
        },

        // ── Tab 6: Company Dropdown ──
        {
          label: 'Company Dropdown',
          fields: [
            {
              name: 'companyItems',
              type: 'array',
              admin: { initCollapsed: true },
              defaultValue: [
                {
                  name: 'About',
                  description: 'Our story and mission',
                  icon: 'Info',
                  href: '/about',
                },
                {
                  name: 'Contact',
                  description: 'Get in touch with our team',
                  icon: 'Mail',
                  href: '/contact',
                },
                {
                  name: 'News',
                  description: 'Product updates and announcements',
                  icon: 'Newspaper',
                  href: '/news',
                },
                {
                  name: 'Legal',
                  description: 'Privacy, terms, and policies',
                  icon: 'Shield',
                  href: '/legal',
                },
              ],
              fields: [
                { name: 'name', type: 'text', required: true },
                {
                  name: 'description',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'icon',
                  type: 'select',
                  options: [
                    { label: 'Info', value: 'Info' },
                    { label: 'Mail', value: 'Mail' },
                    { label: 'Newspaper', value: 'Newspaper' },
                    { label: 'Shield', value: 'Shield' },
                    { label: 'Briefcase', value: 'Briefcase' },
                    { label: 'Building2', value: 'Building2' },
                    { label: 'Users', value: 'Users' },
                  ],
                },
                { name: 'href', type: 'text', required: true },
              ],
            },
          ],
        },

        // ── Tab 7: CTAs ──
        {
          label: 'CTAs',
          fields: [
            {
              name: 'loginText',
              type: 'text',
              defaultValue: 'Log in',
            },
            {
              name: 'loginHref',
              type: 'text',
              defaultValue: '/login',
            },
            {
              name: 'primaryCtaText',
              type: 'text',
              defaultValue: 'Start free trial',
            },
            {
              name: 'primaryCtaHref',
              type: 'text',
              defaultValue: '/get-started',
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
