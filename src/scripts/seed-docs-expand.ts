/**
 * Seed script: expands the documentation to cover every product area.
 *
 * What it does (all idempotent — safe to re-run):
 *   1. Re-orders the existing doc sections and inserts six new sections so the
 *      sidebar reflects the full product: My Workspace, Enrichment, Social
 *      Media, AI Features, Settings, and MCP Server.
 *   2. Creates the doc pages for each new section, plus two new pages in the
 *      existing Email & Sequences section (Email Inbox, Reply Tracking).
 *   3. Rebuilds the previous/next navigation chain across every page.
 *
 * Existing page bodies are NOT touched here — see seed-docs-content.ts for that.
 *
 * Run from project root:
 *   npx tsx src/scripts/seed-docs-expand.ts
 */
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import path from 'path'
import { getPayload } from 'payload'
import { fileURLToPath } from 'url'
import type { DocPage, DocSection } from '../payload-types'

const dirname = path.dirname(fileURLToPath(import.meta.url))

// ── Lexical JSON helpers ───────────────────────────────────────────────────

function text(content: string, format = 0): Record<string, unknown> {
  return { type: 'text', text: content, format, detail: 0, mode: 'normal', style: '', version: 1 }
}

function paragraph(...children: Record<string, unknown>[]): Record<string, unknown> {
  return {
    type: 'paragraph',
    children,
    direction: 'ltr',
    format: '',
    indent: 0,
    textFormat: 0,
    textStyle: '',
    version: 1,
  }
}

function p(content: string): Record<string, unknown> {
  return paragraph(text(content))
}

function heading(tag: 'h2' | 'h3', content: string): Record<string, unknown> {
  return { type: 'heading', tag, children: [text(content)], direction: 'ltr', format: '', indent: 0, version: 1 }
}
const h2 = (s: string): Record<string, unknown> => heading('h2', s)

function listItem(content: string): Record<string, unknown> {
  return { type: 'listitem', children: [text(content)], direction: 'ltr', format: '', indent: 0, value: 1, version: 1 }
}

function unorderedList(items: string[]): Record<string, unknown> {
  return {
    type: 'list',
    listType: 'bullet',
    tag: 'ul',
    children: items.map(listItem),
    direction: 'ltr',
    format: '',
    indent: 0,
    start: 1,
    version: 1,
  }
}

function orderedList(items: string[]): Record<string, unknown> {
  return {
    type: 'list',
    listType: 'number',
    tag: 'ol',
    children: items.map(listItem),
    direction: 'ltr',
    format: '',
    indent: 0,
    start: 1,
    version: 1,
  }
}

const CODE_LANGS = new Set(['typescript', 'javascript', 'css'])

function codeBlock(code: string, language = ''): Record<string, unknown> {
  return {
    type: 'block',
    version: 2,
    format: '',
    fields: {
      blockType: 'code',
      code,
      language: CODE_LANGS.has(language) ? language : '',
      blockName: '',
    },
  }
}

