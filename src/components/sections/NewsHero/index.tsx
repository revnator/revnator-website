import React from 'react'

export interface NewsHeroData {
  sectionLabel: string
  heading: string
  subheading: string
}

export function NewsHero({ data }: { data: NewsHeroData }): React.ReactElement {
  return (
    <section className="bg-bg pt-16 pb-8">
      <div className="mx-auto max-w-container px-6 md:px-12">
        <span className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-primary">
          {data.sectionLabel}
        </span>
        <h1 className="mt-3 font-heading text-[36px] font-bold text-dark">{data.heading}</h1>
        <p className="mt-2 max-w-[580px] font-body text-base text-muted">
          {data.subheading}
        </p>
      </div>
    </section>
  )
}
