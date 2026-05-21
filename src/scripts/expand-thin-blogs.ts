/**
 * Expands the 4 batch-1 blog posts that landed under the 1,500-word minimum.
 * Inserts fully-written H2 sections immediately before each post's closing
 * section (the final H2). Idempotent: skips a post if the marker section is
 * already present.
 *
 * Run from project root:  npx tsx src/scripts/expand-thin-blogs.ts
 */
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import path from 'path'
import { getPayload } from 'payload'
import { fileURLToPath } from 'url'
import type { BlogPost } from '../payload-types'

const dirname = path.dirname(fileURLToPath(import.meta.url))

// ── Lexical helpers ──
function t(text: string): Record<string, unknown> {
  return { type: 'text', text, format: 0, detail: 0, mode: 'normal', style: '', version: 1 }
}
function p(text: string): Record<string, unknown> {
  return { type: 'paragraph', children: [t(text)], direction: 'ltr', format: '', indent: 0, textFormat: 0, textStyle: '', version: 1 }
}
function h2(text: string): Record<string, unknown> {
  return { type: 'heading', tag: 'h2', children: [t(text)], direction: 'ltr', format: '', indent: 0, version: 1 }
}

// ── Additional sections, keyed by slug. Each is spliced before the last H2. ──
const additions: Record<string, { marker: string; nodes: Record<string, unknown>[] }> = {
  'why-b2b-teams-need-sales-os': {
    marker: 'Reason 6: New reps ramp in weeks, not quarters',
    nodes: [
      h2('Reason 6: New reps ramp in weeks, not quarters'),
      p('The average B2B sales rep takes three to six months to reach full productivity. A large part of that ramp is not learning the product or the market — it is learning the tools. A new hire has to be provisioned in the CRM, the sequencer, the dialer, the scheduler, and the chat app, then taught how data flows between them and which tab to open for which task. Every one of those handoffs is a place a new rep gets lost, and every week of confusion is a week of quota you do not get back.'),
      p('A Sales OS compresses that. One login, one interface, one mental model. New reps see an onboarding checklist and an AI-written daily briefing that tells them what to do first, instead of a blank dashboard and five passwords. In Revnator, the workspace ranks a new rep’s tasks by AI priority and shows the reasoning on each one, so a rep who has never sold your product still works the right accounts on day one. When you cut ramp time from five months to two, every hire effectively delivers an extra quarter of quota. That is a hiring-plan advantage, not just a software preference.'),
      h2('The objection worth answering: are best-of-breed tools better?'),
      p('The strongest argument against a Sales OS is that a specialist tool — a dedicated sequencer, a dedicated dialer — will always out-feature a module inside a broader platform. For an enterprise with a RevOps team to integrate everything, that can be true. For a B2B team under 50 reps, it almost never is. The marginal feature you gain from the specialist tool is dwarfed by the data you lose at every integration seam, and by the context your reps lose switching between apps all day.'),
      p('Here is the test. List the five features your team actually uses in each specialist tool. Most teams find they use a fraction of what they pay for, and that the unused depth is exactly the depth a Sales OS module already covers. The capabilities that genuinely move revenue — AI lead scoring, reply detection, inbox rotation, win-probability — are table stakes in a modern Sales OS, not premium add-ons. You are not trading down on features and up on price. You are trading sideways on features and dramatically up on connected data, as we argue in our guide to sales tech stack consolidation.'),
    ],
  },
  'sales-os-for-startups': {
    marker: 'Avoid the three tool-buying mistakes founders make',
    nodes: [
      h2('Avoid the three tool-buying mistakes founders make'),
      p('The first mistake is buying for the team you hope to have rather than the team you have. Salesforce makes sense at 200 reps; it is a tax at three. Buy for your current selling motion and your next two hires, not your Series B headcount plan. You can always add seats — you cannot easily get back the months you spent configuring a platform built for a company ten times your size.'),
      p('The second mistake is buying tools in isolation — a CRM in January, a sequencer in March, a scheduler in June — and waking up a year later with six subscriptions and no coherent data model. Decide your whole sales infrastructure in one sitting, even if you only switch features on as you need them. The third mistake is treating AI as a line item to add later. AI lead scoring and deal scoring only get accurate after they have watched your data accumulate, so starting on a platform where AI is native and free from day one means your scores are already calibrated by the time you have the volume to trust them. A Sales OS like Revnator avoids all three mistakes by default: one platform, one data model, and AI included on the free plan.'),
    ],
  },
  'cost-of-not-having-sales-os': {
    marker: 'The cost nobody puts in the spreadsheet',
    nodes: [
      h2('The cost nobody puts in the spreadsheet'),
      p('Subscription math is easy to see. The expensive number is invisible: the cost of a rep changing context. Research on knowledge work consistently puts the recovery time from a single interruption at over twenty minutes. A sales rep who moves between a CRM, an inbox, a sequencer, a dialer, and a chat app is not interrupted once a day — they are interrupted dozens of times an hour, by the tools themselves.'),
      p('Put a number on it. If a rep loses even 45 minutes a day to tool-switching and re-orientation, that is roughly 15 hours a month, or nearly two full selling days. For a fully loaded rep, that is several thousand dollars of salary spent navigating software instead of talking to buyers — per rep, per month. Multiply by headcount and the productivity leak alone exceeds the entire subscription bill you were so carefully optimizing.'),
      h2('Why the cost gap widens every quarter'),
      p('Fragmentation is not a fixed cost — it compounds. Every new tool you add multiplies the number of integration points, each of which needs maintenance. Every price increase from every vendor hits independently. Every new hire has to be provisioned and trained across the whole stack. And every quarter your data sits in more places, the harder a future consolidation becomes, because migration cost scales with how entrenched the mess is.'),
      p('That is the real argument for acting now rather than later. The break-even on a Sales OS is not a distant payback period — for most SMB teams it is positive in month one, because the subscription savings alone usually cover the switch. Everything after that, the recovered selling time and the sharper decisions that come from connected data and AI insights, is upside. The longer you wait, the more you pay and the more it costs to fix.'),
    ],
  },
  'salesforce-vs-hubspot-vs-revnator': {
    marker: 'Migration reality: how long each switch actually takes',
    nodes: [
      h2('Migration reality: how long each switch actually takes'),
      p('Time-to-value is part of the cost, and the three platforms are not close. A Salesforce rollout for a 10-person team is measured in months and usually involves a paid implementation partner — discovery, configuration, data modeling, validation rules, and admin training before a single deal is logged. HubSpot is faster, but a real setup still means configuring properties, pipelines, sequences, and the marketing-to-sales handoff, typically a few weeks of part-time work for whoever draws the short straw.'),
      p('An AI-native Sales OS like Revnator is built for self-serve. You import contacts with a guided CSV wizard, your pipeline and AI scoring go live the same afternoon, and there is no admin role to staff. For a 10-person team without a dedicated operations hire, that difference — months versus an afternoon — often matters more than any single feature on the comparison grid. The right CRM is the one your team is actually using next week, not the one you are still configuring next quarter.'),
    ],
  },
}

