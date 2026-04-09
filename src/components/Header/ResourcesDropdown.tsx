'use client'

import React from 'react'
import Link from 'next/link'
import { DynamicIcon } from '@/lib/icons'
import type { Header as HeaderType } from '@/payload-types'

type LearnItem = NonNullable<HeaderType['learnItems']>[number]
type DownloadItem = NonNullable<HeaderType['downloadItems']>[number]
type FeaturedResource = NonNullable<HeaderType['featuredResource']>
type ViewAllLink = NonNullable<HeaderType['viewAllLink']>

interface ResourcesDropdownProps {
  learnLabel: string
  learnItems: LearnItem[]
  downloadLabel: string
  downloadItems: DownloadItem[]
  featuredResource?: FeaturedResource
  viewAllLink?: ViewAllLink
}

export function ResourcesDropdown({
  learnLabel,
  learnItems,
  downloadLabel,
  downloadItems,
  featuredResource,
  viewAllLink,
}: ResourcesDropdownProps): React.ReactElement {
  const columns = [
    { label: learnLabel, links: learnItems },
    { label: downloadLabel, links: downloadItems },
  ]

  return (
    <div>
      <div className="flex gap-6">
        {/* Link columns */}
        {columns.map((column) => (
          <div key={column.label} className="flex-1">
            <span className="block font-heading text-[11px] uppercase tracking-[0.12em] text-muted mb-4">
              {column.label}
            </span>
            <div className="flex flex-col">
              {column.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block font-body text-sm font-medium text-dark py-2 px-2 rounded-lg transition-colors duration-150 hover:bg-bg"
                  role="menuitem"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Featured tile */}
        {featuredResource && (
          <div className="w-[220px] flex-shrink-0">
            <Link
              href={featuredResource.href ?? '#'}
              className="block bg-bg rounded-xl p-3 transition-colors duration-150 hover:bg-light/50"
              role="menuitem"
            >
              {/* Thumbnail placeholder with icon */}
              <div className="w-full h-[110px] bg-light rounded-lg flex items-center justify-center">
                <DynamicIcon
                  name={featuredResource.thumbnailIcon ?? 'BookOpen'}
                  size={28}
                  className="text-primary/60"
                />
              </div>

              <span className="inline-block font-heading text-[10px] uppercase text-accent bg-accent/[0.12] px-2.5 py-1 rounded-full mt-3">
                {featuredResource.typeLabel ?? 'EBOOK'}
              </span>
              <span className="block font-heading text-[13px] font-semibold text-dark mt-2">
                {featuredResource.title}
              </span>
              <span className="block font-body text-xs font-medium text-primary mt-2">
                {featuredResource.linkText ?? 'Download free →'}
              </span>
            </Link>
          </div>
        )}
      </div>

      {/* Bottom divider + view all link */}
      {viewAllLink && (
        <div className="border-t border-light mt-4 pt-3">
          <Link
            href={viewAllLink.href ?? '/resources'}
            className="block font-body text-sm font-medium text-primary px-2"
            role="menuitem"
          >
            {viewAllLink.text ?? 'View all resources →'}
          </Link>
        </div>
      )}
    </div>
  )
}
