import React from 'react'
import { ArrowRight } from 'lucide-react'
import type { IndustryUseCasesData } from '../_industries/types'

export function IndustryUseCases({ data }: { data: IndustryUseCasesData }): React.ReactElement {
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

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {data.cards.map((card) => (
            <div
              key={card.number}
              className="rounded-2xl border border-light bg-white p-7"
            >
              {/* Number badge */}
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-light">
                <span className="font-heading text-sm font-bold text-primary">
                  {card.number}
                </span>
              </div>

              {/* Title */}
              <h3 className="mt-4 font-heading text-lg font-semibold text-dark">
                {card.title}
              </h3>

              {/* Description */}
              <p className="mt-3 font-body text-sm leading-[1.6] text-body">
                {card.description}
              </p>

              {/* Workflow tag */}
              <span className="mt-4 inline-flex items-center gap-1 font-body text-xs font-medium text-primary">
                {card.tagLabel}
                <ArrowRight size={12} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
