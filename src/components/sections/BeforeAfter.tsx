import React from 'react'
import { X, Check } from 'lucide-react'

export interface ToolRowData {
  name: string
  price: string
}

export interface CapabilityRowData {
  text: string
}

export interface BeforeAfterData {
  label: string
  heading: string
  withoutTools: ToolRowData[]
  withCapabilities: CapabilityRowData[]
  revnatorPrice: string
}

export function BeforeAfter({ data }: { data: BeforeAfterData }): React.ReactElement {
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

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Without Revnator */}
          <div className="rounded-2xl border border-light bg-bg p-8">
            <h3 className="font-heading text-lg font-semibold text-dark">
              Without Revnator
            </h3>
            <div className="mt-6 flex flex-col gap-3">
              {data.withoutTools.map((tool) => (
                <div
                  key={tool.name}
                  className="flex items-center justify-between rounded-lg border border-light bg-white px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <X size={16} className="flex-shrink-0 text-error" />
                    <span className="font-body text-sm text-body">{tool.name}</span>
                  </div>
                  <span className="font-body text-sm font-medium text-muted">
                    {tool.price}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* With Revnator */}
          <div className="rounded-2xl border-2 border-primary bg-white p-8 shadow-[0_8px_32px_rgba(110,51,177,0.08)]">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-lg font-semibold text-dark">
                With Revnator
              </h3>
              <span className="rounded-full bg-accent/[0.12] px-3 py-1 font-heading text-xs font-semibold text-[#065F46]">
                {data.revnatorPrice}
              </span>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              {data.withCapabilities.map((cap) => (
                <div
                  key={cap.text}
                  className="flex items-center gap-3 rounded-lg border border-light px-4 py-3"
                >
                  <Check size={16} className="flex-shrink-0 text-accent" />
                  <span className="font-body text-sm text-body">{cap.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
