import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { DynamicIcon } from '@/lib/icons'
import type { Module } from '@/payload-types'

export interface ConnectedStatData {
  value: string
  label: string
}

export interface PlatformConnectedData {
  label: string
  heading: string
  subheading: string
  stats: ConnectedStatData[]
}

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
  ['platform-connected-modules'],
  { tags: ['modules'] },
)

export async function PlatformConnected({ data }: { data: PlatformConnectedData }): Promise<React.ReactElement> {
  const modules = await getPublishedModules()

  return (
    <section className="relative overflow-hidden bg-dark py-20">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at center, rgba(110,51,177,0.1) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-container px-6 md:px-12">
        <div className="text-center">
          <span className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-accent">
            {data.label}
          </span>
          <h2 className="mt-4 font-heading text-[28px] font-bold leading-[1.2] text-white tracking-[-0.01em]">
            {data.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-[520px] font-body text-base text-white/55">
            {data.subheading}
          </p>
        </div>

        {/* Hub-and-spoke diagram */}
        <div className="mt-16 flex flex-col items-center">
          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.08] backdrop-blur-md">
            <span className="font-heading text-[11px] font-bold uppercase tracking-[0.12em] text-white">
              REV
            </span>
          </div>

          <div className="my-4 h-8 w-px bg-gradient-to-b from-white/20 to-transparent" />

          <div className="flex flex-wrap items-center justify-center gap-3">
            {modules.map((mod) => (
              <div
                key={mod.name}
                className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3.5 py-2.5 transition-all hover:border-white/20 hover:bg-white/[0.1]"
              >
                <DynamicIcon name={mod.icon} size={16} className="text-accent" />
                <span className="font-body text-[13px] font-medium text-white/80">
                  {mod.name.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        {data.stats.length > 0 && (
          <div className="mx-auto mt-16 grid max-w-[640px] grid-cols-3 gap-6">
            {data.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <span className="font-heading text-[36px] font-extrabold text-accent">
                  {stat.value}
                </span>
                <p className="mt-1 font-body text-sm text-white/55">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
