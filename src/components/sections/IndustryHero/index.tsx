import React from 'react'
import Link from 'next/link'
import type { IndustryHeroData } from '../_industries/types'

function BrowserFrame(): React.ReactElement {
  return (
    <div className="rounded-xl border border-light bg-white shadow-[0_12px_32px_rgba(19,15,30,0.06)] overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center gap-2 h-8 px-4 border-b border-light">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
      </div>
      {/* Skeleton content */}
      <div className="aspect-[16/10] p-5 flex flex-col gap-3">
        <div className="flex gap-3">
          <div className="h-3 w-24 rounded bg-light" />
          <div className="h-3 w-16 rounded bg-light" />
          <div className="ml-auto h-3 w-12 rounded bg-light" />
        </div>
        <div className="flex gap-3 mt-1">
          <div className="flex-1 h-14 rounded-lg bg-bg" />
          <div className="flex-1 h-14 rounded-lg bg-bg" />
          <div className="flex-1 h-14 rounded-lg bg-bg" />
        </div>
        <div className="flex-1 rounded-lg bg-bg mt-1" />
        <div className="flex gap-3">
          <div className="flex-1 h-8 rounded-lg bg-bg" />
          <div className="flex-1 h-8 rounded-lg bg-bg" />
        </div>
      </div>
    </div>
  )
}

export function IndustryHero({ data }: { data: IndustryHeroData }): React.ReactElement {
  return (
    <section className="bg-bg pt-16 pb-20">
      <div className="mx-auto max-w-container px-6 md:px-12">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[55fr_45fr]">
          {/* Left — Text */}
          <div>
            {/* Breadcrumb */}
            <nav className="font-body text-[13px] text-muted">
              <Link href="/use-cases" className="text-primary hover:underline">
                Sales OS
              </Link>
              <span className="mx-1.5">/</span>
              <span>{data.breadcrumbLabel}</span>
            </nav>

            {/* Badge */}
            <span className="mt-4 inline-block rounded-2xl bg-light px-3 py-1 font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
              {data.badge}
            </span>

            {/* Heading */}
            <h1 className="mt-4 max-w-[540px] font-heading text-[44px] font-bold leading-[1.12] tracking-[-0.02em] text-dark">
              {data.heading}
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-[480px] font-body text-[17px] leading-[1.7] text-body">
              {data.description}
            </p>

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link
                href={data.primaryCta.href}
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3.5 font-body text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:scale-[1.02] focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                {data.primaryCta.label}
              </Link>
              <Link
                href={data.secondaryCta.href}
                className="inline-flex items-center justify-center rounded-lg border-[1.5px] border-primary bg-transparent px-6 py-3.5 font-body text-sm font-semibold text-primary transition-all hover:bg-primary/5 hover:scale-[1.02] focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                {data.secondaryCta.label}
              </Link>
            </div>

            {/* Built-for tag row */}
            <div className="mt-8 border-t border-light pt-6">
              <p className="font-body text-xs text-muted">{data.builtForLabel}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {data.builtForTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-light bg-white px-2.5 py-1 font-body text-xs font-medium text-body"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Visual */}
          <div className="hidden lg:block">
            {data.heroImage ? (
              <img
                src={data.heroImage.url}
                alt={data.heroImage.alt}
                className="w-full rounded-xl border border-light object-cover"
              />
            ) : (
              <BrowserFrame />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
