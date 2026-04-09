import React from 'react'
import type { Header as HeaderType, SiteSetting } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { HeaderClient } from './HeaderClient'

export async function Header(): Promise<React.ReactElement> {
  const header = (await getCachedGlobal('header', 1)()) as HeaderType
  const siteSettings = (await getCachedGlobal('site-settings', 1)()) as SiteSetting

  return <HeaderClient header={header} siteSettings={siteSettings} />
}
