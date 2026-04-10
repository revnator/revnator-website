import React from 'react'
import type { Header as HeaderType, SiteSetting } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { HeaderClient } from './HeaderClient'

const getNavModules = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'modules',
      where: { isPublished: { equals: true } },
      sort: 'order',
      limit: 100,
      depth: 0,
    })
    return result.docs.map((doc) => ({
      name: doc.name,
      description: doc.shortDescription ?? doc.heroDescription,
      icon: doc.icon,
      href: `/platform/${doc.slug}`,
    }))
  },
  ['nav-modules'],
  { tags: ['modules'] },
)

export async function Header(): Promise<React.ReactElement> {
  const header = (await getCachedGlobal('header', 1)()) as HeaderType
  const siteSettings = (await getCachedGlobal('site-settings', 1)()) as SiteSetting
  const navModules = await getNavModules()

  return (
    <HeaderClient
      header={header}
      siteSettings={siteSettings}
      navModules={navModules}
    />
  )
}
