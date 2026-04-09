'use client'

import React from 'react'
import Link from 'next/link'
import { DynamicIcon } from '@/lib/icons'
import type { Header as HeaderType } from '@/payload-types'

type UseCaseItem = NonNullable<HeaderType['useCasesItems']>[number]
type IndustryItem = NonNullable<HeaderType['industriesItems']>[number]
type FeaturedCaseStudy = NonNullable<HeaderType['featuredCaseStudy']>
type FooterLinkType = NonNullable<HeaderType['footerLink']>

interface SalesOSDropdownProps {
  useCasesLabel: string
  useCasesItems: UseCaseItem[]
  industriesLabel: string
  industriesItems: IndustryItem[]
  featuredCaseStudy?: FeaturedCaseStudy
  footerLink?: FooterLinkType
}

export function SalesOSDropdown({
  useCasesLabel,
  useCasesItems,
  industriesLabel,
  industriesItems,
  featuredCaseStudy,
  footerLink,
}: SalesOSDropdownProps): React.ReactElement {
  return (
    <div>
      {/* 3-column layout */}
      <div className="flex gap-6">
        {/* Column 1 — Use Cases */}
        <div className="w-[180px]">
          <span className="block font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-muted mb-4">
            {useCasesLabel}
          </span>
          <div className="flex flex-col">
            {useCasesItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-md px-1 py-2 font-body text-sm font-medium text-dark transition-colors duration-150 hover:bg-bg"
                role="menuitem"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Column 2 — Industries */}
        <div className="w-[180px]">
          <span className="block font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-muted mb-4">
            {industriesLabel}
          </span>
          <div className="flex flex-col">
            {industriesItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-md px-1 py-2 font-body text-sm font-medium text-dark transition-colors duration-150 hover:bg-bg"
                role="menuitem"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Column 3 — Featured case study tile */}
        {featuredCaseStudy && (
          <div className="w-[220px] flex-shrink-0">
            <Link
              href={featuredCaseStudy.href ?? '#'}
              className="block rounded-xl bg-bg p-3 transition-colors duration-150 hover:bg-light/50"
              role="menuitem"
            >
              {/* Thumbnail */}
              <div className="flex h-[110px] w-full items-center justify-center rounded-lg bg-light">
                <DynamicIcon
                  name={featuredCaseStudy.icon ?? 'Trophy'}
                  size={28}
                  className="text-primary/60"
                />
              </div>

              {/* Type tag */}
              <span className="mt-3 inline-block rounded-2xl bg-light px-2.5 py-1 font-heading text-[10px] font-semibold uppercase text-primary">
                {featuredCaseStudy.typeLabel ?? 'CASE STUDY'}
              </span>

              {/* Title */}
              <span className="mt-2 block line-clamp-2 font-heading text-[13px] font-semibold leading-[1.3] text-dark">
                {featuredCaseStudy.title}
              </span>

              {/* Link label */}
              <span className="mt-2 block font-body text-xs font-medium text-primary">
                Read story &rarr;
              </span>
            </Link>
          </div>
        )}
      </div>

      {/* Footer link */}
      {footerLink && (
        <div className="mt-5 border-t border-light pt-4">
          <Link
            href={footerLink.href ?? '/why-revnator'}
            className="block font-body text-sm font-medium text-primary hover:underline"
            role="menuitem"
          >
            {footerLink.text ?? 'Why Revnator'} &rarr;
          </Link>
        </div>
      )}
    </div>
  )
}
