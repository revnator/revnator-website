import type { Metadata } from 'next'
import Link from 'next/link'
import { Zap, Layers, Code, Play } from 'lucide-react'
import { DocsLayout } from '@/components/sections/DocsLayout/DocsLayout'
import { docsQuickLinks } from '@/components/sections/_docs/docsData'

export const metadata: Metadata = {
  title: 'Documentation | Revnator',
  description:
    'Learn how to use Revnator — guides on contacts, outreach, pipeline, calendar, reporting, and more.',
}

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Zap,
  Layers,
  Code,
  Play,
}

export default function DocsPage(): React.ReactElement {
  return (
    <DocsLayout activeSlug="getting-started/welcome">
      <h1 className="font-heading text-h2 font-bold text-dark">
        Welcome to Revnator Documentation
      </h1>
      <p className="mt-3 font-body text-base leading-[1.8] text-body">
        Everything you need to set up your workspace, manage contacts, send sequences,
        and close deals. Pick a topic below or browse the sidebar.
      </p>

      {/* Quick links grid */}
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {docsQuickLinks.map((link) => {
          const Icon = iconMap[link.icon]
          return (
            <Link
              key={link.title}
              href={link.href}
              className="group rounded-xl bg-bg p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(19,15,30,0.06)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-light">
                {Icon && <Icon size={20} className="text-primary" />}
              </div>
              <h3 className="mt-3 font-heading text-[15px] font-semibold text-dark">
                {link.title}
              </h3>
              <p className="mt-1 font-body text-[13px] leading-[1.6] text-muted">
                {link.description}
              </p>
            </Link>
          )
        })}
      </div>
    </DocsLayout>
  )
}
