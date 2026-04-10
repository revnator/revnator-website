import React from 'react'
import Link from 'next/link'

export interface WhyHeroData {
  label: string
  heading: string
  subheading: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
}

export function WhyHero({ data }: { data: WhyHeroData }): React.ReactElement {
  return (
    <section className="relative w-full bg-dark overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(circle at 50% 80%, rgba(110,51,177,0.15) 0%, transparent 50%)',
        }}
      />

      <div className="relative mx-auto max-w-container px-6 pt-24 pb-20 md:pt-32 md:pb-24 text-center">
        <span className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-accent">
          {data.label}
        </span>
        <h1 className="mx-auto mt-6 max-w-[680px] font-heading text-[40px] font-extrabold leading-[1.12] tracking-[-0.02em] text-white md:text-[48px]">
          {data.heading}
        </h1>
        <p className="mx-auto mt-6 max-w-[560px] font-body text-lg leading-[1.7] text-white/60">
          {data.subheading}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={data.primaryCta.href}
            className="inline-flex items-center rounded-lg bg-primary px-7 py-3.5 font-body text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-primary-dark"
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
