import React from 'react'
import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import type { Ebook } from '@/payload-types'
import { getImageUrl, getImageAlt } from '@/lib/getImageUrl'
import { LeadCaptureForm } from '../LeadCaptureForm'

export function EbookLayout({
  resource,
}: {
  resource: Ebook
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
              <span>Ebooks</span>
              <span>/</span>
              <span className="text-body">{resource.title}</span>
            </nav>

            {/* Badge */}
            <span className="mt-4 inline-block rounded-full bg-light px-3 py-1 font-heading text-[11px] font-semibold uppercase text-primary">
              Ebook
            </span>

            {/* Title */}
            <h1 className="mt-4 font-heading text-h2 font-bold leading-[1.2] text-dark">
              {resource.title}
            </h1>

            {/* Meta */}
            <p className="mt-3 font-body text-sm text-muted">
              By Revnator Team &middot; {resource.pages} pages &middot;{' '}
              {resource.readTime}
            </p>

            {/* Description */}
            <p className="mt-6 font-body text-base leading-[1.7] text-body">
              {resource.bodyIntro}
            </p>

            {/* Featured image or 3D Book mockup fallback */}
            {imageUrl ? (
              <div className="mt-8">
                <img
                  src={imageUrl}
                  alt={getImageAlt(resource.featuredImage, resource.title)}
                  className="w-full rounded-xl border border-light"
                />
              </div>
            ) : (
              <div className="mt-8 flex h-60 items-center justify-center">
                <div
                  className="flex h-60 w-[180px] flex-col items-center justify-center rounded-r-md bg-primary p-6 text-center shadow-[20px_20px_40px_rgba(110,51,177,0.3)]"
                  style={{
                    transform: 'perspective(1000px) rotateY(-15deg)',
                  }}
                >
                  <div className="absolute inset-0 overflow-hidden rounded-r-md opacity-10">
                    <div className="absolute -left-4 top-8 h-px w-48 rotate-[30deg] bg-white" />
                    <div className="absolute -left-4 top-20 h-px w-48 rotate-[30deg] bg-white" />
                    <div className="absolute -left-4 top-32 h-px w-48 rotate-[30deg] bg-white" />
                  </div>
                  <span className="relative font-heading text-base font-bold leading-tight text-white">
                    {resource.title.split(':')[0]}
                  </span>
                </div>
              </div>
            )}

            {/* What's inside */}
            <div className="mt-10">
              <h2 className="font-heading text-base font-semibold text-dark">
                What&apos;s inside
              </h2>
              <div className="mt-4 flex flex-col gap-2.5">
                {resource.chapters.map((ch) => (
                  <div key={ch.id} className="flex items-start gap-2.5">
                    <BookOpen
                      size={18}
                      className="mt-0.5 flex-shrink-0 text-primary"
                    />
                    <span className="font-body text-sm text-body">{ch.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="lg:sticky lg:top-24">
            <LeadCaptureForm
              variant="full"
              title="Get your free copy"
              buttonText="Download now"
            />
          </div>
        </div>
      </div>
    </main>
  )
}
