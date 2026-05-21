'use client'

import React, { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ImageIcon } from 'lucide-react'
import { cn } from '@/utilities/ui'
import type { BlogPostCard } from '../_blog/types'

const POSTS_PER_PAGE = 12

function BlogCard({ post }: { post: BlogPostCard }): React.ReactElement {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-light bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(19,15,30,0.08)]"
    >
      {/* Thumbnail */}
      {post.featuredImage ? (
        <div className="h-[200px] w-full overflow-hidden">
          <img
            src={post.featuredImage.url}
            alt={post.featuredImage.alt}
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div className="flex h-[200px] w-full items-center justify-center bg-light">
          <ImageIcon size={32} className="text-muted" />
        </div>
      )}

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <span className="inline-block w-fit rounded-full bg-light px-3 py-0.5 font-heading text-[11px] font-semibold uppercase text-primary">
          {post.category}
        </span>
        <h3 className="mt-3 line-clamp-2 font-heading text-base font-semibold text-dark">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 font-body text-[13px] text-muted">
          {post.excerpt}
        </p>
        <p className="mt-3 font-body text-xs text-muted">
          {post.date} &middot; {post.readTime}
        </p>
      </div>
    </Link>
  )
}

/**
 * Builds the page-number sequence for the pagination control. Keeps the list
 * compact (first page, last page, and a window around the current page) and
 * inserts 'gap' markers where pages are omitted.
 */
function getPageNumbers(current: number, total: number): (number | 'gap')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const result: (number | 'gap')[] = [1]
  const showLeftGap = current > 4
  const showRightGap = current < total - 3

  const start = showLeftGap ? Math.max(2, current - 1) : 2
  const end = showRightGap ? Math.min(total - 1, current + 1) : total - 1

  if (showLeftGap) result.push('gap')
  for (let i = start; i <= end; i++) result.push(i)
  if (showRightGap) result.push('gap')
  result.push(total)

  return result
}

export function BlogListingClient({
  posts,
  categories,
}: {
  posts: BlogPostCard[]
  categories: string[]
}): React.ReactElement {
  const searchParams = useSearchParams()
  const [activeFilter, setActiveFilter] = useState('All')
  // Initialise from the ?page= query param so shared links land on the right page.
  const [currentPage, setCurrentPage] = useState(() => {
    const raw = parseInt(searchParams.get('page') ?? '1', 10)
    return Number.isFinite(raw) && raw > 0 ? raw : 1
  })

  const filteredPosts = useMemo(
    () =>
      activeFilter === 'All'
        ? posts
        : posts.filter((p) => p.category === activeFilter),
    [posts, activeFilter],
  )

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE))
  // Clamp in case the URL or a stale state points past the available pages.
  const safePage = Math.min(currentPage, totalPages)
  const startIndex = (safePage - 1) * POSTS_PER_PAGE
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE)

  // Reconcile state when the active page drifts past the last page
  // (e.g. landing on ?page=99 or filtering down to fewer results).
  useEffect(() => {
    if (currentPage !== safePage) setCurrentPage(safePage)
  }, [currentPage, safePage])

  /** Reflect the current page in the URL without triggering a server re-render. */
  const syncUrl = (page: number): void => {
    const url = new URL(window.location.href)
    if (page <= 1) url.searchParams.delete('page')
    else url.searchParams.set('page', String(page))
    window.history.replaceState(null, '', url.toString())
  }

  const goToPage = (page: number): void => {
    if (page < 1 || page > totalPages || page === safePage) return
    setCurrentPage(page)
    syncUrl(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleFilter = (cat: string): void => {
    if (cat === activeFilter) return
    setActiveFilter(cat)
    setCurrentPage(1) // reset to page 1 whenever the category changes
    syncUrl(1)
  }

  const pageNumbers = getPageNumbers(safePage, totalPages)

  return (
    <section className="bg-bg pt-6 pb-20">
      <div className="mx-auto max-w-container px-6 md:px-12">
        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 pb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleFilter(cat)}
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
        {paginatedPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center font-body text-sm text-muted">
            No posts in this category yet.
          </p>
        )}

        {/* Pagination */}
        {filteredPosts.length > 0 && totalPages > 1 && (
          <nav
            aria-label="Blog pagination"
            className="mt-12 flex items-center justify-center gap-2"
          >
            <button
              type="button"
              onClick={() => goToPage(safePage - 1)}
              disabled={safePage === 1}
              className={cn(
                'rounded-lg px-3 py-2 font-body text-sm font-medium transition-colors',
                safePage === 1
                  ? 'cursor-not-allowed text-muted/40'
                  : 'text-body hover:bg-light/50',
              )}
            >
              &larr; Previous
            </button>

            <div className="flex items-center gap-1 px-2">
              {pageNumbers.map((p, i) =>
                p === 'gap' ? (
                  <span
                    key={`gap-${i}`}
                    className="flex h-9 w-9 items-center justify-center font-body text-sm text-muted"
                  >
                    &hellip;
                  </span>
                ) : (
                  <button
                    key={p}
                    type="button"
                    onClick={() => goToPage(p)}
                    aria-current={p === safePage ? 'page' : undefined}
                    className={cn(
                      'flex h-9 w-9 items-center justify-center rounded-full font-body text-sm transition-colors',
                      p === safePage
                        ? 'bg-primary font-medium text-white'
                        : 'text-body hover:bg-light/50',
                    )}
                  >
                    {p}
                  </button>
                ),
              )}
            </div>

            <button
              type="button"
              onClick={() => goToPage(safePage + 1)}
              disabled={safePage === totalPages}
              className={cn(
                'rounded-lg px-3 py-2 font-body text-sm font-medium transition-colors',
                safePage === totalPages
                  ? 'cursor-not-allowed text-muted/40'
                  : 'text-body hover:bg-light/50',
              )}
            >
              Next &rarr;
            </button>
          </nav>
        )}
      </div>
    </section>
  )
}
