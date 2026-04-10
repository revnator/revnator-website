import type { GlobalConfig } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
} from '@payloadcms/plugin-seo/fields'
import { lucideIconOptions } from '../../fields/iconOptions'
import { revalidateContactPage } from './hooks/revalidateContactPage'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
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
              defaultValue: 'CONTACT',
            },
            {
              name: 'heroHeading',
              type: 'text',
              defaultValue: 'Get in touch',
            },
            {
              name: 'heroSubheading',
              type: 'textarea',
              defaultValue:
                'Have a question, want a demo, or interested in a partnership? We\'d love to hear from you.',
            },
          ],
        },

        // ── Tab 2: Contact Options ──
        {
          label: 'Contact Options',
          fields: [
            {
              name: 'contactOptions',
              type: 'array',
              minRows: 1,
              maxRows: 6,
              admin: {
                description: 'Contact cards (3 recommended: Sales, Support, Partnerships)',
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
                { name: 'linkLabel', type: 'text', required: true },
                { name: 'href', type: 'text', required: true },
              ],
            },
          ],
        },

        // ── Tab 3: Contact Info ──
        {
          label: 'Contact Info',
          fields: [
            {
              name: 'contactInfoBlocks',
              type: 'array',
              minRows: 1,
              maxRows: 6,
              admin: {
                description: 'Info blocks shown alongside the contact form',
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'icon',
                  type: 'select',
                  required: true,
                  options: lucideIconOptions,
                },
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  admin: { description: 'e.g. "OFFICE", "SUPPORT HOURS"' },
                },
                { name: 'text', type: 'text', required: true },
              ],
            },
          ],
        },

        // ── Tab 4: Form Settings ──
        {
          label: 'Form',
          fields: [
            {
              name: 'formHeading',
              type: 'text',
              defaultValue: 'Send us a message',
            },
            {
              name: 'subjectOptions',
              type: 'array',
              minRows: 1,
              maxRows: 10,
              admin: {
                description: 'Subject dropdown options for the contact form',
                initCollapsed: true,
              },
              fields: [
                { name: 'label', type: 'text', required: true },
              ],
            },
          ],
        },

        // ── Tab 5: SEO ──
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
    afterChange: [revalidateContactPage],
  },
}
