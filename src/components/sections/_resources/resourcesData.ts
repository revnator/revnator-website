// ── Resource types (discriminated union) ──

export const resourceTypes = [
  'All',
  'Ebooks',
  'Case Studies',
  'Webinars',
  'Whitepapers',
  'Templates',
  'Success Stories',
] as const

export type ResourceFilterCategory = (typeof resourceTypes)[number]

interface ResourceBase {
  id: string
  slug: string
  title: string
  description: string
  filterCategory: ResourceFilterCategory
}

// ── Ebook ──

export interface EbookResource extends ResourceBase {
  type: 'ebooks'
  filterCategory: 'Ebooks'
  pages: number
  readTime: string
  chapters: string[]
  bodyIntro: string
}

// ── Case Study ──

export interface CaseStudyMetric {
  value: string
  label: string
}

export interface CaseStudySection {
  label: string
  heading: string
  paragraphs: string[]
}

export interface CaseStudyResource extends ResourceBase {
  type: 'case-studies'
  filterCategory: 'Case Studies'
  company: string
  industry: string
  metrics: CaseStudyMetric[]
  sections: CaseStudySection[]
  quote: { text: string; author: string; title: string }
}

// ── Webinar ──

export interface WebinarSpeaker {
  name: string
  title: string
  initials: string
}

export interface WebinarResource extends ResourceBase {
  type: 'webinars'
  filterCategory: 'Webinars'
  isUpcoming: boolean
  date: string
  time: string
  duration: string
  speakers: WebinarSpeaker[]
  learnings: string[]
  registeredCount?: number
}

// ── Whitepaper ──

export interface WhitepaperFinding {
  value: string
  text: string
}

export interface WhitepaperResource extends ResourceBase {
  type: 'whitepapers'
  filterCategory: 'Whitepapers'
  pages: number
  subtitle: string
  keyFindings: WhitepaperFinding[]
  contents: string[]
}

// ── Template ──

export interface TemplateResource extends ResourceBase {
  type: 'templates'
  filterCategory: 'Templates'
  useCase: string
  preview: string
  included: string[]
}

// ── Success Story ──

export interface SuccessStorySnapshot {
  label: string
  value: string
}

export interface SuccessStoryQA {
  question: string
  answer: string
}

export interface SuccessStoryResource extends ResourceBase {
  type: 'success-stories'
  filterCategory: 'Success Stories'
  company: string
  quote: { text: string; author: string; title: string }
  snapshot: SuccessStorySnapshot[]
  qa: SuccessStoryQA[]
  calloutMetric: { value: string; context: string }
}

export type Resource =
  | EbookResource
  | CaseStudyResource
  | WebinarResource
  | WhitepaperResource
  | TemplateResource
  | SuccessStoryResource

// ── Card display label ──

export const typeDisplayLabel: Record<Resource['type'], string> = {
  ebooks: 'Ebook',
  'case-studies': 'Case Study',
  webinars: 'Webinar',
  whitepapers: 'Whitepaper',
  templates: 'Template',
  'success-stories': 'Success Story',
}

export const typeCardCta: Record<Resource['type'], string> = {
  ebooks: 'Download free',
  'case-studies': 'Read',
  webinars: 'Watch now',
  whitepapers: 'Download free',
  templates: 'Get template',
  'success-stories': 'Read',
}

// ── Data ──

