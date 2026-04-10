import React from 'react'
import { DynamicIcon } from '@/lib/icons'

export interface AboutValueData {
  icon: string
  title: string
  description: string
}

export interface AboutValuesData {
  label: string
  heading: string
  values: AboutValueData[]
}

export function AboutValues({ data }: { data: AboutValuesData }): React.ReactElement {
  return (
    <section className="w-full bg-white py-24">
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
          {data.values.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border border-light bg-bg p-8"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-light">
                <DynamicIcon name={v.icon} size={24} className="text-primary" />
              </div>
              <h3 className="mt-5 font-heading text-lg font-semibold text-dark">
                {v.title}
              </h3>
              <p className="mt-2 font-body text-sm leading-[1.7] text-body">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
