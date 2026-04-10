'use client'

import React, { useState, useEffect } from 'react'
import { cn } from '@/utilities/ui'

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

interface DocsTOCProps {
  headings: string[]
}

export function DocsTOC({ headings }: DocsTOCProps): React.ReactElement {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const ids = headings.map(slugifyHeading)
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first intersecting entry
        const visible = entries.find((e) => e.isIntersecting)
        if (visible?.target.id) {
          setActiveId(visible.target.id)
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 },
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  function scrollTo(heading: string): void {
    const id = slugifyHeading(heading)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <aside className="hidden w-[220px] flex-shrink-0 xl:block">
      <div className="sticky top-[72px] h-[calc(100vh-72px)] overflow-y-auto pr-6 pt-8">
        <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
          On this page
        </p>
        <nav className="mt-3 flex flex-col">
          {headings.map((heading) => {
            const id = slugifyHeading(heading)
            const isActive = activeId === id
            return (
              <button
                key={heading}
                type="button"
                onClick={() => scrollTo(heading)}
                className={cn(
                  'flex h-7 items-center border-l-2 pl-3 text-left font-body text-[13px] transition-colors',
                  isActive
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted hover:text-body',
                )}
              >
                {heading}
              </button>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
