import React from 'react'

export interface PainPointData {
  number: string
  title: string
  description: string
}

export interface PainPointsData {
  label: string
  heading: string
  painPoints: PainPointData[]
}

export function PainPoints({ data }: { data: PainPointsData }): React.ReactElement {
  return (
    <section className="w-full bg-bg py-24">
      <div className="mx-auto max-w-container px-6">
        <div className="text-center">
          <span className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-primary">
            {data.label}
          </span>
          <h2 className="mt-4 font-heading text-[32px] font-bold text-dark">
            {data.heading}
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.painPoints.map((point) => (
            <div
              key={point.number}
              className="rounded-2xl border border-light bg-white p-8"
            >
              <span className="font-heading text-[32px] font-extrabold text-light">
                {point.number}
              </span>
              <h3 className="mt-3 font-heading text-lg font-semibold text-dark">
                {point.title}
              </h3>
              <p className="mt-2 font-body text-sm leading-[1.7] text-body">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
