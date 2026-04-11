import type { Metadata } from 'next'
import type { SiteSetting } from '@/payload-types'

import { Plus_Jakarta_Sans, Inter, DM_Mono } from 'next/font/google'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { getCachedGlobal } from '@/utilities/getGlobals'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { getImageUrl } from '@/lib/getImageUrl'
import { getOgImageUrl } from '@/lib/getOgImageUrl'

export const dynamic = 'force-dynamic'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  let header: React.ReactElement | null = null
  let footer: React.ReactElement | null = null
  try {
    header = await Header()
  } catch (error) {
    console.error('Layout Header fetch failed:', error)
  }
  try {
    footer = await Footer()
  } catch (error) {
    console.error('Layout Footer fetch failed:', error)
  }

  return (
    <html className={`${jakarta.variable} ${inter.variable} ${dmMono.variable}`} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          {header}
          {children}
          {footer}
        </Providers>
      </body>
    </html>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getCachedGlobal('site-settings', 1)() as SiteSetting

    const siteName = settings.siteName || 'Revnator'
    const defaultTitle = settings.defaultMetaTitle || 'Revnator — B2B Sales OS'
    const defaultDescription =
      settings.defaultMetaDescription ||
      'Revnator is the all-in-one B2B Sales OS that unifies your contacts, accounts, email, pipeline, and revenue operations.'

    const faviconUrl = getImageUrl(settings.favicon, 'favicon')
    const ogImage =
      getOgImageUrl(settings.defaultOgImage) || getImageUrl(settings.defaultOgImage, 'ogImage')

    return {
      metadataBase: new URL(getServerSideURL()),
      title: {
        default: defaultTitle,
        template: `%s | ${siteName}`,
      },
      description: defaultDescription,
      icons: faviconUrl ? { icon: [{ url: faviconUrl }] } : undefined,
      openGraph: mergeOpenGraph({
        siteName,
        title: defaultTitle,
        description: defaultDescription,
        images: ogImage ? [{ url: ogImage }] : undefined,
      }),
      twitter: {
        card: 'summary_large_image',
        creator: '@revnator',
      },
    }
  } catch (error) {
    console.error('Layout metadata fetch failed:', error)
    return {
      metadataBase: new URL(getServerSideURL()),
      title: {
        default: 'Revnator — B2B Sales OS',
        template: '%s | Revnator',
      },
      description:
        'The all-in-one sales workspace for lean B2B teams.',
    }
  }
}
