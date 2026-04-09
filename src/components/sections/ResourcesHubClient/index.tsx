'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  BarChart3,
  Video,
  FileText,
  FileCode,
  Trophy,
} from 'lucide-react'
import { cn } from '@/utilities/ui'
import {
  resourceTypes,
  typeDisplayLabel,
  typeCardCta,
  typeIconName,
  type Resource,
  type ResourceFilterCategory,
} from '../_resources/resourcesData'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  BookOpen,
  BarChart3,
  Video,
  FileText,
  FileCode,
  Trophy,
}

function ResourceCard({ resource }: { resource: Resource }): React.ReactElement {
  const IconComponent = iconMap[typeIconName[resource.type]]

  return (
    <Link
      href={`/resources/${resource.type}/${resource.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-light bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(19,15,30,0.08)]"
    >
      {/* Thumbnail */}
      <div className="flex h-[180px] w-full items-center justify-center bg-light">
        {IconComponent && (
          <IconComponent size={36} className="text-primary/60" />
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <span className="inline-block w-fit rounded-full bg-light px-3 py-0.5 font-heading text-[10px] font-semibold uppercase tracking-[0.1em] text-primary">
          {typeDisplayLabel[resource.type]}
        </span>
        <h3 className="mt-3 line-clamp-2 font-heading text-base font-semibold text-dark">
          {resource.title}
        </h3>
        <p className="mt-2 line-clamp-2 font-body text-[13px] text-muted">
          {resource.description}
        </p>
        <span className="mt-4 font-body text-[13px] font-medium text-primary">
          {typeCardCta[resource.type]} &rarr;
        </span>
      </div>
    </Link>
  )
}

export function ResourcesHubClient({
  resources,
}: {
  resources: Resource[]
}): React.ReactElement {
  const [activeFilter, setActiveFilter] =
    useState<ResourceFilterCategory>('All')

  const filtered = useMemo(
    () =>
      activeFilter === 'All'
        ? resources
        : resources.filter((r) => r.filterCategory === activeFilter),
    [resources, activeFilter],
  )

  return (
    <section className="bg-bg pt-6 pb-20">
      <div className="mx-auto max-w-container px-6 md:px-12">
        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 pb-8">
          {resourceTypes.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              className={cn(
                'rounded-lg px-4 py-2 font-body text-[13px] font-medium transition-colors',
                activeFilter === cat
                  ? 'bg-primary text-white'
                  : 'border border-light bg-transparent text-body hover:bg-light/50',
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center font-body text-sm text-muted">
            No resources in this category yet.
          </p>
        )}
      </div>
    </section>
  )
}
