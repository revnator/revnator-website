const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://revnator.com'

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: [
    '/admin',
    '/admin/*',
    '/api/*',
    '/posts',
    '/posts/*',
    '/search',
    '/pages-sitemap.xml',
    '/posts-sitemap.xml',
  ],
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/posts/', '/search/'],
      },
    ],
  },
  additionalPaths: async (config) => {
    const paths = []

    // Static pages
    const staticPages = [
      '/',
      '/platform',
      '/pricing',
      '/why-revnator',
      '/about',
      '/contact',
      '/support',
      '/blog',
      '/news',
      '/resources',
      '/docs',
      '/legal',
      '/resources/ebooks',
      '/resources/case-studies',
      '/resources/webinars',
      '/resources/whitepapers',
      '/resources/templates',
      '/resources/success-stories',
    ]
    for (const page of staticPages) {
      paths.push({
        loc: page,
        changefreq: 'weekly',
        priority: page === '/' ? 1.0 : 0.8,
      })
    }

    // Dynamic content from Payload
    try {
      const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

      // Modules
      const modulesRes = await fetch(
        `${baseUrl}/api/modules?limit=100&where[isPublished][equals]=true`,
      )
      const modules = await modulesRes.json()
      for (const doc of modules.docs || []) {
        paths.push({ loc: `/platform/${doc.slug}`, changefreq: 'monthly', priority: 0.7 })
      }

      // Blog posts
      const blogRes = await fetch(
        `${baseUrl}/api/blog-posts?limit=100&where[status][equals]=published`,
      )
      const blogs = await blogRes.json()
      for (const doc of blogs.docs || []) {
        paths.push({ loc: `/blog/${doc.slug}`, changefreq: 'weekly', priority: 0.6 })
      }

      // Use cases
      const ucRes = await fetch(
        `${baseUrl}/api/use-cases?limit=100&where[isPublished][equals]=true`,
      )
      const useCases = await ucRes.json()
      for (const doc of useCases.docs || []) {
        paths.push({ loc: `/use-cases/${doc.slug}`, changefreq: 'monthly', priority: 0.7 })
      }

      // Industries
      const indRes = await fetch(
        `${baseUrl}/api/industries?limit=100&where[isPublished][equals]=true`,
      )
      const industries = await indRes.json()
      for (const doc of industries.docs || []) {
        paths.push({ loc: `/for/${doc.slug}`, changefreq: 'monthly', priority: 0.7 })
      }

      // News
      const newsRes = await fetch(
        `${baseUrl}/api/news-articles?limit=100&where[status][equals]=published`,
      )
      const news = await newsRes.json()
      for (const doc of news.docs || []) {
        paths.push({ loc: `/news/${doc.slug}`, changefreq: 'weekly', priority: 0.5 })
      }

      // Resources (all 6 types)
      const resourceTypes = [
        'ebooks',
        'case-studies',
        'webinars',
        'whitepapers',
        'templates',
        'success-stories',
      ]
      for (const type of resourceTypes) {
        const resRes = await fetch(
          `${baseUrl}/api/${type}?limit=100&where[status][equals]=published`,
        )
        const resources = await resRes.json()
        for (const doc of resources.docs || []) {
          paths.push({ loc: `/resources/${type}/${doc.slug}`, changefreq: 'monthly', priority: 0.5 })
        }
      }

      // Legal docs
      const legalRes = await fetch(
        `${baseUrl}/api/legal-documents?limit=100&where[isPublished][equals]=true`,
      )
      const legalDocs = await legalRes.json()
      for (const doc of legalDocs.docs || []) {
        paths.push({ loc: `/legal/${doc.slug}`, changefreq: 'monthly', priority: 0.3 })
      }

      // Doc pages
      const docPagesRes = await fetch(
        `${baseUrl}/api/doc-pages?limit=500&where[isPublished][equals]=true&depth=1`,
      )
      const docPages = await docPagesRes.json()
      for (const doc of docPages.docs || []) {
        const sectionSlug = typeof doc.section === 'object' ? doc.section.slug : ''
        if (sectionSlug) {
          paths.push({
            loc: `/docs/${sectionSlug}/${doc.slug}`,
            changefreq: 'monthly',
            priority: 0.5,
          })
        }
      }
    } catch (err) {
      console.error('Sitemap generation error:', err)
    }

    return paths
  },
}
