import React from 'react'
import type { AboutStoryData } from '../_about/aboutData'

export function AboutStory({ data }: { data: AboutStoryData }): React.ReactElement {
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

        {/* Timeline */}
        <div className="mx-auto mt-16 max-w-prose-narrow">
          {data.milestones.map((milestone, i) => (
            <div key={i} className="relative flex gap-5">
              {/* Left — Year badge + connecting line */}
              <div className="flex flex-col items-center">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-primary">
                  <span className="font-heading text-sm font-bold text-white">
                    {milestone.year}
                  </span>
                </div>
                {/* Connecting line (skip last) */}
                {i < data.milestones.length - 1 && (
                  <div className="w-px flex-1 bg-light" />
                )}
              </div>

              {/* Right — Content card */}
              <div className="mb-8 flex-1 rounded-xl border border-light bg-bg p-5">
                <h3 className="font-heading text-base font-semibold text-dark">
                  {milestone.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-[1.6] text-body">
                  {milestone.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
