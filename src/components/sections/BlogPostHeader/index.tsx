import React from 'react'
import Link from 'next/link'
import { ImageIcon } from 'lucide-react'
import type { BlogPostCard } from '../_blog/types'

export function BlogPostHeader({ post }: { post: BlogPostCard }): React.ReactElement {
  return (
    <section className="bg-white pt-16">
      <div className="mx-auto max-w-prose-narrow px-6 md:px-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 font-body text-[13px] text-muted">
          <Link href="/blog" className="text-primary hover:underline">
            Blog
          </Link>
          <span>/</span>
          <span>{post.category}</span>
        </nav>

        {/* Category tag */}
        <span className="mt-4 inline-block rounded-full bg-light px-3 py-1 font-heading text-[11px] font-semibold uppercase text-primary">
          {post.category}
        </span>

        {/* Title */}
        <h1 className="mt-4 font-heading text-[36px] font-bold leading-[1.2] text-dark">
          {post.title}
        </h1>

        {/* Meta row */}
        <div className="mt-6 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-light font-heading text-xs font-semibold text-primary">
            {post.author.initials}
          </div>
          <span className="font-body text-sm font-medium text-dark">
            {post.author.name}
          </span>
          <span className="text-muted">&middot;</span>
          <span className="font-body text-sm text-muted">{post.date}</span>
          <span className="text-muted">&middot;</span>
          <span className="font-body text-sm text-muted">{post.readTime}</span>
        </div>

        {/* Featured image placeholder */}
        <div className="mt-8 flex aspect-[16/9] w-full items-center justify-center rounded-xl bg-light">
          <ImageIcon size={48} className="text-muted" />
        </div>
      </div>
    </section>
  )
}
