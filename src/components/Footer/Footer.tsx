import React from 'react'
import Link from 'next/link'
import { Linkedin, Twitter, Github, Youtube, Facebook, Instagram } from 'lucide-react'
import type { Footer as FooterType, SiteSetting } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getImageUrl, getImageAlt } from '@/lib/getImageUrl'

const socialIconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  linkedin: Linkedin,
  twitter: Twitter,
  github: Github,
  youtube: Youtube,
  facebook: Facebook,
  instagram: Instagram,
}

export async function Footer(): Promise<React.ReactElement> {
  const footer = (await getCachedGlobal('footer', 1)()) as FooterType
  const siteSettings = (await getCachedGlobal('site-settings', 1)()) as SiteSetting

  const columns = footer.columns ?? []
  const socialLinks = footer.socialLinks ?? []
  const bottomLinks = footer.bottomLinks ?? []
  const brandDescription =
    footer.description ?? 'The all-in-one sales OS for lean B2B teams.'
  const copyrightText =
    footer.copyrightText ?? '© 2026 Revnator. All rights reserved.'
  const brandName = siteSettings.siteName ?? 'Revnator'

  return (
    <footer className="w-full bg-dark">
      <div className="mx-auto max-w-container px-6 pt-16 pb-8">
        {/* Top section — brand + columns */}
        <div className="grid grid-cols-1 md:grid-cols-[280px_repeat(4,1fr)] gap-12">
          {/* Brand column */}
          <div>
            <Link href="/" className="inline-block flex items-center gap-2">
              {(() => {
                const logoSource = footer.useLogoFromSiteSettings
                  ? siteSettings?.logoDark || siteSettings?.logo
                  : footer.logoOverride

                const logoUrl = getImageUrl(logoSource, 'logo')
                const logoAlt = getImageAlt(logoSource, brandName)

                return logoUrl ? (
                  <img
                    src={logoUrl}
                    alt={logoAlt}
                    className="h-8 w-auto"
                  />
                ) : null
              })()}

              {footer.showLogoText && (
                <span className="font-heading text-xl font-extrabold text-white">
                  {brandName}
                </span>
              )}
            </Link>
            <p className="max-w-[240px] mt-3 font-body text-sm text-white/50">
              {brandDescription}
            </p>
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((social) => {
                const Icon = socialIconMap[social.platform]
                if (!Icon) return null
                return (
                  <a
                    key={social.id ?? social.platform}
                    href={social.href}
                    aria-label={social.platform}
                    className="text-white/40 transition-colors duration-150 hover:text-white"
                  >
                    <Icon size={16} />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((column) => (
            <div key={column.id ?? column.title}>
              <span className="block font-heading text-[13px] font-semibold text-white mb-4">
                {column.title}
              </span>
              <ul className="flex flex-col gap-3">
                {(column.links ?? []).map((link) => (
                  <li key={link.id ?? `${link.href}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="font-body text-[13px] text-white/45 transition-colors duration-150 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-body text-xs text-white/30">
            {copyrightText}
          </span>
          <div className="font-body text-xs text-white/30">
            {bottomLinks.map((link, i) => (
              <React.Fragment key={link.id ?? `${link.href}-${link.label}`}>
                {i > 0 && <span>{'\u00A0\u00B7\u00A0'}</span>}
                <Link
                  href={link.href}
                  className="transition-colors duration-150 hover:text-white"
                >
                  {link.label}
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
