import type { LucideIcon } from 'lucide-react'
import { Users, Mail, GitBranch, LayoutDashboard } from 'lucide-react'

export interface CapabilityCard {
  icon: LucideIcon
  title: string
  description: string
  href: string
}

export const capabilities: CapabilityCard[] = [
  {
    icon: Users,
    title: 'Contact & Account CRM',
    description:
      'Manage your entire contact lifecycle, track account health, and never lose a lead.',
    href: '/platform/contacts',
  },
  {
    icon: Mail,
    title: 'Email Outreach',
    description:
      'Send campaigns, build sequences, track opens and replies — all with built-in deliverability tools.',
    href: '/platform/outreach',
  },
  {
    icon: GitBranch,
    title: 'Pipeline & Deals',
    description:
      'Visual Kanban pipeline with deal tracking, forecasting, and stage-based automation.',
    href: '/platform/pipeline',
  },
  {
    icon: LayoutDashboard,
    title: 'Sales Operations',
    description:
      'Tasks, missions, calendar with booking pages, team chat, and scheduling — in one workspace.',
    href: '/platform/sales-ops',
  },
]
