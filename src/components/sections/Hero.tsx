import React from 'react'
import Link from 'next/link'
import { Play, TrendingUp, CheckCircle } from 'lucide-react'
import { heroData } from './heroData'

function StatCard({ label, type }: { label: string; type: 'trending-up' | 'check-circle' }): React.ReactElement {
  const Icon = type === 'trending-up' ? TrendingUp : CheckCircle
  return (
    <div className="flex items-center gap-2.5 rounded-xl bg-white/[0.08] backdrop-blur-2xl border border-white/[0.15] px-3 py-2.5">
      <Icon size={16} className="text-accent flex-shrink-0" />
      <span className="font-body text-[13px] font-medium text-white whitespace-nowrap">{label}</span>
    </div>
  )
}

function BrowserMockup(): React.ReactElement {
  return (
    <div className="relative">
      {/* Browser frame */}
      <div className="rounded-2xl border border-white/10 bg-[#1F1A2E] shadow-[0_24px_64px_rgba(110,51,177,0.25)] overflow-hidden transform rotate-2">
        {/* Title bar */}
        <div className="flex items-center gap-2 h-8 px-4 bg-[#1F1A2E] border-b border-white/[0.06]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>

        {/* Skeleton dashboard content — aspect 16:10 */}
        <div className="aspect-[16/10] p-5 flex flex-col gap-4">
          {/* Top row — nav skeleton */}
          <div className="flex items-center gap-3">
            <div className="h-3 w-20 rounded bg-light/10" />
            <div className="h-3 w-16 rounded bg-light/10" />
            <div className="h-3 w-24 rounded bg-light/10" />
            <div className="ml-auto h-3 w-14 rounded bg-light/10" />
          </div>

          {/* Stat cards row */}
          <div className="flex gap-3">
            <div className="flex-1 h-16 rounded-lg bg-light/[0.06] border border-white/[0.06] p-3">
              <div className="h-2.5 w-16 rounded bg-light/10 mb-2" />
              <div className="h-4 w-12 rounded bg-accent/20" />
            </div>
            <div className="flex-1 h-16 rounded-lg bg-light/[0.06] border border-white/[0.06] p-3">
              <div className="h-2.5 w-12 rounded bg-light/10 mb-2" />
              <div className="h-4 w-16 rounded bg-primary/20" />
            </div>
            <div className="flex-1 h-16 rounded-lg bg-light/[0.06] border border-white/[0.06] p-3">
              <div className="h-2.5 w-20 rounded bg-light/10 mb-2" />
              <div className="h-4 w-10 rounded bg-accent/20" />
            </div>
          </div>

          {/* Table skeleton */}
          <div className="flex-1 rounded-lg bg-light/[0.04] border border-white/[0.06] p-3 flex flex-col gap-2.5">
            <div className="flex gap-3">
              <div className="h-2.5 w-24 rounded bg-light/10" />
              <div className="h-2.5 w-20 rounded bg-light/10" />
              <div className="h-2.5 w-16 rounded bg-light/10" />
              <div className="ml-auto h-2.5 w-12 rounded bg-light/10" />
            </div>
            {[1, 2, 3, 4].map((row) => (
              <div key={row} className="flex gap-3">
                <div className="h-2 w-28 rounded bg-light/[0.06]" />
                <div className="h-2 w-20 rounded bg-light/[0.06]" />
                <div className="h-2 w-16 rounded bg-light/[0.06]" />
                <div className="ml-auto h-2 w-10 rounded bg-accent/10" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating stat cards — hidden on mobile */}
      <div className="hidden md:block absolute -top-4 -left-6 z-10">
        <StatCard label={heroData.stats[0].label} type={heroData.stats[0].type} />
      </div>
      <div className="hidden md:block absolute -bottom-4 -right-6 z-10">
        <StatCard label={heroData.stats[1].label} type={heroData.stats[1].type} />
      </div>
    </div>
  )
}

export function Hero(): React.ReactElement {
  return (
    <section className="relative w-full bg-dark overflow-hidden">
      {/* Background gradient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(circle at 75% 50%, rgba(110,51,177,0.15) 0%, transparent 50%)',
        }}
      />

      <div className="relative mx-auto max-w-container px-6 pt-24 pb-20 md:pt-32 md:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-[55%_45%] items-center gap-12 md:gap-8">
          {/* Left — Text content */}
          <div>
            {/* Badge */}
            <span className="inline-block rounded-full bg-accent/[0.12] px-3.5 py-1.5 font-heading text-xs font-semibold uppercase tracking-[0.15em] text-accent">
              {heroData.badge}
            </span>

            {/* Headline */}
            <h1 className="mt-6 max-w-[540px] font-heading text-4xl font-extrabold leading-[1.12] tracking-[-0.02em] text-white md:text-[44px] lg:text-hero">
              {heroData.headline}{' '}
              <span className="border-b-[3px] border-accent pb-1">
                {heroData.headlineAccent}
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mt-6 max-w-[520px] font-body text-lg leading-[1.7] text-white/60">
              {heroData.subheadline}
            </p>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={heroData.primaryCta.href}
                className="inline-flex items-center rounded-lg bg-primary px-7 py-3.5 font-body text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-primary-dark"
              >
                {heroData.primaryCta.label}
              </Link>
              <Link
                href={heroData.secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-lg border-[1.5px] border-white/25 px-7 py-3.5 font-body text-[15px] font-semibold text-white transition-colors duration-150 hover:border-white/50"
              >
                <Play size={14} className="fill-current" />
                {heroData.secondaryCta.label}
              </Link>
            </div>

            {/* Trust line */}
            <p className="mt-4 font-body text-[13px] text-white/40">
              {heroData.trustLine}
            </p>
          </div>

          {/* Right — Visual */}
          <div className="relative flex items-center justify-center">
            <BrowserMockup />
          </div>
        </div>
      </div>
    </section>
  )
}
