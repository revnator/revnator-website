import React from 'react'
import Link from 'next/link'
import { Linkedin, Twitter, Github } from 'lucide-react'
import { footerColumns, bottomLinks } from './footerData'

const socialLinks = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Github, href: '#', label: 'GitHub' },
]

export function Footer(): React.ReactElement {
  return (
    <footer className="w-full bg-dark">
      <div className="mx-auto max-w-container px-6 pt-16 pb-8">
        {/* Top section — 5 columns */}
        <div className="grid grid-cols-1 md:grid-cols-[280px_repeat(4,1fr)] gap-12">
          {/* Brand column */}
          <div>
            <Link href="/" className="inline-block">
              <span className="font-heading text-xl font-extrabold text-white">
                Revnator
              </span>
            </Link>
            <p className="max-w-[240px] mt-3 font-body text-sm text-white/50">
              The all-in-one sales OS for lean B2B teams.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="text-white/40 transition-colors duration-150 hover:text-white"
                  >
                    <Icon size={16} />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map((column) => (
            <div key={column.title}>
              <span className="block font-heading text-[13px] font-semibold text-white mb-4">
                {column.title}
              </span>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
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
            &copy; 2026 Revnator. All rights reserved.
          </span>
          <div className="font-body text-xs text-white/30">
            {bottomLinks.map((link, i) => (
              <React.Fragment key={link.href + link.label}>
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
