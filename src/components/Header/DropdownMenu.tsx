'use client'

import React, { useEffect, useRef } from 'react'
import { cn } from '@/utilities/ui'

interface DropdownMenuProps {
  isOpen: boolean
  onClose: () => void
  width: string
  children: React.ReactNode
}

export function DropdownMenu({ isOpen, onClose, width, children }: DropdownMenuProps): React.ReactElement | null {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent): void {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  return (
    <div
      ref={ref}
      className={cn(
        'absolute top-full left-1/2 -translate-x-1/2 mt-2',
        'bg-white border border-light rounded-2xl',
        'shadow-[0_8px_32px_rgba(19,15,30,0.08)]',
        'p-6',
        'transition-all duration-150 ease-out',
        isOpen
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-2 pointer-events-none',
      )}
      style={{ width }}
      role="menu"
      aria-hidden={!isOpen}
    >
      {children}
    </div>
  )
}
