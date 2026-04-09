'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const mainNav = data?.mainNav || []

  return (
    <nav className="flex gap-3 items-center">
      {mainNav.map((item) => {
        if (!item.hasDropdown && item.directLink) {
          return (
            <Link key={item.id ?? item.label} href={item.directLink} className="text-sm">
              {item.label}
            </Link>
          )
        }
        return (
          <span key={item.id ?? item.label} className="text-sm">
            {item.label}
          </span>
        )
      })}
      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>
    </nav>
  )
}
