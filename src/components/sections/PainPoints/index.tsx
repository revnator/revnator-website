import React from 'react'
import { painPoints } from '../_why/whyData'

export function PainPoints(): React.ReactElement {
  return (
    <section className="bg-bg py-20">
      <div className="mx-auto max-w-container px-6 md:px-12">
        {/* Header */}
        <div className="text-center">
          <span className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-primary">
            The Problem
          </span>
          <h2 className="mt-4 font-heading text-h2 font-bold text-dark tracking-[-0.01em]">
            Your sales stack is working against you
          </h2>
        </div>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {painPoints.map((card) => (
            <div
              key={card.number}
              className="rounded-2xl border border-light bg-white p-7"
            >
              <span className="font-heading text-[48px] font-extrabold leading-none text-light">
                {card.number}
              </span>
              <h3 className="mt-2 font-heading text-lg font-semibold text-dark">
                {card.title}
              </h3>
              <p className="mt-3 font-body text-sm leading-[1.7] text-body">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
