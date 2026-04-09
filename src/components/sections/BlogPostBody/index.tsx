import React from 'react'

export function BlogPostBody({ body }: { body: string[] }): React.ReactElement {
  return (
    <section className="bg-white pt-8 pb-12">
      <div className="mx-auto max-w-prose-narrow px-6 md:px-12">
        {body.map((paragraph, i) => (
          <p
            key={i}
            className="mb-6 font-body text-[17px] leading-[1.8] text-body last:mb-0"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  )
}
