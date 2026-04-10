/**
 * Seed script for all 6 resource collections (12 items total).
 *
 * Run from project root:
 *   npx tsx src/scripts/seed-resources.ts
 */
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import path from 'path'
import { getPayload } from 'payload'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

async function seed(): Promise<void> {
  const configPath = path.resolve(dirname, '../payload.config.ts')
  const configUrl = new URL(`file:///${configPath.replace(/\\/g, '/')}`)

  const payload = await getPayload({
    config: (await import(configUrl.href)).default,
  })

  // ════════════════════════════════════════════
  // EBOOKS (collection slug: 'ebooks')
  // Fields: title, slug, status, description, pages (number), readTime, bodyIntro, chapters[{title}]
  // ════════════════════════════════════════════

  const ebooks = [
    {
      title: 'The 2026 Cold Email Playbook',
      slug: 'cold-email-playbook',
      status: 'published' as const,
      description: 'Everything you need to write cold emails that get replies. Proven templates, sequence structures, and deliverability strategies used by top-performing SDR teams.',
      pages: 45,
      readTime: '20 min read',
      bodyIntro: 'Cold email is the most cost-effective channel for B2B pipeline generation — if done right. This playbook covers the strategies, templates, and tools that top SDR teams use to consistently hit 25%+ reply rates.',
      chapters: [
        { title: 'Subject lines that convert' },
        { title: 'Sequence architecture for different buyer types' },
        { title: 'Domain warm-up and deliverability checklist' },
        { title: '10 proven cold email templates' },
        { title: 'Metrics benchmarks for 2026' },
      ],
    },
    {
      title: 'Pipeline Management for Growing Teams',
      slug: 'pipeline-management-guide',
      status: 'published' as const,
      description: 'How to build, manage, and forecast your sales pipeline as your team scales from 3 to 30 reps.',
      pages: 32,
      readTime: '15 min read',
      bodyIntro: 'Your pipeline is the heartbeat of your sales organization. This guide covers everything from defining stages to forecasting accurately — built for teams that are growing fast.',
      chapters: [
        { title: 'Defining pipeline stages that work' },
        { title: 'Pipeline math and coverage ratios' },
        { title: 'Forecasting methods compared' },
        { title: 'Common pipeline mistakes' },
        { title: 'Scaling pipeline management' },
      ],
    },
  ]

  for (const ebook of ebooks) {
    const existing = await payload.find({ collection: 'ebooks', where: { slug: { equals: ebook.slug } }, limit: 1 })
    if (existing.docs.length > 0) {
      payload.logger.info(`Ebook "${ebook.slug}" already exists, skipping`)
      continue
    }
    await payload.create({ collection: 'ebooks', data: ebook })
    payload.logger.info(`Created ebook: ${ebook.slug}`)
  }

  // ════════════════════════════════════════════
  // CASE STUDIES (collection slug: 'case-studies')
  // Fields: title, slug, status, description, company, industry,
  //   metrics[{value, label}], sections[{label, heading, paragraphs[{text}]}],
  //   quote{text, author, title}
  // ════════════════════════════════════════════

  const caseStudies = [
    {
      title: 'How TechCorp Increased Pipeline 2.5x with Revnator',
      slug: 'techcorp-success',
      status: 'published' as const,
      description: 'TechCorp replaced 4 disconnected tools with Revnator and saw a 2.5x increase in pipeline within 6 months.',
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
            { text: "TechCorp's 12-person sales team was using HubSpot for CRM, Outreach for sequences, Calendly for booking, and Slack for internal communication. Data lived in silos. Reps spent 30% of their time on admin instead of selling." },
          ],
        },
        {
          label: 'THE SOLUTION',
          heading: 'Unifying the sales workflow',
          paragraphs: [
            { text: 'After evaluating several platforms, TechCorp migrated to Revnator in a single weekend. They imported 8,000 contacts, set up 5 email sequences, and configured their pipeline — all without IT support.' },
          ],
        },
        {
          label: 'THE RESULTS',
          heading: 'From scattered to scalable',
          paragraphs: [
            { text: "Within 3 months, TechCorp saw reply rates jump from 12% to 23%. Pipeline coverage went from 2x to 5x. The sales cycle shortened by 45% because reps had full context on every deal without switching tools." },
          ],
        },
      ],
      quote: {
        text: 'Revnator replaced three tools for us. Our reps spend less time on admin and more time closing.',
        author: 'Sarah M.',
        title: 'Head of Sales, TechCorp',
      },
    },
    {
      title: 'How Lighthouse Agency 3x Their Pipeline with Revnator',
      slug: 'lighthouse-agency',
      status: 'published' as const,
      description: 'A 15-person marketing agency replaced spreadsheets and Pipedrive with Revnator, tripling their new business pipeline.',
      company: 'Lighthouse Marketing Agency',
      industry: 'Marketing Agency',
      metrics: [
        { value: '3x', label: 'pipeline growth' },
        { value: '60%', label: 'faster proposals' },
        { value: '12', label: 'new clients in Q1' },
        { value: '4 tools', label: 'replaced' },
      ],
      sections: [
        {
          label: 'THE CHALLENGE',
          heading: 'Outgrowing spreadsheets and Pipedrive',
          paragraphs: [
            { text: 'Lighthouse Marketing Agency had 15 team members tracking prospects across Google Sheets, Pipedrive, and email threads. New business development was unpredictable — they had no visibility into what was in the pipeline or why deals stalled.' },
          ],
        },
        {
          label: 'THE SOLUTION',
          heading: 'A unified workspace for agency sales',
          paragraphs: [
            { text: "Lighthouse migrated to Revnator and set up custom pipeline stages for their agency workflow: Lead → Discovery Call → Proposal Sent → Negotiation → Won. They imported 3,200 contacts and built 4 outbound sequences targeting different verticals." },
          ],
        },
        {
          label: 'THE RESULTS',
          heading: 'Predictable pipeline, faster proposals',
          paragraphs: [
            { text: "In the first quarter on Revnator, Lighthouse closed 12 new clients — triple their previous quarterly average. Proposals went out 60% faster because all prospect context lived in one place. The founder finally had a dashboard he could trust for forecasting." },
          ],
        },
      ],
      quote: {
        text: 'Revnator changed how our entire sales team operates. We pitch faster, onboard cleaner, and retain better.',
        author: 'David L.',
        title: 'CEO, Lighthouse Marketing Agency',
      },
    },
  ]

  for (const cs of caseStudies) {
    const existing = await payload.find({ collection: 'case-studies', where: { slug: { equals: cs.slug } }, limit: 1 })
    if (existing.docs.length > 0) {
      payload.logger.info(`Case study "${cs.slug}" already exists, skipping`)
      continue
    }
    await payload.create({ collection: 'case-studies', data: cs })
    payload.logger.info(`Created case study: ${cs.slug}`)
  }

  // ════════════════════════════════════════════
  // WEBINARS (collection slug: 'webinars')
  // Fields: title, slug, status, description, isUpcoming (checkbox), date, time,
  //   duration, speakers[{name, title, initials}], learnings[{text}], registeredCount (number)
  // ════════════════════════════════════════════

  const webinars = [
    {
      title: 'Cold Email Masterclass: From Zero to Pipeline',
      slug: 'cold-email-masterclass',
      status: 'published' as const,
      description: 'Learn the exact frameworks top SDRs use to build pipeline from scratch. Live Q&A included.',
      isUpcoming: true,
      date: 'Thursday, April 24, 2026',
      time: '2:00 PM EST',
      duration: '45 minutes',
      speakers: [
        { name: 'Sabareesh S R', title: 'Founder & CEO, Revnator', initials: 'SR' },
        { name: 'Sarah M.', title: 'Head of Sales, TechCorp', initials: 'SM' },
      ],
      learnings: [
        { text: 'How to write subject lines that get 40%+ open rates' },
        { text: 'The 5-step sequence structure that converts' },
        { text: 'Domain warm-up strategies for new senders' },
        { text: 'Live teardown of real cold email campaigns' },
      ],
      registeredCount: 127,
    },
    {
      title: 'Pipeline Forecasting 101: Stop Guessing, Start Knowing',
      slug: 'pipeline-forecasting-101',
      status: 'published' as const,
      description: 'A deep dive into weighted pipeline forecasting, coverage ratios, and data-driven quota planning.',
      isUpcoming: false,
      date: 'March 15, 2026',
      time: 'Recorded',
      duration: '45 min recording',
      speakers: [
        { name: 'Sabareesh S R', title: 'Founder & CEO, Revnator', initials: 'SR' },
      ],
      learnings: [
        { text: 'How to calculate pipeline coverage ratios' },
        { text: 'Weighted vs unweighted forecasting methods' },
        { text: 'Setting realistic quotas with historical data' },
        { text: 'Building a forecasting cadence your team will follow' },
      ],
    },
  ]

  for (const webinar of webinars) {
    const existing = await payload.find({ collection: 'webinars', where: { slug: { equals: webinar.slug } }, limit: 1 })
    if (existing.docs.length > 0) {
      payload.logger.info(`Webinar "${webinar.slug}" already exists, skipping`)
      continue
    }
    await payload.create({ collection: 'webinars', data: webinar })
    payload.logger.info(`Created webinar: ${webinar.slug}`)
  }

  // ════════════════════════════════════════════
  // WHITEPAPERS (collection slug: 'whitepapers')
  // Fields: title, slug, status, description, subtitle, pages (number),
  //   keyFindings[{value, text}], contents[{title}]
  // ════════════════════════════════════════════

  const whitepapers = [
    {
      title: 'The State of Sales Tools 2026',
      slug: 'state-of-sales-tools-2026',
      status: 'published' as const,
      description: 'We surveyed 500 sales teams to understand how they buy, use, and feel about their sales tools. The results reveal a market ready for consolidation.',
      subtitle: 'A Revnator Research Report · Q1 2026 · 32 pages',
      pages: 32,
      keyFindings: [
        { value: '78%', text: 'of sales teams use 5+ disconnected tools' },
        { value: '3.2x', text: 'higher close rate with unified platforms' },
        { value: '47%', text: 'of rep time wasted on non-selling activities' },
      ],
      contents: [
        { title: 'Executive summary' },
        { title: 'Methodology and demographics' },
        { title: 'Tool sprawl: the current state' },
        { title: 'The cost of fragmentation' },
        { title: 'What top performers do differently' },
        { title: 'The case for platform consolidation' },
        { title: 'Recommendations' },
      ],
    },
    {
      title: 'AI in Sales: What Actually Works in 2026',
      slug: 'ai-in-sales-report',
      status: 'published' as const,
      description: 'Cutting through the AI hype to find what actually moves the needle for B2B sales teams.',
      subtitle: 'A Revnator Research Report · Q2 2026 · 28 pages',
      pages: 28,
      keyFindings: [
        { value: '62%', text: 'of teams tried AI tools but only 18% saw measurable ROI' },
        { value: '4.7x', text: 'more effective when AI augments reps vs replaces them' },
        { value: '23 min', text: 'saved per rep per day with targeted AI features' },
      ],
      contents: [
        { title: 'The AI landscape in B2B sales' },
        { title: 'What works: email personalization' },
        { title: "What doesn't: fully autonomous SDRs" },
        { title: 'Implementation framework' },
        { title: 'ROI measurement' },
      ],
    },
  ]

  for (const wp of whitepapers) {
    const existing = await payload.find({ collection: 'whitepapers', where: { slug: { equals: wp.slug } }, limit: 1 })
    if (existing.docs.length > 0) {
      payload.logger.info(`Whitepaper "${wp.slug}" already exists, skipping`)
      continue
    }
    await payload.create({ collection: 'whitepapers', data: wp })
    payload.logger.info(`Created whitepaper: ${wp.slug}`)
  }

  // ════════════════════════════════════════════
  // TEMPLATES (collection slug: 'templates')
  // Fields: title, slug, status, description, useCase, preview (textarea), included[{text}]
  // ════════════════════════════════════════════

  const templates = [
    {
      title: 'Cold Email Sequence Template — 5-Step Follow-Up',
      slug: 'cold-email-sequence-template',
      status: 'published' as const,
      description: 'A proven 5-email sequence with subject line variants, personalization guides, and a recommended sending schedule.',
      useCase: 'Best for: SDRs doing outbound to mid-market SaaS',
      preview: 'Subject: {{first_name}}, quick question about {{company}}\n\nHi {{first_name}},\n\nI noticed {{company}} is growing fast in the {{industry}} space. Teams like yours often struggle with [pain point].\n\nWe built Revnator specifically to solve this — a single workspace for contacts, sequences, pipeline, and analytics.\n\nWould it make sense to chat for 15 minutes this week?\n\nBest,\n{{sender_name}}',
      included: [
        { text: '5 email templates (cold intro → follow-up → value add → social proof → breakup)' },
        { text: 'Subject line A/B testing variants for each email' },
        { text: 'Recommended sending schedule with optimal days and times' },
        { text: 'Personalization variable guide with examples' },
      ],
    },
    {
      title: 'Discovery Call Script Template',
      slug: 'discovery-call-script',
      status: 'published' as const,
      description: 'A structured discovery call framework with questions organized by BANT, pain points, and next steps.',
      useCase: 'Best for: AEs running first calls with qualified prospects',
      preview: 'OPENING (2 min):\n"Thanks for taking the time, {{first_name}}. I\'ve done some research on {{company}} and I\'m excited to learn more about [specific initiative]."\n\nSITUATION QUESTIONS (5 min):\n- "Walk me through how your team currently handles [process]?"\n- "What tools are you using today for [function]?"\n- "How many people are involved in [workflow]?"\n\nPAIN QUESTIONS (10 min):\n- "What\'s the biggest challenge with your current setup?"\n- "How much time does your team spend on [admin task]?"',
      included: [
        { text: 'Full discovery call script with timing markers' },
        { text: 'BANT qualification checklist' },
        { text: 'Objection handling responses' },
        { text: 'Next steps and follow-up templates' },
      ],
    },
  ]

  for (const template of templates) {
    const existing = await payload.find({ collection: 'templates', where: { slug: { equals: template.slug } }, limit: 1 })
    if (existing.docs.length > 0) {
      payload.logger.info(`Template "${template.slug}" already exists, skipping`)
      continue
    }
    await payload.create({ collection: 'templates', data: template })
    payload.logger.info(`Created template: ${template.slug}`)
  }

  // ════════════════════════════════════════════
  // SUCCESS STORIES (collection slug: 'success-stories')
  // Fields: title, slug, status, description, company,
  //   quote{text, author, title}, snapshot[{label, value}],
  //   qa[{question, answer}], calloutMetric{value, context}
  // ════════════════════════════════════════════

  const successStories = [
    {
      title: 'How ScaleUp Inc Transformed Their Sales Process',
      slug: 'scaleup-inc-story',
      status: 'published' as const,
      description: 'A 12-rep SaaS sales team went from scattered tools to a unified workspace, booking 63% more meetings in 3 months.',
      company: 'ScaleUp Inc',
      quote: {
        text: 'Revnator changed how our entire sales team operates. We went from chaos to clarity in a weekend.',
        author: 'James K.',
        title: 'Revenue Operations, ScaleUp Inc',
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
          answer: "We had Salesforce for CRM, Outreach for sequences, Calendly for booking, and Slack for communication. Data was everywhere and nowhere. Reps spent their mornings just getting oriented across 4 different dashboards.",
        },
        {
          question: 'How did you discover Revnator?',
          answer: 'Our VP of Sales saw a demo at SaaStr and immediately recognized the value. The pitch was simple: everything in one place. We signed up for a trial that week.',
        },
        {
          question: 'What was the implementation experience like?',
          answer: 'Honestly, shockingly easy. We imported 8,000 contacts from Salesforce via CSV on a Saturday morning. By Monday, our reps were sending sequences from Revnator. No training sessions, no IT tickets, no consultants.',
        },
        {
          question: 'What results have you seen so far?',
          answer: 'In the first 3 months: 63% more meetings booked, reply rates up from 11% to 24%, and our average sales cycle dropped from 45 days to 28 days. The ROI paid for itself in month one.',
        },
      ],
      calloutMetric: {
        value: '63%',
        context: 'increase in meetings booked within 3 months',
      },
    },
    {
      title: 'How GrowthBase Scaled Outbound from 0 to 50 Meetings per Month',
      slug: 'growthbase-story',
      status: 'published' as const,
      description: 'A startup SDR team built their entire outbound engine on Revnator, going from zero to 50 meetings per month in 90 days.',
      company: 'GrowthBase',
      quote: {
        text: 'Setting up email sequences took 5 minutes. No onboarding call needed. Just works.',
        author: 'Priya R.',
        title: 'SDR Lead, GrowthBase',
      },
      snapshot: [
        { label: 'Industry', value: 'B2B SaaS' },
        { label: 'Team size', value: '4 SDRs' },
        { label: 'Time using Revnator', value: '3 months' },
        { label: 'Key module', value: 'Pipeline & Deals' },
      ],
      qa: [
        {
          question: 'What was your outbound process before Revnator?',
          answer: "Honestly, we didn't have one. We were a 4-person SDR team at a seed-stage startup. Our 'CRM' was a Google Sheet. Our 'sequences' were manual Gmail follow-ups with calendar reminders.",
        },
        {
          question: 'Why did you choose Revnator over bigger platforms?',
          answer: 'Price and simplicity. HubSpot wanted $1,600/month for our team. Outreach was even more. Revnator gave us everything for $156/month total. And we set it up ourselves in an afternoon.',
        },
        {
          question: 'How did you ramp up so quickly?',
          answer: "Revnator's pre-built sequence templates were a game changer. We customized 3 templates for our ICP segments and started sending within hours. The built-in warm-up meant our deliverability was solid from day one.",
        },
        {
          question: 'What does your outbound engine look like now?',
          answer: "Each SDR runs 3-4 active sequences targeting different personas. We book about 50 meetings per month across the team. The pipeline view lets us see exactly where every prospect stands. Our founder calls it 'the best $156 we spend every month.'",
        },
      ],
      calloutMetric: {
        value: '50',
        context: 'meetings booked per month within 90 days of starting',
      },
    },
  ]

  for (const story of successStories) {
    const existing = await payload.find({ collection: 'success-stories', where: { slug: { equals: story.slug } }, limit: 1 })
    if (existing.docs.length > 0) {
      payload.logger.info(`Success story "${story.slug}" already exists, skipping`)
      continue
    }
    await payload.create({ collection: 'success-stories', data: story })
    payload.logger.info(`Created success story: ${story.slug}`)
  }

  payload.logger.info('✓ Resource seeding complete — 12 items across 6 collections')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
