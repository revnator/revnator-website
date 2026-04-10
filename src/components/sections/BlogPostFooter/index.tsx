import React from 'react'
import Link from 'next/link'
import type { BlogPostCard } from '../_blog/types'

export function BlogPostFooter({ post }: { post: BlogPostCard }): React.ReactElement {
  return (
    <section className="bg-white pt-12">
      <div className="mx-auto max-w-prose-narrow border-t border-light px-6 md:px-12">
        {/* Tags */}
        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-bg px-2.5 py-1 font-body text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Author card */}
        <div className="mt-8 flex items-start gap-4 rounded-2xl bg-bg p-6">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-light font-heading text-sm font-semibold text-primary">
            {post.author.initials}
          </div>
          <div>
            <p className="font-body text-base font-semibold text-dark">
              {post.author.name}
            </p>
            <p className="mt-1 font-body text-sm text-muted">
              {post.author.bio}
            </p>
            <Link
              href="/blog"
              className="mt-2 inline-block font-body text-[13px] font-medium text-primary hover:underline"
            >
              View all posts &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
