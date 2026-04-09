import React from 'react'
import { Check, Square } from 'lucide-react'
import { withoutTools, withCapabilities } from '../_why/whyData'

export function BeforeAfter(): React.ReactElement {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-container px-6 md:px-12">
        {/* Header */}
        <div className="text-center">
          <span className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-primary">
            The Solution
          </span>
          <h2 className="mt-4 font-heading text-h2 font-bold text-dark tracking-[-0.01em]">
            One platform. Zero friction.
          </h2>
        </div>

        {/* Comparison grid */}
        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* Without Revnator */}
          <div>
            <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-error">
              Without Revnator
            </span>
            <div className="mt-3 rounded-2xl border border-error/30 bg-white p-6">
              <div className="flex flex-col">
                {withoutTools.map((tool) => (
                  <div
                    key={tool.name}
                    className="flex items-center gap-3 border-b border-light py-2 last:border-b-0"
                  >
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded bg-bg">
                      <Square size={14} className="text-muted" />
                    </div>
                    <span className="flex-1 font-body text-sm text-body">
                      {tool.name}
                    </span>
                    <span className="font-body text-[13px] text-muted">
                      {tool.price}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 border-t border-light pt-4">
                <p className="font-heading text-base font-semibold text-error line-through">
                  Total: ~$250/user/month
                </p>
              </div>
            </div>
          </div>

          {/* With Revnator */}
          <div>
            <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">
              With Revnator
            </span>
            <div className="mt-3 rounded-2xl border border-accent/30 bg-white p-6">
              {/* Revnator icon */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <span className="font-heading text-base font-bold text-white">R</span>
              </div>

              <div className="mt-4 flex flex-col">
                {withCapabilities.map((cap) => (
                  <div
                    key={cap.text}
                    className="flex items-center gap-3 border-b border-light py-2 last:border-b-0"
                  >
                    <Check size={18} className="flex-shrink-0 text-accent" />
                    <span className="font-body text-sm text-body">{cap.text}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 border-t border-light pt-4">
                <p className="font-heading text-base font-semibold text-accent">
                  From $39/user/month
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Savings callout */}
        <p className="mt-12 text-center font-heading text-xl font-bold text-primary">
          Save up to 80% on your sales stack
        </p>
      </div>
    </section>
  )
}
