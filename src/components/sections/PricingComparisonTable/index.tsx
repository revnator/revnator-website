import React from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/utilities/ui'

export interface ComparisonRowData {
  feature: string
  free: string
  starter: string
  growth: string
  pro: string
}

export interface ComparisonCategoryData {
  name: string
  rows: ComparisonRowData[]
}

export interface PricingComparisonTableData {
  heading: string
  categories: ComparisonCategoryData[]
}

function CellValue({ value }: { value: string }): React.ReactElement {
  if (value === '✓') {
    return <Check size={16} className="mx-auto text-accent" />
  }
  if (value === '—') {
    return <span className="text-light">—</span>
  }
  return <span className="text-body">{value}</span>
}

export function PricingComparisonTable({ data }: { data: PricingComparisonTableData }): React.ReactElement {
  return (
    <section id="comparison" className="bg-bg py-20">
      <div className="mx-auto max-w-container px-6 md:px-12">
        {/* Header */}
        <div className="text-center">
          <h2 className="font-heading text-[28px] font-bold text-dark tracking-[-0.01em]">
            {data.heading}
          </h2>
          <p className="mt-3 font-body text-[15px] text-muted">
            Every feature, every plan, at a glance.
          </p>
        </div>

        {/* Table wrapper */}
        <div className="mt-12 overflow-x-auto rounded-2xl border border-light bg-white">
          <table className="w-full min-w-[720px] text-center font-body text-[13px]">
            <thead>
              <tr className="bg-bg">
                <th className="w-[35%] py-3.5 pl-5 text-left font-heading text-sm font-semibold text-dark">
                  Feature
                </th>
                <th className="w-[16.25%] py-3.5 font-heading text-sm font-semibold text-dark">
                  Free
                </th>
                <th className="w-[16.25%] py-3.5 font-heading text-sm font-semibold text-dark">
                  Starter
                </th>
                <th className="w-[16.25%] py-3.5 font-heading text-sm font-semibold text-dark">
                  <span className="inline-flex items-center gap-1.5">
                    Growth
                    <span className="inline-block h-2 w-2 rounded-full bg-primary" />
                  </span>
                </th>
                <th className="w-[16.25%] py-3.5 font-heading text-sm font-semibold text-dark">
                  Pro
                </th>
              </tr>
            </thead>

            <tbody>
              {data.categories.map((category) => (
                <React.Fragment key={category.name}>
                  <tr className="bg-bg">
                    <td
                      colSpan={5}
                      className="h-9 pl-5 text-left font-heading text-xs font-semibold uppercase tracking-[0.1em] text-primary"
                    >
                      {category.name}
                    </td>
                  </tr>

                  {category.rows.map((row, i) => (
                    <tr
                      key={row.feature}
                      className={cn(
                        'h-11 border-t border-light/60',
                        i % 2 === 1 && 'bg-[#FAFAFA]',
                      )}
                    >
                      <td className="pl-5 text-left text-body">{row.feature}</td>
                      <td><CellValue value={row.free} /></td>
                      <td><CellValue value={row.starter} /></td>
                      <td><CellValue value={row.growth} /></td>
                      <td><CellValue value={row.pro} /></td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
