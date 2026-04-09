import React from 'react'

export function AboutHero(): React.ReactElement {
  return (
    <section className="relative overflow-hidden bg-dark py-20">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at center, rgba(110,51,177,0.12) 0%, transparent 55%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-container px-6 text-center md:px-12">
        {/* Badge */}
        <span className="inline-block rounded-2xl bg-accent/[0.12] px-3.5 py-1.5 font-heading text-xs font-semibold uppercase tracking-[0.15em] text-accent">
          About Revnator
        </span>

        <h1 className="mx-auto mt-6 max-w-[720px] font-heading text-[44px] font-bold leading-[1.12] tracking-[-0.02em] text-white">
          Building the sales OS the world deserves
        </h1>

        <p className="mx-auto mt-5 max-w-[600px] font-body text-lg text-white/55">
          We started Revnator because the sales tools we used were bloated, expensive, and
          built for IT departments &mdash; not the reps actually closing deals.
        </p>
      </div>
    </section>
  )
}
