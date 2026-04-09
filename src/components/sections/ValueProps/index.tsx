import React from 'react'
import { Zap, Target, Sparkles, Check } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { valueProps } from '../_why/whyData'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Zap,
  Target,
  Sparkles,
}

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

export function ValueProps(): React.ReactElement {
  return (
    <section className="bg-bg py-20">
      <div className="mx-auto max-w-container px-6 md:px-12">
        <div className="flex flex-col gap-16">
          {valueProps.map((block, i) => {
            const Icon = iconMap[block.icon]
            const reverse = i === 1

            return (
              <div
                key={block.heading}
                className={cn(
                  'grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16',
                  reverse && 'lg:[direction:rtl]',
                )}
              >
                {/* Text column */}
                <div className={cn(reverse && 'lg:[direction:ltr]')}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-light">
                    {Icon && <Icon size={24} className="text-primary" />}
                  </div>

                  <h3 className="mt-5 font-heading text-2xl font-bold text-dark">
                    {block.heading}
                  </h3>

                  <p className="mt-3 font-body text-base leading-[1.7] text-body">
                    {block.description}
                  </p>

                  <ul className="mt-5 flex flex-col gap-2.5">
                    {block.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2.5">
                        <Check size={18} className="mt-0.5 flex-shrink-0 text-accent" />
                        <span className="font-body text-sm text-body">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Image column */}
                <div className={cn(reverse && 'lg:[direction:ltr]')}>
                  <BrowserFrame />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
