import React from 'react'

export function BlogHero(): React.ReactElement {
  return (
    <section className="bg-bg pt-16 pb-8">
      <div className="mx-auto max-w-container px-6 md:px-12">
        <h1 className="font-heading text-[36px] font-bold text-dark">Blog</h1>
        <p className="mt-2 font-body text-base text-muted">
          Insights on sales, outreach, and growing revenue
        </p>
      </div>
    </section>
  )
}
