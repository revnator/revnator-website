import React from 'react'
import Link from 'next/link'
import {
  Shield,
  FileText,
  Cookie,
  Lock,
  Scale,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react'
import { legalDocs } from '../_legal/legalData'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Shield,
  FileText,
  Cookie,
  Lock,
  Scale,
  ShieldCheck,
}

export function LegalHub(): React.ReactElement {
  return (
    <section className="bg-bg py-20">
      <div className="mx-auto max-w-container px-6 md:px-12">
        {/* Hero */}
        <div className="text-center">
          <span className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-primary">
            Legal
          </span>
          <h1 className="mt-3 font-heading text-[36px] font-bold text-dark">Legal documents</h1>
          <p className="mx-auto mt-3 max-w-[600px] font-body text-base text-muted">
            Everything you need to know about how Revnator operates, protects your data, and
            respects your privacy.
          </p>
        </div>

        {/* Grid */}
        <div className="mx-auto mt-16 grid max-w-[800px] grid-cols-1 gap-4 md:grid-cols-2">
          {legalDocs.map((doc) => {
            const Icon = iconMap[doc.icon]
            return (
              <Link
                key={doc.slug}
                href={`/legal/${doc.slug}`}
                className="flex items-center gap-4 rounded-xl border border-light bg-white p-6 transition-colors hover:border-primary/40"
              >
                {Icon && <Icon size={24} className="flex-shrink-0 text-primary" />}
                <div className="flex-1">
                  <h3 className="font-heading text-base font-semibold text-dark">{doc.title}</h3>
                  <p className="mt-1 font-body text-[13px] text-muted">{doc.description}</p>
                </div>
                <ChevronRight size={18} className="flex-shrink-0 text-muted" />
              </Link>
            )
          })}
        </div>

        {/* Last updated */}
        <p className="mt-12 text-center font-body text-[13px] text-muted">
          All documents last updated April 9, 2026
        </p>
      </div>
    </section>
  )
}
