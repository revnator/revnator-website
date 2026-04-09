'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/ui'
import { modules } from './navData'

export function PlatformDropdown(): React.ReactElement {
  return (
    <div className="flex gap-6">
      {/* Modules grid — 60% width */}
      <div className="w-[60%]">
        <span className="block font-heading text-[11px] uppercase tracking-[0.12em] text-muted mb-4">
          MODULES
        </span>
        <div className="grid grid-cols-2 gap-2">
          {modules.map((mod) => {
            const Icon = mod.icon
            return (
              <Link
                key={mod.href}
                href={mod.href}
                className={cn(
                  'flex items-start gap-3 p-2 rounded-lg',
                  'transition-colors duration-150',
                  'hover:bg-bg',
                )}
                role="menuitem"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-bg flex items-center justify-center">
                  <Icon size={16} className="text-primary" />
                </div>
                <div className="min-w-0">
                  <span className="block font-body text-sm font-medium text-dark">
                    {mod.name}
                  </span>
                  <span className="block font-body text-xs text-muted">
                    {mod.description}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Promo card — 40% width */}
      <div className="w-[40%]">
        <Link
          href="/platform"
          className="block bg-bg rounded-xl p-4 transition-colors duration-150 hover:bg-light/50"
          role="menuitem"
        >
          <span
            className={cn(
              'inline-block font-heading text-[10px] uppercase',
              'text-accent bg-accent/[0.12] px-2.5 py-1 rounded-full',
            )}
          >
            NEW
          </span>
          <span className="block font-heading text-sm font-semibold text-dark mt-3">
            Explore the full platform
          </span>
          <span className="block font-body text-[13px] font-medium text-primary mt-2">
            See all features →
          </span>
        </Link>
      </div>
    </div>
  )
}
