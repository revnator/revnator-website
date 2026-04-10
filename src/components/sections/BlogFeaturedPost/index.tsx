import React from 'react'
import Link from 'next/link'
import { ImageIcon } from 'lucide-react'
import type { BlogPostCard } from '../_blog/types'

export function BlogFeaturedPost({ post }: { post: BlogPostCard }): React.ReactElement {
  return (
    <section className="bg-bg pt-8 pb-8">
      <div className="mx-auto max-w-container px-6 md:px-12">
        <Link
          href={`/blog/${post.slug}`}
          className="group flex flex-col overflow-hidden rounded-2xl border border-light bg-white transition-shadow hover:shadow-[0_8px_24px_rgba(19,15,30,0.08)] md:flex-row"
        >
          {/* Thumbnail */}
          {post.featuredImage ? (
            <div className="md:w-[55%] overflow-hidden">
              <img
                src={post.featuredImage.url}
                alt={post.featuredImage.alt}
                className="w-full h-full object-cover aspect-[16/10]"
              />
            </div>
          ) : (
            <div className="flex aspect-[16/10] items-center justify-center bg-light md:w-[55%]">
              <ImageIcon size={48} className="text-muted" />
            </div>
          )}

          {/* Text */}
          <div className="flex flex-col justify-center p-8 md:w-[45%]">
            <span className="inline-block w-fit rounded-full bg-light px-3 py-1 font-heading text-[11px] font-semibold uppercase text-primary">
              {post.category}
            </span>
            <h2 className="mt-4 font-heading text-2xl font-bold leading-[1.25] text-dark">
              {post.title}
            </h2>
            <p className="mt-3 line-clamp-3 font-body text-sm leading-[1.7] text-body">
              {post.excerpt}
            </p>
            <p className="mt-4 font-body text-xs text-muted">
              {post.date} &middot; {post.readTime}
            </p>
            <span className="mt-4 font-body text-sm font-medium text-primary">
              Read article &rarr;
            </span>
          </div>
        </Link>
      </div>
    </section>
  )
}
