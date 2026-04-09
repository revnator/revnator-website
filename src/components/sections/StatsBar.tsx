import React from 'react'
import { stats } from './statsBarData'

export function StatsBar(): React.ReactElement {
  return (
    <section className="w-full bg-dark py-20">
      <div className="mx-auto max-w-container px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center py-6 lg:py-0 ${
                i < stats.length - 1 ? 'lg:border-r lg:border-white/10' : ''
              }`}
            >
              <span className="block font-heading text-[44px] font-extrabold text-white">
                {stat.value}
              </span>
              <span className="mt-2 block font-body text-sm text-white/50">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
