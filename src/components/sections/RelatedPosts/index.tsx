import React from 'react'
import Link from 'next/link'
import { ImageIcon } from 'lucide-react'
import type { BlogPostCard } from '../_blog/types'

export function RelatedPosts({
  posts,
}: {
  posts: BlogPostCard[]
}): React.ReactElement {
  return (
    <section className="bg-bg py-20">
      <div className="mx-auto max-w-container px-6 md:px-12">
        <h2 className="font-heading text-2xl font-bold text-dark">
          Related articles
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
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
          ))}
        </div>
      </div>
    </section>
  )
}
