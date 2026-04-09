import React from 'react'
import { Mail } from 'lucide-react'

export function NewsPressKit(): React.ReactElement {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-container px-6 md:px-12">
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[60fr_40fr]">
          {/* Left */}
          <div>
            <span className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-primary">
              For Journalists
            </span>
            <h2 className="mt-3 font-heading text-2xl font-bold text-dark">
              Looking for media assets?
            </h2>
            <p className="mt-3 font-body text-base leading-[1.7] text-body">
              Download our press kit including logos, product screenshots, founder photos, and
              brand guidelines.
            </p>
            <a
              href="#"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-white transition-colors hover:bg-primary-dark focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Download press kit
            </a>
          </div>

          {/* Right — Press contact card */}
          <div className="rounded-2xl bg-bg p-6">
            <h3 className="font-heading text-base font-semibold text-dark">Media inquiries</h3>
            <a
              href="mailto:press@revnator.com"
              className="mt-3 inline-flex items-center gap-2 font-body text-sm font-medium text-primary hover:underline"
            >
              <Mail size={16} />
              press@revnator.com
            </a>
            <p className="mt-2 font-body text-[13px] text-muted">
              We typically respond within 12 hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
