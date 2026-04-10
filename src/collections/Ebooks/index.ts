import type { CollectionConfig } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
} from '@payloadcms/plugin-seo/fields'
import { authenticated } from '../../access/authenticated'
import { revalidateEbook, revalidateEbookDelete } from './hooks/revalidateEbook'

export const Ebooks: CollectionConfig = {
  slug: 'ebooks',
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
              admin: {
                description: 'Short summary shown on resource cards. Max 300 characters.',
              },
            },
            {
              name: 'pages',
              type: 'number',
              required: true,
              admin: {
                description: 'Number of pages in the ebook',
              },
            },
            {
              name: 'readTime',
              type: 'text',
              required: true,
              admin: {
                description: 'e.g. "20 min read"',
              },
            },
            {
              name: 'bodyIntro',
              type: 'textarea',
              required: true,
              admin: {
                description: 'Introductory paragraph shown on the detail page',
              },
            },
            {
              name: 'chapters',
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
              admin: {
                description: 'Table of contents / chapter list',
              },
            },
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Cover image. Recommended: 1280x720px',
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
    afterChange: [revalidateEbook],
    afterDelete: [revalidateEbookDelete],
  },
}
