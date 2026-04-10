import type { GlobalConfig } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
} from '@payloadcms/plugin-seo/fields'
import { revalidateNewsPage } from './hooks/revalidateNewsPage'

export const NewsPage: GlobalConfig = {
  slug: 'news-page',
  admin: {
    group: 'Pages',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // ── Tab 1: Hero ──
        {
          label: 'Hero',
          fields: [
            {
              name: 'sectionLabel',
              type: 'text',
              defaultValue: 'NEWSROOM',
            },
            {
              name: 'heading',
              type: 'text',
              defaultValue: 'News & Updates',
            },
            {
              name: 'subheading',
              type: 'textarea',
              defaultValue:
                'Product launches, company milestones, and announcements from the Revnator team.',
            },
          ],
        },

        // ── Tab 2: Press Kit ──
        {
          label: 'Press Kit',
          fields: [
            {
              name: 'pressKitEnabled',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Show the press kit section at the bottom of the news page',
              },
            },
            {
              name: 'pressKitLabel',
              type: 'text',
              defaultValue: 'FOR JOURNALISTS',
            },
            {
              name: 'pressKitHeading',
              type: 'text',
              defaultValue: 'Looking for media assets?',
            },
            {
              name: 'pressKitDescription',
              type: 'textarea',
              defaultValue:
                'Download our press kit including logos, product screenshots, founder photos, and brand guidelines.',
            },
            {
              name: 'pressKitButtonText',
              type: 'text',
              defaultValue: 'Download press kit',
            },
            {
              name: 'pressKitButtonHref',
              type: 'text',
              defaultValue: '#',
            },
            {
              name: 'pressContactHeading',
              type: 'text',
              defaultValue: 'Media inquiries',
            },
            {
              name: 'pressContactEmail',
              type: 'text',
              defaultValue: 'press@revnator.com',
            },
            {
              name: 'pressContactResponse',
              type: 'text',
              defaultValue: 'We typically respond within 12 hours.',
            },
          ],
        },

        // ── Tab 3: SEO ──
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({ hasGenerateFn: false }),
            MetaImageField({ relationTo: 'media' }),
            MetaDescriptionField({}),
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateNewsPage],
  },
}
