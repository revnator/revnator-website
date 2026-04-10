import React from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/ui'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { LegalDocData, LegalSidebarItem } from '@/app/(frontend)/legal/[slug]/page'
import type { LegalDocument } from '@/payload-types'

function LegalSidebar({
  docs,
  activeSlug,
}: {
  docs: LegalSidebarItem[]
  activeSlug: string
}): React.ReactElement {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 w-60">
        <span className="block font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
          Legal
        </span>

        <nav className="mt-4 flex flex-col">
          {docs.map((doc) => {
            const isActive = doc.slug === activeSlug
            return (
              <Link
                key={doc.slug}
                href={`/legal/${doc.slug}`}
                className={cn(
                  'flex h-9 items-center rounded-r-md px-3 font-body text-sm transition-colors',
                  isActive
                    ? 'border-l-[3px] border-primary bg-light pl-3 font-medium text-primary'
                    : 'text-body hover:bg-bg',
                )}
              >
                {doc.title}
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}

export function LegalDocLayout({
  doc,
  body,
  sidebarDocs,
}: {
  doc: LegalDocData
  body: LegalDocument['body']
  sidebarDocs: LegalSidebarItem[]
}): React.ReactElement {
  return (
    <section className="bg-white py-12 lg:py-20">
      <div className="mx-auto max-w-container px-6 md:px-12">
        <div className="flex gap-16">
          <LegalSidebar docs={sidebarDocs} activeSlug={doc.slug} />
          <div className="max-w-prose-narrow">
            {/* Breadcrumb */}
            <nav className="font-body text-[13px] text-muted">
              <Link href="/legal" className="text-primary hover:underline">
                Legal
              </Link>
              <span className="mx-1.5">/</span>
              <span>{doc.title}</span>
            </nav>

            {/* Title */}
            <h1 className="mt-4 font-heading text-[36px] font-bold text-dark">{doc.title}</h1>

            {/* Dates */}
            <p className="mt-2 font-body text-[13px] text-muted">
              Last updated: {doc.lastUpdated}
            </p>
            <p className="font-body text-[13px] text-muted">Effective: {doc.effectiveDate}</p>

            {/* Body */}
            <div className="blog-prose mt-8">
              <RichText data={body} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
