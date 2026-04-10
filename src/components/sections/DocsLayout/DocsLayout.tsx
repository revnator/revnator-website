import React from 'react'
import { DocsSidebar } from './DocsSidebar'
import { DocsTOC } from './DocsTOC'
import type { DocsSidebarSection } from '@/lib/getDocsSidebar'

interface DocsLayoutProps {
  activeSlug: string
  tocHeadings?: string[]
  sections: DocsSidebarSection[]
  children: React.ReactNode
}

export function DocsLayout({
  activeSlug,
  tocHeadings,
  sections,
  children,
}: DocsLayoutProps): React.ReactElement {
  return (
    <div className="mx-auto flex max-w-screen-2xl bg-white">
      <DocsSidebar activeSlug={activeSlug} sections={sections} />

      {/* Main content */}
      <main className="min-w-0 flex-1 px-8 pb-16 pt-10 lg:pl-12 lg:pr-10">
        <div className="max-w-[720px]">{children}</div>
      </main>

      {tocHeadings && tocHeadings.length > 0 && (
        <DocsTOC headings={tocHeadings} />
      )}
    </div>
  )
}
