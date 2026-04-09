'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Search, ChevronRight, ChevronDown } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { docsSections } from '../_docs/docsData'

interface DocsSidebarProps {
  activeSlug: string
}

export function DocsSidebar({ activeSlug }: DocsSidebarProps): React.ReactElement {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    docsSections.forEach((section) => {
      if (section.defaultExpanded) {
        initial[section.title] = true
      }
      // Also expand the section containing the active page
      if (section.pages.some((p) => p.slug === activeSlug)) {
        initial[section.title] = true
      }
    })
    return initial
  })

  function toggleSection(title: string): void {
    setExpanded((prev) => ({ ...prev, [title]: !prev[title] }))
  }

  return (
    <aside className="hidden w-[260px] flex-shrink-0 border-r border-light bg-bg lg:block">
      <div className="sticky top-[72px] h-[calc(100vh-72px)] overflow-y-auto p-6">
        {/* Search input (visual only) */}
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="text"
            placeholder="Search docs..."
            readOnly
            className="h-10 w-full rounded-lg border border-light bg-white pl-9 pr-3 font-body text-sm text-body placeholder:text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Navigation tree */}
        <nav className="mt-6 flex flex-col gap-0.5">
          {docsSections.map((section) => {
            const isExpanded = expanded[section.title] ?? false
            const Chevron = isExpanded ? ChevronDown : ChevronRight

            return (
              <div key={section.title}>
                {/* Section heading */}
                <button
                  type="button"
                  onClick={() => toggleSection(section.title)}
                  className="flex h-9 w-full items-center gap-2 rounded-lg px-2 font-heading text-[13px] font-semibold text-dark transition-colors hover:bg-light"
                >
                  <Chevron size={16} className="flex-shrink-0 text-muted" />
                  {section.title}
                </button>

                {/* Pages */}
                {isExpanded && (
                  <div className="ml-2 flex flex-col gap-0.5">
                    {section.pages.map((page) => {
                      const isActive = page.slug === activeSlug
                      return (
                        <Link
                          key={page.slug}
                          href={`/docs/${page.slug}`}
                          className={cn(
                            'flex h-8 items-center rounded-lg pl-6 pr-2 font-body text-[13px] transition-colors',
                            isActive
                              ? 'border-l-[3px] border-primary bg-light text-primary font-medium'
                              : 'text-body hover:bg-[#ECEAF2]',
                          )}
                        >
                          {page.title}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
