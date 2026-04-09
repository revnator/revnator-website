import React from 'react'
import { ArrowRight } from 'lucide-react'
import type { IndustryWorkflowData } from '../_industries/agenciesData'

export function IndustryWorkflow({ data }: { data: IndustryWorkflowData }): React.ReactElement {
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
          <p className="mx-auto mt-3 max-w-[520px] font-body text-base text-muted">
            {data.subheading}
          </p>
        </div>

        {/* Workflow steps */}
        <div className="mt-16 flex flex-col items-stretch gap-4 md:flex-row md:items-start md:gap-0">
          {data.steps.map((step, i) => (
            <React.Fragment key={step.number}>
              {/* Step card */}
              <div className="flex-1 rounded-xl border border-light bg-bg p-5">
                {/* Number circle */}
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                  <span className="font-heading text-sm font-bold text-white">{step.number}</span>
                </div>

                {/* Title */}
                <h3 className="mt-3 font-heading text-sm font-semibold text-dark">{step.title}</h3>

                {/* Description */}
                <p className="mt-1 font-body text-xs text-muted">{step.description}</p>
              </div>

              {/* Arrow between steps (desktop only, skip last) */}
              {i < data.steps.length - 1 && (
                <div className="hidden items-center px-2 md:flex">
                  <ArrowRight size={20} className="text-light" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
