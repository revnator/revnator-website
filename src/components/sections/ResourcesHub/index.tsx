import React from 'react'

export interface ResourcesHubData {
  heading: string
  subheading: string
}

export function ResourcesHub({ data }: { data: ResourcesHubData }): React.ReactElement {
  return (
    <section className="bg-bg pt-16 pb-8">
      <div className="mx-auto max-w-container px-6 md:px-12">
        <h1 className="font-heading text-[36px] font-bold text-dark">{data.heading}</h1>
        <p className="mt-2 font-body text-base text-muted">
          {data.subheading}
        </p>
      </div>
    </section>
  )
}
