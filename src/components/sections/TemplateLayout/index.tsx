import React from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'
import type { Template } from '@/payload-types'
import { getImageUrl, getImageAlt } from '@/lib/getImageUrl'
import { LeadCaptureForm } from '../LeadCaptureForm'

export function TemplateLayout({
  resource,
}: {
  resource: Template
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
              <span>Templates</span>
              <span>/</span>
              <span className="text-body">{resource.title}</span>
            </nav>

            {/* Badge */}
            <span className="mt-4 inline-block rounded-full bg-accent/[0.12] px-3 py-1 font-heading text-[11px] font-semibold uppercase text-accent">
              Template
            </span>

            {/* Title */}
            <h1 className="mt-4 font-heading text-[28px] font-bold leading-[1.2] text-dark">
              {resource.title}
            </h1>

            {/* Use case */}
            <p className="mt-2 font-body text-sm text-muted">{resource.useCase}</p>

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

            {/* Code-style preview */}
            <div className="relative mt-8 overflow-hidden rounded-2xl bg-dark p-6">
              <pre className="font-mono text-[13px] leading-[1.7] text-light whitespace-pre-wrap">
                {resource.preview}
              </pre>
              {/* Fade gradient */}
              <div className="absolute inset-x-0 bottom-0 flex h-20 items-end justify-center bg-gradient-to-t from-dark to-transparent pb-3">
                <span className="font-body text-xs text-white/40">
                  Preview — download for full template
                </span>
              </div>
            </div>

            {/* What's included */}
            <div className="mt-8">
              <h2 className="font-heading text-base font-semibold text-dark">
                What&apos;s included
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {resource.included.map((item) => (
                  <li key={item.id} className="flex items-start gap-2.5">
                    <Check
                      size={18}
                      className="mt-0.5 flex-shrink-0 text-accent"
                    />
                    <span className="font-body text-sm text-body">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right column */}
          <div className="lg:sticky lg:top-24">
            <LeadCaptureForm
              variant="light"
              title="Get this template free"
              buttonText="Download template"
            />
          </div>
        </div>
      </div>
    </main>
  )
}
