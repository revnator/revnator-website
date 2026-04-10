import React from 'react'
import Link from 'next/link'
import type { IndustryCTAData } from '../_industries/types'

export function IndustryCTA({ data }: { data: IndustryCTAData }): React.ReactElement {
  return (
    <section className="border-t border-light bg-white py-20">
      <div className="mx-auto max-w-container px-6 text-center md:px-12">
        <h2 className="font-heading text-h2 font-bold text-dark tracking-[-0.01em]">
          {data.heading}
        </h2>

        <p className="mx-auto mt-4 font-body text-base text-muted">
          {data.subheading}
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={data.primaryCta.href}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3.5 font-body text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:scale-[1.02] focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            {data.primaryCta.label}
          </Link>
          <Link
            href={data.secondaryCta.href}
            className="inline-flex items-center justify-center rounded-lg border-[1.5px] border-primary bg-transparent px-6 py-3.5 font-body text-sm font-semibold text-primary transition-all hover:bg-primary/5 hover:scale-[1.02] focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            {data.secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  )
}
