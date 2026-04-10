import React from 'react'
import Link from 'next/link'

export interface WhyCTAData {
  heading: string
  subheading: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
}

export function WhyCTA({ data }: { data: WhyCTAData }): React.ReactElement {
  return (
    <section className="relative w-full bg-dark py-24 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(circle at center, rgba(110,51,177,0.15) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-container px-6 text-center">
        <h2 className="font-heading text-[40px] font-extrabold text-white">
          {data.heading}
        </h2>
        <p className="mx-auto mt-5 max-w-[520px] font-body text-lg text-white/55">
          {data.subheading}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={data.primaryCta.href}
            className="inline-flex items-center rounded-lg px-7 py-3.5 font-body text-[15px] font-semibold text-white transition-transform duration-150 hover:scale-[1.02]"
            style={{
              background: 'linear-gradient(135deg, #6E33B1, #34D399)',
            }}
          >
            {data.primaryCta.label}
          </Link>
          <Link
            href={data.secondaryCta.href}
            className="inline-flex items-center rounded-lg border-[1.5px] border-white/25 px-7 py-3.5 font-body text-[15px] font-semibold text-white transition-colors duration-150 hover:border-white/50"
          >
            {data.secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  )
}
