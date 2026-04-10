import type { GlobalConfig } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
} from '@payloadcms/plugin-seo/fields'
import { lucideIconOptions } from '../../fields/iconOptions'
import { revalidateWhyRevnatorPage } from './hooks/revalidateWhyRevnatorPage'

export const WhyRevnatorPage: GlobalConfig = {
  slug: 'why-revnator',
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
              name: 'heroLabel',
              type: 'text',
              defaultValue: 'WHY REVNATOR',
            },
            {
              name: 'heroHeading',
              type: 'text',
              defaultValue: 'Stop paying for 5 tools that don\'t talk to each other',
            },
            {
              name: 'heroSubheading',
              type: 'textarea',
              defaultValue:
                'Revnator replaces your entire sales stack with one connected workspace. CRM, email, pipeline, calendar, and analytics — all in one place.',
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

        // ── Tab 2: Pain Points ──
        {
          label: 'Pain Points',
          fields: [
            {
              name: 'painPointsLabel',
              type: 'text',
              defaultValue: 'THE PROBLEM',
            },
            {
              name: 'painPointsHeading',
              type: 'text',
              defaultValue: 'Your sales stack is holding you back',
            },
            {
              name: 'painPoints',
              type: 'array',
              minRows: 1,
              maxRows: 6,
              admin: {
                description: 'Numbered pain point cards (3 recommended)',
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'number',
                  type: 'text',
                  required: true,
                  admin: { description: 'e.g. "01", "02"' },
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

        // ── Tab 3: Before / After ──
        {
          label: 'Before / After',
          fields: [
            {
              name: 'beforeAfterLabel',
              type: 'text',
              defaultValue: 'THE SWITCH',
            },
            {
              name: 'beforeAfterHeading',
              type: 'text',
              defaultValue: 'Replace your entire stack',
            },
            {
              name: 'withoutTools',
              type: 'array',
              minRows: 1,
              maxRows: 10,
              admin: {
                description: '"Without Revnator" tool list (left column)',
                initCollapsed: true,
              },
              fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'price', type: 'text', required: true, admin: { description: 'e.g. "$90/mo"' } },
              ],
            },
            {
              name: 'withCapabilities',
              type: 'array',
              minRows: 1,
              maxRows: 10,
              admin: {
                description: '"With Revnator" capability list (right column)',
                initCollapsed: true,
              },
              fields: [
                { name: 'text', type: 'text', required: true },
              ],
            },
            {
              name: 'revnatorPrice',
              type: 'text',
              defaultValue: 'From $0/mo',
              admin: { description: 'Price shown on the Revnator side' },
            },
          ],
        },

        // ── Tab 4: Value Props ──
        {
          label: 'Value Props',
          fields: [
            {
              name: 'valuePropsLabel',
              type: 'text',
              defaultValue: 'WHY TEAMS CHOOSE US',
            },
            {
              name: 'valuePropsHeading',
              type: 'text',
              defaultValue: 'Built for the way you actually sell',
            },
            {
              name: 'valueProps',
              type: 'array',
              minRows: 1,
              maxRows: 6,
              admin: {
                description: 'Value proposition blocks with icon, heading, description, and bullets',
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
                  name: 'bullets',
                  type: 'array',
                  minRows: 1,
                  maxRows: 6,
                  fields: [
                    { name: 'text', type: 'text', required: true },
                  ],
                },
              ],
            },
          ],
        },

        // ── Tab 5: FAQ ──
        {
          label: 'FAQ',
          fields: [
            {
              name: 'faqHeading',
              type: 'text',
              defaultValue: 'Common questions',
            },
            {
              name: 'faqs',
              type: 'array',
              minRows: 1,
              maxRows: 20,
              admin: { initCollapsed: true },
              fields: [
                { name: 'question', type: 'text', required: true },
                { name: 'answer', type: 'textarea', required: true },
              ],
            },
          ],
        },

        // ── Tab 6: Final CTA ──
        {
          label: 'Final CTA',
          fields: [
            {
              name: 'ctaHeading',
              type: 'text',
              defaultValue: 'Ready to simplify your sales stack?',
            },
            {
              name: 'ctaSubheading',
              type: 'textarea',
              defaultValue: 'Start free. No credit card required. Set up in 5 minutes.',
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
                { name: 'label', type: 'text', defaultValue: 'Compare plans' },
                { name: 'href', type: 'text', defaultValue: '/pricing' },
              ],
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
            MetaTitleField({ hasGenerateFn: false }),
            MetaImageField({ relationTo: 'media' }),
            MetaDescriptionField({}),
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateWhyRevnatorPage],
  },
}
