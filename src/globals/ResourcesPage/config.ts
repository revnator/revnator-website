import type { GlobalConfig } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
} from '@payloadcms/plugin-seo/fields'
import { revalidateResourcesPage } from './hooks/revalidateResourcesPage'

export const ResourcesPage: GlobalConfig = {
  slug: 'resources-page',
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
        {
          label: 'Hero',
          fields: [
            {
              name: 'heading',
              type: 'text',
              defaultValue: 'Resources',
            },
            {
              name: 'subheading',
              type: 'textarea',
              defaultValue:
                'Guides, templates, and insights to help your team sell smarter',
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
            MetaTitleField({ hasGenerateFn: false }),
            MetaImageField({ relationTo: 'media' }),
            MetaDescriptionField({}),
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateResourcesPage],
  },
}
