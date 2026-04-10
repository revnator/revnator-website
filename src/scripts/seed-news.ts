/**
 * Seed script for news articles.
 *
 * Run from project root:
 *   npx tsx src/scripts/seed-news.ts
 */
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import path from 'path'
import { getPayload } from 'payload'
import { fileURLToPath } from 'url'
import type { NewsArticle } from '../payload-types'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// ── Lexical JSON helpers ──

function text(content: string, format?: number): Record<string, unknown> {
  return { type: 'text', text: content, format: format ?? 0, detail: 0, mode: 'normal', style: '', version: 1 }
}

function paragraph(...children: Record<string, unknown>[]): Record<string, unknown> {
  return { type: 'paragraph', children, direction: 'ltr', format: '', indent: 0, textFormat: 0, textStyle: '', version: 1 }
}

function lexicalBody(children: Record<string, unknown>[]): NewsArticle['body'] {
  return { root: { type: 'root', children, direction: 'ltr', format: '', indent: 0, version: 1 } } as NewsArticle['body']
}

// ── Article data ──

interface ArticleSeed {
  title: string
  slug: string
  category: NewsArticle['category']
  publishedDate: string
  excerpt: string
  authorName: string
  body: NewsArticle['body']
}

const articles: ArticleSeed[] = [
  {
    title: 'Revnator launches AI SDR module',
    slug: 'revnator-launches-ai-sdr-module',
    category: 'Product Updates',
    publishedDate: '2026-04-05',
    excerpt: 'AI-powered email personalization, account research, and smart suggestions are now available in all paid plans.',
    authorName: 'Revnator Team',
    body: lexicalBody([
      paragraph(text("Today we're thrilled to announce the general availability of the AI SDR module — the ninth and most ambitious module in the Revnator platform. AI SDR brings artificial intelligence directly into your daily sales workflow, handling the repetitive tasks that eat up hours every week.")),
      paragraph(text('The module includes three core capabilities: AI-powered email personalization that rewrites your templates for each recipient, automated account research that pulls context from public sources before you reach out, and smart suggestions that recommend next steps based on deal activity.')),
      paragraph(text("We've been testing AI SDR with a group of 50 beta users over the past three months. The results speak for themselves: teams using AI SDR saw a "), text('34% increase in reply rates', 1), text(' and saved an average of 6 hours per rep per week on research and email writing.')),
      paragraph(text("AI SDR is available immediately on all Growth and Pro plans at no additional cost. Free plan users can try it with a 14-day trial. We believe AI should amplify every salesperson, not just those at enterprise companies with massive budgets.")),
      paragraph(text("This launch marks a major milestone for Revnator. With all nine modules now live, we offer the most complete unified sales workspace available at our price point. Head to your dashboard to enable AI SDR, or start a free trial to see it in action.")),
    ]),
  },
  {
    title: 'Revnator hits 1,000 active users',
    slug: '1000-active-users-milestone',
    category: 'Company News',
    publishedDate: '2026-03-20',
    excerpt: '1,000 sales teams now use Revnator daily to manage their pipelines and outreach.',
    authorName: 'Revnator Team',
    body: lexicalBody([
      paragraph(text("We started Revnator with a simple belief: sales teams deserve better tools. Today, we're proud to announce that 1,000 active users agree. This milestone represents not just a number, but a community of sales professionals who chose a different path.")),
      paragraph(text('Our users span 14 countries, from solo founders running their own outreach to 30-person sales teams coordinating complex enterprise deals. The diversity of use cases has pushed us to build a platform that\'s both powerful and flexible.')),
      paragraph(text('What makes us most proud is our retention rate. Over '), text('85% of teams', 1), text(' that start a paid plan are still active after 6 months. In a market where CRM churn is notoriously high, that number tells us we\'re building something people genuinely want to use.')),
      paragraph(text("To celebrate, we're offering 20% off annual plans for the rest of March. If you've been considering Revnator, there's never been a better time to start. Thank you to every user who's been part of this journey.")),
    ]),
  },
  {
    title: 'Revnator featured in TechCrunch Top 10 SaaS Tools',
    slug: 'techcrunch-top-10-saas-tools',
    category: 'Press Releases',
    publishedDate: '2026-03-12',
    excerpt: 'TechCrunch named Revnator one of the top 10 SaaS tools to watch in 2026.',
    authorName: 'Revnator Team',
    body: lexicalBody([
      paragraph(text("We're honored to share that TechCrunch has named Revnator one of the top 10 SaaS tools to watch in 2026. The annual list highlights products that are reshaping how businesses operate, and we're humbled to be included alongside some incredible companies.")),
      paragraph(text('The TechCrunch team specifically called out our unified approach: '), text('"While most sales tools solve one piece of the puzzle, Revnator bets that the real value comes from having everything in one workspace. It\'s an ambitious bet that\'s paying off."', 2)),
      paragraph(text("This recognition validates what our users have been telling us for months — that the pain of switching between five different tools is real, and that a unified solution genuinely changes how teams work. We're grateful for the spotlight.")),
      paragraph(text("Being featured alongside established players in the SaaS space is both exciting and motivating. It pushes us to keep shipping, keep listening to our users, and keep building the sales OS that teams actually want to use every day.")),
    ]),
  },
  {
    title: 'New: Forms module with API embed',
    slug: 'forms-module-launch',
    category: 'Product Updates',
    publishedDate: '2026-02-28',
    excerpt: 'Capture leads from anywhere with the new Forms module, complete with API embedding and auto-routing.',
    authorName: 'Revnator Team',
    body: lexicalBody([
      paragraph(text("Today we're launching the Forms module — a drag-and-drop form builder that lives inside Revnator and connects directly to your contact lists, sequences, and pipeline. No more Typeform-to-Zapier-to-CRM chains.")),
      paragraph(text('The Forms module includes a visual builder for creating lead capture forms, an API embed system for adding forms to any website with a single script tag, and auto-routing rules that send submissions to the right list, sequence, or team member automatically.')),
      paragraph(text("We built Forms because we kept hearing the same frustration: capturing a lead is easy, but getting that lead into the right workflow requires three tools and a prayer. Now it's one step.")),
      paragraph(text('Forms is available on all plans, including Free. Build your first form in under 5 minutes and start capturing leads that flow directly into your Revnator workspace.')),
    ]),
  },
  {
    title: 'Revnator opens India HQ in Coimbatore',
    slug: 'india-hq-coimbatore',
    category: 'Company News',
    publishedDate: '2026-02-14',
    excerpt: 'New headquarters marks the start of an exciting growth phase for the team.',
    authorName: 'Revnator Team',
    body: lexicalBody([
      paragraph(text("We're excited to announce the opening of Revnator's headquarters in Coimbatore, Tamil Nadu, India. This marks a significant step in our journey from a solo-founder project to a growing company with ambitions to serve sales teams globally.")),
      paragraph(text("Coimbatore was a natural choice. The city has a thriving tech ecosystem, access to excellent engineering talent, and a cost structure that lets us stay lean while we grow. Plus, it's home — and building a company close to home means something.")),
      paragraph(text('The new office will initially house our engineering and product teams as we scale up hiring over the coming months. We\'re looking for engineers, designers, and customer success people who share our vision of building simpler, more honest sales tools.')),
      paragraph(text("If you're interested in joining the Revnator team, keep an eye on our careers page. We're just getting started, and the best is yet to come.")),
    ]),
  },
  {
    title: "Revnator wins Best New SaaS at SaaS Awards 2026",
    slug: 'saas-awards-2026-winner',
    category: 'Awards',
    publishedDate: '2026-01-30',
    excerpt: 'Recognized as the best new SaaS product of 2026 by the international SaaS Awards committee.',
    authorName: 'Revnator Team',
    body: lexicalBody([
      paragraph(text('Last night at the SaaS Awards ceremony, Revnator was named the Best New SaaS Product of 2026. The award recognizes SaaS products launched in the past 12 months that demonstrate exceptional innovation, user experience, and market potential.')),
      paragraph(text('The judging panel highlighted our integrated approach as the key differentiator: '), text('"Revnator doesn\'t just add another tool to the stack — it replaces the stack entirely. The unified workspace concept is executed with remarkable polish for such a young product."', 2)),
      paragraph(text("Winning this award is incredibly meaningful for a bootstrapped, solo-founder company. It proves that you don't need a massive team or venture funding to build something that resonates. You just need to deeply understand the problem you're solving.")),
      paragraph(text("Thank you to every user who voted, every beta tester who gave feedback, and everyone who believed in the vision. This award belongs to the community as much as it belongs to us.")),
    ]),
  },
  {
    title: 'Calendar booking pages now live',
    slug: 'calendar-booking-pages',
    category: 'Product Updates',
    publishedDate: '2026-01-15',
    excerpt: 'Share availability and let prospects book directly into your schedule.',
    authorName: 'Revnator Team',
    body: lexicalBody([
      paragraph(text("Scheduling meetings shouldn't require five emails. That's why we're launching booking pages — Calendly-style scheduling built directly into Revnator. Share a link, and prospects pick a time that works.")),
      paragraph(text('Each booking page lives at a clean URL like revnator.com/book/your-name. You set your availability, buffer times, and meeting types. Prospects see your open slots in their timezone and book in two clicks.')),
      paragraph(text('What makes our booking pages different from standalone scheduling tools is the integration. When someone books a meeting, it automatically creates a contact (or updates an existing one), logs the meeting in your timeline, and can trigger a sequence or task.')),
      paragraph(text('Booking pages are available on all plans. Set yours up in the Calendar module and start sharing your link today.')),
    ]),
  },
  {
    title: 'Revnator raises $2M seed round',
    slug: 'seed-round-announcement',
    category: 'Funding',
    publishedDate: '2026-01-05',
    excerpt: 'Raised $2M to accelerate product development and grow the team.',
    authorName: 'Revnator Team',
    body: lexicalBody([
      paragraph(text("We're excited to announce that Revnator has raised $2M in seed funding. The round was led by a group of angel investors and early-stage funds who share our belief that sales teams deserve simpler, more integrated tools.")),
      paragraph(text("The funding will be used to accelerate product development, particularly around our AI capabilities and integration ecosystem. We're also hiring across engineering, design, and customer success to support our growing user base.")),
      paragraph(text("When we started Revnator, the goal was simple: build the sales workspace we wished existed. Every tool we tried was either too complex, too expensive, or too disconnected from the rest of our workflow. The seed round lets us pursue that vision faster.")),
      paragraph(text("We want to be transparent about what this funding means for our users: nothing changes about our pricing, our product philosophy, or our commitment to building for the end user. We took funding to grow faster, not to change direction.")),
      paragraph(text("Thank you to our investors for believing in the vision, and to our users for proving that there's a market for honest, integrated sales tools. The next chapter starts now.")),
    ]),
  },
]

async function seed(): Promise<void> {
  const configPath = path.resolve(dirname, '../payload.config.ts')
  const configUrl = new URL(`file:///${configPath.replace(/\\/g, '/')}`)

  const payload = await getPayload({
    config: (await import(configUrl.href)).default,
  })

  // ── Delete existing articles (idempotent re-seed) ──
  console.log('Deleting existing news articles...\n')

  const existing = await payload.find({
    collection: 'news-articles',
    limit: 100,
  })
  for (const article of existing.docs) {
    await payload.delete({
      collection: 'news-articles',
      id: article.id,
    })
    console.log(`  DELETE "${article.title}"`)
  }

  // ── Seed Articles ──
  console.log('\nSeeding news articles...\n')

  for (const article of articles) {
    await payload.create({
      collection: 'news-articles',
      data: {
        title: article.title,
        slug: article.slug,
        status: 'published',
        publishedDate: article.publishedDate,
        category: article.category,
        excerpt: article.excerpt,
        body: article.body,
        authorName: article.authorName,
      },
    })
    console.log(`  CREATE "${article.title}"`)
  }

  console.log('\nDone!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
