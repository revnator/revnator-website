import React from 'react'
import Link from 'next/link'
import { DynamicIcon } from '@/lib/icons'

export interface KBCategoryData {
  icon: string
  title: string
  articleCount: string
  href: string
}

export interface SupportCategoriesData {
  heading: string
  categories: KBCategoryData[]
}

export function SupportCategories({ data }: { data: SupportCategoriesData }): React.ReactElement {
  return (
    <section className="w-full bg-bg py-20">
      <div className="mx-auto max-w-container px-6">
        <h2 className="text-center font-heading text-[28px] font-bold text-dark">
          {data.heading}
        </h2>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.categories.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="flex items-center gap-4 rounded-xl border border-light bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(19,15,30,0.06)]"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-light">
                <DynamicIcon name={cat.icon} size={20} className="text-primary" />
              </div>
              <div>
                <span className="block font-heading text-sm font-semibold text-dark">
                  {cat.title}
                </span>
                <span className="block font-body text-xs text-muted">
                  {cat.articleCount}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