export const resourcesData: Resource[] = [
  // ── Ebooks ──
  {
    id: 'eb-1',
    type: 'ebooks',
    filterCategory: 'Ebooks',
    slug: 'cold-email-playbook',
    title: 'The Cold Email Playbook: 50 Templates That Book Meetings',
    description:
      'A comprehensive guide to cold outreach with proven templates, subject lines, and follow-up strategies used by top SDR teams.',
    pages: 45,
    readTime: '20 min read',
    chapters: [
      'Chapter 1: The anatomy of a high-converting cold email',
      'Chapter 2: 15 first-touch templates by industry',
      'Chapter 3: Follow-up sequences that feel natural',
      'Chapter 4: Subject line formulas with 40%+ open rates',
      'Chapter 5: Measuring and optimizing your sequences',
    ],
    bodyIntro:
      'Cold email remains the most scalable prospecting channel for B2B sales teams. But most reps struggle with low reply rates because they rely on generic templates. This playbook gives you 50 battle-tested templates organized by industry, persona, and sales stage — plus the frameworks to write your own.',
  },
  {
    id: 'eb-2',
    type: 'ebooks',
    filterCategory: 'Ebooks',
    slug: 'pipeline-management-guide',
    title: 'The Definitive Guide to Pipeline Management',
    description:
      'Learn how top-performing sales teams build, manage, and forecast their pipeline with actionable frameworks.',
    pages: 38,
    readTime: '18 min read',
    chapters: [
      'Chapter 1: Building a healthy pipeline from scratch',
      'Chapter 2: Stage definitions that drive accountability',
      'Chapter 3: Pipeline velocity and how to improve it',
      'Chapter 4: Forecasting accuracy for sales leaders',
      'Chapter 5: Pipeline reviews that reps actually value',
    ],
    bodyIntro:
      'Your pipeline is the most reliable predictor of revenue. Yet most sales teams treat it as a passive tracking tool rather than an active selling system. This guide shows you how to build pipeline discipline into your daily workflow — from stage definitions to forecasting models.',
  },

  // ── Case Studies ──
  {
    id: 'cs-1',
    type: 'case-studies',
    filterCategory: 'Case Studies',
    slug: 'techcorp-success',
    title: 'How TechCorp increased pipeline 2.5x with Revnator',
    description:
      'TechCorp consolidated 5 sales tools into Revnator, cutting costs by 60% and doubling their meeting booking rate.',
    company: 'TechCorp',
    industry: 'SaaS',
    metrics: [
      { value: '93%', label: 'increase in reply rate' },
      { value: '2.5x', label: 'more meetings booked' },
      { value: '45%', label: 'reduction in sales cycle' },
      { value: '6 months', label: 'ROI achieved' },
    ],
    sections: [
      {
        label: 'THE CHALLENGE',
        heading: 'Drowning in disconnected tools',
        paragraphs: [
          'TechCorp\'s sales team of 12 was using HubSpot for CRM, Outreach for sequences, Calendly for bookings, and spreadsheets for reporting. Reps spent 2+ hours per day on admin tasks instead of selling.',
          'Data silos meant pipeline reports were always stale, and managers couldn\'t see which sequences drove the most meetings without exporting CSVs from three different tools.',
        ],
      },
      {
        label: 'THE SOLUTION',
        heading: 'Unifying the sales workflow',
        paragraphs: [
          'TechCorp migrated to Revnator in a single weekend. The team imported 8,000 contacts via CSV, connected their Gmail accounts, and launched their first sequences on Monday morning.',
          'With contacts, sequences, pipeline, and calendar in one workspace, reps immediately saw fewer context switches. Managers got real-time visibility into pipeline health without manual exports.',
        ],
      },
      {
        label: 'THE RESULTS',
        heading: 'From scattered to scalable',
        paragraphs: [
          'Within 3 months, TechCorp\'s outbound reply rate jumped from 4% to 7.7% — a 93% increase. The team booked 2.5x more meetings per rep per week, driven by better sequence personalization and faster follow-ups.',
          'The combined tooling cost dropped from $210/user/month to $39/user/month. Over 12 months, TechCorp saved over $120,000 in software costs alone — not counting the productivity gains.',
        ],
      },
    ],
    quote: {
      text: 'Revnator gave us back 2 hours per rep per day. That\'s 10 hours a week of pure selling time we didn\'t have before.',
      author: 'Sarah Chen',
      title: 'VP of Sales, TechCorp',
    },
  },
  {
    id: 'cs-2',
    type: 'case-studies',
    filterCategory: 'Case Studies',
    slug: 'growthio-case-study',
    title: 'GrowthIO reduced sales cycle by 40% in 90 days',
    description:
      'A 6-person startup replaced Salesforce and Outreach with Revnator, achieving faster deal velocity and 100% rep adoption.',
    company: 'GrowthIO',
    industry: 'FinTech',
    metrics: [
      { value: '40%', label: 'shorter sales cycle' },
      { value: '100%', label: 'rep adoption rate' },
      { value: '$85K', label: 'annual savings' },
      { value: '3 days', label: 'migration time' },
    ],
    sections: [
      {
        label: 'THE CHALLENGE',
        heading: 'Enterprise tools for a startup budget',
        paragraphs: [
          'GrowthIO was paying enterprise-grade prices for Salesforce and Outreach — tools built for 500-person teams, not a lean startup of 6 reps. Configuration alone required a part-time admin.',
          'Deal velocity was suffering because pipeline updates happened in Salesforce while outreach lived in a separate tool. Reps often forgot to update deal stages, making forecasts unreliable.',
        ],
      },
      {
        label: 'THE SOLUTION',
        heading: 'Right-sized tools for a fast-moving team',
        paragraphs: [
          'GrowthIO migrated all contacts and deal data to Revnator in 3 days. The self-serve setup meant no admin was needed — reps configured their own workspaces.',
          'With pipeline and sequences in the same tool, deal stages updated automatically based on email engagement. A replied lead moved to "Engaged" without manual input.',
        ],
      },
      {
        label: 'THE RESULTS',
        heading: 'Faster deals, lower costs',
        paragraphs: [
          'GrowthIO\'s average sales cycle dropped from 35 days to 21 days. Reps credited the unified workspace — seeing a contact\'s full history before every call made conversations more effective.',
          'Annual tooling costs fell from $145K to $60K. Every rep adopted Revnator on day one because it was simpler than what they had before — a first for any CRM rollout at the company.',
        ],
      },
    ],
    quote: {
      text: 'We went from fighting our CRM to actually enjoying it. That sounds small but it changed everything about how our team sells.',
      author: 'Marcus Rivera',
      title: 'Head of Revenue, GrowthIO',
    },
  },

  // ── Webinars ──
  {
    id: 'wb-1',
    type: 'webinars',
    filterCategory: 'Webinars',
    slug: 'outbound-masterclass-2026',
    title: 'Outbound Masterclass: Build a $1M Pipeline in 90 Days',
    description:
      'Live session with top SDR leaders on building repeatable outbound pipelines from scratch.',
    isUpcoming: true,
    date: 'Thursday, April 24, 2026',
    time: '2:00 PM EST',
    duration: '45 minutes',
    speakers: [
      { name: 'Sabareesh S R', title: 'Founder, Revnator', initials: 'SS' },
      { name: 'Priya Nair', title: 'Head of Sales, ScaleUp', initials: 'PN' },
    ],
    learnings: [
      'How to build an ICP-driven target list from scratch',
      'Sequence architecture for 15%+ reply rates',
      'Pipeline math: working backwards from revenue targets',
      'Live Q&A with the speakers',
    ],
    registeredCount: 127,
  },
  {
    id: 'wb-2',
    type: 'webinars',
    filterCategory: 'Webinars',
    slug: 'crm-migration-workshop',
    title: 'CRM Migration Workshop: Moving to Revnator in a Weekend',
    description:
      'Recorded session walking through a complete CRM migration — from data export to first sequence launch.',
    isUpcoming: false,
    date: 'March 12, 2026',
    time: '1:00 PM EST',
    duration: '38 minutes',
    speakers: [
      { name: 'Sabareesh S R', title: 'Founder, Revnator', initials: 'SS' },
    ],
    learnings: [
      'Exporting contacts from HubSpot, Salesforce, and Pipedrive',
      'Smart field mapping for clean imports',
      'Rebuilding sequences in Revnator',
      'Verifying data integrity after migration',
    ],
  },

  // ── Whitepapers ──
  {
    id: 'wp-1',
    type: 'whitepapers',
    filterCategory: 'Whitepapers',
    slug: 'state-of-sales-tools-2026',
    title: 'The State of Sales Tools in 2026',
    description:
      'Original research on how B2B sales teams buy, use, and consolidate their software stack.',
    pages: 32,
    subtitle: 'A Revnator Research Report · Q1 2026 · 32 pages',
    keyFindings: [
      { value: '78%', text: 'of sales teams use 5+ disconnected tools' },
      { value: '3.2x', text: 'higher close rate with unified platforms' },
      { value: '47%', text: 'of rep time wasted on non-selling activities' },
    ],
    contents: [
      'Executive summary and methodology',
      'The fragmentation problem: survey results',
      'Cost analysis: point solutions vs. unified platforms',
      'Impact on rep productivity and deal velocity',
      'Recommendations for sales leaders',
    ],
  },
  {
    id: 'wp-2',
    type: 'whitepapers',
    filterCategory: 'Whitepapers',
    slug: 'email-deliverability-report',
    title: 'Email Deliverability in the Age of AI Filtering',
    description:
      'How AI-powered spam filters are changing cold email, and what senders need to do differently in 2026.',
    pages: 24,
    subtitle: 'A Revnator Research Report · Q1 2026 · 24 pages',
    keyFindings: [
      { value: '62%', text: 'of cold emails never reach the primary inbox' },
      { value: '4.2x', text: 'deliverability improvement with warm-up protocols' },
      { value: '89%', text: 'of buyers open emails from authenticated domains' },
    ],
    contents: [
      'How modern spam filters evaluate sender reputation',
      'The email warm-up protocol that works',
      'Authentication setup: SPF, DKIM, DMARC',
      'Content patterns that trigger AI filters',
      'Benchmark data from 10M+ emails sent via Revnator',
    ],
  },

  // ── Templates ──
  {
    id: 'tp-1',
    type: 'templates',
    filterCategory: 'Templates',
    slug: 'cold-email-sequence-template',
    title: 'Cold Email Sequence Template — 5-Step Follow-Up',
    description:
      'A battle-tested 5-email sequence for cold outbound to mid-market SaaS companies.',
    useCase: 'Best for: SDRs doing outbound to mid-market SaaS',
    preview: `Subject: {{first_name}}, quick question about {{company}}

Hi {{first_name}},

I noticed {{company}} is growing fast in the {{industry}} space.
We help teams like yours streamline outbound and book 2x more
meetings without adding headcount.

Would it make sense to chat for 15 minutes this week?

Best,
{{sender_name}}`,
    included: [
      '5 email templates (cold → follow-up → breakup)',
      'Subject line variations for A/B testing',
      'Recommended sending schedule',
      'Personalization variable guide',
    ],
  },
  {
    id: 'tp-2',
    type: 'templates',
    filterCategory: 'Templates',
    slug: 'pipeline-review-template',
    title: 'Weekly Pipeline Review Template for Sales Managers',
    description:
      'A structured agenda template for running effective 15-minute pipeline reviews with your team.',
    useCase: 'Best for: Sales managers running weekly 1:1s with reps',
    preview: `## Weekly Pipeline Review — {{rep_name}}
Date: {{date}} | Manager: {{manager_name}}

### Pipeline Snapshot
- Total pipeline value: $___
- Deals added this week: ___
- Deals closed this week: ___
- Win rate (30d rolling): ___%

### Focus Deals (Top 3)
1. {{deal_name}} — Stage: ___ — Next step: ___
2. {{deal_name}} — Stage: ___ — Next step: ___
3. {{deal_name}} — Stage: ___ — Next step: ___`,
    included: [
      'Pipeline review agenda template',
      'Deal scoring rubric',
      'Stage progression checklist',
      'Example questions for each pipeline stage',
    ],
  },

  // ── Success Stories ──
  {
    id: 'ss-1',
    type: 'success-stories',
    filterCategory: 'Success Stories',
    slug: 'velocitylabs-story',
    title: 'How VelocityLabs built their entire sales engine on Revnator',
    description:
      'From zero process to $2M ARR in 12 months — VelocityLabs shares their journey with Revnator.',
    company: 'VelocityLabs',
    quote: {
      text: 'Revnator changed how our entire sales team operates. We went from spreadsheets to a real sales machine.',
      author: 'Aisha Patel',
      title: 'CEO, VelocityLabs',
    },
    snapshot: [
      { label: 'Industry', value: 'SaaS' },
      { label: 'Team size', value: '12 reps' },
      { label: 'Time using Revnator', value: '6 months' },
      { label: 'Key module', value: 'Email Sequences' },
    ],
    qa: [
      {
        question: 'What was your team using before Revnator?',
        answer:
          'Honestly, a mess. We had contacts in Google Sheets, sequences in Mailchimp, deals tracked in Notion, and calendar links from Calendly. Nothing talked to each other. Reps spent the first hour of every day just getting organized.',
      },
      {
        question: 'How did you discover Revnator?',
        answer:
          'Our VP of Sales saw a demo at a SaaS meetup and was sold immediately. The fact that CRM, sequences, and pipeline lived in one tool was exactly what we needed. We signed up for the Growth plan that week.',
      },
      {
        question: 'What was the implementation experience like?',
        answer:
          'Shockingly easy. We imported 4,000 contacts from our Google Sheet on a Friday afternoon, connected Gmail accounts, and by Monday our reps were sending sequences. No training sessions needed — the UI is that intuitive.',
      },
      {
        question: 'What results have you seen so far?',
        answer:
          'Our outbound reply rate went from 3% to 11%. Meetings booked per rep doubled. But the biggest win is visibility — I can finally see our entire pipeline in one dashboard without stitching together data from 4 tools.',
      },
    ],
    calloutMetric: {
      value: '63%',
      context: 'increase in meetings booked within 3 months',
    },
  },
  {
    id: 'ss-2',
    type: 'success-stories',
    filterCategory: 'Success Stories',
    slug: 'closehq-story',
    title: 'CloseHQ scaled from 2 to 20 reps without switching tools',
    description:
      'CloseHQ chose Revnator on day one and scaled their sales team 10x without ever needing to migrate.',
    company: 'CloseHQ',
    quote: {
      text: 'We picked Revnator at 2 reps and it still works perfectly at 20. That kind of scalability is rare.',
      author: 'James Park',
      title: 'Co-founder, CloseHQ',
    },
    snapshot: [
      { label: 'Industry', value: 'FinTech' },
      { label: 'Team size', value: '20 reps' },
      { label: 'Time using Revnator', value: '14 months' },
      { label: 'Key module', value: 'Pipeline & Deals' },
    ],
    qa: [
      {
        question: 'What was your team using before Revnator?',
        answer:
          'Nothing, actually. We were a 2-person team and needed something from day one. We evaluated HubSpot, Pipedrive, and Revnator. HubSpot was overkill, Pipedrive didn\'t have sequences. Revnator had everything we needed at a price we could afford.',
      },
      {
        question: 'How did you discover Revnator?',
        answer:
          'A founder friend recommended it. He said it was the best tool he\'d found for early-stage sales teams that didn\'t want to piece together 5 different products. He was right.',
      },
      {
        question: 'What was the implementation experience like?',
        answer:
          'We were selling within an hour of signing up. Connected our emails, created a pipeline, built our first sequence — all in one sitting. As we grew, we just added users and created more pipelines. Zero migration pain.',
      },
      {
        question: 'What results have you seen so far?',
        answer:
          'Our average deal velocity is 18 days, which is about half our industry benchmark. The pipeline forecasting has been incredibly accurate — our monthly forecasts are within 5% of actuals. That kind of predictability changes how you plan.',
      },
    ],
    calloutMetric: {
      value: '10x',
      context: 'team growth without a single tool migration',
    },
  },
]

// ── Icon mapping for grid cards ──

export const typeIconName: Record<Resource['type'], string> = {
  ebooks: 'BookOpen',
  'case-studies': 'BarChart3',
  webinars: 'Video',
  whitepapers: 'FileText',
  templates: 'FileCode',
  'success-stories': 'Trophy',
}
