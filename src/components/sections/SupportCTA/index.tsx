import React from 'react'
import Link from 'next/link'

export function SupportCTA(): React.ReactElement {
  return (
    <section className="border-t border-light bg-white py-16 pb-20">
      <div className="mx-auto max-w-container px-6 text-center md:px-12">
        <h2 className="font-heading text-[28px] font-bold text-dark tracking-[-0.01em]">
          Can&apos;t find what you need?
        </h2>
        <p className="mt-3 font-body text-base text-muted">
          Our support team is here to help.
        </p>
        <Link
          href="mailto:support@revnator.com"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-7 py-3.5 font-body text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:scale-[1.02] focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Contact our team
        </Link>
      </div>
    </section>
  )
}
