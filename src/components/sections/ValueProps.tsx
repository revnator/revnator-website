import React from 'react'
import { Check } from 'lucide-react'
import { DynamicIcon } from '@/lib/icons'

export interface ValuePropData {
  icon: string
  heading: string
  description: string
  bullets: string[]
}

export interface ValuePropsData {
  label: string
  heading: string
  valueProps: ValuePropData[]
}

export function ValueProps({ data }: { data: ValuePropsData }): React.ReactElement {
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

        <div className="mt-16 flex flex-col gap-16">
          {data.valueProps.map((vp, i) => (
            <div
              key={vp.heading}
              className={`grid grid-cols-1 md:grid-cols-2 items-center gap-12 ${
                i % 2 === 1 ? 'md:[direction:rtl]' : ''
              }`}
            >
              <div className={i % 2 === 1 ? 'md:[direction:ltr]' : ''}>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-light">
                  <DynamicIcon name={vp.icon} size={24} className="text-primary" />
                </div>
                <h3 className="mt-5 font-heading text-xl font-semibold text-dark">
                  {vp.heading}
                </h3>
                <p className="mt-3 max-w-[480px] font-body text-base leading-[1.7] text-body">
                  {vp.description}
                </p>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {vp.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <Check size={18} className="mt-0.5 flex-shrink-0 text-accent" />
                      <span className="font-body text-sm text-body">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Placeholder visual */}
              <div className={i % 2 === 1 ? 'md:[direction:ltr]' : ''}>
                <div className="rounded-xl border border-light bg-white p-8 aspect-[4/3] flex items-center justify-center">
                  <DynamicIcon name={vp.icon} size={64} className="text-light" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
