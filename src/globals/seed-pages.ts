/**
 * Seed script for all 7 page globals.
 *
 * Run from project root:
 *   npx tsx src/globals/seed-pages.ts
 *
 * Requires DATABASE_URI and PAYLOAD_SECRET in .env.local
 */
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import path from 'path'
import { getPayload } from 'payload'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

async function seedPages(): Promise<void> {
  const configPath = path.resolve(dirname, '../payload.config.ts')
  const configUrl = new URL(`file:///${configPath.replace(/\\/g, '/')}`)

  const payload = await getPayload({
    config: (await import(configUrl.href)).default,
  })

  // Disable revalidation hooks (no Next.js server during seeding)
  const context = { disableRevalidate: true }

  // ── 1. HOME PAGE ──
  console.log('Seeding Home Page...')
  await payload.updateGlobal({
    slug: 'home-page',
    context,
    data: {
      // Hero
      heroBadge: 'REVENUE ACCELERATOR',
      heroHeadline: 'The sales workspace built for',
      heroHeadlineAccent: 'closers',
      heroSubheadline:
        'Everything your sales team needs in one place — contacts, email sequences, deal pipeline, calendar, and analytics. No more switching between five tools.',
      heroPrimaryCta: { label: 'Start free trial', href: '/signup' },
      heroSecondaryCta: { label: 'Book a demo', href: '/demo' },
      heroTrustLine: 'No credit card required · Free for up to 3 users',
      heroStats: [
        { label: '↑ 34% reply rate', type: 'trending-up' },
        { label: '✓ 12 deals closed today', type: 'check-circle' },
      ],

      // Trusted By
      trustedByLabel: 'Trusted by fast-growing sales teams',
      trustedByLogos: [],

      // Capabilities
      capabilitiesHeading: 'One platform. Every sales workflow.',
      capabilities: [
        {
          icon: 'Users',
          title: 'Contact & Account CRM',
          description:
            'Manage your entire contact lifecycle, track account health, and never lose a lead.',
          href: '/platform/contacts',
        },
        {
          icon: 'Mail',
          title: 'Email Outreach',
          description:
            'Send campaigns, build sequences, track opens and replies — all with built-in deliverability tools.',
          href: '/platform/outreach',
        },
        {
          icon: 'GitBranch',
          title: 'Pipeline & Deals',
          description:
            'Visual Kanban pipeline with deal tracking, forecasting, and stage-based automation.',
          href: '/platform/pipeline',
        },
        {
          icon: 'LayoutDashboard',
          title: 'Sales Operations',
          description:
            'Tasks, missions, calendar with booking pages, team chat, and scheduling — in one workspace.',
          href: '/platform/sales-ops',
        },
      ],

      // Feature Showcases
      featureShowcases: [
        {
          label: 'OUTREACH',
          heading: 'Send emails that actually get replies',
          description:
            'Build multi-step sequences with personalization, A/B testing, and automated follow-ups. Track opens, clicks, and replies in real time.',
          bullets: [
            { text: 'Multi-step email sequences with smart scheduling' },
            { text: 'Built-in email warm-up and deliverability tools' },
            { text: 'Open, click, and reply tracking with analytics' },
            { text: 'SendGrid integration with unsubscribe handling' },
          ],
          linkLabel: 'Explore outreach →',
          linkHref: '/platform/outreach',
          reverse: false,
        },
        {
          label: 'PIPELINE',
          heading: 'See every deal. Miss nothing.',
          description:
            'Drag-and-drop Kanban board with deal detail views, stage progression, and revenue forecasting built in.',
          bullets: [
            { text: 'Visual Kanban with drag-and-drop deal management' },
            { text: 'Arrow-style stage progress bar on every deal' },
            { text: 'Revenue forecasting dashboard with weighted pipeline' },
            { text: 'Pipeline reports with custom date ranges' },
          ],
          linkLabel: 'Explore pipeline →',
          linkHref: '/platform/pipeline',
          reverse: true,
        },
        {
          label: 'SCHEDULING',
          heading: 'Book meetings without the back-and-forth',
          description:
            'Full calendar with Calendly-style booking pages. Share your availability link and let prospects book directly.',
          bullets: [
            { text: 'Personal booking pages at /book/your-slug' },
            { text: 'Calendar view with daily, weekly, and monthly layouts' },
            { text: 'Automatic timezone detection for global teams' },
            { text: 'Integrated with tasks and deal timelines' },
          ],
          linkLabel: 'Explore calendar →',
          linkHref: '/platform/calendar',
          reverse: false,
        },
      ],

      // Stats
      stats: [
        { value: '9+', label: 'Modules in one platform' },
        { value: '100%', label: 'Self-serve setup' },
        { value: '5 min', label: 'To your first sequence' },
        { value: '$0', label: 'To get started' },
      ],

      // Testimonials
      testimonialsHeading: 'Loved by sales teams who ship',
      testimonials: [
        {
          quote:
            'Revnator replaced three tools for us. Our reps spend less time on admin and more time closing.',
          name: 'Sarah M.',
          title: 'Head of Sales, TechCorp',
          initials: 'SM',
        },
        {
          quote:
            'The pipeline view is exactly what we needed. Clean, visual, and actually useful for forecasting.',
          name: 'James K.',
          title: 'Revenue Operations, ScaleUp Inc',
          initials: 'JK',
        },
        {
          quote:
            'Setting up email sequences took 5 minutes. No onboarding call needed. Just works.',
          name: 'Priya R.',
          title: 'SDR Lead, GrowthBase',
          initials: 'PR',
        },
      ],

      // Integrations
      integrationsHeading: 'Works with your existing stack',
      integrationsSubheading: 'Connect Revnator with the tools you already use.',
      integrations: [
        { name: 'Gmail' },
        { name: 'Outlook' },
        { name: 'Google Calendar' },
        { name: 'Salesforce' },
        { name: 'HubSpot' },
        { name: 'Pipedrive' },
        { name: 'Zapier' },
        { name: 'Slack' },
        { name: 'Stripe' },
        { name: 'SendGrid' },
        { name: 'Calendly' },
        { name: 'Zoom' },
      ],

      // Final CTA
      ctaHeading: 'Ready to close more deals?',
      ctaSubheading:
        'Join the early access program. Free for up to 3 users. No credit card required.',
      ctaPrimaryCta: { label: 'Start free trial', href: '/signup' },
      ctaSecondaryCta: { label: 'Book a demo', href: '/demo' },
    },
  })
  console.log('  ✓ Home Page seeded')

  // ── 2. PRICING PAGE ──
  console.log('Seeding Pricing Page...')
  await payload.updateGlobal({
    slug: 'pricing-page',
    context,
    data: {
      // Hero
      heroLabel: 'PRICING',
      heroHeading: 'Simple pricing. No surprises.',
      heroSubheading:
        "Start free. Upgrade when you're ready. Every plan includes unlimited contacts.",
      heroTrialNote:
        'All paid plans include a 14-day free trial. No credit card required.',

      // Plans
      plans: [
        {
          name: 'Free',
          monthlyPrice: 0,
          annualPrice: 0,
          period: 'forever',
          description: 'For individuals exploring Revnator',
          features: [
            { text: 'Up to 100 contacts', included: true },
            { text: '1 user', included: true },
            { text: 'Basic contact management', included: true },
            { text: '1 email sequence', included: true },
            { text: '50 emails per day', included: true },
            { text: 'Basic pipeline (1 pipeline)', included: true },
            { text: 'Community support', included: true },
            { text: 'No custom fields', included: false },
            { text: 'No reports', included: false },
            { text: 'No calendar booking', included: false },
          ],
          ctaLabel: 'Get started free',
          ctaHref: '/signup',
          highlighted: false,
        },
        {
          name: 'Starter',
          monthlyPrice: 19,
          annualPrice: 15,
          period: '/user/mo',
          description: 'For small teams getting started with outreach',
          features: [
            { text: 'Up to 2,500 contacts', included: true },
            { text: 'Up to 5 users', included: true },
            { text: 'Full CRM with custom fields', included: true },
            { text: '5 email sequences', included: true },
            { text: '500 emails per day', included: true },
            { text: 'Pipeline with 1 pipeline', included: true },
            { text: 'Basic reports', included: true },
            { text: 'Calendar + 1 booking page', included: true },
            { text: 'Email support', included: true },
            { text: 'No AI features', included: false },
            { text: 'No team chat', included: false },
          ],
          ctaLabel: 'Start free trial',
          ctaHref: '/signup',
          highlighted: false,
        },
        {
          name: 'Growth',
          monthlyPrice: 39,
          annualPrice: 31,
          period: '/user/mo',
          description: 'Full platform for growing sales teams',
          features: [
            { text: 'Unlimited contacts', included: true },
            { text: 'Up to 15 users', included: true },
            { text: 'Full CRM + account management', included: true },
            { text: 'Unlimited sequences', included: true },
            { text: '2,000 emails per day', included: true },
            { text: 'Multiple pipelines + forecasting', included: true },
            { text: 'Full reports + exports', included: true },
            { text: 'Calendar + unlimited booking pages', included: true },
            { text: 'Team chat', included: true },
            { text: 'Integrated forms', included: true },
            { text: 'Integrations', included: true },
            { text: 'Priority support', included: true },
          ],
          ctaLabel: 'Start free trial',
          ctaHref: '/signup',
          highlighted: true,
        },
        {
          name: 'Pro',
          monthlyPrice: 69,
          annualPrice: 55,
          period: '/user/mo',
          description: 'Advanced tools for high-velocity teams',
          features: [
            { text: 'Everything in Growth', included: true },
            { text: 'Unlimited users', included: true },
            { text: 'AI SDR features', included: true },
            { text: 'Advanced analytics', included: true },
            { text: 'API access + webhooks', included: true },
            { text: 'Custom roles & permissions', included: true },
            { text: 'Dedicated onboarding', included: true },
            { text: 'Phone + chat support', included: true },
            { text: 'Custom integrations', included: true },
            { text: 'SLA guarantee', included: true },
          ],
          ctaLabel: 'Start free trial',
          ctaHref: '/signup',
          highlighted: false,
        },
      ],

      // Enterprise
      enterpriseHeading: "Need more? Let's talk.",
      enterpriseDescription:
        'Custom plans with SSO, SCIM, dedicated onboarding, SLA, white-label, and priority support for teams of 20+.',
      enterpriseCtaLabel: 'Contact sales',
      enterpriseCtaHref: '/contact',

      // Comparison
      comparisonHeading: 'Compare plans in detail',
      comparisonCategories: [
        {
          name: 'CONTACTS & CRM',
          rows: [
            { feature: 'Contacts limit', free: '100', starter: '2,500', growth: 'Unlimited', pro: 'Unlimited' },
            { feature: 'Users', free: '1', starter: '5', growth: '15', pro: 'Unlimited' },
            { feature: 'Custom fields', free: '—', starter: '✓', growth: '✓', pro: '✓' },
            { feature: 'Account management', free: '—', starter: '—', growth: '✓', pro: '✓' },
            { feature: 'Contact enrichment', free: '—', starter: '—', growth: '✓', pro: '✓' },
            { feature: 'Lifecycle tracking', free: '✓', starter: '✓', growth: '✓', pro: '✓' },
          ],
        },
        {
          name: 'EMAIL & OUTREACH',
          rows: [
            { feature: 'Email sequences', free: '1', starter: '5', growth: 'Unlimited', pro: 'Unlimited' },
            { feature: 'Emails per day', free: '50', starter: '500', growth: '2,000', pro: '5,000' },
            { feature: 'Email campaigns', free: '—', starter: '✓', growth: '✓', pro: '✓' },
            { feature: 'Open & click tracking', free: '✓', starter: '✓', growth: '✓', pro: '✓' },
            { feature: 'A/B testing', free: '—', starter: '—', growth: '✓', pro: '✓' },
            { feature: 'Email warm-up', free: '—', starter: '—', growth: '✓', pro: '✓' },
          ],
        },
        {
          name: 'PIPELINE & DEALS',
          rows: [
            { feature: 'Pipelines', free: '1', starter: '1', growth: 'Multiple', pro: 'Unlimited' },
            { feature: 'Deal forecasting', free: '—', starter: '—', growth: '✓', pro: '✓' },
            { feature: 'Pipeline reports', free: '—', starter: 'Basic', growth: 'Full', pro: 'Advanced' },
          ],
        },
        {
          name: 'OPERATIONS',
          rows: [
            { feature: 'Tasks & missions', free: '✓', starter: '✓', growth: '✓', pro: '✓' },
            { feature: 'Calendar', free: '—', starter: '✓', growth: '✓', pro: '✓' },
            { feature: 'Booking pages', free: '—', starter: '1', growth: 'Unlimited', pro: 'Unlimited' },
            { feature: 'Team chat', free: '—', starter: '—', growth: '✓', pro: '✓' },
            { feature: 'Forms', free: '—', starter: '—', growth: '✓', pro: '✓' },
          ],
        },
        {
          name: 'ANALYTICS & ADMIN',
          rows: [
            { feature: 'Reports', free: '—', starter: 'Basic', growth: 'Full', pro: 'Advanced' },
            { feature: 'Export data', free: '—', starter: 'CSV', growth: 'CSV + API', pro: 'Full API' },
            { feature: 'Integrations', free: '—', starter: '2', growth: 'All', pro: 'All + Custom' },
            { feature: 'AI SDR features', free: '—', starter: '—', growth: '—', pro: '✓' },
            { feature: 'Roles & permissions', free: '—', starter: '—', growth: '—', pro: '✓' },
            { feature: 'SSO / SCIM', free: '—', starter: '—', growth: '—', pro: '✓' },
          ],
        },
        {
          name: 'SUPPORT',
          rows: [
            { feature: 'Support channel', free: 'Community', starter: 'Email', growth: 'Priority', pro: 'Dedicated' },
            { feature: 'Onboarding', free: 'Self-serve', starter: 'Self-serve', growth: 'Guided', pro: 'Dedicated' },
            { feature: 'SLA', free: '—', starter: '—', growth: '—', pro: '✓' },
          ],
        },
      ],

      // FAQ
      faqHeading: 'Frequently asked questions',
      faqs: [
        {
          question: 'Is there really a free plan?',
          answer:
            "Yes — Revnator's free plan includes up to 100 contacts, 1 email sequence, and basic pipeline management. It's free forever, no credit card required.",
        },
        {
          question: 'Can I switch plans at any time?',
          answer:
            'Absolutely. Upgrade, downgrade, or cancel anytime from your account settings. Changes take effect at the start of your next billing cycle.',
        },
        {
          question: 'What happens when my trial ends?',
          answer:
            "After your 14-day trial, you'll automatically move to the Free plan unless you choose to upgrade. No charges, no surprises.",
        },
        {
          question: 'Do you offer discounts for annual billing?',
          answer:
            'Yes — all annual plans come with a 20% discount compared to monthly billing. The savings are applied automatically when you select annual billing.',
        },
        {
          question: 'Can I import my contacts from another CRM?',
          answer:
            'Yes. Revnator supports CSV import with smart field mapping. We also have import guides for HubSpot, Salesforce, Pipedrive, and spreadsheet-based CRMs.',
        },
        {
          question: 'Is my data secure?',
          answer:
            "Your data is encrypted at rest and in transit. We use industry-standard security with row-level isolation, ensuring each workspace's data is completely separate.",
        },
        {
          question: 'Do you offer refunds?',
          answer:
            "We offer a full refund within the first 30 days of any paid plan if you're not satisfied. No questions asked.",
        },
        {
          question: 'What if I need more than what Pro offers?',
          answer:
            'Our Enterprise plan includes custom limits, SSO, SCIM, dedicated onboarding, SLA guarantees, and a dedicated account manager. Contact our sales team to discuss.',
        },
      ],

      // Final CTA
      ctaHeading: 'Start closing more deals today',
      ctaSubheading: '14-day free trial. No credit card. Cancel anytime.',
      ctaPrimaryCta: { label: 'Start free trial', href: '/signup' },
      ctaSecondaryCta: { label: 'Compare plans', href: '#comparison' },
    },
  })
  console.log('  ✓ Pricing Page seeded')

  // ── 3. WHY REVNATOR ──
  console.log('Seeding Why Revnator...')
  await payload.updateGlobal({
    slug: 'why-revnator',
    context,
    data: {
      // Hero
      heroLabel: 'WHY REVNATOR',
      heroHeading: 'The sales OS that replaces your entire stack',
      heroSubheading:
        'Most sales teams juggle 5-7 tools. Revnator gives you everything in one workspace — CRM, sequences, pipeline, calendar, analytics, and AI.',
      heroPrimaryCta: { label: 'Start free trial', href: '/signup' },
      heroSecondaryCta: { label: 'See pricing', href: '/pricing' },

      // Pain Points
      painPointsLabel: 'THE PROBLEM',
      painPointsHeading: 'Your sales stack is working against you',
      painPoints: [
        {
          number: '01',
          title: 'Tool overload',
          description:
            'CRM in one tab. Email tool in another. Pipeline in a spreadsheet. Calendar somewhere else. Your reps waste hours just switching context.',
        },
        {
          number: '02',
          title: 'Data lives in silos',
          description:
            "Contact data doesn't sync with your email tool. Pipeline doesn't reflect email engagement. Reports require manual CSV exports.",
        },
        {
          number: '03',
          title: 'Costs add up fast',
          description:
            "Salesforce at $75/user. Outreach at $100/user. Calendar tool at $15/user. You're spending $200+/user/month before your reps send a single email.",
        },
      ],

      // Before / After
      beforeAfterLabel: 'THE SOLUTION',
      beforeAfterHeading: 'One platform. Zero friction.',
      withoutTools: [
        { name: 'HubSpot CRM', price: '$90/mo' },
        { name: 'Outreach', price: '$100/mo' },
        { name: 'Calendly', price: '$15/mo' },
        { name: 'Slack', price: '$12/mo' },
        { name: 'Mailchimp', price: '$30/mo' },
        { name: 'Spreadsheets', price: '$0 (hours lost)' },
      ],
      withCapabilities: [
        { text: 'Contact CRM — included' },
        { text: 'Email sequences — included' },
        { text: 'Calendar & booking — included' },
        { text: 'Team chat — included' },
        { text: 'Campaigns — included' },
        { text: 'Reports & analytics — included' },
      ],
      revnatorPrice: 'From $39/user/month',

      // Value Props
      valuePropsLabel: 'WHY TEAMS CHOOSE US',
      valuePropsHeading: 'Built for the way you actually sell',
      valueProps: [
        {
          icon: 'Zap',
          heading: 'Up and running in 5 minutes',
          description:
            'No implementation team needed. No training sessions. Sign up, import contacts, launch your first sequence — all in one sitting.',
          bullets: [
            { text: 'One-click email connection (Gmail, Outlook)' },
            { text: 'CSV import with smart field mapping' },
            { text: 'Pre-built sequence templates to start immediately' },
          ],
        },
        {
          icon: 'Target',
          heading: 'Designed for reps, not admins',
          description:
            'Every other CRM needs a dedicated admin. Revnator is opinionated and self-serve — your reps open it and start selling.',
          bullets: [
            { text: 'Daily workspace with tasks, calls, and follow-ups' },
            { text: 'Pipeline updates with drag-and-drop simplicity' },
            { text: 'Zero configuration required to get value' },
          ],
        },
        {
          icon: 'Sparkles',
          heading: 'AI that works with your team, not instead of it',
          description:
            "Revnator's AI handles the grunt work — researching accounts, drafting emails, suggesting next steps — while your reps focus on conversations.",
          bullets: [
            { text: 'AI-drafted email personalization' },
            { text: 'Smart next-step suggestions' },
            { text: 'Account research automation' },
          ],
        },
      ],

      // FAQ
      faqHeading: 'Common questions',
      faqs: [
        {
          question: 'How is Revnator different from HubSpot?',
          answer:
            'HubSpot is powerful but expensive and complex. Revnator gives you the core sales features — CRM, sequences, pipeline, reports — at a fraction of the cost, with zero setup complexity.',
        },
        {
          question: 'Can I migrate from my current CRM?',
          answer:
            'Yes. Import contacts via CSV with smart field mapping. We have migration guides for HubSpot, Salesforce, and Pipedrive.',
        },
        {
          question: 'Is Revnator right for my team size?',
          answer:
            'Revnator works for teams of 1 to 50. Solo founders use the free plan. Growing teams use Growth. High-velocity teams use Pro.',
        },
        {
          question: 'Do I need technical skills to set up?',
          answer:
            'Not at all. Revnator is fully self-serve. Connect your email, import contacts, and you\'re selling in minutes.',
        },
        {
          question: 'What integrations do you support?',
          answer:
            'Gmail, Outlook, Google Calendar, Salesforce, HubSpot, Pipedrive, Zapier, Slack, Stripe, SendGrid, and more.',
        },
        {
          question: 'Is there a free plan?',
          answer:
            'Yes — free forever with up to 100 contacts, 1 sequence, and basic pipeline. No credit card required.',
        },
      ],

      // Final CTA
      ctaHeading: 'Ready to simplify your sales stack?',
      ctaSubheading: 'Free for up to 3 users. Set up in 5 minutes.',
      ctaPrimaryCta: { label: 'Start free trial', href: '/signup' },
      ctaSecondaryCta: { label: 'Book a demo', href: '/demo' },
    },
  })
  console.log('  ✓ Why Revnator seeded')

  // ── 4. ABOUT PAGE ──
  console.log('Seeding About Page...')
  await payload.updateGlobal({
    slug: 'about-page',
    context,
    data: {
      // Hero
      heroLabel: 'ABOUT REVNATOR',
      heroHeading: 'Building the sales OS the world deserves',
      heroSubheading:
        'We started Revnator because the sales tools we used were bloated, expensive, and built for IT departments — not the reps actually closing deals.',

      // Mission
      missionLabel: 'OUR MISSION',
      missionHeading: 'Sales tools should help you sell, not slow you down.',
      missionParagraphs: [
        {
          text: 'Most CRMs are built for managers who track activity. Revnator is built for closers who drive revenue. We obsess over speed, simplicity, and the feeling of being in flow.',
        },
        {
          text: 'Every feature we ship answers one question: does this help a salesperson close more deals, faster? If the answer is no, it doesn\'t ship.',
        },
      ],

      // Story
      storyLabel: 'OUR STORY',
      storyHeading: 'How we got here',
      milestones: [
        {
          year: '2024',
          title: 'The frustration',
          description:
            'Sabareesh, working as a solo founder, realized he was spending more time managing 5 different sales tools than actually selling. He decided there had to be a better way.',
        },
        {
          year: '2025',
          title: 'First lines of code',
          description:
            "Revnator's first prototype shipped in March 2025 — a unified workspace combining contacts, email sequences, and pipeline. Built nights and weekends.",
        },
        {
          year: '2025',
          title: 'First customers',
          description:
            'By Q4, the first wave of beta users joined. Their feedback shaped what Revnator is today: a sales OS built by closers, for closers.',
        },
        {
          year: '2026',
          title: 'Public launch',
          description:
            'Revnator launches to the world. 9 integrated modules. One platform. Built for the lean B2B sales teams who refuse to drown in tools.',
        },
      ],

      // Values
      valuesLabel: 'WHAT WE BELIEVE',
      valuesHeading: 'The principles that guide every decision',
      values: [
        {
          icon: 'Zap',
          title: 'Speed over scope',
          description:
            "We'd rather ship 10 great features than 100 average ones. Every feature must justify its place in the product.",
        },
        {
          icon: 'Users',
          title: 'Built for users, not buyers',
          description:
            'Most CRMs are designed to win deals with procurement. We design for the person who opens the app every morning.',
        },
        {
          icon: 'Heart',
          title: 'Honest pricing, always',
          description:
            "No 'contact sales' tricks. No hidden enterprise tiers. Our prices are public, simple, and stay that way.",
        },
      ],

      // Team
      teamLabel: 'THE TEAM',
      teamHeading: 'Meet the founder',
      teamSubheading:
        "Revnator is currently a solo-founder operation. We're growing soon.",
      founder: {
        initials: 'S',
        name: 'Sabareesh S R',
        title: 'Founder & CEO',
        bio: 'Former sales operator turned founder. Built Revnator after years of fighting bloated CRMs that slowed his teams down. Believes the best sales tools are the ones reps actually want to use.',
      },

      // Final CTA
      ctaHeading: 'Join us in building the future of sales',
      ctaSubheading: 'Try Revnator free, or get in touch.',
      ctaPrimaryCta: { label: 'Start free trial', href: '/signup' },
      ctaSecondaryCta: { label: 'Contact us', href: '/contact' },
    },
  })
  console.log('  ✓ About Page seeded')

  // ── 5. PLATFORM PAGE ──
  console.log('Seeding Platform Page...')
  await payload.updateGlobal({
    slug: 'platform-page',
    context,
    data: {
      // Hero
      heroBadge: 'PLATFORM',
      heroHeading: 'Everything your sales team needs. One platform.',
      heroSubheading:
        '9 integrated modules built to work together — no plugins, no integrations, no duct tape.',
      heroPrimaryCta: { label: 'Start free trial', href: '/signup' },
      heroSecondaryCta: { label: 'Book a demo', href: '/demo' },

      // Modules Grid
      gridLabel: 'MODULES',
      gridHeading: 'Built for every stage of your sales process',
      gridSubheading: 'Click any module to explore its features in depth',

      // Connected
      connectedLabel: 'CONNECTED',
      connectedHeading: 'Every module feeds every other module',
      connectedSubheading:
        'Unlike point solutions, Revnator modules share data natively. A contact captured in Forms flows into Sequences, appears in Pipeline, and shows up in Reports — automatically.',
      connectedStats: [
        { value: '9', label: 'Integrated modules' },
        { value: '0', label: 'External tools needed' },
        { value: '1', label: 'Unified workspace' },
      ],

      // Pricing Teaser
      pricingLabel: 'PRICING',
      pricingHeading: 'All modules. One simple price.',
      pricingSubheading: 'Starting at $39/user/month for the full platform.',
      pricingPills: [
        { name: 'Free', price: '$0' },
        { name: 'Growth', price: '$39/mo' },
        { name: 'Pro', price: '$69/mo' },
      ],

      // Final CTA
      ctaHeading: 'See the full platform in action',
      ctaSubheading: '14-day free trial. No credit card required.',
      ctaPrimaryCta: { label: 'Start free trial', href: '/signup' },
      ctaSecondaryCta: { label: 'Book a demo', href: '/demo' },
    },
  })
  console.log('  ✓ Platform Page seeded')

  // ── 6. SUPPORT PAGE ──
  console.log('Seeding Support Page...')
  await payload.updateGlobal({
    slug: 'support-page',
    context,
    data: {
      // Hero
      heroLabel: 'SUPPORT',
      heroHeading: 'How can we help?',
      heroSubheading:
        'Browse documentation, reach out to our team, or join the community.',

      // Channels
      channels: [
        {
          icon: 'BookOpen',
          title: 'Documentation',
          description: 'Step-by-step guides for every module',
          linkText: 'Browse docs →',
          href: '/docs',
        },
        {
          icon: 'Mail',
          title: 'Email us',
          description: 'Get a response within 24 hours',
          linkText: 'support@revnator.com',
          href: 'mailto:support@revnator.com',
        },
        {
          icon: 'Users',
          title: 'Community',
          description: 'Connect with other Revnator users',
          linkText: 'Join community →',
          href: '/community',
        },
      ],

      // Knowledge Base
      kbHeading: 'Browse by topic',
      kbCategories: [
        { icon: 'Rocket', title: 'Getting started', articleCount: '12 articles', href: '/docs/getting-started' },
        { icon: 'Users', title: 'Contacts & CRM', articleCount: '18 articles', href: '/docs/contacts' },
        { icon: 'Mail', title: 'Email & Sequences', articleCount: '15 articles', href: '/docs/email' },
        { icon: 'GitBranch', title: 'Pipeline & Deals', articleCount: '10 articles', href: '/docs/pipeline' },
        { icon: 'Calendar', title: 'Calendar & Scheduling', articleCount: '8 articles', href: '/docs/calendar' },
        { icon: 'BarChart3', title: 'Reports & Analytics', articleCount: '9 articles', href: '/docs/reports' },
        { icon: 'CreditCard', title: 'Account & Billing', articleCount: '6 articles', href: '/docs/billing' },
        { icon: 'Plug', title: 'Integrations', articleCount: '11 articles', href: '/docs/integrations' },
      ],

      // FAQ
      faqHeading: 'Frequently asked questions',
      faqs: [
        {
          question: 'How do I get started with Revnator?',
          answer:
            'Sign up for free, connect your email, and import your contacts. Our quick start guide walks you through the first 5 minutes.',
        },
        {
          question: 'What if I get stuck during setup?',
          answer:
            'Check our documentation for step-by-step guides, or email support@revnator.com for help. We typically respond within 24 hours.',
        },
        {
          question: 'Can I migrate from another CRM?',
          answer:
            'Yes. We support CSV import with smart field mapping. Migration guides are available for HubSpot, Salesforce, Pipedrive, and others.',
        },
        {
          question: 'How do I report a bug?',
          answer:
            'Use the in-app feedback button or email bugs@revnator.com with a description and screenshot. We track and respond to every report.',
        },
        {
          question: 'Where can I request a new feature?',
          answer:
            'Submit feature requests through our community forum or email feedback@revnator.com. Popular requests get prioritized in our roadmap.',
        },
        {
          question: 'Do you offer paid support plans?',
          answer:
            'Pro and Enterprise plans include priority support with faster response times. Enterprise customers also get a dedicated account manager.',
        },
      ],

      // Final CTA
      ctaHeading: "Can't find what you need?",
      ctaSubheading: 'Our support team is here to help.',
      ctaPrimaryCta: { label: 'Contact our team', href: 'mailto:support@revnator.com' },
      ctaSecondaryCta: { label: 'Browse docs', href: '/docs' },
    },
  })
  console.log('  ✓ Support Page seeded')

  // ── 7. CONTACT PAGE ──
  console.log('Seeding Contact Page...')
  await payload.updateGlobal({
    slug: 'contact-page',
    context,
    data: {
      // Hero
      heroLabel: 'GET IN TOUCH',
      heroHeading: "We'd love to hear from you",
      heroSubheading:
        'Questions about Revnator? Want a demo? Looking to partner? Drop us a line.',

      // Contact Options
      contactOptions: [
        {
          icon: 'Mail',
          title: 'Sales inquiries',
          linkLabel: 'sales@revnator.com',
          href: 'mailto:sales@revnator.com',
        },
        {
          icon: 'HelpCircle',
          title: 'Customer support',
          linkLabel: 'support@revnator.com',
          href: 'mailto:support@revnator.com',
        },
        {
          icon: 'Briefcase',
          title: 'Partnerships',
          linkLabel: 'hello@revnator.com',
          href: 'mailto:hello@revnator.com',
        },
      ],

      // Contact Info
      contactInfoBlocks: [
        {
          icon: 'MapPin',
          label: 'OFFICE',
          text: 'Coimbatore, Tamil Nadu, India',
        },
        {
          icon: 'Clock',
          label: 'SUPPORT HOURS',
          text: 'Monday - Friday, 9:00 AM - 6:00 PM IST',
        },
        {
          icon: 'Mail',
          label: 'RESPONSE TIME',
          text: 'Usually within 24 hours, often sooner.',
        },
      ],

      // Form
      formHeading: 'Send us a message',
      subjectOptions: [
        { label: 'General inquiry' },
        { label: 'Sales question' },
        { label: 'Demo request' },
        { label: 'Partnership' },
        { label: 'Other' },
      ],
    },
  })
  console.log('  ✓ Contact Page seeded')

  console.log('\n✅ All 7 page globals seeded successfully!')
  process.exit(0)
}

seedPages().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
