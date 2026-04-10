import React from 'react'
import Link from 'next/link'
import { DynamicIcon } from '@/lib/icons'
import type { UseCaseRelatedModulesData } from '../_useCases/types'

export function UseCaseRelatedModules({
  data,
}: {
  data: UseCaseRelatedModulesData
}): React.ReactElement {
  return (
    <section className="bg-bg py-20">
      <div className="mx-auto max-w-container px-6 md:px-12">
        {/* Header */}
        <div className="text-center">
          <span className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-primary">
            {data.label}
          </span>
          <h2 className="mt-4 font-heading text-[28px] font-bold leading-[1.2] text-dark tracking-[-0.01em]">
            {data.heading}
          </h2>
        </div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {data.modules.map((mod) => {
            return (
              <div
                key={mod.name}
                className="group rounded-2xl border border-light bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(19,15,30,0.08)]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-light">
                  <DynamicIcon name={mod.icon} size={20} className="text-primary" />
                </div>
                <h3 className="mt-4 font-heading text-base font-semibold text-dark">
                  {mod.name}
                </h3>
                <p className="mt-1.5 font-body text-sm text-muted line-clamp-2">
                  {mod.description}
                </p>
                <Link
                  href={mod.href}
                  className="mt-4 inline-block font-body text-[13px] font-medium text-primary hover:underline"
                >
                  Explore &rarr;
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
