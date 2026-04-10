import type { GlobalConfig } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
} from '@payloadcms/plugin-seo/fields'
import { revalidatePricingPage } from './hooks/revalidatePricingPage'

export const PricingPage: GlobalConfig = {
  slug: 'pricing-page',
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
              defaultValue: 'PRICING',
              admin: {
                description: 'Uppercase section label',
              },
            },
            {
              name: 'heroHeading',
              type: 'text',
              defaultValue: 'Simple pricing. No surprises.',
            },
            {
              name: 'heroSubheading',
              type: 'textarea',
              defaultValue:
                "Start free. Upgrade when you're ready. Every plan includes unlimited contacts.",
            },
            {
              name: 'heroTrialNote',
              type: 'text',
              defaultValue:
                'All paid plans include a 14-day free trial. No credit card required.',
              admin: {
                description: 'Note below the billing toggle',
              },
            },
          ],
        },

        // ── Tab 2: Plans ──
        {
          label: 'Plans',
          fields: [
            {
              name: 'plans',
              type: 'array',
              minRows: 1,
              maxRows: 6,
              admin: {
                description: 'Pricing plans (4 recommended: Free, Starter, Growth, Pro)',
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  admin: { description: 'e.g. "Free", "Starter", "Growth", "Pro"' },
                },
                {
                  name: 'monthlyPrice',
                  type: 'number',
                  required: true,
                  defaultValue: 0,
                },
                {
                  name: 'annualPrice',
                  type: 'number',
                  required: true,
                  defaultValue: 0,
                },
                {
                  name: 'period',
                  type: 'text',
                  required: true,
                  defaultValue: '/user/mo',
                  admin: { description: 'e.g. "forever", "/user/mo"' },
                },
                {
                  name: 'description',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'features',
                  type: 'array',
                  minRows: 1,
                  maxRows: 15,
                  fields: [
                    {
                      name: 'text',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'included',
                      type: 'checkbox',
                      defaultValue: true,
                    },
                  ],
                },
                {
                  name: 'ctaLabel',
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
                  name: 'highlighted',
                  type: 'checkbox',
                  defaultValue: false,
                  admin: {
                    description: 'Highlight this plan as the recommended option',
                  },
                },
              ],
            },
          ],
        },

        // ── Tab 3: Enterprise Banner ──
        {
          label: 'Enterprise',
          fields: [
            {
              name: 'enterpriseHeading',
              type: 'text',
              defaultValue: 'Need more?',
            },
            {
              name: 'enterpriseDescription',
              type: 'textarea',
              defaultValue:
                'Our Enterprise plan includes custom limits, SSO, SCIM, dedicated onboarding, SLA guarantees, and a dedicated account manager.',
            },
            {
              name: 'enterpriseCtaLabel',
              type: 'text',
              defaultValue: 'Contact sales',
            },
            {
              name: 'enterpriseCtaHref',
              type: 'text',
              defaultValue: '/contact',
            },
          ],
        },

        // ── Tab 4: Comparison Table ──
        {
          label: 'Comparison',
          fields: [
            {
              name: 'comparisonHeading',
              type: 'text',
              defaultValue: 'Compare plans in detail',
            },
            {
              name: 'comparisonCategories',
              type: 'array',
              minRows: 1,
              maxRows: 12,
              admin: {
                description: 'Feature comparison categories (6 recommended)',
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  admin: { description: 'e.g. "Contacts & CRM", "Email & Outreach"' },
                },
                {
                  name: 'rows',
                  type: 'array',
                  minRows: 1,
                  maxRows: 20,
                  fields: [
                    {
                      name: 'feature',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'free',
                      type: 'text',
                      required: true,
                      defaultValue: '—',
                    },
                    {
                      name: 'starter',
                      type: 'text',
                      required: true,
                      defaultValue: '—',
                    },
                    {
                      name: 'growth',
                      type: 'text',
                      required: true,
                      defaultValue: '—',
                    },
                    {
                      name: 'pro',
                      type: 'text',
                      required: true,
                      defaultValue: '—',
                    },
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
              defaultValue: 'Frequently asked questions',
            },
            {
              name: 'faqs',
              type: 'array',
              minRows: 1,
              maxRows: 20,
              admin: {
                description: 'Pricing FAQ items (8 recommended)',
                initCollapsed: true,
              },
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
              defaultValue: 'Start selling smarter today',
            },
            {
              name: 'ctaSubheading',
              type: 'textarea',
              defaultValue:
                'Join thousands of sales teams using Revnator. Free forever for up to 3 users.',
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
                  defaultValue: '/signup',
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
    afterChange: [revalidatePricingPage],
  },
}
