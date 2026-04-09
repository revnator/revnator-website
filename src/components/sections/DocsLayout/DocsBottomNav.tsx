import React from 'react'
import Link from 'next/link'

interface NavLink {
  slug: string
  title: string
}

interface DocsBottomNavProps {
  prev?: NavLink
  next?: NavLink
}

export function DocsBottomNav({ prev, next }: DocsBottomNavProps): React.ReactElement {
  return (
    <div className="mt-16 flex items-center justify-between border-t border-light pt-6">
      {prev ? (
        <Link
          href={`/docs/${prev.slug}`}
          className="font-body text-sm font-medium text-primary hover:underline"
        >
          &larr; Previous: {prev.title}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={`/docs/${next.slug}`}
          className="font-body text-sm font-medium text-primary hover:underline"
        >
          Next: {next.title} &rarr;
        </Link>
      ) : (
        <span />
      )}
    </div>
  )
}
