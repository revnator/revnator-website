import type { GlobalConfig } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
} from '@payloadcms/plugin-seo/fields'
import { lucideIconOptions } from '../../fields/iconOptions'
import { revalidateAboutPage } from './hooks/revalidateAboutPage'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
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
              defaultValue: 'ABOUT REVNATOR',
            },
            {
              name: 'heroHeading',
              type: 'text',
              defaultValue: 'Built by a closer, for closers',
            },
            {
              name: 'heroSubheading',
              type: 'textarea',
              defaultValue:
                'Revnator is the sales OS that was born from frustration with bloated tools and fragmented workflows.',
            },
          ],
        },

        // ── Tab 2: Mission ──
        {
          label: 'Mission',
          fields: [
            {
              name: 'missionLabel',
              type: 'text',
              defaultValue: 'OUR MISSION',
            },
            {
              name: 'missionHeading',
              type: 'text',
              defaultValue: 'Sales tools should help you sell, not slow you down.',
            },
            {
              name: 'missionParagraphs',
              type: 'array',
              minRows: 1,
              maxRows: 5,
              admin: { initCollapsed: true },
              fields: [
                { name: 'text', type: 'textarea', required: true },
              ],
            },
          ],
        },

        // ── Tab 3: Story ──
        {
          label: 'Story',
          fields: [
            {
              name: 'storyLabel',
              type: 'text',
              defaultValue: 'OUR STORY',
            },
            {
              name: 'storyHeading',
              type: 'text',
              defaultValue: 'How we got here',
            },
            {
              name: 'milestones',
              type: 'array',
              minRows: 1,
              maxRows: 10,
              admin: {
                description: 'Timeline milestones (4 recommended)',
                initCollapsed: true,
              },
              fields: [
                { name: 'year', type: 'text', required: true },
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
              ],
            },
          ],
        },

        // ── Tab 4: Values ──
        {
          label: 'Values',
          fields: [
            {
              name: 'valuesLabel',
              type: 'text',
              defaultValue: 'WHAT WE BELIEVE',
            },
            {
              name: 'valuesHeading',
              type: 'text',
              defaultValue: 'The principles that guide every decision',
            },
            {
              name: 'values',
              type: 'array',
              minRows: 1,
              maxRows: 6,
              admin: { initCollapsed: true },
              fields: [
                {
                  name: 'icon',
                  type: 'select',
                  required: true,
                  options: lucideIconOptions,
                },
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
              ],
            },
          ],
        },

        // ── Tab 5: Team ──
        {
          label: 'Team',
          fields: [
            {
              name: 'teamLabel',
              type: 'text',
              defaultValue: 'THE TEAM',
            },
            {
              name: 'teamHeading',
              type: 'text',
              defaultValue: 'Meet the founder',
            },
            {
              name: 'teamSubheading',
              type: 'text',
              defaultValue: 'Revnator is currently a solo-founder operation. We\'re growing soon.',
            },
            {
              name: 'founder',
              type: 'group',
              fields: [
                { name: 'initials', type: 'text', defaultValue: 'S' },
                { name: 'name', type: 'text', defaultValue: 'Sabareesh S R' },
                { name: 'title', type: 'text', defaultValue: 'Founder & CEO' },
                { name: 'bio', type: 'textarea' },
                {
                  name: 'avatar',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { description: 'Recommended: 200×200px' },
                },
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
              defaultValue: 'Join us on the journey',
            },
            {
              name: 'ctaSubheading',
              type: 'textarea',
              defaultValue:
                'We\'re just getting started. Try Revnator free and see why sales teams love it.',
            },
            {
              name: 'ctaPrimaryCta',
              type: 'group',
              fields: [
                { name: 'label', type: 'text', defaultValue: 'Start free trial' },
                { name: 'href', type: 'text', defaultValue: '/get-started' },
              ],
            },
            {
              name: 'ctaSecondaryCta',
              type: 'group',
              fields: [
                { name: 'label', type: 'text', defaultValue: 'Contact us' },
                { name: 'href', type: 'text', defaultValue: '/contact' },
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
    afterChange: [revalidateAboutPage],
  },
}
