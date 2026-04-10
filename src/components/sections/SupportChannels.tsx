import React from 'react'
import Link from 'next/link'
import { DynamicIcon } from '@/lib/icons'

export interface SupportChannelData {
  icon: string
  title: string
  description: string
  linkText: string
  href: string
}

export function SupportChannels({ channels }: { channels: SupportChannelData[] }): React.ReactElement {
  return (
    <section className="w-full bg-white py-20">
      <div className="mx-auto max-w-container px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {channels.map((ch) => (
            <div
              key={ch.title}
              className="rounded-2xl border border-light bg-bg p-8 text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-light">
                <DynamicIcon name={ch.icon} size={24} className="text-primary" />
              </div>
              <h3 className="mt-5 font-heading text-lg font-semibold text-dark">
                {ch.title}
              </h3>
              <p className="mt-2 font-body text-sm text-muted">
                {ch.description}
              </p>
              <Link
                href={ch.href}
                className="mt-4 inline-block font-body text-sm font-medium text-primary"
              >
                {ch.linkText} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
