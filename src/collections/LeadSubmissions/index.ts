import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'

export const LeadSubmissions: CollectionConfig = {
  slug: 'lead-submissions',
  admin: {
    group: 'System',
    useAsTitle: 'email',
    defaultColumns: ['email', 'formType', 'source', 'status', 'createdAt'],
  },
  access: {
    create: () => true,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  fields: [
    {
      name: 'formType',
      type: 'select',
      required: true,
      options: [
        { label: 'Contact', value: 'contact' },
        { label: 'Ebook', value: 'ebook' },
        { label: 'Whitepaper', value: 'whitepaper' },
        { label: 'Template', value: 'template' },
        { label: 'Webinar', value: 'webinar' },
        { label: 'Beta Signup', value: 'beta-signup' },
      ],
      admin: {
        description: 'Which form was submitted',
      },
    },
    {
      name: 'source',
      type: 'text',
      required: true,
      admin: {
        description: 'The page/resource that generated this submission (e.g., "cold-email-playbook")',
      },
    },
    {
      name: 'firstName',
      type: 'text',
    },
    {
      name: 'lastName',
      type: 'text',
    },
    {
      name: 'email',
      type: 'text',
      required: true,
    },
    {
      name: 'company',
      type: 'text',
    },
    {
      name: 'teamSize',
      type: 'text',
    },
    {
      name: 'subject',
      type: 'text',
      admin: {
        description: 'Subject line (contact form only)',
      },
    },
    {
      name: 'message',
      type: 'textarea',
      admin: {
        description: 'Message body (contact form only)',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Qualified', value: 'qualified' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: {
        description: 'Track the status of this lead',
        position: 'sidebar',
      },
    },
  ],
}
