import React from 'react'
import Link from 'next/link'

export function FinalCTA(): React.ReactElement {
  return (
    <section className="relative w-full bg-dark py-24 overflow-hidden">
      {/* Background glow */}
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
          Ready to close more deals?
        </h2>
        <p className="mx-auto mt-5 max-w-[520px] font-body text-lg text-white/55">
          Join the early access program. Free for up to 3 users. No credit card required.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/signup"
            className="inline-flex items-center rounded-lg px-7 py-3.5 font-body text-[15px] font-semibold text-white transition-transform duration-150 hover:scale-[1.02]"
            style={{
              background: 'linear-gradient(135deg, #6E33B1, #34D399)',
            }}
          >
            Start free trial
          </Link>
          <Link
            href="/demo"
            className="inline-flex items-center rounded-lg border-[1.5px] border-white/25 px-7 py-3.5 font-body text-[15px] font-semibold text-white transition-colors duration-150 hover:border-white/50"
          >
            Book a demo
          </Link>
        </div>
      </div>
    </section>
  )
}
