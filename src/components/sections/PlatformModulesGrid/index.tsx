import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { DynamicIcon } from '@/lib/icons'
import type { Module } from '@/payload-types'

const getPublishedModules = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'modules',
      where: { isPublished: { equals: true } },
      sort: 'order',
      limit: 100,
    })
    return result.docs as Module[]
  },
  ['modules-list'],
  { tags: ['modules'] },
)

function ModuleCard({ module }: { module: Module }): React.ReactElement {
  const features = module.cardFeatures ?? []
  const description = module.shortDescription ?? module.heroDescription

  return (
    <div className="group flex flex-col rounded-2xl border border-light bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(19,15,30,0.08)]">
      {/* Icon */}
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-light">
        <DynamicIcon name={module.icon} size={20} className="text-primary" />
      </div>

      {/* Name */}
      <h3 className="mt-4 font-heading text-base font-semibold text-dark">{module.name}</h3>

      {/* Description */}
      <p className="mt-1.5 font-body text-sm text-muted line-clamp-2">{description}</p>

      {/* Feature mini-list */}
      {features.length > 0 && (
        <ul className="mt-4 flex flex-col gap-1.5">
          {features.map((feature) => (
            <li key={feature.text} className="flex items-center gap-2">
              <span className="h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
              <span className="font-body text-[13px] text-body">{feature.text}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Link */}
      <Link
        href={`/platform/${module.slug}`}
        className="mt-auto pt-4 inline-block font-body text-[13px] font-medium text-primary hover:underline"
      >
        Explore module &rarr;
      </Link>
    </div>
  )
}

export interface PlatformModulesGridData {
  label: string
  heading: string
  subheading: string
}

export async function PlatformModulesGrid({ data }: { data: PlatformModulesGridData }): Promise<React.ReactElement> {
  const modules = await getPublishedModules()

  return (
    <section className="bg-bg py-20">
      <div className="mx-auto max-w-container px-6 md:px-12">
        {/* Header */}
        <div className="text-center">
          <span className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-primary">
            {data.label}
          </span>
          <h2 className="mt-4 font-heading text-h2 font-bold text-dark tracking-[-0.01em]">
            {data.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-[540px] font-body text-base text-muted">
            {data.subheading}
          </p>
        </div>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </div>
    </section>
  )
}
