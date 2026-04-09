import React from 'react'

export function ContactHero(): React.ReactElement {
  return (
    <section className="bg-bg pt-16 pb-8">
      <div className="mx-auto max-w-container px-6 text-center md:px-12">
        <span className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-primary">
          Get in Touch
        </span>

        <h1 className="mt-4 font-heading text-h1 font-bold text-dark">
          We&rsquo;d love to hear from you
        </h1>

        <p className="mx-auto mt-4 max-w-[540px] font-body text-lg text-muted">
          Questions about Revnator? Want a demo? Looking to partner? Drop us a line.
        </p>
      </div>
    </section>
  )
}
