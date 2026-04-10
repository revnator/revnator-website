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
import { revalidateBlogPost, revalidateBlogPostDelete } from './hooks/revalidateBlogPost'

const blogEditor = lexicalEditor({
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

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: {
    group: 'Blog',
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
                description: 'Only published posts appear on the site',
              },
            },
            {
              name: 'publishedDate',
              type: 'date',
              required: true,
              admin: {
                description: "Display date on the blog. Future dates won't show until that date.",
                date: {
                  pickerAppearance: 'dayOnly',
                },
              },
            },
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'blog-categories',
              required: true,
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
                description: 'Short summary shown on blog cards. Max 300 characters.',
              },
            },
            {
              name: 'body',
              type: 'richText',
              required: true,
              editor: blogEditor,
              admin: {
                description:
                  'Write your blog post content here. Use the toolbar for formatting, headings, lists, code blocks, and images.',
              },
            },
            {
              name: 'readTime',
              type: 'text',
              defaultValue: '5 min read',
              admin: {
                description: 'Estimated reading time shown on the post',
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
              required: true,
              defaultValue: 'Revnator Team',
            },
            {
              name: 'authorInitials',
              type: 'text',
              required: true,
              defaultValue: 'RT',
            },
            {
              name: 'authorBio',
              type: 'textarea',
              defaultValue: 'Writes about sales, productivity, and building B2B SaaS.',
            },
            {
              name: 'authorPhoto',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Recommended: 200x200px square',
              },
            },
          ],
        },

        // ── Tab 3: Tags ──
        {
          label: 'Tags',
          fields: [
            {
              name: 'tags',
              type: 'array',
              admin: {
                description: 'Tags shown at the bottom of the post',
              },
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },

        // ── Tab 4: Related Posts ──
        {
          label: 'Related Posts',
          fields: [
            {
              name: 'relatedPosts',
              type: 'relationship',
              relationTo: 'blog-posts',
              hasMany: true,
              maxRows: 3,
              admin: {
                description: '3 related posts shown at the bottom. If empty, auto-selected by category.',
              },
            },
          ],
        },

        // ── Tab 5: SEO ──
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
    afterChange: [revalidateBlogPost],
    afterDelete: [revalidateBlogPostDelete],
  },
}