function lastH2Index(children: Record<string, unknown>[]): number {
  for (let i = children.length - 1; i >= 0; i--) {
    const c = children[i]
    if (c && c.type === 'heading' && c.tag === 'h2') return i
  }
  return children.length
}

async function run(): Promise<void> {
  const configPath = path.resolve(dirname, '../payload.config.ts')
  const configUrl = new URL(`file:///${configPath.replace(/\\/g, '/')}`)
  const payload = await getPayload({ config: (await import(configUrl.href)).default })

  let updated = 0
  for (const [slug, addition] of Object.entries(additions)) {
    const res = await payload.find({ collection: 'blog-posts', where: { slug: { equals: slug } }, limit: 1 })
    const post = res.docs[0]
    if (!post) {
      console.log(`  MISS   "${slug}" not found`)
      continue
    }
    const body = (post as { body?: { root?: { children?: Record<string, unknown>[] } } }).body
    const children = body?.root?.children
    if (!body || !body.root || !Array.isArray(children)) {
      console.log(`  MISS   "${slug}" has no body children`)
      continue
    }

    const alreadyHas = JSON.stringify(children).includes(addition.marker)
    if (alreadyHas) {
      console.log(`  SKIP   "${slug}" (already expanded)`)
      continue
    }

    const insertAt = lastH2Index(children)
    const newChildren = [
      ...children.slice(0, insertAt),
      ...addition.nodes,
      ...children.slice(insertAt),
    ]
    body.root.children = newChildren

    await payload.update({
      collection: 'blog-posts',
      id: post.id,
      data: { body: body as BlogPost['body'] },
      context: { disableRevalidate: true },
    })
    updated++
    console.log(`  EXPAND "${slug}" (+${addition.nodes.length} nodes)`)
  }

  console.log(`\nExpanded ${updated} post(s).`)
  process.exit(0)
}

run().catch((err) => {
  console.error('Expand failed:', err)
  process.exit(1)
})
