'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/ui'

export interface NewsCard {
  id: number
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
}

function NewsCardItem({ item }: { item: NewsCard }): React.ReactElement {
  return (
    <Link
      href={`/news/${item.slug}`}
      className="group flex flex-col rounded-2xl border border-light bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(19,15,30,0.08)]"
    >
      {/* Top row: date + category */}
      <div className="flex items-center justify-between">
        <span className="font-body text-xs text-muted">{item.date}</span>
        <span className="rounded-full bg-light px-2.5 py-0.5 font-heading text-[10px] font-semibold uppercase text-primary">
          {item.category}
        </span>
      </div>

      {/* Title */}
      <h3 className="mt-4 line-clamp-3 font-heading text-lg font-semibold leading-[1.3] text-dark">
        {item.title}
      </h3>

      {/* Excerpt */}
      <p className="mt-3 line-clamp-3 font-body text-sm leading-[1.6] text-body">
        {item.excerpt}
      </p>

      {/* Read more */}
      <span className="mt-4 font-body text-[13px] font-medium text-primary">
        Read more &rarr;
      </span>
    </Link>
  )
}

export function NewsListingClient({
  items,
  categories,
}: {
  items: NewsCard[]
  categories: string[]
}): React.ReactElement {
  const [activeFilter, setActiveFilter] = useState('All')

  const filteredItems = useMemo(
    () =>
      activeFilter === 'All'
        ? items
        : items.filter((n) => n.category === activeFilter),
    [items, activeFilter],
  )

  return (
    <section className="bg-bg pb-20">
      <div className="mx-auto max-w-container px-6 md:px-12">
        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 pb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              className={cn(
                'rounded-lg px-4 py-2 font-body text-[13px] font-medium transition-colors',
                activeFilter === cat
                  ? 'bg-primary text-white'
                  : 'border border-light bg-transparent text-body hover:bg-light/50',
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <NewsCardItem key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center font-body text-sm text-muted">
            No news in this category yet.
          </p>
        )}

        {/* Pagination (visual only) */}
        <div className="mt-12 flex items-center justify-center gap-2">
          <span className="font-body text-sm font-medium text-muted">&larr; Previous</span>
          <div className="flex items-center gap-1 px-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-body text-sm font-medium text-white">
              1
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full font-body text-sm text-muted">
              2
            </span>
          </div>
          <span className="font-body text-sm font-medium text-muted">Next &rarr;</span>
        </div>
      </div>
    </section>
  )
}
