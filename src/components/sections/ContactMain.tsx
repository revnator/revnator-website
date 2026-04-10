import React from 'react'
import { DynamicIcon } from '@/lib/icons'

export interface ContactInfoBlockData {
  icon: string
  label: string
  text: string
}

export interface ContactMainData {
  formHeading: string
  subjectOptions: string[]
  infoBlocks: ContactInfoBlockData[]
}

export function ContactMain({ data }: { data: ContactMainData }): React.ReactElement {
  return (
    <section className="w-full bg-bg py-20">
      <div className="mx-auto max-w-container px-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-12">
          {/* Form */}
          <div className="rounded-2xl border border-light bg-white p-8">
            <h2 className="font-heading text-xl font-semibold text-dark">
              {data.formHeading}
            </h2>

            <form className="mt-6 flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-body text-sm font-medium text-dark mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-lg border border-light bg-bg px-4 py-3 font-body text-sm text-body placeholder:text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block font-body text-sm font-medium text-dark mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    className="w-full rounded-lg border border-light bg-bg px-4 py-3 font-body text-sm text-body placeholder:text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block font-body text-sm font-medium text-dark mb-1.5">
                  Subject
                </label>
                <select className="w-full rounded-lg border border-light bg-bg px-4 py-3 font-body text-sm text-body focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                  {data.subjectOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-body text-sm font-medium text-dark mb-1.5">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell us how we can help..."
                  className="w-full rounded-lg border border-light bg-bg px-4 py-3 font-body text-sm text-body placeholder:text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                />
              </div>

              <button
                type="submit"
                className="self-start rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-white transition-colors hover:bg-primary-dark focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Send message
              </button>
            </form>
          </div>

          {/* Info sidebar */}
          <div className="flex flex-col gap-6">
            {data.infoBlocks.map((block) => (
              <div key={block.label} className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-light">
                  <DynamicIcon name={block.icon} size={20} className="text-primary" />
                </div>
                <div>
                  <span className="block font-heading text-xs font-semibold uppercase tracking-[0.1em] text-primary">
                    {block.label}
                  </span>
                  <span className="mt-1 block font-body text-sm text-body">
                    {block.text}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
