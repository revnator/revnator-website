import React from 'react'
import { Mail } from 'lucide-react'

export interface NewsPressKitData {
  enabled: boolean
  label: string
  heading: string
  description: string
  buttonText: string
  buttonHref: string
  contactHeading: string
  contactEmail: string
  contactResponse: string
}

export function NewsPressKit({ data }: { data: NewsPressKitData }): React.ReactElement {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-container px-6 md:px-12">
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[60fr_40fr]">
          {/* Left */}
          <div>
            <span className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-primary">
              {data.label}
            </span>
            <h2 className="mt-3 font-heading text-2xl font-bold text-dark">
              {data.heading}
            </h2>
            <p className="mt-3 font-body text-base leading-[1.7] text-body">
              {data.description}
            </p>
            <a
              href={data.buttonHref}
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-white transition-colors hover:bg-primary-dark focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {data.buttonText}
            </a>
          </div>

          {/* Right — Press contact card */}
          <div className="rounded-2xl bg-bg p-6">
            <h3 className="font-heading text-base font-semibold text-dark">{data.contactHeading}</h3>
            <a
              href={`mailto:${data.contactEmail}`}
              className="mt-3 inline-flex items-center gap-2 font-body text-sm font-medium text-primary hover:underline"
            >
              <Mail size={16} />
              {data.contactEmail}
            </a>
            <p className="mt-2 font-body text-[13px] text-muted">
              {data.contactResponse}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
