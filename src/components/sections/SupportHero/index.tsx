'use client'

import React from 'react'
import { Search } from 'lucide-react'

export function SupportHero(): React.ReactElement {
  return (
    <section className="bg-bg pt-16 pb-12">
      <div className="mx-auto max-w-container px-6 text-center md:px-12">
        <h1 className="font-heading text-[36px] font-bold text-dark">
          How can we help?
        </h1>

        {/* Search bar */}
        <div className="mx-auto mt-8 max-w-[600px]">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="text"
              placeholder="Search for answers..."
              readOnly
              className="h-[52px] w-full rounded-xl border border-light bg-white pl-12 pr-5 font-body text-base text-body placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:shadow-[0_0_0_3px_rgba(110,51,177,0.08)]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
