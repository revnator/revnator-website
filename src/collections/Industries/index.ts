import type { CollectionConfig } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
} from '@payloadcms/plugin-seo/fields'
import { authenticated } from '../../access/authenticated'
import { revalidateIndustry, revalidateIndustryDelete } from './hooks/revalidateIndustry'
import { lucideIconOptions } from '../../fields/iconOptions'

export const Industries: CollectionConfig = {
  slug: 'industries',
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
                description: "Industry name (e.g., 'Agencies', 'SaaS Sales')",
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
                description: 'Uncheck to hide this industry page from the site without deleting it',
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
              required: true,
              admin: {
                description: "Uppercase badge text (e.g., 'FOR AGENCIES')",
              },
            },
            {
              name: 'heroHeading',
              type: 'text',
              required: true,
            },
            {
              name: 'heroDescription',
              type: 'textarea',
              required: true,
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
              name: 'builtForLabel',
              type: 'text',
              defaultValue: 'Trusted by teams of all sizes',
            },
            {
              name: 'builtForTags',
              type: 'array',
              maxRows: 8,
              admin: { initCollapsed: true },
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                },
              ],
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

        // ── Tab 3: Social Proof ──
        {
          label: 'Social Proof',
          fields: [
            {
              name: 'socialProofLabel',
              type: 'text',
              defaultValue: 'BY THE NUMBERS',
            },
            {
              name: 'stats',
              type: 'array',
              minRows: 4,
              maxRows: 4,
              admin: {
                description: 'Exactly 4 stat cards',
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'number',
                  type: 'text',
                  required: true,
                  admin: { description: 'e.g., "200+", "3.2x"' },
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

        // ── Tab 4: Industry Use Cases ──
        {
          label: 'Industry Use Cases',
          fields: [
            {
              name: 'useCasesSectionLabel',
              type: 'text',
            },
            {
              name: 'useCasesHeading',
              type: 'text',
            },
            {
              name: 'useCaseCards',
              type: 'array',
              minRows: 3,
              maxRows: 3,
              admin: {
                description: 'Exactly 3 use case cards',
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'number',
                  type: 'text',
                  required: true,
                  admin: { description: 'e.g., "01"' },
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
                {
                  name: 'tagLabel',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },

        // ── Tab 5: Workflow ──
        {
          label: 'Workflow',
          fields: [
            {
              name: 'workflowSectionLabel',
              type: 'text',
              defaultValue: 'HOW IT WORKS',
            },
            {
              name: 'workflowHeading',
              type: 'text',
            },
            {
              name: 'workflowSubheading',
              type: 'text',
            },
            {
              name: 'workflowSteps',
              type: 'array',
              minRows: 3,
              maxRows: 7,
              admin: { initCollapsed: true },
              fields: [
                {
                  name: 'number',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },

        // ── Tab 6: Testimonial ──
        {
          label: 'Testimonial',
          fields: [
            {
              name: 'testimonialQuote',
              type: 'textarea',
              required: true,
            },
            {
              name: 'testimonialAuthorName',
              type: 'text',
            },
            {
              name: 'testimonialAuthorTitle',
              type: 'text',
            },
            {
              name: 'testimonialAuthorInitials',
              type: 'text',
            },
          ],
        },

        // ── Tab 7: Recommended Stack ──
        {
          label: 'Recommended Stack',
          fields: [
            {
              name: 'stackLabel',
              type: 'text',
              defaultValue: 'RECOMMENDED STACK',
            },
            {
              name: 'stackHeading',
              type: 'text',
            },
            {
              name: 'stackModules',
              type: 'array',
              minRows: 2,
              maxRows: 6,
              admin: { initCollapsed: true },
              fields: [
                {
                  name: 'module',
                  type: 'relationship',
                  relationTo: 'modules',
                  required: true,
                },
                {
                  name: 'reason',
                  type: 'text',
                  admin: {
                    description: "e.g., 'Track every pitch from lead to signed contract'",
                  },
                },
              ],
            },
          ],
        },

        // ── Tab 8: CTA ──
        {
          label: 'CTA',
          fields: [
            {
              name: 'ctaHeading',
              type: 'text',
            },
            {
              name: 'ctaSubheading',
              type: 'text',
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

        // ── Tab 9: SEO ──
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
    afterChange: [revalidateIndustry],
    afterDelete: [revalidateIndustryDelete],
  },
}
