import React from 'react'

export interface AboutMissionData {
  label: string
  heading: string
  paragraphs: string[]
}

export function AboutMission({ data }: { data: AboutMissionData }): React.ReactElement {
  return (
    <section className="w-full bg-white py-24">
      <div className="mx-auto max-w-[720px] px-6">
        <span className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-primary">
          {data.label}
        </span>
        <h2 className="mt-4 font-heading text-[32px] font-bold leading-[1.2] text-dark">
          {data.heading}
        </h2>
        {data.paragraphs.map((p, i) => (
          <p
            key={i}
            className="mt-5 font-body text-base leading-[1.7] text-body"
          >
            {p}
          </p>
        ))}
      </div>
    </section>
  )
}
