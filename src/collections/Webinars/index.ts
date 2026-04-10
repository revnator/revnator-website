import type { CollectionConfig } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
} from '@payloadcms/plugin-seo/fields'
import { authenticated } from '../../access/authenticated'
import { revalidateWebinar, revalidateWebinarDelete } from './hooks/revalidateWebinar'

export const Webinars: CollectionConfig = {
  slug: 'webinars',
  admin: {
    group: 'Resources',
    useAsTitle: 'title',
    defaultColumns: ['title', 'isUpcoming', 'date', 'status', 'updatedAt'],
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
              name: 'isUpcoming',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Check for upcoming/live webinars, uncheck for recorded',
              },
            },
            {
              name: 'date',
              type: 'text',
              required: true,
              admin: { description: 'Display date, e.g. "Thursday, April 24, 2026"' },
            },
            {
              name: 'time',
              type: 'text',
              admin: { description: 'e.g. "2:00 PM EST"' },
            },
            {
              name: 'duration',
              type: 'text',
              required: true,
              admin: { description: 'e.g. "45 minutes"' },
            },
            {
              name: 'speakers',
              type: 'array',
              required: true,
              minRows: 1,
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  admin: { description: 'e.g. "Founder, Revnator"' },
                },
                {
                  name: 'initials',
                  type: 'text',
                  required: true,
                  maxLength: 3,
                  admin: { description: 'e.g. "SS"' },
                },
              ],
            },
            {
              name: 'learnings',
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
              admin: { description: 'What attendees will learn' },
            },
            {
              name: 'registeredCount',
              type: 'number',
              admin: { description: 'Number of registered attendees (optional)' },
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
    afterChange: [revalidateWebinar],
    afterDelete: [revalidateWebinarDelete],
  },
}
