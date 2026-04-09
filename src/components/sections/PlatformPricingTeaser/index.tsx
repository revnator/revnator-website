import React from 'react'
import Link from 'next/link'
import { pricingPills } from '../_platform/platformData'

export function PlatformPricingTeaser(): React.ReactElement {
  return (
    <section className="bg-bg py-20">
      <div className="mx-auto max-w-container px-6 text-center md:px-12">
        {/* Header */}
        <span className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-primary">
          Pricing
        </span>
        <h2 className="mt-4 font-heading text-[28px] font-bold leading-[1.2] text-dark tracking-[-0.01em]">
          Simple, transparent pricing
        </h2>
        <p className="mx-auto mt-4 max-w-[480px] font-body text-base text-muted">
          Start free with up to 3 users. Upgrade when you&apos;re ready.
        </p>

        {/* Pricing pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {pricingPills.map((pill) => (
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

        {/* Link */}
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
