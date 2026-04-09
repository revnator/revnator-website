import type { GlobalConfig } from 'payload'

import { revalidateSiteSettings } from './hooks/revalidateSiteSettings'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
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
        {
          label: 'Branding',
          fields: [
            {
              name: 'siteName',
              type: 'text',
              defaultValue: 'Revnator',
            },
            {
              name: 'tagline',
              type: 'text',
              defaultValue: 'B2B Sales OS',
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'logoDark',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Logo variant for dark backgrounds',
              },
            },
            {
              name: 'favicon',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'SEO Defaults',
          fields: [
            {
              name: 'defaultMetaTitle',
              type: 'text',
              defaultValue: 'Revnator — B2B Sales OS',
              admin: {
                description: 'Fallback meta title when pages don\'t specify one (max 60 chars)',
              },
            },
            {
              name: 'defaultMetaDescription',
              type: 'textarea',
              defaultValue: 'Revnator is the all-in-one B2B Sales OS that unifies your contacts, accounts, email, pipeline, and revenue operations.',
              admin: {
                description: 'Fallback meta description (max 160 chars)',
              },
            },
            {
              name: 'defaultOgImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Default Open Graph image (1200×630) used when pages don\'t specify one',
              },
            },
            {
              name: 'titleSuffix',
              type: 'text',
              defaultValue: '| Revnator',
              admin: {
                description: 'Appended to page titles, e.g. "Pricing | Revnator"',
              },
            },
          ],
        },
        {
          label: 'Social',
          fields: [
            {
              name: 'socialLinks',
              type: 'group',
              fields: [
                {
                  name: 'linkedin',
                  type: 'text',
                },
                {
                  name: 'twitter',
                  type: 'text',
                  admin: {
                    description: 'Full URL, e.g. https://x.com/revnator',
                  },
                },
                {
                  name: 'youtube',
                  type: 'text',
                },
                {
                  name: 'github',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          label: 'Analytics',
          fields: [
            {
              name: 'plausibleDomain',
              type: 'text',
              admin: {
                description: 'Domain configured in Plausible (e.g. revnator.com)',
              },
            },
            {
              name: 'plausibleSrc',
              type: 'text',
              admin: {
                description: 'Plausible script source URL (leave blank for default cloud)',
              },
            },
          ],
        },
        {
          label: 'Contact Info',
          fields: [
            {
              name: 'contactEmail',
              type: 'email',
            },
            {
              name: 'supportEmail',
              type: 'email',
            },
            {
              name: 'address',
              type: 'textarea',
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateSiteSettings],
  },
}
