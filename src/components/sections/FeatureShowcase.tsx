import React from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { cn } from '@/utilities/ui'

function PlaceholderFrame({ bgClass }: { bgClass: string }): React.ReactElement {
  return (
    <div
      className={cn(
        'rounded-xl border border-light shadow-[0_12px_32px_rgba(19,15,30,0.06)] overflow-hidden',
        bgClass,
      )}
    >
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
          <div className="flex-1 h-14 rounded-lg bg-light/60" />
          <div className="flex-1 h-14 rounded-lg bg-light/60" />
        </div>
        <div className="flex-1 rounded-lg bg-light/40 p-3 flex flex-col gap-2">
          {[1, 2, 3].map((row) => (
            <div key={row} className="flex gap-3">
              <div className="h-2.5 w-28 rounded bg-light/70" />
              <div className="h-2.5 w-20 rounded bg-light/70" />
              <div className="ml-auto h-2.5 w-10 rounded bg-light/70" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export interface FeatureShowcaseData {
  label: string
  heading: string
  description: string
  bullets: string[]
  linkLabel: string
  linkHref: string
  reverse?: boolean
  imageUrl?: string | null
  imageAlt?: string
  bgClass?: string
  frameBgClass?: string
}

export function FeatureShowcase({ data }: { data: FeatureShowcaseData }): React.ReactElement {
  const bgClass = data.bgClass || 'bg-white'
  const frameBgClass = data.frameBgClass || 'bg-bg'
  const reverse = data.reverse ?? false

  return (
    <section className={cn('w-full py-24', bgClass)}>
      <div className="mx-auto max-w-container px-6">
        <div
          className={cn(
            'grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-16',
            reverse && 'md:[direction:rtl]',
          )}
        >
          {/* Text column */}
          <div className={cn(reverse && 'md:[direction:ltr]')}>
            <span className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-primary">
              {data.label}
            </span>
            <h2 className="mt-4 font-heading text-[28px] font-bold leading-[1.2] text-dark">
              {data.heading}
            </h2>
            <p className="mt-4 max-w-[480px] font-body text-base leading-[1.7] text-body">
              {data.description}
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {data.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <Check size={18} className="mt-0.5 flex-shrink-0 text-accent" />
                  <span className="font-body text-sm text-body">{bullet}</span>
                </li>
              ))}
            </ul>
            <Link
              href={data.linkHref}
              className="mt-6 inline-block font-body text-sm font-medium text-primary"
            >
              {data.linkLabel} →
            </Link>
          </div>

          {/* Image column */}
          <div className={cn(reverse && 'md:[direction:ltr]')}>
            {data.imageUrl ? (
              <img
                src={data.imageUrl}
                alt={data.imageAlt || data.heading}
                className="rounded-xl border border-light shadow-[0_12px_32px_rgba(19,15,30,0.06)]"
              />
            ) : (
              <PlaceholderFrame bgClass={frameBgClass} />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
