import type { GlobalConfig } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
} from '@payloadcms/plugin-seo/fields'
import { lucideIconOptions } from '../../fields/iconOptions'
import { revalidateSupportPage } from './hooks/revalidateSupportPage'

export const SupportPage: GlobalConfig = {
  slug: 'support-page',
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
              name: 'heroLabel',
              type: 'text',
              defaultValue: 'SUPPORT',
            },
            {
              name: 'heroHeading',
              type: 'text',
              defaultValue: 'How can we help?',
            },
            {
              name: 'heroSubheading',
              type: 'textarea',
              defaultValue:
                'Browse documentation, reach out to our team, or join the community.',
            },
          ],
        },

        // ── Tab 2: Channels ──
        {
          label: 'Channels',
          fields: [
            {
              name: 'channels',
              type: 'array',
              minRows: 1,
              maxRows: 6,
              admin: {
                description: 'Support channel cards (3 recommended)',
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'icon',
                  type: 'select',
                  required: true,
                  options: lucideIconOptions,
                },
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'text', required: true },
                { name: 'linkText', type: 'text', required: true },
                { name: 'href', type: 'text', required: true },
              ],
            },
          ],
        },

        // ── Tab 3: Knowledge Base ──
        {
          label: 'Knowledge Base',
          fields: [
            {
              name: 'kbHeading',
              type: 'text',
              defaultValue: 'Knowledge Base',
            },
            {
              name: 'kbCategories',
              type: 'array',
              minRows: 1,
              maxRows: 12,
              admin: { initCollapsed: true },
              fields: [
                {
                  name: 'icon',
                  type: 'select',
                  required: true,
                  options: lucideIconOptions,
                },
                { name: 'title', type: 'text', required: true },
                {
                  name: 'articleCount',
                  type: 'text',
                  required: true,
                  admin: { description: 'e.g. "12 articles"' },
                },
                { name: 'href', type: 'text', required: true },
              ],
            },
          ],
        },

        // ── Tab 4: FAQ ──
        {
          label: 'FAQ',
          fields: [
            {
              name: 'faqHeading',
              type: 'text',
              defaultValue: 'Frequently asked questions',
            },
            {
              name: 'faqs',
              type: 'array',
              minRows: 1,
              maxRows: 20,
              admin: { initCollapsed: true },
              fields: [
                { name: 'question', type: 'text', required: true },
                { name: 'answer', type: 'textarea', required: true },
              ],
            },
          ],
        },

        // ── Tab 5: Final CTA ──
        {
          label: 'Final CTA',
          fields: [
            {
              name: 'ctaHeading',
              type: 'text',
              defaultValue: 'Still need help?',
            },
            {
              name: 'ctaSubheading',
              type: 'textarea',
              defaultValue: 'Our support team typically responds within 24 hours.',
            },
            {
              name: 'ctaPrimaryCta',
              type: 'group',
              fields: [
                { name: 'label', type: 'text', defaultValue: 'Email support' },
                { name: 'href', type: 'text', defaultValue: 'mailto:support@revnator.com' },
              ],
            },
            {
              name: 'ctaSecondaryCta',
              type: 'group',
              fields: [
                { name: 'label', type: 'text', defaultValue: 'Browse docs' },
                { name: 'href', type: 'text', defaultValue: '/docs' },
              ],
            },
          ],
        },

        // ── Tab 6: SEO ──
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
    afterChange: [revalidateSupportPage],
  },
}
