import type { BannerBlock as BannerBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

type Props = {
  className?: string
} & BannerBlockProps

export const BannerBlock: React.FC<Props> = ({ className, content, style }) => {
  return (
    <div className={cn('mx-auto my-8 w-full', className)}>
      <div
        className={cn('banner-block py-3 px-6 flex items-center rounded', {
          // Info callouts use hardcoded brand tokens (not the theme-dependent
          // `card` token) so they always render as a light box. The docs/blog
          // prose text colors are light-theme-only, so a `card`-backed banner
          // turned into an unreadable dark box whenever the dark theme was active.
          'bg-bg border-l-4 border-primary text-body': style === 'info',
          'border border-error bg-error/30': style === 'error',
          'border border-success bg-success/30': style === 'success',
          'border border-warning bg-warning/30': style === 'warning',
        })}
      >
        <RichText data={content} enableGutter={false} enableProse={false} />
      </div>
    </div>
  )
}
