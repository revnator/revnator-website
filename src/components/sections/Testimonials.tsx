import React from 'react'
import { Star } from 'lucide-react'

export interface TestimonialData {
  quote: string
  name: string
  title: string
  initials: string
  avatarUrl?: string | null
}

export function Testimonials({ testimonials }: { testimonials: TestimonialData[] }): React.ReactElement {
  return (
    <section className="w-full bg-bg py-24">
      <div className="mx-auto max-w-container px-6">
        {/* Header */}
        <div className="text-center">
          <span className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-primary">
            TESTIMONIALS
          </span>
          <h2 className="mt-4 font-heading text-[32px] font-bold text-dark">
            Loved by sales teams who ship
          </h2>
        </div>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-light bg-white p-7"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className="fill-warning text-warning"
                  />
                ))}
              </div>

              {/* Quote */}
              <div className="relative mt-4">
                <span
                  className="absolute -top-2 -left-1 font-heading text-[32px] leading-none text-light select-none"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <p className="pl-5 font-body text-[15px] leading-[1.7] text-body">
                  {t.quote}
                </p>
              </div>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3 border-t border-light pt-5">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-light overflow-hidden">
                  {t.avatarUrl ? (
                    <img src={t.avatarUrl} alt={t.name} className="h-full w-full object-cover" />
                  ) : (
                    <span className="font-body text-[13px] font-semibold text-primary">
                      {t.initials}
                    </span>
                  )}
                </div>
                <div>
                  <span className="block font-body text-sm font-semibold text-dark">
                    {t.name}
                  </span>
                  <span className="block font-body text-[13px] text-muted">
                    {t.title}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
