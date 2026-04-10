import type { GlobalConfig } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
} from '@payloadcms/plugin-seo/fields'
import { revalidateLegalPage } from './hooks/revalidateLegalPage'

export const LegalPage: GlobalConfig = {
  slug: 'legal-page',
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
              name: 'heading',
              type: 'text',
              defaultValue: 'Legal documents',
            },
            {
              name: 'subheading',
              type: 'textarea',
              defaultValue:
                'Everything you need to know about how Revnator operates, protects your data, and respects your privacy.',
            },
            {
              name: 'lastUpdatedText',
              type: 'text',
              defaultValue: 'All documents last updated April 9, 2026',
            },
          ],
        },

        // ── Tab 2: SEO ──
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
    afterChange: [revalidateLegalPage],
  },
}
