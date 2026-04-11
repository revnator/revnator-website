'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, X } from 'lucide-react'
import { cn } from '@/utilities/ui'
import type { Header as HeaderType, SiteSetting } from '@/payload-types'
import { getImageUrl, getImageAlt } from '@/lib/getImageUrl'
import { DropdownMenu } from './DropdownMenu'
import { PlatformDropdown } from './PlatformDropdown'
import { SalesOSDropdown } from './SalesOSDropdown'
import { ResourcesDropdown } from './ResourcesDropdown'
import { CompanyDropdown } from './CompanyDropdown'

interface NavModule {
  name: string
  description: string
  icon: string
  href: string
}

interface HeaderClientProps {
  header: HeaderType
  siteSettings: SiteSetting
  navModules?: NavModule[]
}

type DropdownType = NonNullable<
  NonNullable<HeaderType['mainNav']>[number]['dropdownType']
>

const CLOSE_DELAY_MS = 150

const dropdownWidths: Record<string, string> = {
  platform: '720px',
  salesOS: '720px',
  resources: '640px',
  company: '320px',
  custom: '400px',
}

export function HeaderClient({
  header,
  siteSettings,
  navModules = [],
}: HeaderClientProps): React.ReactElement {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname = usePathname()

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

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
      setOpenDropdown(label)
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

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

  const mainNav = header.mainNav ?? []

  // Resolve logo text
  const logoText = header.showLogoText !== false ? (header.logoText ?? 'Revnator') : null

  function renderDropdownContent(dropdownType: DropdownType): React.ReactElement | null {
    switch (dropdownType) {
      case 'platform':
        return (
          <PlatformDropdown
            label={header.platformLabel ?? 'MODULES'}
            modules={navModules}
            promoCard={header.platformPromoCard ?? undefined}
          />
        )
      case 'salesOS':
        return (
          <SalesOSDropdown
            useCasesLabel={header.useCasesLabel ?? 'USE CASES'}
            useCasesItems={header.useCasesItems ?? []}
            industriesLabel={header.industriesLabel ?? 'FOR'}
            industriesItems={header.industriesItems ?? []}
            featuredCaseStudy={header.featuredCaseStudy ?? undefined}
            footerLink={header.footerLink ?? undefined}
          />
        )
      case 'resources':
        return (
          <ResourcesDropdown
            learnLabel={header.learnLabel ?? 'LEARN'}
            learnItems={header.learnItems ?? []}
            downloadLabel={header.downloadLabel ?? 'DOWNLOAD'}
            downloadItems={header.downloadItems ?? []}
            featuredResource={header.featuredResource ?? undefined}
            viewAllLink={header.viewAllLink ?? undefined}
          />
        )
      case 'company':
        return (
          <CompanyDropdown items={header.companyItems ?? []} />
        )
      default:
        return null
    }
  }

  return (
    <header className="sticky top-0 z-50 h-[72px] bg-white border-b border-light">
      <div className="mx-auto max-w-container h-full px-6 flex items-center justify-between">
        {/* Left — Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center gap-2">
          {(() => {
            const logoSource = header.useLogoFromSiteSettings
              ? siteSettings?.logo
              : header.logoOverride

            const logoUrl = getImageUrl(logoSource, 'logo')
            const logoAlt = getImageAlt(logoSource, siteSettings?.siteName || 'Revnator')

            return logoUrl ? (
              <img
                src={logoUrl}
                alt={logoAlt}
                className="h-8 w-auto"
              />
            ) : null
          })()}

          {header.showLogoText !== false && logoText && (
            <span className="font-heading text-xl font-extrabold text-dark">
              {logoText}
            </span>
          )}
        </Link>

        {/* Center — Navigation (hidden below md) */}
        <nav className="hidden md:flex items-center gap-8" role="menubar">
          {mainNav.map((item) => {
            const label = item.label ?? ''
            const isActive = openDropdown === label

            if (!item.hasDropdown) {
              return (
                <Link
                  key={label}
                  href={item.directLink ?? '#'}
                  className="font-body text-sm font-medium text-body transition-colors duration-150 hover:text-primary"
                  role="menuitem"
                >
                  {label}
                </Link>
              )
            }

            const dropdownType = item.dropdownType as DropdownType | undefined
            const width = dropdownType ? (dropdownWidths[dropdownType] ?? '400px') : '400px'

            return (
              <div
                key={label}
                className="relative"
                onMouseEnter={() => handleTriggerEnter(label)}
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
                    setOpenDropdown(isActive ? null : label)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setOpenDropdown(isActive ? null : label)
                    }
                  }}
                >
                  {label}
                  <ChevronDown
                    size={14}
                    className={cn(
                      'transition-transform duration-150',
                      isActive && 'rotate-180',
                    )}
                  />
                </button>

                {dropdownType && (
                  <div
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <DropdownMenu
                      isOpen={isActive}
                      onClose={handleClose}
                      width={width}
                    >
                      {renderDropdownContent(dropdownType)}
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
            href={header.loginHref ?? '/login'}
            className="hidden md:inline-block font-body text-sm font-medium text-body transition-colors duration-150 hover:text-primary"
          >
            {header.loginText ?? 'Log in'}
          </Link>
          <Link
            href={header.primaryCtaHref ?? '/signup'}
            className={cn(
              'hidden md:inline-block font-body text-sm font-semibold text-white',
              'bg-primary px-5 py-3 rounded-lg',
              'transition-colors duration-150 hover:bg-primary-dark',
            )}
          >
            {header.primaryCtaText ?? 'Start free trial'}
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 text-body"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[72px] z-40 bg-white overflow-y-auto">
          <nav className="flex flex-col px-6 py-6 gap-2">
            {mainNav.map((item) => {
              const label = item.label ?? ''

              if (!item.hasDropdown) {
                return (
                  <Link
                    key={label}
                    href={item.directLink ?? '#'}
                    className="font-body text-base font-medium text-body py-3 border-b border-light transition-colors duration-150 hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {label}
                  </Link>
                )
              }

              return (
                <MobileNavAccordion key={label} label={label}>
                  {item.dropdownType === 'platform' && navModules.map((mod) => (
                    <Link
                      key={mod.href}
                      href={mod.href}
                      className="block py-2 pl-4 font-body text-sm text-body hover:text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {mod.name}
                    </Link>
                  ))}
                  {item.dropdownType === 'salesOS' && (
                    <>
                      {(header.useCasesItems ?? []).map((uc) => (
                        <Link
                          key={uc.href}
                          href={uc.href ?? '#'}
                          className="block py-2 pl-4 font-body text-sm text-body hover:text-primary"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {uc.name}
                        </Link>
                      ))}
                      {(header.industriesItems ?? []).map((ind) => (
                        <Link
                          key={ind.href}
                          href={ind.href ?? '#'}
                          className="block py-2 pl-4 font-body text-sm text-body hover:text-primary"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {ind.name}
                        </Link>
                      ))}
                    </>
                  )}
                  {item.dropdownType === 'resources' && (
                    <>
                      {(header.learnItems ?? []).map((li) => (
                        <Link
                          key={li.href}
                          href={li.href ?? '#'}
                          className="block py-2 pl-4 font-body text-sm text-body hover:text-primary"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {li.name}
                        </Link>
                      ))}
                      {(header.downloadItems ?? []).map((di) => (
                        <Link
                          key={di.href}
                          href={di.href ?? '#'}
                          className="block py-2 pl-4 font-body text-sm text-body hover:text-primary"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {di.name}
                        </Link>
                      ))}
                    </>
                  )}
                  {item.dropdownType === 'company' && (header.companyItems ?? []).map((ci) => (
                    <Link
                      key={ci.href}
                      href={ci.href ?? '#'}
                      className="block py-2 pl-4 font-body text-sm text-body hover:text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {ci.name}
                    </Link>
                  ))}
                </MobileNavAccordion>
              )
            })}

            {/* Mobile CTAs */}
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href={header.loginHref ?? '/login'}
                className="font-body text-sm font-medium text-body text-center py-3 rounded-lg border border-light transition-colors duration-150 hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {header.loginText ?? 'Log in'}
              </Link>
              <Link
                href={header.primaryCtaHref ?? '/signup'}
                className="font-body text-sm font-semibold text-white text-center bg-primary px-5 py-3 rounded-lg transition-colors duration-150 hover:bg-primary-dark"
                onClick={() => setMobileMenuOpen(false)}
              >
                {header.primaryCtaText ?? 'Start free trial'}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

function MobileNavAccordion({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}): React.ReactElement {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-light">
      <button
        type="button"
        className="flex w-full items-center justify-between py-3 font-body text-base font-medium text-body transition-colors duration-150 hover:text-primary"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        {label}
        <ChevronDown
          size={16}
          className={cn(
            'transition-transform duration-150',
            open && 'rotate-180',
          )}
        />
      </button>
      {open && (
        <div className="pb-3">
          {children}
        </div>
      )}
    </div>
  )
}
