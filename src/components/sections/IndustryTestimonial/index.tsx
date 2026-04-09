import React from 'react'
import type { IndustryTestimonialData } from '../_industries/agenciesData'

export function IndustryTestimonial({
  data,
}: {
  data: IndustryTestimonialData
}): React.ReactElement {
  return (
    <section className="bg-dark py-20">
      <div className="mx-auto max-w-prose-narrow px-6 text-center md:px-12">
        {/* Decorative quote mark */}
        <span className="font-heading text-[60px] font-extrabold leading-none text-primary">
          &ldquo;
        </span>

        {/* Quote */}
        <p className="mt-2 font-heading text-2xl italic leading-[1.5] text-white">
          {data.quote}
        </p>

        {/* Author */}
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {/* Avatar */}
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-white/10">
            <span className="font-heading text-base font-semibold text-white">
              {data.authorInitials}
            </span>
          </div>

          <div className="text-center sm:text-left">
            <p className="font-heading text-base font-semibold text-white">{data.authorName}</p>
            <p className="mt-0.5 font-body text-sm text-white/55">{data.authorTitle}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
