import React from 'react'
import Link from 'next/link'
import {
  Users,
  Building2,
  Mail,
  GitBranch,
  LayoutDashboard,
  Calendar,
  MessageCircle,
  Sparkles,
  FileText,
} from 'lucide-react'
import { platformModules, type PlatformModule } from '../_platform/platformData'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Users,
  Building2,
  Mail,
  GitBranch,
  LayoutDashboard,
  Calendar,
  MessageCircle,
  Sparkles,
  FileText,
}

function ModuleCard({ module }: { module: PlatformModule }): React.ReactElement {
  const Icon = iconMap[module.icon]

  return (
    <div className="group flex flex-col rounded-2xl border border-light bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(19,15,30,0.08)]">
      {/* Icon */}
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-light">
        {Icon && <Icon size={20} className="text-primary" />}
      </div>

      {/* Name */}
      <h3 className="mt-4 font-heading text-base font-semibold text-dark">{module.name}</h3>

      {/* Description */}
      <p className="mt-1.5 font-body text-sm text-muted line-clamp-2">{module.description}</p>

      {/* Feature mini-list */}
      <ul className="mt-4 flex flex-col gap-1.5">
        {module.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            <span className="h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
            <span className="font-body text-[13px] text-body">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Link */}
      <Link
        href={module.href}
        className="mt-auto pt-4 inline-block font-body text-[13px] font-medium text-primary hover:underline"
      >
        Explore module &rarr;
      </Link>
    </div>
  )
}

export function PlatformModulesGrid(): React.ReactElement {
  return (
    <section className="bg-bg py-20">
      <div className="mx-auto max-w-container px-6 md:px-12">
        {/* Header */}
        <div className="text-center">
          <span className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-primary">
            Modules
          </span>
          <h2 className="mt-4 font-heading text-h2 font-bold text-dark tracking-[-0.01em]">
            Everything your revenue team needs
          </h2>
          <p className="mx-auto mt-4 max-w-[540px] font-body text-base text-muted">
            Nine integrated modules that replace your scattered tool stack with one unified workspace.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {platformModules.map((module) => (
            <ModuleCard key={module.name} module={module} />
          ))}
        </div>
      </div>
    </section>
  )
}
