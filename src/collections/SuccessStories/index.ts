import type { CollectionConfig } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
} from '@payloadcms/plugin-seo/fields'
import { authenticated } from '../../access/authenticated'
import { revalidateSuccessStory, revalidateSuccessStoryDelete } from './hooks/revalidateSuccessStory'

export const SuccessStories: CollectionConfig = {
  slug: 'success-stories',
  admin: {
    group: 'Resources',
    useAsTitle: 'title',
    defaultColumns: ['title', 'company', 'status', 'updatedAt'],
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
              name: 'company',
              type: 'text',
              required: true,
            },
            {
              name: 'quote',
              type: 'group',
              fields: [
                {
                  name: 'text',
                  type: 'textarea',
                  required: true,
                },
                {
                  name: 'author',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  admin: { description: 'Author title, e.g. "CEO, VelocityLabs"' },
                },
              ],
            },
            {
              name: 'snapshot',
              type: 'array',
              required: true,
              minRows: 1,
              maxRows: 6,
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  admin: { description: 'e.g. "Industry"' },
                },
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                  admin: { description: 'e.g. "SaaS"' },
                },
              ],
            },
            {
              name: 'qa',
              type: 'array',
              required: true,
              minRows: 1,
              fields: [
                {
                  name: 'question',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'answer',
                  type: 'textarea',
                  required: true,
                },
              ],
              admin: { description: 'Q&A interview pairs' },
            },
            {
              name: 'calloutMetric',
              type: 'group',
              fields: [
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                  admin: { description: 'e.g. "63%"' },
                },
                {
                  name: 'context',
                  type: 'text',
                  required: true,
                  admin: { description: 'e.g. "increase in meetings booked within 3 months"' },
                },
              ],
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
    afterChange: [revalidateSuccessStory],
    afterDelete: [revalidateSuccessStoryDelete],
  },
}
