import type { GlobalConfig } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
} from '@payloadcms/plugin-seo/fields'
import { lucideIconOptions } from '../../fields/iconOptions'
import { revalidateHomePage } from './hooks/revalidateHomePage'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
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
              defaultValue: 'REVENUE ACCELERATOR',
              admin: {
                description: 'Uppercase badge text above the headline',
              },
            },
            {
              name: 'heroHeadline',
              type: 'text',
              defaultValue: 'The sales workspace built for',
              admin: {
                description: 'Main headline (the accent word is separate)',
              },
            },
            {
              name: 'heroHeadlineAccent',
              type: 'text',
              defaultValue: 'closers',
              admin: {
                description: 'Underlined accent word appended to the headline',
              },
            },
            {
              name: 'heroSubheadline',
              type: 'textarea',
              defaultValue:
                'Everything your sales team needs in one place — contacts, email sequences, deal pipeline, calendar, and analytics. No more switching between five tools.',
            },
            {
              name: 'heroPrimaryCta',
              type: 'group',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  defaultValue: 'Start free trial',
                },
                {
                  name: 'href',
                  type: 'text',
                  defaultValue: '/get-started',
                },
              ],
            },
            {
              name: 'heroSecondaryCta',
              type: 'group',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  defaultValue: 'Book a demo',
                },
                {
                  name: 'href',
                  type: 'text',
                  defaultValue: '/demo',
                },
              ],
            },
            {
              name: 'heroTrustLine',
              type: 'text',
              defaultValue: 'No credit card required · Free for up to 3 users',
              admin: {
                description: 'Small text below the CTA buttons',
              },
            },
            {
              name: 'heroStats',
              type: 'array',
              maxRows: 4,
              admin: {
                description: 'Floating stat cards on the browser mockup (2 recommended)',
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'e.g. "↑ 34% reply rate"',
                  },
                },
                {
                  name: 'type',
                  type: 'select',
                  required: true,
                  defaultValue: 'trending-up',
                  options: [
                    { label: 'Trending Up', value: 'trending-up' },
                    { label: 'Check Circle', value: 'check-circle' },
                  ],
                },
              ],
            },
          ],
        },

        // ── Tab 2: Trusted By ──
        {
          label: 'Trusted By',
          fields: [
            {
              name: 'trustedByLabel',
              type: 'text',
              defaultValue: 'Trusted by fast-growing sales teams',
              admin: {
                description: 'Text shown above the logo strip',
              },
            },
            {
              name: 'trustedByLogos',
              type: 'array',
              maxRows: 12,
              admin: {
                description: 'Company logos (upload transparent PNGs). Placeholder boxes shown if empty.',
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Company name (used as alt text)',
                  },
                },
                {
                  name: 'logo',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Recommended: 240×80px (PNG, transparent background)',
                  },
                },
              ],
            },
          ],
        },

        // ── Tab 3: Platform Capabilities ──
        {
          label: 'Capabilities',
          fields: [
            {
              name: 'capabilitiesHeading',
              type: 'text',
              defaultValue: 'Everything you need to sell',
              admin: {
                description: 'Section heading (optional — leave blank to hide)',
              },
            },
            {
              name: 'capabilities',
              type: 'array',
              minRows: 2,
              maxRows: 6,
              admin: {
                description: '4 capability cards with icon, title, description, and link',
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
                {
                  name: 'href',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Link to module page, e.g. /platform/contacts',
                  },
                },
              ],
            },
          ],
        },

        // ── Tab 4: Feature Showcases ──
        {
          label: 'Feature Showcases',
          fields: [
            {
              name: 'featureShowcases',
              type: 'array',
              minRows: 1,
              maxRows: 6,
              admin: {
                description: 'Alternating left/right feature sections (3 recommended)',
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Uppercase section label, e.g. "OUTREACH"',
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
                  name: 'bullets',
                  type: 'array',
                  minRows: 2,
                  maxRows: 6,
                  fields: [
                    {
                      name: 'text',
                      type: 'text',
                      required: true,
                    },
                  ],
                },
                {
                  name: 'linkLabel',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'e.g. "Explore Outreach"',
                  },
                },
                {
                  name: 'linkHref',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'e.g. /platform/outreach',
                  },
                },
                {
                  name: 'reverse',
                  type: 'checkbox',
                  defaultValue: false,
                  admin: {
                    description: 'Flip the layout (image on left, text on right)',
                  },
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Recommended: 900×600px. Falls back to placeholder frame if empty.',
                  },
                },
              ],
            },
          ],
        },

        // ── Tab 5: Stats Bar ──
        {
          label: 'Stats',
          fields: [
            {
              name: 'stats',
              type: 'array',
              minRows: 2,
              maxRows: 6,
              admin: {
                description: '4 stats shown in a horizontal bar',
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'e.g. "9+", "100%", "5 min", "$0"',
                  },
                },
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'e.g. "Modules in one platform"',
                  },
                },
              ],
            },
          ],
        },

        // ── Tab 6: Testimonials ──
        {
          label: 'Testimonials',
          fields: [
            {
              name: 'testimonialsHeading',
              type: 'text',
              defaultValue: 'What our users say',
              admin: {
                description: 'Section heading (optional)',
              },
            },
            {
              name: 'testimonials',
              type: 'array',
              minRows: 1,
              maxRows: 12,
              admin: {
                description: 'Customer testimonial cards (3 recommended)',
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'quote',
                  type: 'textarea',
                  required: true,
                },
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'e.g. "Sarah M."',
                  },
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'e.g. "Head of Sales, TechCorp"',
                  },
                },
                {
                  name: 'initials',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Shown in the avatar circle, e.g. "SM"',
                  },
                },
                {
                  name: 'avatar',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Recommended: 200×200px. Falls back to initials if empty.',
                  },
                },
              ],
            },
          ],
        },

        // ── Tab 7: Integrations ──
        {
          label: 'Integrations',
          fields: [
            {
              name: 'integrationsHeading',
              type: 'text',
              defaultValue: 'Connects with your stack',
              admin: {
                description: 'Section heading (optional)',
              },
            },
            {
              name: 'integrationsSubheading',
              type: 'text',
              defaultValue: 'Works with the tools your team already uses',
            },
            {
              name: 'integrations',
              type: 'array',
              minRows: 1,
              maxRows: 24,
              admin: {
                description: 'Integration names/logos (12 recommended)',
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'e.g. "Gmail", "Salesforce", "Slack"',
                  },
                },
                {
                  name: 'logo',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Recommended: 96×96px (PNG, transparent). Falls back to text pill if empty.',
                  },
                },
              ],
            },
          ],
        },

        // ── Tab 8: Final CTA ──
        {
          label: 'Final CTA',
          fields: [
            {
              name: 'ctaHeading',
              type: 'text',
              defaultValue: 'Ready to close more deals?',
            },
            {
              name: 'ctaSubheading',
              type: 'textarea',
              defaultValue:
                'Join the early access program. Free for up to 3 users. No credit card required.',
            },
            {
              name: 'ctaPrimaryCta',
              type: 'group',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  defaultValue: 'Start free trial',
                },
                {
                  name: 'href',
                  type: 'text',
                  defaultValue: '/get-started',
                },
              ],
            },
            {
              name: 'ctaSecondaryCta',
              type: 'group',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  defaultValue: 'Book a demo',
                },
                {
                  name: 'href',
                  type: 'text',
                  defaultValue: '/demo',
                },
              ],
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
              hasGenerateFn: false,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHomePage],
  },
}
