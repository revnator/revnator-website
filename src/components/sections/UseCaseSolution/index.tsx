import React from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/utilities/ui'
import type { UseCaseSolutionBlock } from '../_useCases/types'

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

export function UseCaseSolution({
  data,
  reverse = false,
}: {
  data: UseCaseSolutionBlock
  reverse?: boolean
}): React.ReactElement {
  const bgClass = reverse ? 'bg-white' : 'bg-bg'

  return (
    <section className={cn('py-20', bgClass)}>
      <div className="mx-auto max-w-container px-6 md:px-12">
        <div
          className={cn(
            'grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16',
            reverse && 'lg:[direction:rtl]',
          )}
        >
          {/* Text */}
          <div className={cn(reverse && 'lg:[direction:ltr]')}>
            <span className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-primary">
              {data.label}
            </span>

            <h2 className="mt-4 font-heading text-[28px] font-bold leading-[1.2] text-dark">
              {data.heading}
            </h2>

            <p className="mt-4 max-w-[460px] font-body text-base leading-[1.7] text-body">
              {data.description}
            </p>

            <ul className="mt-6 flex flex-col gap-2.5">
              {data.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2.5">
                  <Check size={18} className="mt-0.5 flex-shrink-0 text-accent" />
                  <span className="font-body text-sm text-body">{bullet}</span>
                </li>
              ))}
            </ul>

            {data.learnMoreHref && (
              <a
                href={data.learnMoreHref}
                className="mt-6 inline-block font-body text-sm font-medium text-primary hover:underline"
              >
                Learn more &rarr;
              </a>
            )}
          </div>

          {/* Image */}
          <div className={cn(reverse && 'lg:[direction:ltr]')}>
            {data.image ? (
              <img
                src={data.image.url}
                alt={data.image.alt}
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
