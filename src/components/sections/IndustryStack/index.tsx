import React from 'react'
import Link from 'next/link'
import { DynamicIcon } from '@/lib/icons'
import type { IndustryStackData } from '../_industries/types'

export function IndustryStack({ data }: { data: IndustryStackData }): React.ReactElement {
  return (
    <section className="bg-bg py-20">
      <div className="mx-auto max-w-container px-6 md:px-12">
        {/* Header */}
        <div className="text-center">
          <span className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-primary">
            {data.label}
          </span>
          <h2 className="mt-4 font-heading text-h2 font-bold text-dark tracking-[-0.01em]">
            {data.heading}
          </h2>
        </div>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.modules.map((mod) => {
            return (
              <Link
                key={mod.name}
                href={mod.href}
                className="group rounded-xl border border-light bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(19,15,30,0.08)]"
              >
                {/* Icon */}
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-light">
                  <DynamicIcon name={mod.icon} size={18} className="text-primary" />
                </div>

                {/* Name */}
                <h3 className="mt-3 font-heading text-sm font-semibold text-dark">{mod.name}</h3>

                {/* Why */}
                <p className="mt-1.5 font-body text-xs text-muted line-clamp-2">{mod.why}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