function bannerBlock(style: 'info' | 'warning', content: string): Record<string, unknown> {
  return {
    type: 'block',
    version: 2,
    format: '',
    fields: {
      blockType: 'banner',
      style,
      content: {
        root: {
          type: 'root',
          children: [paragraph(text(content))],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      blockName: '',
    },
  }
}

function body(children: Record<string, unknown>[]): DocPage['body'] {
  return { root: { type: 'root', children, direction: 'ltr', format: '', indent: 0, version: 1 } } as DocPage['body']
}

// ── Section layout (existing + new, in final sidebar order) ─────────────────

interface SectionDef {
  slug: string
  title: string
  icon: DocSection['icon']
  order: number
  isNew: boolean
}

const sectionLayout: SectionDef[] = [
  { slug: 'getting-started', title: 'Getting Started', icon: 'Rocket', order: 1, isNew: false },
  { slug: 'workspace', title: 'My Workspace', icon: 'LayoutDashboard', order: 2, isNew: true },
  { slug: 'contacts', title: 'Contacts', icon: 'Users', order: 3, isNew: false },
  { slug: 'accounts', title: 'Accounts', icon: 'Building2', order: 4, isNew: false },
  { slug: 'enrichment', title: 'Enrichment', icon: 'Users', order: 5, isNew: true },
  { slug: 'email', title: 'Email & Sequences', icon: 'Mail', order: 6, isNew: false },
  { slug: 'pipeline', title: 'Pipeline', icon: 'GitBranch', order: 7, isNew: false },
  { slug: 'calendar', title: 'Calendar', icon: 'Calendar', order: 8, isNew: false },
  { slug: 'tasks', title: 'Tasks & Missions', icon: 'LayoutDashboard', order: 9, isNew: false },
  { slug: 'social-media', title: 'Social Media', icon: 'MessageCircle', order: 10, isNew: true },
  { slug: 'forms', title: 'Forms', icon: 'FileText', order: 11, isNew: false },
  { slug: 'reports', title: 'Reports', icon: 'BarChart3', order: 12, isNew: false },
  { slug: 'ai-features', title: 'AI Features', icon: 'Sparkles', order: 13, isNew: true },
  { slug: 'integrations', title: 'Integrations', icon: 'Plug', order: 14, isNew: false },
  { slug: 'settings', title: 'Settings', icon: 'Shield', order: 15, isNew: true },
  { slug: 'api', title: 'API Reference', icon: 'Code', order: 16, isNew: false },
  { slug: 'mcp-server', title: 'MCP Server', icon: 'Code', order: 17, isNew: true },
]

// ── New pages (and additions to the existing Email section) ─────────────────

interface PageDef {
  sectionSlug: string
  slug: string
  title: string
  order: number
  body: DocPage['body']
}

const newPages: PageDef[] = [
  // ════════════════════════ MY WORKSPACE ════════════════════════
  {
    sectionSlug: 'workspace',
    slug: 'workspace-dashboard',
    title: 'Workspace Dashboard',
    order: 1,
    body: body([
      p(
        'My Workspace is your home screen — the page Revnator opens to after you sign in. It pulls the day\'s work and the AI\'s recommendations into one view so you know where to start.',
      ),
      h2('The daily snapshot'),
      p(
        'A greeting header sits above a row of snapshot cards: tasks due today, emails, meetings today, and open deals. Each card is a quick count so you can size up the day at a glance.',
      ),
      h2('Today\'s work'),
      p(
        'Below the snapshot, the dashboard lists today\'s tasks with inline checkboxes — tick one to complete it without leaving the page — alongside your recent emails and upcoming meetings.',
      ),
      h2('AI on the dashboard'),
      p('Two AI elements sit at the top of the workspace:'),
      unorderedList([
        'The AI Briefing card — a short, written summary of what needs your attention today',
        'The AI Balance widget — your remaining AI credits, or a note that your own AI provider key is active',
      ]),
      h2('Onboarding checklist'),
      p(
        'If you skipped steps in the onboarding wizard, an onboarding checklist appears here showing what is left, with a progress bar. It disappears once every step is done.',
      ),
      bannerBlock(
        'info',
        'The "My Workspace" link in the sidebar shows a red badge with the count of urgent and high-priority AI suggestions waiting for you.',
      ),
    ]),
  },
  {
    sectionSlug: 'workspace',
    slug: 'daily-briefing',
    title: 'Daily AI Briefing',
    order: 2,
    body: body([
      p(
        'The Daily AI Briefing is a short, plain-language summary of what matters today, generated fresh each morning and shown at the top of your workspace.',
      ),
      h2('What the briefing covers'),
      p('Each morning a background job gathers the signals that make up your day:'),
      unorderedList([
        'Hot leads — contacts whose AI lead score is 60 or higher',
        'Overdue tasks that need clearing',
        'Meetings scheduled for today',
        'Urgent AI suggestions in your queue',
        'Open deals still in play',
      ]),
      p('It passes that picture to AI, which writes a three-to-four-sentence briefing in everyday language.'),
      h2('Reading the card'),
      p(
        'The briefing appears as a purple gradient card with today\'s date. Its footer summarises the numbers — for example "5 hot leads · 3 urgent actions" — with a link straight to your full AI suggestions queue.',
      ),
      h2('When it runs'),
      p(
        'The briefing regenerates automatically every morning, so the card you see reflects the start of the current day. It is also delivered as an in-app notification.',
      ),
      bannerBlock(
        'info',
        'The briefing needs AI to be available — either a connected AI provider key or remaining AI credits. See the AI Features section for how AI billing works.',
      ),
    ]),
  },
  {
    sectionSlug: 'workspace',
    slug: 'ai-suggestions',
    title: 'AI Suggestions Queue',
    order: 3,
    body: body([
      p(
        'The AI Suggestions Queue is your action list. Every contact in Revnator has an AI agent that watches their activity; when the agent decides a contact needs attention, it adds a suggestion here.',
      ),
      h2('Where suggestions come from'),
      p('Suggestions are created by several AI processes:'),
      unorderedList([
        'Per-contact agents — run hourly, score each active contact, and recommend a next best action',
        'Deal-risk detection — flags stalled deals and adds an urgent suggestion',
        'Form scoring — raises a "hot lead from form" suggestion when a new form contact scores well',
      ]),
      h2('Working a suggestion'),
      p(
        'Each entry shows a priority badge, a link to the contact, the recommended action with a short reason, and — where relevant — a collapsible draft email. Three buttons let you act on it:',
      ),
      orderedList([
        'Accept — act on the suggestion',
        'Snooze — hide it for a set number of hours (24 by default)',
        'Dismiss — remove it from the queue',
      ]),
      h2('Where to find it'),
      p(
        'The queue has a card on your workspace dashboard and a full-page view of its own. The sidebar "My Workspace" link carries a red badge counting urgent and high-priority suggestions, and these also arrive as in-app notifications.',
      ),
      bannerBlock(
        'info',
        'Notifications accompany urgent suggestions, at-risk deals, the daily briefing, and billing events. Choose which events notify you — in-app and by email — under Settings → Notifications.',
      ),
    ]),
  },

  // ════════════════════════ ENRICHMENT ════════════════════════
  {
    sectionSlug: 'enrichment',
    slug: 'enrichment-providers',
    title: 'Connecting Enrichment Providers',
    order: 1,
    body: body([
      p(
        'Enrichment fills in the contact data you are missing — phone numbers, job titles, LinkedIn URLs, company names. Revnator uses a bring-your-own-licence model: you connect your existing provider accounts and Revnator orchestrates the work.',
      ),
      h2('Bring your own licence'),
      p(
        'Revnator never resells enrichment credits. You connect your own API keys, the enrichment runs against your provider account, and you pay the provider directly. Keys are verified before they are saved and stored encrypted with AES-256-GCM.',
      ),
      h2('Supported providers'),
      unorderedList([
        'Apollo.io — match a contact by email, or by name and company',
        'Hunter.io — find and verify email addresses',
        'ZeroBounce — validate email deliverability',
        'Clearbit — find person and company data',
        'People Data Labs — enrich contact records',
        'Clay — listed as coming soon',
      ]),
      h2('Connecting a provider'),
      orderedList([
        'Open Settings → Enrichment.',
        'Click Connect on a provider card.',
        'Follow the modal\'s steps to get an API key from that provider, then paste it in.',
        'Revnator verifies the key against the provider before saving it.',
      ]),
      h2('Monitoring enrichment'),
      p(
        'The Enrichment settings page includes a "Recent Enrichment Jobs" table. Every attempt is logged with a status badge — completed, running, pending, failed, or skipped — and any error message is shown inline so you can see exactly what each provider returned.',
      ),
      bannerBlock(
        'warning',
        'Disconnecting a provider stops it being used for future enrichment but leaves data already written to your contacts in place.',
      ),
    ]),
  },
  {
    sectionSlug: 'enrichment',
    slug: 'enriching-contacts',
    title: 'Enriching Contacts',
    order: 2,
    body: body([
      p(
        'Once at least one enrichment provider is connected, you can enrich a single contact or hundreds at once. This page covers both flows and how Revnator merges the results.',
      ),
      h2('What gets enriched'),
      p(
        'Revnator enriches the fields a contact is missing: phone, job title, LinkedIn URL, and company. When several providers return a value for the same field, the first non-empty result wins — and a field that already has a value is never overwritten.',
      ),
      h2('Enriching one contact'),
      p(
        'On the contact detail page, an "Enrich Contact" button sits under the AI Agent card. It opens a modal where you can choose which connected providers to use, see which fields are missing, and — after running — review a per-field panel showing exactly what was found.',
      ),
      h2('Bulk enrichment'),
      p(
        'On the contacts table, select rows and click "Enrich" in the bulk-action bar. Bulk enrichment runs in the background so the table stays responsive, processing up to 100 contacts per request. For large batches the modal shows a credits warning so you know roughly what you are spending with your providers.',
      ),
      h2('How results are applied'),
      p(
        'Each provider attempt is recorded as an enrichment job, and the discovered fields are merged into the contact in a single update at the end. Enrichment also registers as a signal for the contact\'s AI agent, so a freshly enriched contact can be re-scored with better data.',
      ),
      bannerBlock(
        'info',
        'Run enrichment right after a CSV import to fill the gaps in a freshly imported list before you start outreach.',
      ),
    ]),
  },

  // ════════════════════════ SOCIAL MEDIA ════════════════════════
  {
    sectionSlug: 'social-media',
    slug: 'overview',
    title: 'Overview',
    order: 1,
    body: body([
      p(
        'The Social Media module lets you plan, publish, and engage across your social channels without leaving Revnator. It connects the same workspace your CRM lives in to your social presence.',
      ),
      h2('Supported platforms'),
      p('You can connect accounts on four platforms:'),
      unorderedList(['LinkedIn', 'X (Twitter)', 'Facebook', 'Instagram']),
      h2('What the module includes'),
      unorderedList([
        'Compose — write a post once and publish it to multiple platforms',
        'Calendar — a content calendar of scheduled and published posts',
        'Inbox — comments, mentions, replies, and DMs from your connected accounts',
        'Analytics — engagement metrics across platforms',
        'Templates — a library of reusable post templates',
        'Approval — an approval queue for posts that need a review before they go out',
      ]),
      h2('Connecting accounts'),
      p(
        'Connect your social accounts from the Social Media settings. Each account connects over OAuth, the same secure flow used for connecting an email inbox.',
      ),
      h2('How a post moves'),
      p(
        'A post starts as a draft, becomes scheduled once you set a time, moves to publishing when its slot arrives, and ends as published — or failed if a platform rejects it. Posts that require sign-off carry an approval status of pending until a reviewer approves them.',
      ),
    ]),
  },
  {
    sectionSlug: 'social-media',
    slug: 'composing-posts',
    title: 'Composing & Scheduling Posts',
    order: 2,
    body: body([
      p(
        'The post composer is where social content is created. Write once, tailor per platform, attach media, and schedule — all from a single screen.',
      ),
      h2('Writing a post'),
      p(
        'Use the platform selector to choose which connected accounts a post goes to. As you write, a per-platform preview shows how the post will look on each channel, so you can catch differences in formatting and length before publishing.',
      ),
      h2('Media and hashtags'),
      p(
        'Attach media with the uploader — images, video, GIFs, and documents are all supported. The hashtag picker lets you insert hashtags, including saved hashtag groups, so your tagging stays consistent.',
      ),
      h2('AI post suggestions'),
      p(
        'When you need ideas or a first draft, the composer can generate post content with AI. The AI suggestion runs through Revnator\'s universal AI router, so it uses your connected AI provider key or your AI credits like every other AI feature.',
      ),
      h2('Scheduling and the calendar'),
      p(
        'Publish a post immediately or schedule it for later. Scheduled posts appear on the content calendar, where you can see your whole publishing plan and rearrange it.',
      ),
      h2('Templates and approvals'),
      p(
        'Save a post you will reuse as a template in the Template Library. If your team reviews content before it goes out, posts enter the approval queue with a pending status and publish only once approved.',
      ),
    ]),
  },
  {
    sectionSlug: 'social-media',
    slug: 'social-analytics',
    title: 'Analytics & Social Inbox',
    order: 3,
    body: body([
      p(
        'Publishing is only half of social. Revnator also brings the engagement back in — the numbers in Analytics and the conversations in the Social Inbox.',
      ),
      h2('Social analytics'),
      p(
        'The Analytics view reports engagement per platform, with per-post statistics rolled up so you can see which content performed. Use it to spot what resonates and feed those winners back into your Template Library.',
      ),
      h2('The social inbox'),
      p(
        'The Social Inbox gathers interactions from your connected accounts into one list so nothing is missed. It covers four kinds of activity:',
      ),
      unorderedList([
        'Comments on your posts',
        'Mentions of your accounts',
        'Replies in threads',
        'Direct messages',
      ]),
      h2('Engaging from Revnator'),
      p(
        'Respond to comments, mentions, replies, and DMs directly from the Social Inbox — there is no need to switch to each platform\'s native app to keep conversations going.',
      ),
      bannerBlock(
        'info',
        'Pair analytics with templates: when a post performs well, save it as a template so the format is easy to repeat.',
      ),
    ]),
  },

  // ════════════════════════ AI FEATURES ════════════════════════
  {
    sectionSlug: 'ai-features',
    slug: 'ai-providers',
    title: 'AI Providers & BYOAI',
    order: 1,
    body: body([
      p(
        'Every AI feature in Revnator runs through one universal AI router. That router can be powered two ways: by Revnator-managed credits, or by your own AI provider key — an option called BYOAI, Bring Your Own AI.',
      ),
      h2('Two ways to power AI'),
      unorderedList([
        'Revnator-managed — AI calls draw on a monthly credit allowance plus any credits you top up',
        'BYOAI — connect your own provider API key and AI calls bill to that provider, using zero Revnator credits',
      ]),
      h2('Supported providers'),
      p('BYOAI supports six AI providers. Connect a key for any of them:'),
      unorderedList(['Anthropic', 'OpenAI', 'Google', 'Groq', 'Mistral', 'Cohere']),
      h2('Connecting your own key'),
      orderedList([
        'Open Settings → AI.',
        'In the AI Provider section, pick a provider from the BYOAI grid.',
        'Follow the connect modal — it links to where you generate a key for that provider.',
        'Revnator verifies the key, then stores it encrypted with AES-256-GCM.',
      ]),
      p(
        'Once connected, you can choose which model to use, and an "Active" pill shows which provider is currently powering your AI. Disconnecting a provider removes the stored key.',
      ),
      h2('Which is right for you?'),
      p(
        'BYOAI suits teams that already have an AI provider account and want to consolidate billing there. Revnator-managed credits suit teams that want AI to work out of the box with nothing to set up.',
      ),
      bannerBlock(
        'info',
        'When a BYOAI provider is active you pay that provider directly and use no Revnator credits — see AI Credits & Billing for how the managed option works.',
      ),
    ]),
  },
  {
    sectionSlug: 'ai-features',
    slug: 'ai-credits',
    title: 'AI Credits & Billing',
    order: 2,
    body: body([
      p(
        'If you do not connect your own AI provider key, AI features run on Revnator-managed AI and draw on AI credits. This page explains the allowance, top-ups, and how usage is tracked.',
      ),
      h2('Monthly allowance'),
      p('Every plan includes a monthly credit allowance that resets each month:'),
      unorderedList([
        'Free — 20 credits per month',
        'Starter — 100 credits per month',
        'Growth — 500 credits per month',
        'Scale — 2,000 credits per month',
      ]),
      h2('How credits are spent'),
      p(
        'Each AI feature has a small per-call credit cost. Your monthly allowance is consumed first; once it is exhausted, calls draw on any credits you have purchased.',
      ),
      h2('Topping up'),
      p(
        'When you need more, Settings → AI offers one-time credit packs in three sizes. Purchased credits never expire and stack on top of your monthly allowance.',
      ),
      h2('Tracking usage'),
      p(
        'The AI settings page shows your current balance, a chart of usage by feature over the last 30 days, and a Usage History table — the last 50 AI calls with their date, feature, provider, model, credit cost, and whether they succeeded.',
      ),
      bannerBlock(
        'warning',
        'If you have no provider key and no credits left, AI endpoints return an "insufficient credits" error. Background AI jobs skip gracefully rather than failing, so the rest of the app keeps working.',
      ),
    ]),
  },
  {
    sectionSlug: 'ai-features',
    slug: 'ai-across-revnator',
    title: 'AI Across Revnator',
    order: 3,
    body: body([
      p(
        'AI in Revnator is not a single feature — it runs through every module. This page is a map of where AI shows up so you can find each capability in its own section.',
      ),
      h2('Contacts and Accounts'),
      unorderedList([
        'Per-contact AI agents score every contact 0–100 and recommend a next best action',
        'Account health scoring assigns a 0–100 score, a risk level, and a written summary',
      ]),
      h2('Pipeline'),
      unorderedList([
        'Deal scoring produces a score, a win-likelihood percentage, risk factors, and a recommended action',
        'At-risk detection flags stalled deals automatically each day',
      ]),
      h2('Email and Sequences'),
      unorderedList([
        'The sequence generator drafts a complete multi-step sequence from a brief',
        'The subject optimizer proposes alternative subject lines',
        'Per-step AI personalisation rewrites each email for the individual recipient',
        'Reply analysis classifies the sentiment and intent of incoming replies',
      ]),
      h2('Sales Ops, Reports, Forms, and Social'),
      unorderedList([
        'Tasks — AI priority re-ranks your task list by what matters most',
        'Calendar — AI meeting prep writes a briefing for any meeting',
        'Missions — AI insights report whether a mission is on track or blocked',
        'Reports — an AI insights card interprets every report',
        'Forms — AI suggests form fields and scores hot leads on submission',
        'Social — AI generates post content in the composer',
      ]),
      h2('Workspace'),
      p(
        'The daily briefing and the AI suggestions queue, both in My Workspace, are the places where all of this AI surfaces as a daily action list.',
      ),
      bannerBlock(
        'info',
        'Every feature above uses the same universal AI router, so all of it is powered by either your BYOAI key or your AI credits.',
      ),
    ]),
  },

  // ════════════════════════ SETTINGS ════════════════════════
  {
    sectionSlug: 'settings',
    slug: 'profile-workspace',
    title: 'Profile & Workspace',
    order: 1,
    body: body([
      p(
        'The Settings area is where you configure your account and your workspace. Settings is organised into tabs — this page covers the personal and workspace tabs and points to where the rest are documented.',
      ),
      h2('Profile'),
      p(
        'Settings → Profile holds your personal details — your full name and your time zone. Your time zone affects how dates, due times, and scheduled sends are displayed to you.',
      ),
      h2('Workspace'),
      p(
        'Settings → Workspace controls the workspace itself: its name, which your whole team sees in the sidebar, and the custom fields available on account records.',
      ),
      h2('Notification preferences'),
      p(
        'Settings → Notifications is where you choose which events notify you and through which channel — in-app, by email, or both. Notifications cover AI suggestions, at-risk deals, the daily briefing, and billing events.',
      ),
      h2('Defaults'),
      p(
        'Settings → Defaults stores personal defaults such as your job title, company size, and industry — the details first captured during onboarding.',
      ),
      h2('Other settings tabs'),
      p('The remaining settings tabs are documented in their own sections:'),
      unorderedList([
        'Lead Statuses — see the Contacts section',
        'Team — see Team & Permissions',
        'Billing — see Billing & Plans',
        'Enrichment — see the Enrichment section',
        'AI — see the AI Features section',
        'API — see the API Reference section',
      ]),
    ]),
  },
  {
    sectionSlug: 'settings',
    slug: 'team-permissions',
    title: 'Team & Permissions',
    order: 2,
    body: body([
      p(
        'Revnator is built for small sales teams. Settings → Team is where you bring teammates into your workspace and control what each of them can do.',
      ),
      h2('Inviting teammates'),
      p(
        'From the Team tab, invite a teammate by entering their email address. They receive an invitation and join your workspace once they accept. You can change a member\'s role or remove them from the same screen.',
      ),
      h2('Roles'),
      p('Every member has one of three roles, each with a different level of access:'),
      unorderedList([
        'Admin — full access, including workspace settings and team management',
        'Member — day-to-day access to work the CRM',
        'Viewer — read-only access',
      ]),
      h2('The permissions matrix'),
      p(
        'The Roles & Permissions screen shows a read-only matrix of eleven permissions mapped across the three roles, so you can see exactly what each role can and cannot do before you assign it.',
      ),
      bannerBlock(
        'info',
        'The number of team members you can add depends on your plan. See Billing & Plans for plan limits.',
      ),
    ]),
  },
  {
    sectionSlug: 'settings',
    slug: 'billing-plans',
    title: 'Billing & Plans',
    order: 3,
    body: body([
      p(
        'Revnator is priced per user, per month, across four plans. Billing is managed through Stripe and configured under Settings → Billing.',
      ),
      h2('The plans'),
      unorderedList([
        'Free — get started at no cost',
        'Starter — $29 per user per month',
        'Growth — $59 per user per month',
        'Scale — $99 per user per month',
      ]),
      p('Paid plans come with a 14-day free trial, and choosing annual billing saves 20% over monthly.'),
      h2('Managing your subscription'),
      p(
        'The Billing tab shows your current plan, its status, the current billing period, and your next billing date. "Manage billing" opens the Stripe customer portal, where you can change plan, update your card, or cancel.',
      ),
      h2('Usage and limits'),
      p(
        'Each plan has limits — on contacts, sequences, monthly emails, and AI suggestions, among others. The Billing tab shows usage as progress bars that turn amber and then red as you approach a limit. Creating contacts and sequences is gated on your plan, so you are told before you hit a wall.',
      ),
      h2('Invoices'),
      p('The Billing tab lists your most recent invoices, each with its amount, status, and a link to download the PDF.'),
      bannerBlock(
        'info',
        'You can compare every plan side by side, including the full feature and limit breakdown, on the public pricing page at /pricing.',
      ),
    ]),
  },

  // ════════════════════════ MCP SERVER ════════════════════════
  {
    sectionSlug: 'mcp-server',
    slug: 'mcp-overview',
    title: 'MCP Server Overview',
    order: 1,
    body: body([
      p(
        'Revnator publishes an MCP server so AI assistants can work directly with your workspace. MCP — the Model Context Protocol — is an open standard that lets tools like Claude Desktop and Cursor call external systems.',
      ),
      h2('What the MCP server is'),
      p(
        'The server is an npm package, @revnator/mcp. It runs locally alongside your AI assistant and exposes your Revnator workspace as a set of tools the assistant can call on your behalf.',
      ),
      h2('What it can do'),
      p(
        'The server provides 33 tools across nine groups — contacts, accounts, deals, sequences, tasks, pipeline, search, analytics, and AI. With it connected, you can ask an assistant to do things like:',
      ),
      unorderedList([
        'Find your hottest leads or search across contacts, deals, and accounts',
        'Create a contact, a task, or a deal',
        'Move a deal to a new stage or enrol a contact into a sequence',
        'Summarise pipeline analytics or trigger an AI score for a contact',
      ]),
      h2('How it relates to the API'),
      p(
        'The MCP server is a thin layer over Revnator\'s public REST API. It uses the same rvn_live_ API key, the same endpoints, and the same scopes — so anything the API can do, an assistant can do through MCP. See the API Reference section for the underlying API.',
      ),
      bannerBlock(
        'info',
        'The MCP server acts with the permissions of the API key you give it. Treat that key as carefully as you would any password.',
      ),
    ]),
  },
  {
    sectionSlug: 'mcp-server',
    slug: 'claude-desktop-setup',
    title: 'Setting Up Claude Desktop',
    order: 2,
    body: body([
      p(
        'This page walks through connecting the Revnator MCP server to Claude Desktop. The same server works with Cursor and other MCP clients — only the location of the config file differs.',
      ),
      h2('Step 1 — Generate an API key'),
      p(
        'In the Revnator app, open Settings → API and generate an API key. Copy it immediately — the full key is shown only once. See API Reference → Authentication for details.',
      ),
      h2('Step 2 — Copy the MCP config'),
      p(
        'Settings → API also has an MCP setup card with a "Copy config" button. It produces a configuration block already filled in for your workspace.',
      ),
      h2('Step 3 — Add it to Claude Desktop'),
      p(
        'Open Claude Desktop\'s configuration file, claude_desktop_config.json, and add the Revnator entry under mcpServers. The block looks like this:',
      ),
      codeBlock(
        '{\n  "mcpServers": {\n    "revnator": {\n      "command": "npx",\n      "args": ["-y", "@revnator/mcp"],\n      "env": {\n        "REVNATOR_API_KEY": "rvn_live_your_key_here",\n        "REVNATOR_BASE_URL": "https://app.revnator.com"\n      }\n    }\n  }\n}',
        'json',
      ),
      h2('Step 4 — Restart'),
      p(
        'Restart Claude Desktop. Once it reloads, the Revnator tools become available and you can ask the assistant to work with your contacts, deals, and pipeline.',
      ),
      bannerBlock(
        'warning',
        'Always copy the exact config from Settings → API rather than typing it by hand — it is pre-filled with the correct base URL and avoids mistakes in the key.',
      ),
    ]),
  },

  // ════════════════════════ EMAIL (new pages in existing section) ════════════════════════
  {
    sectionSlug: 'email',
    slug: 'email-inbox',
    title: 'Email Inbox',
    order: 4,
    body: body([
      p(
        'The Email Inbox is where you read and respond to email activity from your campaigns and sequences, without leaving Revnator.',
      ),
      h2('The two-panel layout'),
      p(
        'Email → Inbox opens a two-panel view: a list of threads on the left, and the selected thread on the right. Click any thread to read the full conversation.',
      ),
      h2('Filtering threads'),
      p('Filter tabs across the top narrow the thread list:'),
      unorderedList([
        'All — every thread',
        'Unread — threads you have not yet opened',
        'Replied — threads where the contact replied',
        'Campaign — threads from email campaigns',
        'Sequence — threads from sequences',
      ]),
      h2('Replying'),
      p(
        'Each thread has an inline reply composer, so you can respond to a contact directly from the Inbox. Because Revnator sends through your connected inbox, replies stay in the real email thread.',
      ),
      h2('Quick actions'),
      p(
        'A quick-actions sidebar sits alongside the thread. From it you can change the contact\'s lead status, add them to a list, or mark the thread as dealt with — keeping your CRM up to date as you work through replies.',
      ),
    ]),
  },
  {
    sectionSlug: 'email',
    slug: 'reply-tracking',
    title: 'Reply Tracking & Sentiment',
    order: 5,
    body: body([
      p(
        'Revnator tracks what happens to every email you send and uses AI to read the replies — so you know not just that a contact replied, but how they replied.',
      ),
      h2('Engagement tracking'),
      p(
        'Every sent email records opens, clicks, and replies. Those signals feed the contact\'s AI agent, the engagement metrics in Reports, and the behaviour of your sequences.',
      ),
      h2('Replies pause sequences'),
      p(
        'When a contact replies to a sequence, Revnator detects it and — if "pause on reply" is enabled for that sequence — pauses their enrolment automatically. The conversation becomes yours to handle personally instead of the next automated step firing.',
      ),
      h2('AI reply analysis'),
      p(
        'A background job runs every 15 minutes, picks up newly received replies, and uses AI to classify each one\'s sentiment and intent. This turns a pile of replies into a quick read on how your outreach is landing.',
      ),
      bannerBlock(
        'info',
        'AI reply analysis currently runs for Gmail-connected inboxes. Replies on Outlook and SMTP inboxes are still detected for the pause-on-reply behaviour, with full sentiment analysis planned.',
      ),
    ]),
  },
]

// ── Main routine ───────────────────────────────────────────────────────────

async function run(): Promise<void> {
  const configPath = path.resolve(dirname, '../payload.config.ts')
  const configUrl = new URL(`file:///${configPath.replace(/\\/g, '/')}`)
  const payload = await getPayload({
    config: (await import(configUrl.href)).default,
  })

  const DISABLE_REVALIDATE = { context: { disableRevalidate: true } } as const

  // 1 ── Upsert sections (re-order existing, create new) ────────────────────
  console.log('\n📁 Updating sections...\n')
  const sectionIdBySlug = new Map<string, number>()
  let sectionsCreated = 0
  let sectionsReordered = 0

  for (const s of sectionLayout) {
    const existing = await payload.find({
      collection: 'doc-sections',
      where: { slug: { equals: s.slug } },
      limit: 1,
    })

    if (existing.docs[0]) {
      const current = existing.docs[0] as DocSection
      await payload.update({
        collection: 'doc-sections',
        id: current.id,
        data: { order: s.order },
        ...DISABLE_REVALIDATE,
      })
      sectionIdBySlug.set(s.slug, current.id)
      if (current.order !== s.order) sectionsReordered++
      console.log(`  ↕  ${s.title} (/${s.slug}) → order ${s.order}`)
    } else {
      const created = await payload.create({
        collection: 'doc-sections',
        data: {
          title: s.title,
          slug: s.slug,
          order: s.order,
          isPublished: true,
          icon: s.icon,
        },
        ...DISABLE_REVALIDATE,
      })
      sectionIdBySlug.set(s.slug, created.id)
      sectionsCreated++
      console.log(`  ✚  Created section: ${s.title} (/${s.slug})`)
    }
  }

  // 2 ── Upsert new pages ───────────────────────────────────────────────────
  console.log('\n📄 Creating / updating pages...\n')
  let pagesCreated = 0
  let pagesUpdated = 0

  for (const pg of newPages) {
    const sectionId = sectionIdBySlug.get(pg.sectionSlug)
    if (!sectionId) {
      console.error(`  ✗ No section for page ${pg.sectionSlug}/${pg.slug}`)
      continue
    }

    const existing = await payload.find({
      collection: 'doc-pages',
      where: {
        slug: { equals: pg.slug },
        section: { equals: sectionId },
      },
      limit: 1,
    })

    if (existing.docs[0]) {
      await payload.update({
        collection: 'doc-pages',
        id: existing.docs[0].id,
        data: {
          title: pg.title,
          order: pg.order,
          isPublished: true,
          lastUpdated: '2026-05-20',
          body: pg.body,
        },
        ...DISABLE_REVALIDATE,
      })
      pagesUpdated++
      console.log(`  ↻  Updated: ${pg.sectionSlug}/${pg.slug}`)
    } else {
      await payload.create({
        collection: 'doc-pages',
        data: {
          title: pg.title,
          slug: pg.slug,
          section: sectionId,
          order: pg.order,
          isPublished: true,
          lastUpdated: '2026-05-20',
          body: pg.body,
        },
        ...DISABLE_REVALIDATE,
      })
      pagesCreated++
      console.log(`  ✚  Created: ${pg.sectionSlug}/${pg.slug}`)
    }
  }

  // 3 ── Rebuild the previous/next chain across every page ──────────────────
  console.log('\n🔗 Rebuilding previous/next navigation...\n')

  const sectionsSorted = await payload.find({
    collection: 'doc-sections',
    limit: 200,
    sort: 'order',
    depth: 0,
  })

  const orderedPageIds: number[] = []
  const orderedPageLabels: string[] = []

  for (const section of sectionsSorted.docs as DocSection[]) {
    const pagesInSection = await payload.find({
      collection: 'doc-pages',
      where: { section: { equals: section.id } },
      sort: 'order',
      limit: 200,
      depth: 0,
    })
    for (const dp of pagesInSection.docs as DocPage[]) {
      orderedPageIds.push(dp.id)
      orderedPageLabels.push(`${section.slug}/${dp.slug}`)
    }
  }

  for (let i = 0; i < orderedPageIds.length; i++) {
    const prevId = i > 0 ? orderedPageIds[i - 1] : null
    const nextId = i < orderedPageIds.length - 1 ? orderedPageIds[i + 1] : null
    await payload.update({
      collection: 'doc-pages',
      id: orderedPageIds[i],
      data: { previousPage: prevId, nextPage: nextId },
      ...DISABLE_REVALIDATE,
    })
  }
  console.log(`  ✓ Linked ${orderedPageIds.length} pages in a single chain.`)

  // 4 ── Report ─────────────────────────────────────────────────────────────
  console.log('\n────────────────────────────────────────')
  console.log('📚 Final sidebar order:')
  for (const section of sectionsSorted.docs as DocSection[]) {
    console.log(`  ${section.order}. ${section.title} (/${section.slug})`)
  }
  console.log('────────────────────────────────────────')
  console.log(`✅ Sections created:    ${sectionsCreated}`)
  console.log(`✅ Sections re-ordered: ${sectionsReordered}`)
  console.log(`✅ Pages created:       ${pagesCreated}`)
  console.log(`✅ Pages updated:       ${pagesUpdated}`)
  console.log(`✅ Total pages linked:  ${orderedPageIds.length}`)
  console.log('────────────────────────────────────────\n')

  process.exit(0)
}

run().catch((err) => {
  console.error('Doc expansion failed:', err)
  process.exit(1)
})
