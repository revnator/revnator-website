import React from 'react'
import Link from 'next/link'

export function AboutCTA(): React.ReactElement {
  return (
    <section className="relative overflow-hidden bg-dark py-20">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at center, rgba(110,51,177,0.1) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-container px-6 text-center md:px-12">
        <h2 className="font-heading text-[36px] font-bold text-white">
          Join us in building the future of sales
        </h2>
        <p className="mx-auto mt-4 font-body text-base text-white/55">
          Try Revnator free, or get in touch.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3.5 font-body text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:scale-[1.02] focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark"
          >
            Start free trial
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg border-[1.5px] border-white/25 bg-transparent px-6 py-3.5 font-body text-sm font-semibold text-white transition-colors hover:border-white/50 focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-dark"
          >
            Contact us
          </Link>
        </div>
      </div>
    </section>
  )
}
