import type { CollectionConfig } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
} from '@payloadcms/plugin-seo/fields'
import { authenticated } from '../../access/authenticated'
import { revalidateDocPage, revalidateDocPageDelete } from './hooks/revalidateDocPage'

export const DocPages: CollectionConfig = {
  slug: 'doc-pages',
  admin: {
    group: 'Documentation',
    useAsTitle: 'title',
    defaultColumns: ['title', 'section', 'order', 'updatedAt'],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              index: true,
              admin: {
                description: 'Used in the URL: /docs/[section-slug]/[page-slug]. Must be unique within its section.',
              },
              hooks: {
                beforeValidate: [
                  ({ value, data }) => {
                    if (!value && data?.title) {
                      return (data.title as string)
                        .toLowerCase()
                        .trim()
                        .replace(/[^a-z0-9\s-]/g, '')
                        .replace(/\s+/g, '-')
                        .replace(/-+/g, '-')
                    }
                    return value
                  },
                ],
              },
            },
            {
              name: 'section',
              type: 'relationship',
              relationTo: 'doc-sections',
              required: true,
              admin: {
                description: 'Which section this page belongs to in the sidebar',
              },
            },
            {
              name: 'order',
              type: 'number',
              defaultValue: 0,
              admin: {
                description: 'Display order within the section. Lower numbers first.',
              },
            },
            {
              name: 'isPublished',
              type: 'checkbox',
              defaultValue: true,
            },
            {
              name: 'lastUpdated',
              type: 'date',
              required: true,
              admin: {
                date: {
                  pickerAppearance: 'dayOnly',
                },
              },
            },
            {
              name: 'body',
              type: 'richText',
              required: true,
              admin: {
                description: 'Write documentation content. Use headings (H2, H3) for the table of contents sidebar.',
              },
            },
          ],
        },
        {
          label: 'Navigation',
          fields: [
            {
              name: 'previousPage',
              type: 'relationship',
              relationTo: 'doc-pages',
              admin: {
                description: "Link shown as 'Previous' at the bottom of the page",
              },
            },
            {
              name: 'nextPage',
              type: 'relationship',
              relationTo: 'doc-pages',
              admin: {
                description: "Link shown as 'Next' at the bottom of the page",
              },
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({ hasGenerateFn: true }),
            MetaImageField({ relationTo: 'media' }),
            MetaDescriptionField({}),
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateDocPage],
    afterDelete: [revalidateDocPageDelete],
  },
}
