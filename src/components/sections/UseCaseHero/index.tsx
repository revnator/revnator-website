import React from 'react'
import Link from 'next/link'
import type { UseCaseHeroData } from '../_useCases/salesOpsUseCaseData'

function BrowserFrame(): React.ReactElement {
  return (
    <div className="rounded-xl border border-light bg-white shadow-[0_12px_32px_rgba(19,15,30,0.06)] overflow-hidden">
      <div className="flex items-center gap-2 h-8 px-4 border-b border-light">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
      </div>
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

export function UseCaseHero({ data }: { data: UseCaseHeroData }): React.ReactElement {
  return (
    <section className="bg-bg pt-12 pb-20">
      <div className="mx-auto max-w-container px-6 md:px-12">
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center gap-1 font-body text-[13px] text-muted">
          <span>{data.breadcrumbParent}</span>
          <span>/</span>
          <span className="text-body">{data.breadcrumbCurrent}</span>
        </nav>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[55%_45%] lg:gap-16">
          {/* Text */}
          <div>
            <span className="inline-block rounded-2xl bg-light px-3 py-1 font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
              {data.badge}
            </span>

            <h1 className="mt-4 max-w-[560px] font-heading text-h1 font-bold leading-[1.15] tracking-[-0.02em] text-dark">
              {data.heading}
            </h1>

            <p className="mt-5 max-w-[480px] font-body text-[17px] leading-[1.7] text-body">
              {data.description}
            </p>

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
          </div>

          {/* Image */}
          <div>
            <BrowserFrame />
          </div>
        </div>
      </div>
    </section>
  )
}
