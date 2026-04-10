import React from 'react'
import Link from 'next/link'
import type { Whitepaper } from '@/payload-types'
import { getImageUrl, getImageAlt } from '@/lib/getImageUrl'
import { LeadCaptureForm } from '../LeadCaptureForm'

export function WhitepaperLayout({
  resource,
}: {
  resource: Whitepaper
}): React.ReactElement {
  const imageUrl = getImageUrl(resource.featuredImage, 'blogFeatured')

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-container px-6 pb-20 pt-16 md:px-12">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-[55%_45%]">
          {/* Left column */}
          <div>
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1 font-body text-[13px] text-muted">
              <Link href="/resources" className="text-primary hover:underline">
                Resources
              </Link>
              <span>/</span>
              <span>Whitepapers</span>
              <span>/</span>
              <span className="text-body">{resource.title}</span>
            </nav>

            {/* Badge */}
            <span className="mt-4 inline-block rounded-full bg-light px-3 py-1 font-heading text-[11px] font-semibold uppercase text-primary">
              Whitepaper
            </span>

            {/* Title */}
            <h1 className="mt-4 font-heading text-h2 font-bold leading-[1.2] text-dark">
              {resource.title}
            </h1>

            {/* Subtitle */}
            <p className="mt-2 font-body text-sm font-medium text-muted">
              {resource.subtitle}
            </p>

            {/* Description */}
            <p className="mt-5 font-body text-base leading-[1.7] text-body">
              {resource.description}
            </p>

            {/* Featured image */}
            {imageUrl ? (
              <div className="mt-6">
                <img
                  src={imageUrl}
                  alt={getImageAlt(resource.featuredImage, resource.title)}
                  className="w-full rounded-xl border border-light"
                />
              </div>
            ) : null}

            {/* Key findings */}
            <div className="mt-8 rounded-2xl bg-bg p-6">
              <h2 className="font-heading text-base font-semibold text-dark">
                Key findings
              </h2>
              <div className="mt-4 flex flex-col divide-y divide-light">
                {resource.keyFindings.map((finding) => (
                  <div
                    key={finding.id}
                    className="flex items-baseline gap-4 py-3"
                  >
                    <span className="font-heading text-2xl font-bold text-primary">
                      {finding.value}
                    </span>
                    <span className="font-body text-sm text-body">
                      {finding.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* What's covered */}
            <div className="mt-8">
              <h2 className="font-heading text-base font-semibold text-dark">
                What&apos;s covered
              </h2>
              <ol className="mt-4 flex flex-col gap-2 pl-5 font-body text-sm text-body list-decimal">
                {resource.contents.map((item) => (
                  <li key={item.id}>{item.title}</li>
                ))}
              </ol>
            </div>
          </div>

          {/* Right column */}
          <div className="lg:sticky lg:top-24">
            <LeadCaptureForm
              variant="full"
              title="Download the full report"
              buttonText="Download report"
              resourceType="whitepaper"
              resourceSlug={resource.slug}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
