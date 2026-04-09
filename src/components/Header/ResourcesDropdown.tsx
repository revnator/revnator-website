'use client'

import React from 'react'
import Link from 'next/link'
import { resourceColumns, featuredResource } from './navData'

export function ResourcesDropdown(): React.ReactElement {
  return (
    <div>
      <div className="flex gap-6">
        {/* Link columns */}
        {resourceColumns.map((column) => (
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
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Featured tile */}
        <div className="w-[220px] flex-shrink-0">
          <Link
            href={featuredResource.href}
            className="block bg-bg rounded-xl p-3 transition-colors duration-150 hover:bg-light/50"
            role="menuitem"
          >
            {/* Thumbnail placeholder */}
            <div className="w-full h-[110px] bg-light rounded-lg" />

            <span className="inline-block font-heading text-[10px] uppercase text-accent bg-accent/[0.12] px-2.5 py-1 rounded-full mt-3">
              {featuredResource.pill}
            </span>
            <span className="block font-heading text-[13px] font-semibold text-dark mt-2">
              {featuredResource.title}
            </span>
            <span className="block font-body text-xs font-medium text-primary mt-2">
              {featuredResource.linkLabel}
            </span>
          </Link>
        </div>
      </div>

      {/* Bottom divider + view all link */}
      <div className="border-t border-light mt-4 pt-3">
        <Link
          href="/resources"
          className="block font-body text-sm font-medium text-primary px-2"
          role="menuitem"
        >
          View all resources →
        </Link>
      </div>
    </div>
  )
}
