import React from 'react'
import Link from 'next/link'
import { ImageIcon } from 'lucide-react'
import type { NewsArticleHeaderData } from '@/app/(frontend)/news/[slug]/page'

export function NewsArticleHeader({ data }: { data: NewsArticleHeaderData }): React.ReactElement {
  return (
    <section className="bg-white pt-16">
      <div className="mx-auto max-w-prose-narrow px-6 md:px-12">
        {/* Breadcrumb */}
        <nav className="font-body text-[13px] text-muted">
          <Link href="/news" className="text-primary hover:underline">
            News
          </Link>
          <span className="mx-1.5">/</span>
          <span>{data.category}</span>
        </nav>

        {/* Category tag */}
        <span className="mt-4 inline-block rounded-full bg-light px-3 py-1 font-heading text-[11px] font-semibold uppercase text-primary">
          {data.category}
        </span>

        {/* Title */}
        <h1 className="mt-4 font-heading text-[36px] font-bold leading-[1.2] text-dark">
          {data.title}
        </h1>

        {/* Meta row */}
        <div className="mt-6 flex items-center gap-2 font-body text-sm">
          <span className="text-body">{data.date}</span>
          <span className="text-muted">&middot;</span>
          <span className="text-muted">By {data.authorName}</span>
        </div>

        {/* Featured image */}
        {data.featuredImage ? (
          <img
            src={data.featuredImage.url}
            alt={data.featuredImage.alt}
            className="mt-8 w-full rounded-xl border border-light object-cover aspect-video"
          />
        ) : (
          <div className="mt-8 flex aspect-video items-center justify-center rounded-xl bg-light">
            <ImageIcon size={40} className="text-muted" />
          </div>
        )}
      </div>
    </section>
  )
}
