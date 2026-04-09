import React from 'react'
import Link from 'next/link'

export function EnterpriseBanner(): React.ReactElement {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-container px-6 md:px-12">
        <div className="flex flex-col items-start gap-8 rounded-2xl bg-dark p-10 md:flex-row md:items-center md:p-12">
          {/* Text */}
          <div className="flex-[0.7]">
            <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-accent">
              Enterprise
            </span>
            <h2 className="mt-2 font-heading text-2xl font-bold text-white">
              Need more? Let&apos;s talk.
            </h2>
            <p className="mt-3 max-w-[480px] font-body text-sm leading-[1.6] text-white/55">
              Custom plans with SSO, SCIM, dedicated onboarding, SLA, white-label, and
              priority support for teams of 20+.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-[0.3] flex-col items-start md:items-end">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border-[1.5px] border-white/30 bg-transparent px-6 py-3.5 font-body text-sm font-semibold text-white transition-colors hover:border-white focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-dark"
            >
              Contact sales
            </Link>
            <p className="mt-3 font-body text-xs text-white/40">
              or email sales@revnator.com
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
