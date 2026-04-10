import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

export type DocsSidebarPage = {
  title: string
  slug: string
  fullSlug: string
}

export type DocsSidebarSection = {
  title: string
  slug: string
  icon?: string
  pages: DocsSidebarPage[]
}

export const getDocsSidebar = unstable_cache(
  async (): Promise<DocsSidebarSection[]> => {
    const payload = await getPayload({ config })

    const sections = await payload.find({
      collection: 'doc-sections',
      where: { isPublished: { equals: true } },
      sort: 'order',
      limit: 100,
    })

    const pages = await payload.find({
      collection: 'doc-pages',
      where: { isPublished: { equals: true } },
      sort: 'order',
      limit: 500,
      depth: 1,
    })

    return sections.docs.map((section) => ({
      title: section.title,
      slug: section.slug,
      icon: section.icon || undefined,
      pages: pages.docs
        .filter((page) => {
          const pageSection = page.section
          if (typeof pageSection === 'object' && pageSection !== null) {
            return pageSection.id === section.id
          }
          return pageSection === section.id
        })
        .map((page) => ({
          title: page.title,
          slug: page.slug,
          fullSlug: `${section.slug}/${page.slug}`,
        })),
    }))
  },
  ['docs-sidebar'],
  { tags: ['doc-sections', 'doc-pages'], revalidate: false },
)
