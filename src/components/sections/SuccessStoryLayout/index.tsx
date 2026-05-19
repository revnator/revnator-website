import React from 'react'
import Link from 'next/link'
import type { SuccessStory } from '@/payload-types'
import { getImageUrl, getImageAlt } from '@/lib/getImageUrl'

export function SuccessStoryLayout({
  resource,
}: {
  resource: SuccessStory
}): React.ReactElement {
  const imageUrl = getImageUrl(resource.featuredImage, 'blogFeatured')

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-prose-wide px-6 pb-20 pt-16 md:px-12">
        {/* Featured image */}
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={getImageAlt(resource.featuredImage, resource.title)}
            className="mb-8 w-full rounded-xl border border-light"
          />
        ) : null}

        {/* Customer hero card */}
        <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-dark p-8 md:p-10">
          <div className="flex flex-col items-start gap-8 md:flex-row md:gap-10">
            {/* Logo */}
            <div className="flex-shrink-0 md:w-[40%]">
              <div className="inline-block rounded-lg bg-white/10 px-6 py-3 font-heading text-base font-bold text-white">
                {resource.company}
              </div>
            </div>
            {/* Quote */}
            {resource.quote && (
              <div className="md:w-[60%]">
                <p className="font-heading text-[22px] leading-[1.4] text-white">
                  &ldquo;{resource.quote.text}&rdquo;
                </p>
                <p className="mt-4 font-body text-sm text-white/60">
                  {resource.quote.author}, {resource.quote.title}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Snapshot row */}
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {resource.snapshot.map((item) => (
            <div key={item.id} className="rounded-xl bg-bg p-4">
              <p className="font-body text-xs text-muted">{item.label}</p>
              <p className="mt-1 font-body text-sm font-semibold text-dark">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Q&A body */}
        <div className="mt-12 flex flex-col gap-8">
          {resource.qa.map((pair, i) => (
            <React.Fragment key={pair.id}>
              <div>
                <h2 className="font-heading text-lg font-semibold text-dark">
                  {pair.question}
                </h2>
                <p className="mt-3 font-body text-base leading-[1.8] text-body">
                  {pair.answer}
                </p>
              </div>

              {/* Callout metric between Q3 and Q4 */}
              {i === 2 && resource.calloutMetric && (
                <div className="rounded-xl bg-bg p-6 text-center">
                  <p className="font-heading text-[32px] font-extrabold text-accent">
                    {resource.calloutMetric.value}
                  </p>
                  <p className="mt-1 font-body text-sm text-muted">
                    {resource.calloutMetric.context}
                  </p>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="font-heading text-xl font-bold text-dark">
            Get results like {resource.company}
          </p>
          <Link
            href="/get-started"
            className="mt-4 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3.5 font-body text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:scale-[1.02] focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Start free trial
          </Link>
        </div>
      </div>
    </main>
  )
}
