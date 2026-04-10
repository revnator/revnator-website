import type { GlobalConfig } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
} from '@payloadcms/plugin-seo/fields'
import { revalidatePlatformPage } from './hooks/revalidatePlatformPage'

export const PlatformPage: GlobalConfig = {
  slug: 'platform-page',
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
              name: 'heroBadge',
              type: 'text',
              defaultValue: 'Platform',
            },
            {
              name: 'heroHeading',
              type: 'text',
              defaultValue: 'One platform. Nine modules. Zero compromises.',
            },
            {
              name: 'heroSubheading',
              type: 'textarea',
              defaultValue:
                'Every tool your revenue team needs — CRM, outreach, pipeline, calendar, docs, chat, forms, and AI — unified in a single workspace.',
            },
            {
              name: 'heroPrimaryCta',
              type: 'group',
              fields: [
                { name: 'label', type: 'text', defaultValue: 'Start free trial' },
                { name: 'href', type: 'text', defaultValue: '/signup' },
              ],
            },
            {
              name: 'heroSecondaryCta',
              type: 'group',
              fields: [
                { name: 'label', type: 'text', defaultValue: 'See pricing' },
                { name: 'href', type: 'text', defaultValue: '/pricing' },
              ],
            },
          ],
        },

        // ── Tab 2: Modules Grid ──
        {
          label: 'Modules Grid',
          fields: [
            {
              name: 'gridLabel',
              type: 'text',
              defaultValue: 'MODULES',
              admin: {
                description: 'Uppercase section label above the heading',
              },
            },
            {
              name: 'gridHeading',
              type: 'text',
              defaultValue: 'Built for every stage of your sales process',
            },
            {
              name: 'gridSubheading',
              type: 'text',
              defaultValue: 'Click any module to explore its features in depth',
            },
          ],
        },

        // ── Tab 3: Connected ──
        {
          label: 'Connected',
          fields: [
            {
              name: 'connectedLabel',
              type: 'text',
              defaultValue: 'Connected by Design',
            },
            {
              name: 'connectedHeading',
              type: 'text',
              defaultValue: 'One workspace. Everything connected.',
            },
            {
              name: 'connectedSubheading',
              type: 'textarea',
              defaultValue:
                'Every module shares the same data layer. No syncing, no exports, no broken integrations — just one unified source of truth.',
            },
            {
              name: 'connectedStats',
              type: 'array',
              minRows: 1,
              maxRows: 6,
              admin: { initCollapsed: true },
              fields: [
                { name: 'value', type: 'text', required: true },
                { name: 'label', type: 'text', required: true },
              ],
            },
          ],
        },

        // ── Tab 4: Pricing Teaser ──
        {
          label: 'Pricing Teaser',
          fields: [
            {
              name: 'pricingLabel',
              type: 'text',
              defaultValue: 'Pricing',
            },
            {
              name: 'pricingHeading',
              type: 'text',
              defaultValue: 'Simple, transparent pricing',
            },
            {
              name: 'pricingSubheading',
              type: 'text',
              defaultValue: "Start free with up to 3 users. Upgrade when you're ready.",
            },
            {
              name: 'pricingPills',
              type: 'array',
              minRows: 1,
              maxRows: 6,
              admin: { initCollapsed: true },
              fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'price', type: 'text', required: true },
              ],
            },
          ],
        },

        // ── Tab 5: Final CTA ──
        {
          label: 'Final CTA',
          fields: [
            {
              name: 'ctaHeading',
              type: 'text',
              defaultValue: 'Ready to unify your revenue stack?',
            },
            {
              name: 'ctaSubheading',
              type: 'text',
              defaultValue: 'Free for up to 3 users. No credit card required.',
            },
            {
              name: 'ctaPrimaryCta',
              type: 'group',
              fields: [
                { name: 'label', type: 'text', defaultValue: 'Start free trial' },
                { name: 'href', type: 'text', defaultValue: '/signup' },
              ],
            },
            {
              name: 'ctaSecondaryCta',
              type: 'group',
              fields: [
                { name: 'label', type: 'text', defaultValue: 'Book a demo' },
                { name: 'href', type: 'text', defaultValue: '/demo' },
              ],
            },
          ],
        },

        // ── Tab 6: SEO ──
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
    afterChange: [revalidatePlatformPage],
  },
}
