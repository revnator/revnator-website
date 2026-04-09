import React from 'react'
import Link from 'next/link'

export function PricingCTA(): React.ReactElement {
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
          Start closing more deals today
        </h2>
        <p className="mx-auto mt-4 max-w-[420px] font-body text-base text-white/55">
          14-day free trial. No credit card. Cancel anytime.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent px-7 py-3.5 font-body text-[15px] font-semibold text-white transition-all hover:scale-[1.02] hover:shadow-lg focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark"
          >
            Start free trial
          </Link>
          <a
            href="#comparison"
            className="inline-flex items-center justify-center rounded-lg border-[1.5px] border-white/25 bg-transparent px-7 py-3.5 font-body text-[15px] font-semibold text-white transition-colors hover:border-white/50 focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-dark"
          >
            Compare plans
          </a>
        </div>
      </div>
    </section>
  )
}
