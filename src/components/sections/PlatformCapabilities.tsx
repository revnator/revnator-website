import React from 'react'
import Link from 'next/link'
import { capabilities } from './platformCapabilitiesData'

export function PlatformCapabilities(): React.ReactElement {
  return (
    <section className="w-full bg-bg py-24">
      <div className="mx-auto max-w-container px-6">
        {/* Header */}
        <div className="text-center">
          <span className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-primary">
            PLATFORM
          </span>
          <h2 className="mt-4 font-heading text-4xl font-bold text-dark">
            One platform. Every sales workflow.
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] font-body text-lg text-muted">
            Stop juggling five tools. Revnator unifies your entire sales operation.
          </p>
        </div>

        {/* Cards grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((card) => {
            const Icon = card.icon
            return (
              <div
                key={card.title}
                className="rounded-2xl border border-light bg-white p-8 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(110,51,177,0.08)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-light">
                  <Icon size={24} className="text-primary" />
                </div>
                <h3 className="mt-5 font-heading text-lg font-semibold text-dark">
                  {card.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-body">
                  {card.description}
                </p>
                <Link
                  href={card.href}
                  className="mt-5 inline-block font-body text-[13px] font-medium text-primary"
                >
                  Learn more →
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
