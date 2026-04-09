'use client'

import React, { useState } from 'react'
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { cn } from '@/utilities/ui'

export function DocsFeedback(): React.ReactElement {
  const [selected, setSelected] = useState<'up' | 'down' | null>(null)

  return (
    <div className="mt-8 flex items-center gap-4">
      <span className="font-body text-sm text-muted">Was this page helpful?</span>
      <button
        type="button"
        onClick={() => setSelected(selected === 'up' ? null : 'up')}
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-lg border transition-colors',
          selected === 'up'
            ? 'border-primary bg-primary text-white'
            : 'border-light bg-bg text-muted hover:bg-light',
        )}
        aria-label="Helpful"
      >
        <ThumbsUp size={18} />
      </button>
      <button
        type="button"
        onClick={() => setSelected(selected === 'down' ? null : 'down')}
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-lg border transition-colors',
          selected === 'down'
            ? 'border-primary bg-primary text-white'
            : 'border-light bg-bg text-muted hover:bg-light',
        )}
        aria-label="Not helpful"
      >
        <ThumbsDown size={18} />
      </button>
    </div>
  )
}
