import React from 'react'
import Link from 'next/link'

export interface IntegrationData {
  name: string
  logoUrl?: string | null
}

export function Integrations({ integrations }: { integrations: IntegrationData[] }): React.ReactElement {
  return (
    <section className="w-full bg-white py-20">
      <div className="mx-auto max-w-container px-6">
        {/* Header */}
        <div className="text-center">
          <span className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-primary">
            INTEGRATIONS
          </span>
          <h2 className="mt-4 font-heading text-[28px] font-bold text-dark">
            Works with your existing stack
          </h2>
          <p className="mx-auto mt-3 font-body text-base text-muted">
            Connect Revnator with the tools you already use.
          </p>
        </div>

        {/* Logo grid */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {integrations.map((item) => (
            <div
              key={item.name}
              className="flex h-[60px] items-center justify-center rounded-xl border border-light bg-bg"
            >
              {item.logoUrl ? (
                <img src={item.logoUrl} alt={item.name} className="h-6 w-auto object-contain" />
              ) : (
                <span className="font-body text-[11px] font-medium text-muted">
                  {item.name}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* View all link */}
        <div className="mt-8 text-center">
          <Link
            href="/integrations"
            className="font-body text-sm font-medium text-primary"
          >
            View all integrations →
          </Link>
        </div>
      </div>
    </section>
  )
}
