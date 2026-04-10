import type { CollectionConfig } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
} from '@payloadcms/plugin-seo/fields'
import {
  lexicalEditor,
  HeadingFeature,
  BlockquoteFeature,
  OrderedListFeature,
  UnorderedListFeature,
  LinkFeature,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  HorizontalRuleFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  ParagraphFeature,
} from '@payloadcms/richtext-lexical'
import { authenticated } from '../../access/authenticated'
import { revalidateLegalDoc, revalidateLegalDocDelete } from './hooks/revalidateLegalDoc'

const legalEditor = lexicalEditor({
  features: [
    ParagraphFeature(),
    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    LinkFeature(),
    BlockquoteFeature(),
    OrderedListFeature(),
    UnorderedListFeature(),
    HorizontalRuleFeature(),
    FixedToolbarFeature(),
    InlineToolbarFeature(),
  ],
})

export const LegalDocuments: CollectionConfig = {
  slug: 'legal-documents',
  admin: {
    group: 'Legal',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'isPublished', 'lastUpdated', 'updatedAt'],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    description: true,
    meta: {
      image: true,
      description: true,
    },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // ── Tab 1: Content ──
        {
          label: 'Content',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'text',
              required: true,
              admin: {
                description: 'Short description shown on the legal hub card',
              },
            },
            {
              name: 'icon',
              type: 'select',
              options: [
                { label: 'Shield', value: 'Shield' },
                { label: 'FileText', value: 'FileText' },
                { label: 'Cookie', value: 'Cookie' },
                { label: 'Lock', value: 'Lock' },
                { label: 'Scale', value: 'Scale' },
                { label: 'ShieldCheck', value: 'ShieldCheck' },
              ],
            },
            {
              name: 'lastUpdated',
              type: 'date',
              required: true,
              admin: {
                date: { pickerAppearance: 'dayOnly' },
              },
            },
            {
              name: 'effectiveDate',
              type: 'date',
              required: true,
              admin: {
                date: { pickerAppearance: 'dayOnly' },
              },
            },
            {
              name: 'isPublished',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Uncheck to hide from the legal hub',
              },
            },
            {
              name: 'body',
              type: 'richText',
              required: true,
              editor: legalEditor,
              admin: {
                description: 'Legal document content. Use headings for sections.',
              },
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
        description: 'URL slug. Auto-generated from title.',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return (data.title as string)
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
    afterChange: [revalidateLegalDoc],
    afterDelete: [revalidateLegalDocDelete],
  },
}
