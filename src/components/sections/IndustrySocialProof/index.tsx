import React from 'react'
import type { IndustrySocialProofData } from '../_industries/agenciesData'

export function IndustrySocialProof({
  data,
}: {
  data: IndustrySocialProofData
}): React.ReactElement {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-container px-6 text-center md:px-12">
        {/* Label */}
        <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
          By the Numbers
        </span>

        {/* Stats row */}
        <div className="mx-auto mt-8 grid max-w-[800px] grid-cols-2 gap-8 md:grid-cols-4">
          {data.stats.map((stat, i) => (
            <div key={stat.label} className="relative text-center">
              {/* Vertical divider (desktop, skip first) */}
              {i > 0 && (
                <div className="absolute left-0 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-light md:block" />
              )}
              <span className="font-heading text-[40px] font-extrabold text-primary">
                {stat.number}
              </span>
              <p className="mt-2 font-body text-sm text-body">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
