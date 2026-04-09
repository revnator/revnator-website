import React from 'react'
import Link from 'next/link'
import { Check, Play } from 'lucide-react'
import type { WebinarResource } from '../_resources/resourcesData'
import { LeadCaptureForm } from '../LeadCaptureForm'

export function WebinarLayout({
  resource,
}: {
  resource: WebinarResource
}): React.ReactElement {
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-container px-6 pb-20 pt-16 md:px-12">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[60%_40%]">
          {/* Left column */}
          <div>
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1 font-body text-[13px] text-muted">
              <Link href="/resources" className="text-primary hover:underline">
                Resources
              </Link>
              <span>/</span>
              <span>Webinars</span>
              <span>/</span>
              <span className="text-body">{resource.title}</span>
            </nav>

            {/* Badge */}
            {resource.isUpcoming ? (
              <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent/[0.12] px-3 py-1 font-heading text-[11px] font-semibold uppercase text-accent">
                <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
                Live Webinar
              </span>
            ) : (
              <span className="mt-4 inline-block rounded-full bg-bg px-3 py-1 font-heading text-[11px] font-semibold uppercase text-muted">
                Recorded
              </span>
            )}

            {/* Title */}
            <h1 className="mt-4 font-heading text-h2 font-bold leading-[1.2] text-dark">
              {resource.title}
            </h1>

            {/* Date / duration */}
            {resource.isUpcoming ? (
              <p className="mt-3 font-body text-base font-medium text-primary">
                {resource.date} &middot; {resource.time} &middot;{' '}
                {resource.duration}
              </p>
            ) : (
              <p className="mt-3 font-body text-sm text-muted">
                {resource.duration} recording
              </p>
            )}

            {/* Description */}
            <p className="mt-4 font-body text-base leading-[1.7] text-body">
              {resource.description}
            </p>

            {/* Speakers */}
            <div className="mt-8 flex flex-col gap-3">
              {resource.speakers.map((speaker) => (
                <div
                  key={speaker.name}
                  className="flex items-center gap-3 rounded-xl bg-bg p-4"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-light font-heading text-sm font-semibold text-primary">
                    {speaker.initials}
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold text-dark">
                      {speaker.name}
                    </p>
                    <p className="font-body text-[13px] text-muted">
                      {speaker.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* What you'll learn */}
            <div className="mt-8">
              <h2 className="font-heading text-base font-semibold text-dark">
                What you&apos;ll learn
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {resource.learnings.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check
                      size={18}
                      className="mt-0.5 flex-shrink-0 text-accent"
                    />
                    <span className="font-body text-sm text-body">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right column */}
          <div className="lg:sticky lg:top-24">
            {resource.isUpcoming ? (
              <>
                <LeadCaptureForm
                  variant="webinar"
                  title="Reserve your spot"
                  buttonText="Register free"
                />
                {resource.registeredCount && (
                  <p className="mt-3 text-center font-body text-xs text-muted">
                    {resource.registeredCount} people registered
                  </p>
                )}
              </>
            ) : (
              <>
                {/* Video player placeholder */}
                <div className="group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl bg-dark">
                  <button
                    type="button"
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 transition-colors group-hover:bg-white/30"
                  >
                    <Play size={32} className="ml-1 text-white" />
                  </button>
                </div>
                <p className="mt-4 text-center font-body text-[13px] text-muted">
                  Watch the full recording — no signup required
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
