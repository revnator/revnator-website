import { postgresAdapter } from '@payloadcms/db-postgres'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Modules } from './collections/Modules'
import { UseCases } from './collections/UseCases'
import { Industries } from './collections/Industries'
import { BlogCategories } from './collections/BlogCategories'
import { BlogPosts } from './collections/BlogPosts'
import { NewsArticles } from './collections/NewsArticles'
import { LegalDocuments } from './collections/LegalDocuments'
import { Ebooks } from './collections/Ebooks'
import { CaseStudies } from './collections/CaseStudies'
import { Webinars } from './collections/Webinars'
import { Whitepapers } from './collections/Whitepapers'
import { Templates } from './collections/Templates'
import { SuccessStories } from './collections/SuccessStories'
import { DocSections } from './collections/DocSections'
import { DocPages } from './collections/DocPages'
import { LeadSubmissions } from './collections/LeadSubmissions'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { SiteSettings } from './globals/SiteSettings'
import { HomePage } from './globals/HomePage/config'
import { PricingPage } from './globals/PricingPage/config'
import { WhyRevnatorPage } from './globals/WhyRevnatorPage/config'
import { AboutPage } from './globals/AboutPage/config'
import { PlatformPage } from './globals/PlatformPage/config'
import { SupportPage } from './globals/SupportPage/config'
import { ContactPage } from './globals/ContactPage/config'
import { NewsPage } from './globals/NewsPage/config'
import { LegalPage } from './globals/LegalPage/config'
import { ResourcesPage } from './globals/ResourcesPage/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  graphQL: {
    disablePlaygroundInProduction: true,
  },
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  collections: [Pages, Posts, Media, Categories, Users, Modules, UseCases, Industries, BlogCategories, BlogPosts, NewsArticles, LegalDocuments, Ebooks, CaseStudies, Webinars, Whitepapers, Templates, SuccessStories, DocSections, DocPages, LeadSubmissions],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer, SiteSettings, HomePage, PricingPage, WhyRevnatorPage, AboutPage, PlatformPage, SupportPage, ContactPage, NewsPage, LegalPage, ResourcesPage],
  plugins,
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
