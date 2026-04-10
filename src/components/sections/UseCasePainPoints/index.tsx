import React from 'react'
import { DynamicIcon } from '@/lib/icons'
import type { UseCasePainPointsData } from '../_useCases/types'

export function UseCasePainPoints({
  data,
}: {
  data: UseCasePainPointsData
}): React.ReactElement {
  return (
    <section className="bg-white py-20">
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
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {data.cards.map((card) => {
            return (
              <div
                key={card.title}
                className="rounded-2xl border border-light bg-bg p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-error/10">
                  <DynamicIcon name={card.icon} size={20} className="text-error" />
                </div>
                <h3 className="mt-4 font-heading text-base font-semibold text-dark">
                  {card.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-[1.6] text-body">
                  {card.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
