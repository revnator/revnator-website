import React from 'react'

export interface SupportHeroData {
  label: string
  heading: string
  subheading: string
}

export function SupportHero({ data }: { data: SupportHeroData }): React.ReactElement {
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
        <h1 className="mx-auto mt-6 max-w-[640px] font-heading text-[40px] font-extrabold leading-[1.12] tracking-[-0.02em] text-white md:text-[48px]">
          {data.heading}
        </h1>
        <p className="mx-auto mt-6 max-w-[520px] font-body text-lg leading-[1.7] text-white/60">
          {data.subheading}
        </p>
      </div>
    </section>
  )
}
