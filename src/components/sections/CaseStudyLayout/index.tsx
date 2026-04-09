import React from 'react'
import Link from 'next/link'
import type { CaseStudyResource } from '../_resources/resourcesData'

export function CaseStudyLayout({
  resource,
}: {
  resource: CaseStudyResource
}): React.ReactElement {
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-prose-wide px-6 pb-20 pt-16 md:px-12">
        {/* Results banner */}
        <div className="rounded-2xl bg-dark p-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {resource.metrics.map((m) => (
              <div key={m.label} className="text-center">
                <p className="font-heading text-[36px] font-extrabold text-accent">
                  {m.value}
                </p>
                <p className="mt-1 font-body text-[13px] text-white/55">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Company info */}
        <div className="mt-12 flex items-center gap-4">
          <div className="flex h-12 w-20 items-center justify-center rounded-lg bg-light font-heading text-xs font-semibold text-muted">
            LOGO
          </div>
          <div>
            <p className="font-heading text-xl font-bold text-dark">
              {resource.company}
            </p>
            <span className="inline-block rounded-full bg-light px-3 py-0.5 font-heading text-[10px] font-semibold uppercase text-primary">
              {resource.industry}
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 className="mt-4 font-heading text-[28px] font-bold leading-[1.2] text-dark">
          {resource.title}
        </h1>

        {/* Sections */}
        <div className="mt-12 flex flex-col gap-12">
          {resource.sections.map((section) => (
            <div key={section.label}>
              <span className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                {section.label}
              </span>
              <h2 className="mt-3 font-heading text-xl font-bold text-dark">
                {section.heading}
              </h2>
              {section.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="mt-4 font-body text-base leading-[1.7] text-body"
                >
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="mt-12">
          <span className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-primary">
            Customer Quote
          </span>
          <blockquote className="mt-4 border-l-4 border-primary pl-6">
            <p className="font-heading text-[22px] leading-[1.4] text-dark">
              &ldquo;{resource.quote.text}&rdquo;
            </p>
            <p className="mt-4 font-body text-sm text-muted">
              {resource.quote.author}, {resource.quote.title}
            </p>
          </blockquote>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="font-heading text-xl font-bold text-dark">
            Get similar results for your team
          </p>
          <Link
            href="/signup"
            className="mt-4 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3.5 font-body text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:scale-[1.02] focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Start free trial
          </Link>
        </div>
      </div>
    </main>
  )
}
