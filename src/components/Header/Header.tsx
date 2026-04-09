'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown, Menu } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { navItems } from './navData'
import { DropdownMenu } from './DropdownMenu'
import { PlatformDropdown } from './PlatformDropdown'
import { SalesOSDropdown } from './SalesOSDropdown'
import { ResourcesDropdown } from './ResourcesDropdown'
import { CompanyDropdown } from './CompanyDropdown'

type DropdownKey = 'Platform' | 'Sales OS' | 'Resources' | 'Company'

const CLOSE_DELAY_MS = 150

const dropdownConfig: Record<DropdownKey, { width: string; content: React.ReactElement }> = {
  Platform: { width: '720px', content: <PlatformDropdown /> },
  'Sales OS': { width: '720px', content: <SalesOSDropdown /> },
  Resources: { width: '640px', content: <ResourcesDropdown /> },
  Company: { width: '320px', content: <CompanyDropdown /> },
}

function isDropdownKey(label: string): label is DropdownKey {
  return label in dropdownConfig
}

export function Header(): React.ReactElement {
  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearCloseTimeout = useCallback((): void => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }, [])

  const scheduleClose = useCallback((): void => {
    clearCloseTimeout()
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null)
    }, CLOSE_DELAY_MS)
  }, [clearCloseTimeout])

  const handleTriggerEnter = useCallback(
    (label: string): void => {
      clearCloseTimeout()
      if (isDropdownKey(label)) {
        setOpenDropdown(label)
      }
    },
    [clearCloseTimeout],
  )

  const handleTriggerLeave = useCallback((): void => {
    scheduleClose()
  }, [scheduleClose])

  const handleDropdownEnter = useCallback((): void => {
    clearCloseTimeout()
  }, [clearCloseTimeout])

  const handleDropdownLeave = useCallback((): void => {
    scheduleClose()
  }, [scheduleClose])

  const handleClose = useCallback((): void => {
    clearCloseTimeout()
    setOpenDropdown(null)
  }, [clearCloseTimeout])

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 h-[72px] bg-white border-b border-light">
      <div className="mx-auto max-w-container h-full px-6 flex items-center justify-between">
        {/* Left — Logo */}
        <Link href="/" className="flex-shrink-0">
          <span className="font-heading text-xl font-extrabold text-dark">
            Revnator
          </span>
        </Link>

        {/* Center — Navigation (hidden below md) */}
        <nav className="hidden md:flex items-center gap-8" role="menubar">
          {navItems.map((item) => {
            const isActive = openDropdown === item.label

            if (!item.hasDropdown) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="font-body text-sm font-medium text-body transition-colors duration-150 hover:text-primary"
                  role="menuitem"
                >
                  {item.label}
                </Link>
              )
            }

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => handleTriggerEnter(item.label)}
                onMouseLeave={handleTriggerLeave}
              >
                <button
                  type="button"
                  className={cn(
                    'flex items-center gap-1 font-body text-sm font-medium transition-colors duration-150',
                    isActive ? 'text-primary' : 'text-body hover:text-primary',
                  )}
                  aria-expanded={isActive}
                  aria-haspopup="true"
                  role="menuitem"
                  onClick={() => {
                    if (isDropdownKey(item.label)) {
                      setOpenDropdown(isActive ? null : item.label)
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      if (isDropdownKey(item.label)) {
                        setOpenDropdown(isActive ? null : item.label)
                      }
                    }
                  }}
                >
                  {item.label}
                  <ChevronDown
                    size={14}
                    className={cn(
                      'transition-transform duration-150',
                      isActive && 'rotate-180',
                    )}
                  />
                </button>

                {isDropdownKey(item.label) && (
                  <div
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <DropdownMenu
                      isOpen={isActive}
                      onClose={handleClose}
                      width={dropdownConfig[item.label].width}
                    >
                      {dropdownConfig[item.label].content}
                    </DropdownMenu>
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Right — CTAs */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="hidden md:inline-block font-body text-sm font-medium text-body transition-colors duration-150 hover:text-primary"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className={cn(
              'hidden md:inline-block font-body text-sm font-semibold text-white',
              'bg-primary px-5 py-3 rounded-lg',
              'transition-colors duration-150 hover:bg-primary-dark',
            )}
          >
            Start free trial
          </Link>

          {/* Mobile menu button (menu not built yet) */}
          <button
            type="button"
            className="md:hidden p-2 text-body"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  )
}
