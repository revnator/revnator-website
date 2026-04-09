import React from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/ui'
import { legalDocs, type LegalDoc, type LegalBlock } from '../_legal/legalData'

function LegalSidebar({ activeSlug }: { activeSlug: string }): React.ReactElement {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 w-60">
        <span className="block font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
          Legal
        </span>

        <nav className="mt-4 flex flex-col">
          {legalDocs.map((doc) => {
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

function BlockRenderer({ block }: { block: LegalBlock }): React.ReactElement {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className="mb-4 font-body text-[15px] leading-[1.8] text-body">{block.text}</p>
      )
    case 'h3':
      return (
        <h3 className="mb-3 mt-6 font-heading text-[17px] font-semibold text-dark">
          {block.text}
        </h3>
      )
    case 'list': {
      const Tag = block.ordered ? 'ol' : 'ul'
      return (
        <Tag
          className={cn(
            'mb-4 space-y-1.5 pl-5 font-body text-[15px] leading-[1.8] text-body',
            block.ordered ? 'list-decimal' : 'list-disc',
          )}
        >
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </Tag>
      )
    }
  }
}

function LegalContent({ doc }: { doc: LegalDoc }): React.ReactElement {
  return (
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
      <div className="mt-8">
        {doc.isPlaceholder ? (
          <p className="font-body text-[15px] leading-[1.8] text-body">
            This document is being finalized. Please check back soon or contact{' '}
            <a href="mailto:legal@revnator.com" className="text-primary hover:underline">
              legal@revnator.com
            </a>{' '}
            for the current version.
          </p>
        ) : (
          doc.sections.map((section) => (
            <div key={section.id} id={section.id}>
              <h2 className="mb-4 mt-8 font-heading text-[22px] font-bold text-dark first:mt-0">
                {section.heading}
              </h2>
              {section.content.map((block, i) => (
                <BlockRenderer key={i} block={block} />
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export function LegalDocLayout({ doc }: { doc: LegalDoc }): React.ReactElement {
  return (
    <section className="bg-white py-12 lg:py-20">
      <div className="mx-auto max-w-container px-6 md:px-12">
        <div className="flex gap-16">
          <LegalSidebar activeSlug={doc.slug} />
          <LegalContent doc={doc} />
        </div>
      </div>
    </section>
  )
}
