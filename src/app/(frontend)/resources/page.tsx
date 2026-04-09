import type { Metadata } from 'next'
import { ResourcesHub } from '@/components/sections/ResourcesHub'
import { ResourcesHubClient } from '@/components/sections/ResourcesHubClient'
import { resourcesData } from '@/components/sections/_resources/resourcesData'

export const metadata: Metadata = {
  title: 'Resources | Revnator',
  description:
    'Free ebooks, templates, case studies, webinars, and more to help your sales team close more deals.',
}

export default function ResourcesPage(): React.ReactElement {
  return (
    <main>
      <ResourcesHub />
      <ResourcesHubClient resources={resourcesData} />
    </main>
  )
}
