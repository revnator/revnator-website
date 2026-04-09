export type NewsCategory =
  | 'All'
  | 'Product Updates'
  | 'Company News'
  | 'Press Releases'
  | 'Funding'
  | 'Awards'

export const newsCategories: NewsCategory[] = [
  'All',
  'Product Updates',
  'Company News',
  'Press Releases',
  'Funding',
  'Awards',
]

export interface NewsItem {
  id: number
  slug: string
  title: string
  excerpt: string
  date: string
  category: Exclude<NewsCategory, 'All'>
  body: string[]
}

export const newsItems: NewsItem[] = [
  {
    id: 1,
    slug: 'revnator-launches-ai-sdr-module',
    title: 'Revnator launches AI SDR module',
    excerpt:
      'AI-powered email personalization, account research, and smart suggestions are now available in all paid plans.',
    date: 'Apr 5, 2026',
    category: 'Product Updates',
    body: [
      'Today we\u2019re thrilled to announce the general availability of the AI SDR module \u2014 the ninth and most ambitious module in the Revnator platform. AI SDR brings artificial intelligence directly into your daily sales workflow, handling the repetitive tasks that eat up hours every week.',
      'The module includes three core capabilities: AI-powered email personalization that rewrites your templates for each recipient, automated account research that pulls context from public sources before you reach out, and smart suggestions that recommend next steps based on deal activity.',
      'We\u2019ve been testing AI SDR with a group of 50 beta users over the past three months. The results speak for themselves: teams using AI SDR saw a 34% increase in reply rates and saved an average of 6 hours per rep per week on research and email writing.',
      'AI SDR is available immediately on all Growth and Pro plans at no additional cost. Free plan users can try it with a 14-day trial. We believe AI should amplify every salesperson, not just those at enterprise companies with massive budgets.',
      'This launch marks a major milestone for Revnator. With all nine modules now live, we offer the most complete unified sales workspace available at our price point. Head to your dashboard to enable AI SDR, or start a free trial to see it in action.',
    ],
  },
  {
    id: 2,
    slug: '1000-active-users-milestone',
    title: 'Revnator hits 1,000 active users',
    excerpt:
      'We\u2019re celebrating a major milestone \u2014 1,000 sales teams now use Revnator daily to manage their pipelines and outreach.',
    date: 'Mar 20, 2026',
    category: 'Company News',
    body: [
      'We started Revnator with a simple belief: sales teams deserve better tools. Today, we\u2019re proud to announce that 1,000 active users agree. This milestone represents not just a number, but a community of sales professionals who chose a different path.',
      'Our users span 14 countries, from solo founders running their own outreach to 30-person sales teams coordinating complex enterprise deals. The diversity of use cases has pushed us to build a platform that\u2019s both powerful and flexible.',
      'What makes us most proud is our retention rate. Over 85% of teams that start a paid plan are still active after 6 months. In a market where CRM churn is notoriously high, that number tells us we\u2019re building something people genuinely want to use.',
      'To celebrate, we\u2019re offering 20% off annual plans for the rest of March. If you\u2019ve been considering Revnator, there\u2019s never been a better time to start. Thank you to every user who\u2019s been part of this journey.',
    ],
  },
  {
    id: 3,
    slug: 'techcrunch-top-10-saas-tools',
    title: 'Revnator featured in TechCrunch Top 10 SaaS Tools',
    excerpt:
      'TechCrunch named Revnator one of the top 10 SaaS tools to watch in 2026, highlighting our unified platform approach.',
    date: 'Mar 12, 2026',
    category: 'Press Releases',
    body: [
      'We\u2019re honored to share that TechCrunch has named Revnator one of the top 10 SaaS tools to watch in 2026. The annual list highlights products that are reshaping how businesses operate, and we\u2019re humbled to be included alongside some incredible companies.',
      'The TechCrunch team specifically called out our unified approach: \u201CWhile most sales tools solve one piece of the puzzle, Revnator bets that the real value comes from having everything in one workspace. It\u2019s an ambitious bet that\u2019s paying off.\u201D',
      'This recognition validates what our users have been telling us for months \u2014 that the pain of switching between five different tools is real, and that a unified solution genuinely changes how teams work. We\u2019re grateful for the spotlight.',
      'Being featured alongside established players in the SaaS space is both exciting and motivating. It pushes us to keep shipping, keep listening to our users, and keep building the sales OS that teams actually want to use every day.',
    ],
  },
  {
    id: 4,
    slug: 'forms-module-launch',
    title: 'New: Forms module with API embed',
    excerpt:
      'Capture leads from anywhere on the web with our new Forms module, complete with API embedding and auto-routing to lists.',
    date: 'Feb 28, 2026',
    category: 'Product Updates',
    body: [
      'Today we\u2019re launching the Forms module \u2014 a drag-and-drop form builder that lives inside Revnator and connects directly to your contact lists, sequences, and pipeline. No more Typeform-to-Zapier-to-CRM chains.',
      'The Forms module includes a visual builder for creating lead capture forms, an API embed system for adding forms to any website with a single script tag, and auto-routing rules that send submissions to the right list, sequence, or team member automatically.',
      'We built Forms because we kept hearing the same frustration: capturing a lead is easy, but getting that lead into the right workflow requires three tools and a prayer. Now it\u2019s one step.',
      'Forms is available on all plans, including Free. Build your first form in under 5 minutes and start capturing leads that flow directly into your Revnator workspace.',
    ],
  },
  {
    id: 5,
    slug: 'india-hq-coimbatore',
    title: 'Revnator opens India HQ in Coimbatore',
    excerpt:
      'Our new headquarters in Coimbatore, Tamil Nadu marks the start of an exciting growth phase for the team.',
    date: 'Feb 14, 2026',
    category: 'Company News',
    body: [
      'We\u2019re excited to announce the opening of Revnator\u2019s headquarters in Coimbatore, Tamil Nadu, India. This marks a significant step in our journey from a solo-founder project to a growing company with ambitions to serve sales teams globally.',
      'Coimbatore was a natural choice. The city has a thriving tech ecosystem, access to excellent engineering talent, and a cost structure that lets us stay lean while we grow. Plus, it\u2019s home \u2014 and building a company close to home means something.',
      'The new office will initially house our engineering and product teams as we scale up hiring over the coming months. We\u2019re looking for engineers, designers, and customer success people who share our vision of building simpler, more honest sales tools.',
      'If you\u2019re interested in joining the Revnator team, keep an eye on our careers page. We\u2019re just getting started, and the best is yet to come.',
    ],
  },
  {
    id: 6,
    slug: 'saas-awards-2026-winner',
    title: "Revnator wins 'Best New SaaS' at SaaS Awards 2026",
    excerpt:
      'We\u2019re honored to be recognized as the best new SaaS product of 2026 by the international SaaS Awards committee.',
    date: 'Jan 30, 2026',
    category: 'Awards',
    body: [
      'Last night at the SaaS Awards ceremony, Revnator was named the Best New SaaS Product of 2026. The award recognizes SaaS products launched in the past 12 months that demonstrate exceptional innovation, user experience, and market potential.',
      'The judging panel highlighted our integrated approach as the key differentiator: \u201CRevnator doesn\u2019t just add another tool to the stack \u2014 it replaces the stack entirely. The unified workspace concept is executed with remarkable polish for such a young product.\u201D',
      'Winning this award is incredibly meaningful for a bootstrapped, solo-founder company. It proves that you don\u2019t need a massive team or venture funding to build something that resonates. You just need to deeply understand the problem you\u2019re solving.',
      'Thank you to every user who voted, every beta tester who gave feedback, and everyone who believed in the vision. This award belongs to the community as much as it belongs to us.',
    ],
  },
  {
    id: 7,
    slug: 'calendar-booking-pages',
    title: 'Calendar booking pages now live',
    excerpt:
      'Share your availability and let prospects book directly into your schedule with our new Calendly-style booking pages.',
    date: 'Jan 15, 2026',
    category: 'Product Updates',
    body: [
      'Scheduling meetings shouldn\u2019t require five emails. That\u2019s why we\u2019re launching booking pages \u2014 Calendly-style scheduling built directly into Revnator. Share a link, and prospects pick a time that works.',
      'Each booking page lives at a clean URL like revnator.com/book/your-name. You set your availability, buffer times, and meeting types. Prospects see your open slots in their timezone and book in two clicks.',
      'What makes our booking pages different from standalone scheduling tools is the integration. When someone books a meeting, it automatically creates a contact (or updates an existing one), logs the meeting in your timeline, and can trigger a sequence or task.',
      'Booking pages are available on all plans. Set yours up in the Calendar module and start sharing your link today.',
    ],
  },
  {
    id: 8,
    slug: 'seed-round-announcement',
    title: 'Revnator raises $2M seed round',
    excerpt:
      'We\u2019ve raised $2M in seed funding to accelerate product development and grow our team. Read about our journey.',
    date: 'Jan 5, 2026',
    category: 'Funding',
    body: [
      'We\u2019re excited to announce that Revnator has raised $2M in seed funding. The round was led by a group of angel investors and early-stage funds who share our belief that sales teams deserve simpler, more integrated tools.',
      'The funding will be used to accelerate product development, particularly around our AI capabilities and integration ecosystem. We\u2019re also hiring across engineering, design, and customer success to support our growing user base.',
      'When we started Revnator, the goal was simple: build the sales workspace we wished existed. Every tool we tried was either too complex, too expensive, or too disconnected from the rest of our workflow. The seed round lets us pursue that vision faster.',
      'We want to be transparent about what this funding means for our users: nothing changes about our pricing, our product philosophy, or our commitment to building for the end user. We took funding to grow faster, not to change direction.',
      'Thank you to our investors for believing in the vision, and to our users for proving that there\u2019s a market for honest, integrated sales tools. The next chapter starts now.',
    ],
  },
]
