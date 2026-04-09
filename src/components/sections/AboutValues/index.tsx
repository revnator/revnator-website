import React from 'react'
import { Zap, Users, Heart } from 'lucide-react'
import type { AboutValuesData } from '../_about/aboutData'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Zap,
  Users,
  Heart,
}

export function AboutValues({ data }: { data: AboutValuesData }): React.ReactElement {
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
        </div>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {data.values.map((value) => {
            const Icon = iconMap[value.icon]
            return (
              <div
                key={value.title}
                className="rounded-2xl border border-light bg-white p-7"
              >
                {/* Icon circle */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-light">
                  {Icon && <Icon size={24} className="text-primary" />}
                </div>

                <h3 className="mt-4 font-heading text-lg font-semibold text-dark">
                  {value.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-[1.7] text-body">
                  {value.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
