import React from 'react'
import type { ModuleComparisonData } from './Data'

export function ModuleComparison({
  data,
}: {
  data: ModuleComparisonData
}): React.ReactElement {
  return (
    <section className="bg-dark py-20">
      <div className="mx-auto max-w-container px-6 md:px-12">
        {/* Header */}
        <div className="text-center">
          <span className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-accent">
            {data.label}
          </span>
          <h2 className="mt-4 font-heading text-h2 font-bold text-white tracking-[-0.01em]">
            {data.heading}
          </h2>
        </div>

        {/* Glass cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.cards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-white/10 bg-white/[0.06] p-6"
            >
              <h3 className="font-heading text-lg font-semibold text-white">
                {card.title}
              </h3>
              <p className="mt-3 font-body text-sm leading-[1.6] text-white/55">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stat row */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-12">
          {data.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-2xl font-extrabold text-accent">
                {stat.value}
              </p>
              <p className="mt-1 font-body text-xs text-white/45">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
