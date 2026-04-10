import React from 'react'

export interface MilestoneData {
  year: string
  title: string
  description: string
}

export interface AboutStoryData {
  label: string
  heading: string
  milestones: MilestoneData[]
}

export function AboutStory({ data }: { data: AboutStoryData }): React.ReactElement {
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

        <div className="relative mt-16 mx-auto max-w-[640px]">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-light" />

          <div className="flex flex-col gap-12">
            {data.milestones.map((m) => (
              <div key={m.title} className="relative pl-16">
                {/* Dot */}
                <div className="absolute left-[18px] top-1 h-4 w-4 rounded-full border-[3px] border-primary bg-white" />

                <span className="font-heading text-xs font-semibold text-primary">
                  {m.year}
                </span>
                <h3 className="mt-1 font-heading text-lg font-semibold text-dark">
                  {m.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-[1.7] text-body">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
