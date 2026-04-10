import type { CollectionConfig } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
} from '@payloadcms/plugin-seo/fields'
import { authenticated } from '../../access/authenticated'
import { revalidateTemplate, revalidateTemplateDelete } from './hooks/revalidateTemplate'

export const Templates: CollectionConfig = {
  slug: 'templates',
  admin: {
    group: 'Resources',
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'useCase', 'updatedAt'],
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
              name: 'useCase',
              type: 'text',
              required: true,
              admin: { description: 'e.g. "Best for: SDRs doing outbound to mid-market SaaS"' },
            },
            {
              name: 'preview',
              type: 'textarea',
              required: true,
              admin: {
                description: 'Code/text preview shown on the detail page',
              },
            },
            {
              name: 'included',
              type: 'array',
              required: true,
              minRows: 1,
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                },
              ],
              admin: { description: 'What\'s included list items' },
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
    afterChange: [revalidateTemplate],
    afterDelete: [revalidateTemplateDelete],
  },
}
