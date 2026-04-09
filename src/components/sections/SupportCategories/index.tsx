import React from 'react'
import Link from 'next/link'
import {
  Rocket,
  Users,
  Mail,
  GitBranch,
  Calendar,
  BarChart3,
  CreditCard,
  Plug,
} from 'lucide-react'
import { kbCategories } from '../_support/supportData'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Rocket,
  Users,
  Mail,
  GitBranch,
  Calendar,
  BarChart3,
  CreditCard,
  Plug,
}

export function SupportCategories(): React.ReactElement {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-container px-6 md:px-12">
        <h2 className="text-center font-heading text-2xl font-bold text-dark">
          Browse by topic
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          {kbCategories.map((cat) => {
            const Icon = iconMap[cat.icon]
            return (
              <Link
                key={cat.title}
                href={cat.href}
                className="flex items-center gap-4 rounded-xl border border-light bg-bg p-4 transition-colors hover:border-primary hover:bg-white"
              >
                {Icon && <Icon size={20} className="flex-shrink-0 text-primary" />}
                <span className="flex-1 font-body text-[15px] font-medium text-dark">
                  {cat.title}
                </span>
                <span className="font-body text-[13px] text-muted">
                  {cat.articleCount}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
