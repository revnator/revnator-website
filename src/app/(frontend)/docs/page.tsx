import type { Metadata } from 'next'
import Link from 'next/link'
import { Zap, Layers, Code, Play } from 'lucide-react'
import { DocsLayout } from '@/components/sections/DocsLayout/DocsLayout'
import { getDocsSidebar } from '@/lib/getDocsSidebar'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Documentation | Revnator',
  description:
    'Learn how to use Revnator — guides on contacts, outreach, pipeline, calendar, reporting, and more.',
}

const quickLinks = [
  {
    icon: 'Zap',
    title: 'Quick Start',
    description: 'Set up your workspace and send your first sequence in 5 minutes.',
    href: '/docs/getting-started/quick-start',
  },
  {
    icon: 'Layers',
    title: 'Browse by Module',
    description: 'Explore CRM, outreach, pipeline, calendar, and more.',
    href: '/docs/contacts/overview',
  },
  {
    icon: 'Code',
    title: 'API Reference',
    description: 'Authenticate, call endpoints, and set up webhooks.',
    href: '/docs/api/authentication',
  },
  {
    icon: 'Play',
    title: 'Video Tutorials',
    description: 'Watch step-by-step video walkthroughs for every feature.',
    href: '/docs/getting-started/welcome',
  },
]

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Zap,
  Layers,
  Code,
  Play,
}

export default async function DocsPage(): Promise<React.ReactElement> {
  try {
    const sections = await getDocsSidebar()

    return (
      <DocsLayout activeSlug="getting-started/welcome" sections={sections}>
        <h1 className="font-heading text-h2 font-bold text-dark">
          Welcome to Revnator Documentation
        </h1>
        <p className="mt-3 font-body text-base leading-[1.8] text-body">
          Everything you need to set up your workspace, manage contacts, send sequences,
          and close deals. Pick a topic below or browse the sidebar.
        </p>

        {/* Quick links grid */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {quickLinks.map((link) => {
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
  } catch (error) {
    console.error('Failed to render docs page:', error)
    return (
      <main className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold text-dark">Page temporarily unavailable</h1>
          <p className="mt-4 font-body text-muted">Please try again in a moment.</p>
          <Link href="/" className="mt-6 inline-block font-body text-sm font-semibold text-primary hover:underline">Go to homepage</Link>
        </div>
      </main>
    )
  }
}
