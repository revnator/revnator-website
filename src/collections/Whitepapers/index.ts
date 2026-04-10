import type { CollectionConfig } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
} from '@payloadcms/plugin-seo/fields'
import { authenticated } from '../../access/authenticated'
import { revalidateWhitepaper, revalidateWhitepaperDelete } from './hooks/revalidateWhitepaper'

export const Whitepapers: CollectionConfig = {
  slug: 'whitepapers',
  admin: {
    group: 'Resources',
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'pages', 'updatedAt'],
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
              name: 'status',
              type: 'select',
              required: true,
              defaultValue: 'draft',
              options: [
                { label: 'Draft', value: 'draft' },
                { label: 'Published', value: 'published' },
              ],
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              maxLength: 300,
            },
            {
              name: 'subtitle',
              type: 'text',
              required: true,
              admin: { description: 'e.g. "A Revnator Research Report · Q1 2026 · 32 pages"' },
            },
            {
              name: 'pages',
              type: 'number',
              required: true,
            },
            {
              name: 'keyFindings',
              type: 'array',
              required: true,
              minRows: 1,
              maxRows: 6,
              fields: [
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                  admin: { description: 'e.g. "78%"' },
                },
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                  admin: { description: 'e.g. "of sales teams use 5+ disconnected tools"' },
                },
              ],
            },
            {
              name: 'contents',
              type: 'array',
              required: true,
              minRows: 1,
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
              ],
              admin: { description: 'Table of contents items' },
            },
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
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
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'URL slug. Auto-generated from title.',
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
  ],
  hooks: {
    afterChange: [revalidateWhitepaper],
    afterDelete: [revalidateWhitepaperDelete],
  },
}
