import type { GlobalConfig } from 'payload'

import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
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
        // ── Tab 1: Brand ──
        {
          label: 'Brand',
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
                  'Recommended: 480\u00D7160px (PNG, transparent, white/light version). Overrides Site Settings logoDark.',
                condition: (_data, siblingData) =>
                  !siblingData?.useLogoFromSiteSettings,
              },
            },
            {
              name: 'showLogoText',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description:
                  'Show the brand text next to the logo. Disable if your logo already includes the wordmark.',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              defaultValue: 'The all-in-one sales OS for lean B2B teams.',
            },
            {
              name: 'copyrightText',
              type: 'text',
              defaultValue: '© 2026 Revnator. All rights reserved.',
            },
          ],
        },

        // ── Tab 2: Columns ──
        {
          label: 'Columns',
          fields: [
            {
              name: 'columns',
              type: 'array',
              minRows: 1,
              maxRows: 6,
              admin: { initCollapsed: true },
              defaultValue: [
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
                    { label: 'API Docs', href: '/docs/api/authentication' },
                  ],
                },
              ],
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'links',
                  type: 'array',
                  admin: { initCollapsed: true },
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'href',
                      type: 'text',
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },

        // ── Tab 3: Social Links ──
        {
          label: 'Social Links',
          fields: [
            {
              name: 'socialLinks',
              type: 'array',
              admin: { initCollapsed: true },
              defaultValue: [
                { platform: 'linkedin', href: '#' },
                { platform: 'twitter', href: '#' },
                { platform: 'github', href: '#' },
              ],
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'LinkedIn', value: 'linkedin' },
                    { label: 'Twitter', value: 'twitter' },
                    { label: 'GitHub', value: 'github' },
                    { label: 'YouTube', value: 'youtube' },
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'Instagram', value: 'instagram' },
                  ],
                },
                {
                  name: 'href',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },

        // ── Tab 4: Bottom Bar ──
        {
          label: 'Bottom Bar',
          fields: [
            {
              name: 'bottomLinks',
              type: 'array',
              admin: { initCollapsed: true },
              defaultValue: [
                { label: 'Privacy', href: '/legal/privacy-policy' },
                { label: 'Terms', href: '/legal/terms-of-service' },
                { label: 'Cookies', href: '/legal/cookie-policy' },
              ],
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'href',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
