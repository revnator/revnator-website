import React from 'react'
import type { AboutMissionData } from '../_about/aboutData'

function BrowserFrame(): React.ReactElement {
  return (
    <div className="rounded-xl border border-light bg-white shadow-[0_12px_32px_rgba(19,15,30,0.06)] overflow-hidden">
      <div className="flex items-center gap-2 h-8 px-4 border-b border-light">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
      </div>
      <div className="aspect-[16/10] p-5 flex flex-col gap-3">
        <div className="flex gap-3">
          <div className="h-3 w-24 rounded bg-light" />
          <div className="h-3 w-16 rounded bg-light" />
          <div className="ml-auto h-3 w-12 rounded bg-light" />
        </div>
        <div className="flex gap-3 mt-1">
          <div className="flex-1 h-14 rounded-lg bg-bg" />
          <div className="flex-1 h-14 rounded-lg bg-bg" />
          <div className="flex-1 h-14 rounded-lg bg-bg" />
        </div>
        <div className="flex-1 rounded-lg bg-bg mt-1" />
        <div className="flex gap-3">
          <div className="flex-1 h-8 rounded-lg bg-bg" />
          <div className="flex-1 h-8 rounded-lg bg-bg" />
        </div>
      </div>
    </div>
  )
}

export function AboutMission({ data }: { data: AboutMissionData }): React.ReactElement {
  return (
    <section className="bg-bg py-20">
      <div className="mx-auto max-w-container px-6 md:px-12">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left — Text */}
          <div>
            <span className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-primary">
              {data.label}
            </span>

            <h2 className="mt-4 font-heading text-h2 font-bold leading-[1.2] text-dark tracking-[-0.01em]">
              {data.heading}
            </h2>

            {data.paragraphs.map((p, i) => (
              <p
                key={i}
                className="mt-5 font-body text-[17px] leading-[1.7] text-body first:mt-5"
              >
                {p}
              </p>
            ))}
          </div>

          {/* Right — Visual */}
          <div className="hidden lg:block">
            <BrowserFrame />
          </div>
        </div>
      </div>
    </section>
  )
}
