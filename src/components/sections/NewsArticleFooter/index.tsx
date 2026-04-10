import React from 'react'
import Link from 'next/link'
import { Linkedin, Twitter, Link2 } from 'lucide-react'
import type { NewsCard } from '../NewsListingClient'

function ShareButton({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>
  label: string
}): React.ReactElement {
  return (
    <button
      type="button"
      className="flex h-9 w-9 items-center justify-center rounded-full border border-light bg-bg text-muted transition-colors hover:text-primary"
      aria-label={label}
    >
      <Icon size={16} />
    </button>
  )
}

function NewsCardItem({ item }: { item: NewsCard }): React.ReactElement {
  return (
    <Link
      href={`/news/${item.slug}`}
      className="group flex flex-col rounded-2xl border border-light bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(19,15,30,0.08)]"
    >
      <div className="flex items-center justify-between">
        <span className="font-body text-xs text-muted">{item.date}</span>
        <span className="rounded-full bg-light px-2.5 py-0.5 font-heading text-[10px] font-semibold uppercase text-primary">
          {item.category}
        </span>
      </div>
      <h3 className="mt-4 line-clamp-3 font-heading text-lg font-semibold leading-[1.3] text-dark">
        {item.title}
      </h3>
      <p className="mt-3 line-clamp-3 font-body text-sm leading-[1.6] text-body">
        {item.excerpt}
      </p>
      <span className="mt-4 font-body text-[13px] font-medium text-primary">
        Read more &rarr;
      </span>
    </Link>
  )
}

export function NewsArticleFooter({
  relatedItems,
}: {
  relatedItems: NewsCard[]
}): React.ReactElement {
  return (
    <>
      {/* Share row */}
      <section className="bg-white">
        <div className="mx-auto max-w-prose-narrow border-t border-light px-6 pt-8 pb-16 md:px-12">
          <span className="font-body text-[13px] font-medium text-muted">Share this story</span>
          <div className="mt-3 flex items-center gap-3">
            <ShareButton icon={Twitter} label="Share on Twitter" />
            <ShareButton icon={Linkedin} label="Share on LinkedIn" />
            <ShareButton icon={Link2} label="Copy link" />
          </div>
        </div>
      </section>

      {/* Related news */}
      <section className="bg-bg py-20">
        <div className="mx-auto max-w-container px-6 md:px-12">
          <h2 className="font-heading text-2xl font-bold text-dark">More from Revnator</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedItems.map((item) => (
              <NewsCardItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
