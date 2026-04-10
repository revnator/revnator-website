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
  UploadFeature,
  LinkFeature,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  StrikethroughFeature,
  InlineCodeFeature,
  HorizontalRuleFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  ParagraphFeature,
} from '@payloadcms/richtext-lexical'
import { authenticated } from '../../access/authenticated'
import { revalidateNewsArticle, revalidateNewsArticleDelete } from './hooks/revalidateNewsArticle'

const newsEditor = lexicalEditor({
  features: [
    ParagraphFeature(),
    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    StrikethroughFeature(),
    InlineCodeFeature(),
    LinkFeature(),
    BlockquoteFeature(),
    OrderedListFeature(),
    UnorderedListFeature(),
    HorizontalRuleFeature(),
    UploadFeature(),
    FixedToolbarFeature(),
    InlineToolbarFeature(),
  ],
})

export const NewsArticles: CollectionConfig = {
  slug: 'news-articles',
  admin: {
    group: 'News',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedDate', 'updatedAt'],
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
    excerpt: true,
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
              name: 'status',
              type: 'select',
              required: true,
              defaultValue: 'draft',
              options: [
                { label: 'Draft', value: 'draft' },
                { label: 'Published', value: 'published' },
              ],
              admin: {
                description: 'Only published articles appear on the site',
              },
            },
            {
              name: 'publishedDate',
              type: 'date',
              required: true,
              admin: {
                date: {
                  pickerAppearance: 'dayOnly',
                },
              },
            },
            {
              name: 'category',
              type: 'select',
              required: true,
              options: [
                { label: 'Product Updates', value: 'Product Updates' },
                { label: 'Company News', value: 'Company News' },
                { label: 'Press Releases', value: 'Press Releases' },
                { label: 'Funding', value: 'Funding' },
                { label: 'Awards', value: 'Awards' },
              ],
            },
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Recommended: 1280x720px',
              },
            },
            {
              name: 'excerpt',
              type: 'textarea',
              required: true,
              maxLength: 300,
              admin: {
                description: 'Short summary shown on news cards. Max 300 characters.',
              },
            },
            {
              name: 'body',
              type: 'richText',
              required: true,
              editor: newsEditor,
              admin: {
                description: 'Write article content here.',
              },
            },
          ],
        },

        // ── Tab 2: Author ──
        {
          label: 'Author',
          fields: [
            {
              name: 'authorName',
              type: 'text',
              defaultValue: 'Revnator Team',
            },
          ],
        },

        // ── Tab 3: SEO ──
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
    afterChange: [revalidateNewsArticle],
    afterDelete: [revalidateNewsArticleDelete],
  },
}
