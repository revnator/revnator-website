'use client'

import React from 'react'
import Link from 'next/link'
import { Info, Mail, Newspaper, Shield } from 'lucide-react'
import { companyDropdownItems } from './navData'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Info,
  Mail,
  Newspaper,
  Shield,
}

export function CompanyDropdown(): React.ReactElement {
  return (
    <div className="flex flex-col gap-1">
      {companyDropdownItems.map((item) => {
        const Icon = iconMap[item.icon]
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-lg p-3 transition-colors duration-150 hover:bg-bg"
            role="menuitem"
          >
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-bg">
              {Icon && <Icon size={18} className="text-primary" />}
            </div>
            <div>
              <span className="block font-body text-sm font-medium text-dark">{item.name}</span>
              <span className="block font-body text-xs text-muted">{item.description}</span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
