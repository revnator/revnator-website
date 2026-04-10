'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}): React.ReactElement {
  useEffect(() => {
    console.error('Page error:', error)
  }, [error])

  return (
    <main className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="font-heading text-6xl font-extrabold text-error">500</p>
        <h1 className="mt-4 font-heading text-2xl font-bold text-dark">Something went wrong</h1>
        <p className="mt-4 font-body text-base leading-relaxed text-muted">
          We hit an unexpected error. Please try again or contact support if the problem persists.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg border-[1.5px] border-primary px-6 py-3 font-body text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  )
}
