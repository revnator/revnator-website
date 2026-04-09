import React from 'react'
import Link from 'next/link'

interface DocsBreadcrumbProps {
  category: string
  pageTitle: string
}

export function DocsBreadcrumb({ category, pageTitle }: DocsBreadcrumbProps): React.ReactElement {
  return (
    <nav className="mb-4 flex items-center gap-1 font-body text-[13px] text-muted">
      <Link href="/docs" className="text-primary hover:underline">
        Docs
      </Link>
      <span>/</span>
      <Link href="/docs" className="text-primary hover:underline">
        {category}
      </Link>
      <span>/</span>
      <span className="text-body">{pageTitle}</span>
    </nav>
  )
}
