import React from 'react'
import Link from 'next/link'

export interface PlatformHeroData {
  badge: string
  heading: string
  subheading: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
}

export function PlatformHero({ data }: { data: PlatformHeroData }): React.ReactElement {
  return (
    <section className="relative overflow-hidden bg-dark py-20">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at center, rgba(110,51,177,0.12) 0%, transparent 55%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-container px-6 text-center md:px-12">
        <span className="inline-block rounded-2xl bg-accent/[0.12] px-3.5 py-1.5 font-heading text-xs font-semibold uppercase tracking-[0.15em] text-accent">
          {data.badge}
        </span>

        <h1 className="mx-auto mt-6 max-w-[740px] font-heading text-[44px] font-bold leading-[1.12] tracking-[-0.02em] text-white">
          {data.heading}
        </h1>

        <p className="mx-auto mt-5 max-w-[580px] font-body text-lg text-white/55">
          {data.subheading}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={data.primaryCta.href}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3.5 font-body text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:scale-[1.02] focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark"
          >
            {data.primaryCta.label}
          </Link>
          <Link
            href={data.secondaryCta.href}
            className="inline-flex items-center justify-center rounded-lg border-[1.5px] border-white/25 bg-transparent px-6 py-3.5 font-body text-sm font-semibold text-white transition-colors hover:border-white/50 focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-dark"
          >
            {data.secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  )
}
