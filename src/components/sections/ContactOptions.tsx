import React from 'react'
import Link from 'next/link'
import { DynamicIcon } from '@/lib/icons'

export interface ContactOptionData {
  icon: string
  title: string
  linkLabel: string
  href: string
}

export function ContactOptions({ options }: { options: ContactOptionData[] }): React.ReactElement {
  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto max-w-container px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {options.map((opt) => (
            <div
              key={opt.title}
              className="rounded-2xl border border-light bg-bg p-8 text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-light">
                <DynamicIcon name={opt.icon} size={24} className="text-primary" />
              </div>
              <h3 className="mt-5 font-heading text-lg font-semibold text-dark">
                {opt.title}
              </h3>
              <Link
                href={opt.href}
                className="mt-2 inline-block font-body text-sm font-medium text-primary"
              >
                {opt.linkLabel}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
