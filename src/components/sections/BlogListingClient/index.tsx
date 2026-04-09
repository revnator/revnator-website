'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { ImageIcon } from 'lucide-react'
import { cn } from '@/utilities/ui'
import {
  blogCategories,
  type BlogCategory,
  type BlogPost,
} from '../_blog/blogData'

function BlogCard({ post }: { post: BlogPost }): React.ReactElement {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-light bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(19,15,30,0.08)]"
    >
      {/* Thumbnail */}
      <div className="flex h-[200px] w-full items-center justify-center bg-light">
        <ImageIcon size={32} className="text-muted" />
      </div>

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

export function BlogListingClient({
  posts,
}: {
  posts: BlogPost[]
}): React.ReactElement {
  const [activeFilter, setActiveFilter] = useState<BlogCategory>('All')

  const filteredPosts = useMemo(
    () =>
      activeFilter === 'All'
        ? posts
        : posts.filter((p) => p.category === activeFilter),
    [posts, activeFilter],
  )

  return (
    <section className="bg-bg pt-6 pb-20">
      <div className="mx-auto max-w-container px-6 md:px-12">
        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 pb-8">
          {blogCategories.map((cat) => (
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
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center font-body text-sm text-muted">
            No posts in this category yet.
          </p>
        )}

        {/* Pagination (visual only) */}
        <div className="mt-12 flex items-center justify-center gap-2">
          <span className="font-body text-sm font-medium text-muted">
            &larr; Previous
          </span>
          <div className="flex items-center gap-1 px-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-body text-sm font-medium text-white">
              1
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full font-body text-sm text-muted">
              2
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full font-body text-sm text-muted">
              3
            </span>
          </div>
          <span className="font-body text-sm font-medium text-muted">
            Next &rarr;
          </span>
        </div>
      </div>
    </section>
  )
}
