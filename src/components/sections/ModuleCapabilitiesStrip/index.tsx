import React from 'react'
import {
  Database,
  Filter,
  Layers,
  RefreshCw,
  Upload,
} from 'lucide-react'
import type { ModuleCapabilitiesStripData } from './Data'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Database,
  Filter,
  Layers,
  RefreshCw,
  Upload,
}

export function ModuleCapabilitiesStrip({
  data,
}: {
  data: ModuleCapabilitiesStripData
}): React.ReactElement {
  return (
    <section className="border-y border-light bg-white py-12">
      <div className="mx-auto max-w-container px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-0">
          {data.items.map((item, i) => {
            const Icon = iconMap[item.icon]
            return (
              <div
                key={item.title}
                className={`flex items-center justify-center gap-3 py-3 lg:py-0 ${
                  i < data.items.length - 1 ? 'lg:border-r lg:border-light' : ''
                }`}
              >
                {Icon && <Icon size={24} className="text-primary flex-shrink-0" />}
                <span className="font-body text-sm font-semibold text-dark">
                  {item.title}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
