import type { CollectionConfig } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
} from '@payloadcms/plugin-seo/fields'
import { authenticated } from '../../access/authenticated'
import { revalidateModule, revalidateModuleDelete } from './hooks/revalidateModule'
import { lucideIconOptions } from '../../fields/iconOptions'

export const Modules: CollectionConfig = {
  slug: 'modules',
  admin: {
    group: 'Module Pages',
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'badge', 'updatedAt'],
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
    icon: true,
    heroDescription: true,
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
                description: "Module name (e.g., 'Contact Lifecycle Management')",
              },
            },
            {
              name: 'badge',
              type: 'text',
              required: true,
              defaultValue: 'MODULE',
              admin: {
                description:
                  "Category badge shown on the module page (e.g., 'CRM', 'EMAIL', 'PIPELINE')",
              },
            },
            {
              name: 'icon',
              type: 'select',
              required: true,
              options: lucideIconOptions,
              admin: {
                description:
                  'Lucide icon used in headers, related modules, and platform grid',
              },
            },
            {
              name: 'shortDescription',
              type: 'text',
              admin: {
                description:
                  'Short description for cards and grids (~80 chars). Falls back to heroDescription if empty.',
              },
            },
            {
              name: 'cardFeatures',
              type: 'array',
              maxRows: 5,
              admin: {
                description:
                  'Short feature bullets shown on platform overview cards (3 recommended)',
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'order',
              type: 'number',
              defaultValue: 0,
              admin: {
                description:
                  'Display order in lists. Lower numbers appear first.',
              },
            },
            {
              name: 'isPublished',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description:
                  'Uncheck to hide this module from the site without deleting it',
              },
            },
          ],
        },

        // ── Tab 2: Hero ──
        {
          label: 'Hero',
          fields: [
            {
              name: 'heroHeading',
              type: 'text',
              required: true,
              admin: {
                description:
                  "Main heading on the module page hero (e.g., 'Manage every contact, from first touch to closed deal')",
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
              name: 'heroPrimaryCtaText',
              type: 'text',
              defaultValue: 'Start free trial',
            },
            {
              name: 'heroPrimaryCtaHref',
              type: 'text',
              defaultValue: '/signup',
            },
            {
              name: 'heroSecondaryCtaText',
              type: 'text',
              defaultValue: 'See all features',
            },
            {
              name: 'heroSecondaryCtaHref',
              type: 'text',
              defaultValue: '#features',
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description:
                  'Recommended: 1200\u00D7800px (PNG or JPG). Product screenshot for module hero. Falls back to placeholder if empty.',
              },
            },
          ],
        },

        // ── Tab 3: Capabilities Strip ──
        {
          label: 'Capabilities Strip',
          fields: [
            {
              name: 'capabilities',
              type: 'array',
              required: true,
              minRows: 3,
              maxRows: 6,
              admin: {
                description:
                  '5-6 quick-glance capabilities shown in a horizontal strip below the hero',
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
              ],
            },
          ],
        },

        // ── Tab 4: Feature Blocks ──
        {
          label: 'Feature Blocks',
          fields: [
            {
              name: 'featureBlocks',
              type: 'array',
              required: true,
              minRows: 2,
              maxRows: 6,
              admin: { initCollapsed: true },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  admin: {
                    description:
                      "Section label like 'ORGANIZE', 'SEGMENT', 'CUSTOMIZE'",
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
                  required: true,
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
                  name: 'ctaText',
                  type: 'text',
                  required: true,
                  defaultValue: 'Start free trial',
                },
                {
                  name: 'ctaHref',
                  type: 'text',
                  required: true,
                  defaultValue: '/signup',
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description:
                      'Recommended: 900\u00D7600px (PNG or JPG). Feature screenshot. Falls back to placeholder if empty.',
                  },
                },
              ],
            },
          ],
        },

        // ── Tab 5: Comparison ──
        {
          label: 'Comparison',
          fields: [
            {
              name: 'comparisonLabel',
              type: 'text',
              defaultValue: 'WHY REVNATOR',
            },
            {
              name: 'comparisonHeading',
              type: 'text',
              required: true,
              admin: {
                description:
                  "e.g., 'Not just another CRM. A sales-first contact system.'",
              },
            },
            {
              name: 'comparisonCards',
              type: 'array',
              minRows: 3,
              maxRows: 3,
              admin: { initCollapsed: true },
              fields: [
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
            {
              name: 'comparisonStats',
              type: 'array',
              minRows: 3,
              maxRows: 3,
              admin: { initCollapsed: true },
              fields: [
                {
                  name: 'number',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'e.g., "50K+", "30 sec", "100%"',
                  },
                },
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },

        // ── Tab 6: Related Modules ──
        {
          label: 'Related Modules',
          fields: [
            {
              name: 'relatedModules',
              type: 'array',
              minRows: 2,
              maxRows: 4,
              admin: { initCollapsed: true },
              fields: [
                {
                  name: 'module',
                  type: 'relationship',
                  relationTo: 'modules',
                  admin: {
                    description:
                      'Pick another module to cross-link from this page',
                  },
                },
              ],
            },
          ],
        },

        // ── Tab 7: Final CTA ──
        {
          label: 'Final CTA',
          fields: [
            {
              name: 'ctaHeading',
              type: 'text',
              required: true,
              admin: {
                description: "e.g., 'Start managing your contacts today'",
              },
            },
            {
              name: 'ctaSubheading',
              type: 'textarea',
              required: true,
            },
            {
              name: 'ctaPrimaryText',
              type: 'text',
              defaultValue: 'Start free trial',
            },
            {
              name: 'ctaPrimaryHref',
              type: 'text',
              defaultValue: '/signup',
            },
            {
              name: 'ctaSecondaryText',
              type: 'text',
              defaultValue: 'Book a demo',
            },
            {
              name: 'ctaSecondaryHref',
              type: 'text',
              defaultValue: '/demo',
            },
          ],
        },

        // ── Tab 8: SEO ──
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
    afterChange: [revalidateModule],
    afterDelete: [revalidateModuleDelete],
  },
}
