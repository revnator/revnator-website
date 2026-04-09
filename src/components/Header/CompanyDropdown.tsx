'use client'

import React from 'react'
import Link from 'next/link'
import { DynamicIcon } from '@/lib/icons'
import type { Header as HeaderType } from '@/payload-types'

type CompanyItem = NonNullable<HeaderType['companyItems']>[number]

interface CompanyDropdownProps {
  items: CompanyItem[]
}

export function CompanyDropdown({ items }: CompanyDropdownProps): React.ReactElement {
  return (
    <div className="flex flex-col gap-1">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex items-center gap-3 rounded-lg p-3 transition-colors duration-150 hover:bg-bg"
          role="menuitem"
        >
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-bg">
            <DynamicIcon name={item.icon ?? 'HelpCircle'} size={18} className="text-primary" />
          </div>
          <div>
            <span className="block font-body text-sm font-medium text-dark">{item.name}</span>
            <span className="block font-body text-xs text-muted">{item.description}</span>
          </div>
        </Link>
      ))}
    </div>
  )
}
