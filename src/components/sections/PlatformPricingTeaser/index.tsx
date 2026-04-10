import React from 'react'
import Link from 'next/link'

export interface PricingPillData {
  name: string
  price: string
}

export interface PlatformPricingTeaserData {
  label: string
  heading: string
  subheading: string
  pills: PricingPillData[]
}

export function PlatformPricingTeaser({ data }: { data: PlatformPricingTeaserData }): React.ReactElement {
  return (
    <section className="bg-bg py-20">
      <div className="mx-auto max-w-container px-6 text-center md:px-12">
        <span className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-primary">
          {data.label}
        </span>
        <h2 className="mt-4 font-heading text-[28px] font-bold leading-[1.2] text-dark tracking-[-0.01em]">
          {data.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-[480px] font-body text-base text-muted">
          {data.subheading}
        </p>

        {data.pills.length > 0 && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {data.pills.map((pill) => (
              <div
                key={pill.name}
                className="flex items-center gap-3 rounded-2xl border border-light bg-white px-6 py-4 shadow-sm"
              >
                <span className="font-heading text-sm font-semibold text-dark">{pill.name}</span>
                <span className="h-4 w-px bg-light" />
                <span className="font-heading text-lg font-bold text-primary">{pill.price}</span>
              </div>
            ))}
          </div>
        )}

        <Link
          href="/pricing"
          className="mt-8 inline-block font-body text-sm font-medium text-primary hover:underline"
        >
          View full pricing &amp; comparison &rarr;
        </Link>
      </div>
    </section>
  )
}
