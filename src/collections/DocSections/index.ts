import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'

export const DocSections: CollectionConfig = {
  slug: 'doc-sections',
  admin: {
    group: 'Documentation',
    useAsTitle: 'title',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
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
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Display order in the sidebar. Lower numbers appear first.',
      },
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'icon',
      type: 'select',
      admin: {
        description: 'Optional icon shown in the sidebar next to the section title',
      },
      options: [
        { label: 'Rocket', value: 'Rocket' },
        { label: 'Users', value: 'Users' },
        { label: 'Building2', value: 'Building2' },
        { label: 'Mail', value: 'Mail' },
        { label: 'GitBranch', value: 'GitBranch' },
        { label: 'LayoutDashboard', value: 'LayoutDashboard' },
        { label: 'Calendar', value: 'Calendar' },
        { label: 'MessageCircle', value: 'MessageCircle' },
        { label: 'Sparkles', value: 'Sparkles' },
        { label: 'FileText', value: 'FileText' },
        { label: 'BarChart3', value: 'BarChart3' },
        { label: 'Plug', value: 'Plug' },
        { label: 'Code', value: 'Code' },
        { label: 'Shield', value: 'Shield' },
        { label: 'BookOpen', value: 'BookOpen' },
      ],
    },
  ],
}
