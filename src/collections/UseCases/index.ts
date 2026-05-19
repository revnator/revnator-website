import type { CollectionConfig } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
} from '@payloadcms/plugin-seo/fields'
import { authenticated } from '../../access/authenticated'
import { revalidateUseCase, revalidateUseCaseDelete } from './hooks/revalidateUseCase'
import { lucideIconOptions } from '../../fields/iconOptions'

export const UseCases: CollectionConfig = {
  slug: 'use-cases',
  admin: {
    group: 'Sales OS',
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'order', 'isPublished', 'updatedAt'],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  defaultPopulate: {
    name: true,
    slug: true,
    meta: {
      image: true,
      description: true,
    },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // ── Tab 1: Basic Info ──
        {
          label: 'Basic Info',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              admin: {
                description: "Use case name (e.g., 'Sales Operations', 'CRM')",
              },
            },
            {
              name: 'order',
              type: 'number',
              defaultValue: 0,
              admin: {
                description: 'Display order in lists. Lower numbers appear first.',
              },
            },
            {
              name: 'isPublished',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Uncheck to hide this use case from the site without deleting it',
              },
            },
          ],
        },

        // ── Tab 2: Hero ──
        {
          label: 'Hero',
          fields: [
            {
              name: 'badge',
              type: 'text',
              defaultValue: 'USE CASE',
              admin: {
                description: 'Uppercase badge text above the headline',
              },
            },
            {
              name: 'heroHeading',
              type: 'text',
              required: true,
              admin: {
                description: 'Main heading on the use case page hero',
              },
            },
            {
              name: 'heroDescription',
              type: 'textarea',
              required: true,
              admin: {
                description: '1-2 sentence description below the heading',
              },
            },
            {
              name: 'primaryCtaText',
              type: 'text',
              defaultValue: 'Start free trial',
            },
            {
              name: 'primaryCtaHref',
              type: 'text',
              defaultValue: '/get-started',
            },
            {
              name: 'secondaryCtaText',
              type: 'text',
            },
            {
              name: 'secondaryCtaHref',
              type: 'text',
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Recommended: 1200×800px (PNG or JPG)',
              },
            },
          ],
        },

        // ── Tab 3: Pain Points ──
        {
          label: 'Pain Points',
          fields: [
            {
              name: 'painSectionLabel',
              type: 'text',
              defaultValue: "WHAT YOU'RE FACING",
            },
            {
              name: 'painHeading',
              type: 'text',
              required: true,
            },
            {
              name: 'painCards',
              type: 'array',
              minRows: 3,
              maxRows: 3,
              admin: {
                description: 'Exactly 3 pain point cards',
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
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                },
              ],
            },
          ],
        },

        // ── Tab 4: Solutions ──
        {
          label: 'Solutions',
          fields: [
            {
              name: 'solutions',
              type: 'array',
              minRows: 1,
              maxRows: 4,
              admin: {
                description: 'Solution blocks with features (2-4 recommended)',
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  admin: {
                    description: "Uppercase section label (e.g., 'UNIFIED TASKS')",
                  },
                },
                {
                  name: 'heading',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                },
                {
                  name: 'features',
                  type: 'array',
                  minRows: 2,
                  maxRows: 8,
                  fields: [
                    {
                      name: 'text',
                      type: 'text',
                      required: true,
                    },
                  ],
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Recommended: 900×600px. Falls back to placeholder if empty.',
                  },
                },
              ],
            },
          ],
        },

        // ── Tab 5: Related Modules ──
        {
          label: 'Related Modules',
          fields: [
            {
              name: 'relatedModulesLabel',
              type: 'text',
              defaultValue: 'POWERED BY',
            },
            {
              name: 'relatedModulesHeading',
              type: 'text',
            },
            {
              name: 'relatedModules',
              type: 'array',
              minRows: 1,
              maxRows: 6,
              admin: { initCollapsed: true },
              fields: [
                {
                  name: 'module',
                  type: 'relationship',
                  relationTo: 'modules',
                  admin: {
                    description: 'Pick a module to cross-link from this page',
                  },
                },
              ],
            },
          ],
        },

        // ── Tab 6: CTA ──
        {
          label: 'CTA',
          fields: [
            {
              name: 'ctaHeading',
              type: 'text',
            },
            {
              name: 'ctaSubheading',
              type: 'textarea',
            },
            {
              name: 'ctaPrimaryText',
              type: 'text',
              defaultValue: 'Start free trial',
            },
            {
              name: 'ctaPrimaryHref',
              type: 'text',
              defaultValue: '/get-started',
            },
            {
              name: 'ctaSecondaryText',
              type: 'text',
            },
            {
              name: 'ctaSecondaryHref',
              type: 'text',
            },
          ],
        },

        // ── Tab 7: SEO ──
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
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
        description: 'URL slug. Auto-generated from name. Edit if needed.',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.name) {
              return (data.name as string)
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
    afterChange: [revalidateUseCase],
    afterDelete: [revalidateUseCaseDelete],
  },
}
