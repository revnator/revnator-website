/**
 * Update all 9 /platform module pages with accurate, SEO-optimized content
 * reflecting the actual Revnator product (v2.8/v2.9 feature set).
 *
 * Updates content fields only — slug, icon, order, isPublished, related
 * modules, hero/feature images and SEO meta are left untouched.
 *
 * Run from project root:
 *   npx tsx src/scripts/update-modules-content.ts
 */
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import path from 'path'
import { getPayload } from 'payload'
import { fileURLToPath } from 'url'
import type { Module } from '../payload-types'

const dirname = path.dirname(fileURLToPath(import.meta.url))

// ── Content types ──────────────────────────────────────────────────────────

interface Capability {
  icon: string
  title: string
}
interface FeatureBlock {
  label: string
  heading: string
  description: string
  features: string[]
  ctaText: string
}
interface Card {
  title: string
  description: string
}
interface Stat {
  number: string
  label: string
}
interface ModuleContent {
  name: string
  badge: string
  heroHeading: string
  heroDescription: string
  shortDescription: string
  cardFeatures: string[]
  capabilities: Capability[]
  featureBlocks: FeatureBlock[]
  comparisonHeading: string
  comparisonCards: Card[]
  comparisonStats: Stat[]
  ctaHeading: string
  ctaSubheading: string
}

const GET_STARTED = '/get-started'

// ── Content for all 9 modules (keyed by slug) ──────────────────────────────

const content: Record<string, ModuleContent> = {
  // ═══════════════════════ 1. CONTACTS ═══════════════════════
  contacts: {
    name: `Contact Intelligence`,
    badge: `AI CRM`,
    heroHeading: `AI-Powered Contact Management That Scores, Prioritizes, and Sells`,
    heroDescription: `Every contact in your B2B CRM gets a live AI lead score, a next-best-action recommendation, and aggregated engagement signals. Stop guessing who to call next — your contact list re-orders itself by who's hottest.`,
    shortDescription: `AI lead scoring, enrichment, and next-best-action for every contact.`,
    cardFeatures: [`AI lead scoring (0–100)`, `BYOL contact enrichment`, `Per-contact AI agents`],
    capabilities: [
      { icon: `Users`, title: `AI-scored contact database` },
      { icon: `Sparkles`, title: `Per-contact AI agents` },
      { icon: `TrendingUp`, title: `Engagement signal tracking` },
      { icon: `Database`, title: `BYOL enrichment (5 providers)` },
      { icon: `Zap`, title: `Next-best-action engine` },
    ],
    featureBlocks: [
      {
        label: `AI SCORING`,
        heading: `Every contact scored, ranked, and ready to work`,
        description: `Revnator's AI assigns a 0–100 lead score to every contact based on engagement signals, profile data, and behavioral patterns. Your contact list re-orders itself so reps always work the hottest leads first.`,
        features: [
          `Live AI lead score that updates with every interaction`,
          `Next-best-action recommendation on every contact`,
          `Engagement signals aggregated across email, forms, and activity`,
          `Per-contact AI agents that keep context as the relationship moves`,
        ],
        ctaText: `Start scoring free`,
      },
      {
        label: `ENRICHMENT`,
        heading: `Enrich contacts with your own data providers — no markup`,
        description: `Connect your Apollo, Hunter, ZeroBounce, Clearbit, or People Data Labs API key. Revnator orchestrates enrichment using your account — you pay the data provider directly, never a 3x reseller markup.`,
        features: [
          `5 enrichment providers supported, bring-your-own-licence`,
          `One-click enrichment from any contact, plus bulk enrichment`,
          `Fills missing phone, job title, LinkedIn URL, and company`,
          `AES-256-GCM encrypted storage for every provider key`,
        ],
        ctaText: `Try enrichment free`,
      },
      {
        label: `ORGANIZE`,
        heading: `Custom fields, lists, and lifecycle stages built for B2B sales`,
        description: `Shape the CRM around how you actually sell. Add custom fields, group contacts into lists, configure your own lead-status pipeline, and bulk-import from any spreadsheet with smart column mapping.`,
        features: [
          `Custom fields — text, number, date, dropdown, and more`,
          `Contact lists for target accounts and campaign audiences`,
          `Configurable lead statuses with colors and ordering`,
          `Bulk CSV import with a 4-step mapping wizard and de-duplication`,
        ],
        ctaText: `Get started free`,
      },
      {
        label: `CONNECTED`,
        heading: `Contacts that feed every other module automatically`,
        description: `Contacts aren't isolated records. They flow into sequences, surface on deals and accounts, trigger form routing, and power AI suggestions. One source of truth, used everywhere.`,
        features: [
          `Contacts linked to deals, accounts, and sequences automatically`,
          `Activity timeline spanning every module`,
          `Public REST API for contacts, deals, tasks, and more`,
          `MCP server with 33 tools for Claude Desktop and Cursor`,
        ],
        ctaText: `Start free trial`,
      },
    ],
    comparisonHeading: `Not just a CRM. An AI-native contact intelligence system.`,
    comparisonCards: [
      {
        title: `vs. HubSpot CRM`,
        description: `HubSpot charges around $90/user/month and still won't score your leads with AI. Revnator scores every contact, on every plan — including free.`,
      },
      {
        title: `vs. Salesforce`,
        description: `Salesforce needs a six-figure implementation and a full-time admin. Revnator imports your contacts and starts AI scoring in five minutes, self-serve.`,
      },
      {
        title: `vs. Apollo`,
        description: `Apollo resells enrichment data at a markup. Revnator lets you connect your own Apollo key directly — you pay Apollo's price, not a 3x premium.`,
      },
    ],
    comparisonStats: [
      { number: `0–100`, label: `AI lead score on every contact` },
      { number: `5`, label: `enrichment providers (BYOL)` },
      { number: `$0`, label: `enrichment markup` },
    ],
    ctaHeading: `Start scoring your contacts with AI today`,
    ctaSubheading: `Free for up to 250 contacts, with AI lead scoring included on every plan. No credit card required.`,
  },

  // ═══════════════════════ 2. ACCOUNTS ═══════════════════════
  accounts: {
    name: `Account Intelligence`,
    badge: `ABM`,
    heroHeading: `Account Management CRM Built for Account-Based Selling`,
    heroDescription: `Every company gets an AI health score, a risk level, and a plain-English relationship summary. See which accounts are thriving and which need attention — before a deal goes cold.`,
    shortDescription: `AI health scores and risk signals for every company you sell to.`,
    cardFeatures: [`AI account health score`, `AI risk-level assessment`, `Deal & contact rollups`],
    capabilities: [
      { icon: `Building2`, title: `Company account records` },
      { icon: `Heart`, title: `AI account health score` },
      { icon: `AlertTriangle`, title: `AI risk-level assessment` },
      { icon: `Sparkles`, title: `Plain-English AI summaries` },
      { icon: `Layers`, title: `Deal & contact rollups` },
    ],
    featureBlocks: [
      {
        label: `ACCOUNT HEALTH`,
        heading: `Know which accounts are healthy — and which are at risk`,
        description: `Revnator's AI scores each account from 0–100 using its contacts, deals, tasks, and the email engagement of everyone at the company. It also assigns a low, medium, or high risk level so problem accounts stand out.`,
        features: [
          `Live 0–100 AI health score per account`,
          `Low / medium / high risk-level assessment`,
          `Signals pulled from contacts, deals, tasks, and email engagement`,
          `Re-analyze on demand after major account activity`,
        ],
        ctaText: `Start scoring free`,
      },
      {
        label: `AI SUMMARIES`,
        heading: `A plain-English read on every account relationship`,
        description: `Revnator's AI writes a two-to-three sentence narrative of where each relationship stands — no dashboards to decode. Perfect for a fast pre-call review or an exec-level account check-in.`,
        features: [
          `AI relationship summary in plain English`,
          `Refreshes as the account's data changes`,
          `Surfaced right on the account detail page`,
          `Built for quick reviews, not report-building`,
        ],
        ctaText: `Try it free`,
      },
      {
        label: `ROLLUPS`,
        heading: `Every contact, deal, and task — rolled up by company`,
        description: `Add a contact with a company name and Revnator finds or creates the account and links them automatically. The account detail page rolls up contacts, deals, activity, notes, and tasks in one view.`,
        features: [
          `Automatic account creation and contact linking`,
          `Deal rollups showing every opportunity per company`,
          `Activity timeline across the whole account`,
          `Notes and tasks scoped to the account`,
        ],
        ctaText: `Get started free`,
      },
      {
        label: `ABM READY`,
        heading: `Run account-based selling without spreadsheets`,
        description: `Revnator gives account-based teams the structure they need: a standard industry taxonomy, account custom fields, and fast filtering — so your target-account motion lives in the CRM, not a spreadsheet.`,
        features: [
          `60-industry standard picker plus your own custom industries`,
          `Account custom fields for tiers, segments, and territories`,
          `Search and industry / country filters`,
          `Bulk actions across your account list`,
        ],
        ctaText: `Start free trial`,
      },
    ],
    comparisonHeading: `B2B account intelligence, not just a list of companies.`,
    comparisonCards: [
      {
        title: `vs. Salesforce`,
        description: `Salesforce account hierarchies need an admin and a six-figure rollout. Revnator auto-builds accounts from your contacts and scores their health on day one.`,
      },
      {
        title: `vs. HubSpot`,
        description: `HubSpot shows you company records. Revnator tells you which ones are at risk — in plain English, with an AI health score on every plan.`,
      },
      {
        title: `vs. spreadsheets`,
        description: `A spreadsheet of target accounts never warns you when a relationship is cooling. Revnator's AI flags it well before the renewal call.`,
      },
    ],
    comparisonStats: [
      { number: `0–100`, label: `AI health score per account` },
      { number: `3`, label: `risk levels: low, medium, high` },
      { number: `Auto`, label: `account creation from contacts` },
    ],
    ctaHeading: `Start managing accounts with AI intelligence`,
    ctaSubheading: `AI health scoring on every account, included on every plan. Start free — no credit card required.`,
  },

  // ═══════════════════════ 3. OUTREACH → AI-NATIVE SEQUENCES ═══════════════════════
  outreach: {
    name: `AI-Native Sequences`,
    badge: `AI OUTREACH`,
    heroHeading: `AI Cold Email Sequences That Personalize Every Step`,
    heroDescription: `Describe your goal and Revnator's AI writes the whole sequence — then personalizes every email for every recipient at send time. Cold email automation with AI personalization, inbox rotation, and reply detection built in.`,
    shortDescription: `AI-personalized email sequences with inbox rotation and reply detection.`,
    cardFeatures: [`AI personalizes every email`, `AI sequence generator`, `Inbox rotation + reply detection`],
    capabilities: [
      { icon: `Sparkles`, title: `Per-contact AI personalization` },
      { icon: `Rocket`, title: `AI sequence generator` },
      { icon: `RefreshCw`, title: `Multi-inbox rotation` },
      { icon: `MessageCircle`, title: `AI reply sentiment analysis` },
      { icon: `Target`, title: `AI subject-line optimizer` },
    ],
    featureBlocks: [
      {
        label: `AI PERSONALIZATION`,
        heading: `Every email rewritten for every recipient`,
        description: `Turn on AI personalization for any step and Revnator rewrites that email for each contact at send time — using their name, company, title, notes, lead status, and prior-send history. Pick a tone and it stays on-brand.`,
        features: [
          `Per-step AI email personalization toggle`,
          `5 tones: professional, friendly, casual, direct, consultative`,
          `Custom AI instructions to steer each rewrite`,
          `Safe template fallback so a send never blocks on AI`,
        ],
        ctaText: `Personalize free`,
      },
      {
        label: `AI GENERATION`,
        heading: `Describe your goal — get a complete sequence`,
        description: `The AI sequence generator turns a goal, audience, and tone into a full multi-step sequence with subject lines, bodies, and send delays. The AI subject-line optimizer suggests sharper alternatives for any step.`,
        features: [
          `Generate a complete sequence from a short brief`,
          `AI subject-line optimizer with alternatives per step`,
          `Merge variables for name, company, and custom fields`,
          `Email, LinkedIn, and call steps in one sequence`,
        ],
        ctaText: `Generate one free`,
      },
      {
        label: `DELIVERABILITY`,
        heading: `Inbox rotation that protects your sender reputation`,
        description: `Send across multiple connected mailboxes with round-robin, volume-split, or daily-limit rotation. Connect Gmail, Outlook, or any SMTP provider, and authenticate your own sending domain.`,
        features: [
          `Rotate sends across multiple connected inboxes`,
          `3 rotation modes plus per-account daily limits`,
          `Gmail, Outlook, and SMTP inboxes supported`,
          `SendGrid domain authentication for sender trust`,
        ],
        ctaText: `Get started free`,
      },
      {
        label: `REPLIES`,
        heading: `Sequences that stop the moment a human replies`,
        description: `Revnator detects replies, pauses that contact automatically, and uses AI to classify the reply's sentiment and intent. Thread-aware follow-ups keep the conversation in a single email thread.`,
        features: [
          `Automatic reply detection and enrollment pause`,
          `AI reply sentiment and intent analysis`,
          `Same-thread or new-thread follow-ups`,
          `Pause on out-of-office and on link click`,
        ],
        ctaText: `Start free trial`,
      },
    ],
    comparisonHeading: `AI-native cold email — not a mail merge with a tracking pixel.`,
    comparisonCards: [
      {
        title: `vs. Outreach.io`,
        description: `Outreach charges $100+/user/month for sequences you still write by hand. Revnator generates them and personalizes every email with AI.`,
      },
      {
        title: `vs. Mailshake & Lemlist`,
        description: `Most cold email tools template-swap a first name. Revnator rewrites the entire email per recipient with AI personalization.`,
      },
      {
        title: `vs. your CRM's email tool`,
        description: `HubSpot and Salesforce sequences don't rotate inboxes or read reply sentiment. Revnator does both — included on every plan.`,
      },
    ],
    comparisonStats: [
      { number: `5`, label: `AI personalization tones` },
      { number: `3`, label: `inbox rotation modes` },
      { number: `Auto`, label: `reply detection & pause` },
    ],
    ctaHeading: `Launch your first AI-personalized sequence`,
    ctaSubheading: `Let AI write and personalize your cold email outreach. Start free — no credit card required.`,
  },

  // ═══════════════════════ 4. PIPELINE ═══════════════════════
  pipeline: {
    name: `AI Sales Pipeline`,
    badge: `PIPELINE`,
    heroHeading: `Sales Pipeline Software With AI Win-Probability on Every Deal`,
    heroDescription: `A drag-and-drop deal board that scores win probability, flags at-risk deals automatically, and forecasts revenue with AI. Deal tracking that tells you exactly where to spend your time.`,
    shortDescription: `Visual deal board with AI win scores and automatic at-risk alerts.`,
    cardFeatures: [`AI win-probability score`, `Automatic at-risk flagging`, `AI sales forecasting`],
    capabilities: [
      { icon: `GitBranch`, title: `Drag-and-drop deal board` },
      { icon: `TrendingUp`, title: `AI win-probability score` },
      { icon: `AlertTriangle`, title: `Automatic at-risk flagging` },
      { icon: `BarChart3`, title: `AI revenue forecasting` },
      { icon: `Target`, title: `Recommended next actions` },
    ],
    featureBlocks: [
      {
        label: `AI SCORING`,
        heading: `Every deal scored for win probability`,
        description: `Revnator's AI scores each deal from 0–100 with a written reason, a list of risk factors, and a recommended next action. The kanban card border shifts green, amber, or red so you read the board at a glance.`,
        features: [
          `0–100 AI win-probability score per deal`,
          `Written reasoning and explicit risk factors`,
          `AI-recommended next action on every deal`,
          `Color-coded deal cards for instant triage`,
        ],
        ctaText: `Score deals free`,
      },
      {
        label: `AT-RISK DETECTION`,
        heading: `Stalled deals flagged before they slip`,
        description: `A server-side cron re-evaluates every deal each day — no activity, stuck in a stage, contact gone quiet, no open tasks — and flags at-risk deals automatically. The flag clears itself when a deal recovers.`,
        features: [
          `Daily server-side risk re-evaluation`,
          `Flags inactivity, stage stalls, and contact silence`,
          `At-risk badge, notification, and AI suggestion`,
          `Auto-clears once the deal is back on track`,
        ],
        ctaText: `Try it free`,
      },
      {
        label: `FORECASTING`,
        heading: `AI sales forecasting you can actually trust`,
        description: `The forecast weights your pipeline by stage probability and AI score, projects revenue, and writes plain-English insights on anomalies and risks — so your number is a read, not a guess.`,
        features: [
          `Stage-weighted revenue forecast`,
          `AI insights, anomalies, and recommendations`,
          `Six-month projection chart`,
          `Deals-needing-attention worklist`,
        ],
        ctaText: `Get started free`,
      },
      {
        label: `BUILT YOUR WAY`,
        heading: `A pipeline that matches how your team sells`,
        description: `Custom stages with their own probabilities, deal custom fields, won/lost tracking with captured reasons, and a kanban or list view — configure the pipeline around your real sales process.`,
        features: [
          `Custom stages with colors and win probabilities`,
          `Kanban and list views with drag-and-drop`,
          `Won/lost tracking with lost-reason capture`,
          `Deal custom fields for your sales process`,
        ],
        ctaText: `Start free trial`,
      },
    ],
    comparisonHeading: `Deal tracking that does the analysis for you.`,
    comparisonCards: [
      {
        title: `vs. Pipedrive`,
        description: `Pipedrive shows you a pipeline. Revnator scores it — win probability and at-risk flags on every deal, automatically.`,
      },
      {
        title: `vs. Salesforce`,
        description: `Salesforce forecasting needs Einstein add-ons and an admin. Revnator forecasts with AI on every plan, straight out of the box.`,
      },
      {
        title: `vs. a spreadsheet`,
        description: `A spreadsheet never tells you a deal went quiet 14 days ago. Revnator's daily risk cron flags it for you.`,
      },
    ],
    comparisonStats: [
      { number: `0–100`, label: `AI win score per deal` },
      { number: `Daily`, label: `automatic at-risk re-scan` },
      { number: `6 mo`, label: `AI revenue forecast` },
    ],
    ctaHeading: `Forecast your pipeline with AI today`,
    ctaSubheading: `AI win scoring and at-risk detection on every deal. Start free — no credit card required.`,
  },

  // ═══════════════════════ 5. SALES-OPS ═══════════════════════
  'sales-ops': {
    name: `Sales Operations`,
    badge: `SALES OPS`,
    heroHeading: `Sales Operations Software That Runs Your Day With AI`,
    heroDescription: `Tasks, missions, calendar, and a workspace dashboard in one place — with AI ranking your priorities and writing your daily briefing. Sales productivity tools that tell you what to do next.`,
    shortDescription: `AI-prioritized tasks, missions, and a daily-briefing workspace.`,
    cardFeatures: [`AI task priority ranking`, `Guided missions & playbooks`, `AI daily briefing`],
    capabilities: [
      { icon: `CheckSquare`, title: `Task management, 3 views` },
      { icon: `Sparkles`, title: `AI task priority ranking` },
      { icon: `Target`, title: `Missions & guided playbooks` },
      { icon: `LayoutDashboard`, title: `Workspace daily briefing` },
      { icon: `Lightbulb`, title: `AI suggestions queue` },
    ],
    featureBlocks: [
      {
        label: `AI PRIORITY`,
        heading: `Your task list, ranked by what actually matters`,
        description: `Switch on AI Priority and Revnator reorders your pending tasks by impact — factoring in the AI lead score of the linked contact and the AI score of the linked deal — with a reason chip on every task.`,
        features: [
          `AI re-ranks tasks by real sales impact`,
          `Factors in linked lead scores and deal scores`,
          `A reason chip explains every ranking`,
          `List, kanban, and calendar task views`,
        ],
        ctaText: `Prioritize free`,
      },
      {
        label: `MISSIONS`,
        heading: `Guided playbooks that come with their own task list`,
        description: `Missions turn a goal into a structured set of tasks. Five templates — SDR outreach, BDR account penetration, ABM, and more — each seed eight tasks, and AI insights report whether a mission is on track or blocked.`,
        features: [
          `5 mission templates for common sales plays`,
          `8 tasks auto-seeded per template`,
          `AI mission insights: on-track, at-risk, or blocked`,
          `Team members and progress tracking per mission`,
        ],
        ctaText: `Try missions free`,
      },
      {
        label: `DAILY BRIEFING`,
        heading: `Open your workspace to an AI summary of the day`,
        description: `The workspace dashboard leads with an AI-written daily briefing — hot leads, overdue tasks, today's meetings, urgent actions — above a live AI suggestions queue you can act on in one click.`,
        features: [
          `AI-written daily briefing every morning`,
          `Snapshot cards for tasks, emails, meetings, and deals`,
          `AI suggestions queue with accept, snooze, dismiss`,
          `Onboarding checklist to ramp new reps`,
        ],
        ctaText: `Get started free`,
      },
      {
        label: `MEETINGS & MORE`,
        heading: `Calendar, booking pages, and team chat in one workspace`,
        description: `Sales Ops also bundles a shared calendar with AI meeting prep, public booking pages, and built-in team chat — so your reps stop paying for and switching between separate point tools.`,
        features: [
          `Shared calendar with AI meeting-prep briefs`,
          `Public booking pages at /book/your-slug`,
          `Built-in team chat channels`,
          `Everything linked to contacts, deals, and accounts`,
        ],
        ctaText: `Start free trial`,
      },
    ],
    comparisonHeading: `One sales workspace instead of five open tabs.`,
    comparisonCards: [
      {
        title: `vs. Asana & Monday`,
        description: `Generic task tools don't know what a hot lead is. Revnator ranks your tasks by linked deal and lead AI scores.`,
      },
      {
        title: `vs. Salesforce Tasks`,
        description: `Salesforce tasks are a flat list. Revnator writes you an AI daily briefing and tells you what to do first.`,
      },
      {
        title: `vs. a pile of point tools`,
        description: `Stop paying for a separate task app, scheduler, and chat tool. Revnator bundles them into one sales workspace.`,
      },
    ],
    comparisonStats: [
      { number: `5`, label: `mission playbook templates` },
      { number: `AI`, label: `daily briefing every morning` },
      { number: `3-in-1`, label: `tasks, calendar & chat` },
    ],
    ctaHeading: `Run your sales operations with AI`,
    ctaSubheading: `Let AI prioritize your day and write your briefing. Start free — no credit card required.`,
  },

  // ═══════════════════════ 6. CALENDAR ═══════════════════════
  calendar: {
    name: `Calendar & Booking`,
    badge: `SCHEDULING`,
    heroHeading: `Sales Scheduling Software With Booking Pages and AI Meeting Prep`,
    heroDescription: `A meeting booking tool that lives inside your CRM — a Calendly alternative with public booking pages and an AI prep brief before every call. Two-way sync with Google Calendar and Outlook.`,
    shortDescription: `Booking pages and AI meeting prep, built into your CRM.`,
    cardFeatures: [`Public booking pages`, `AI meeting-prep briefs`, `Google & Outlook sync`],
    capabilities: [
      { icon: `Calendar`, title: `Month / week / day / agenda` },
      { icon: `Link`, title: `Public booking pages` },
      { icon: `Sparkles`, title: `AI meeting-prep briefs` },
      { icon: `RefreshCw`, title: `Google & Outlook sync` },
      { icon: `Clock`, title: `Availability & buffers` },
    ],
    featureBlocks: [
      {
        label: `BOOKING PAGES`,
        heading: `A Calendly alternative built into your CRM`,
        description: `Publish booking pages at /book/your-slug. Prospects pick a meeting type and an open slot with no login required, and every booking flows straight into your CRM as a contact.`,
        features: [
          `4-step booking-page builder`,
          `Public page at /book/your-slug — no visitor login`,
          `Meeting types, availability, buffers, and daily caps`,
          `Automatic .ics calendar file on confirmation`,
        ],
        ctaText: `Build a page free`,
      },
      {
        label: `AI MEETING PREP`,
        heading: `Walk into every call already briefed`,
        description: `Click "Prepare with AI" on any meeting and Revnator writes a brief from the linked contact, deal, and account — who you're meeting and exactly where the deal stands — ready before the call begins.`,
        features: [
          `One-click AI meeting-prep brief`,
          `Pulls from the linked contact, deal, and account`,
          `Renders inline on the calendar event`,
          `Ready before the call starts`,
        ],
        ctaText: `Try AI prep free`,
      },
      {
        label: `SYNC`,
        heading: `Two-way sync with the calendars you already use`,
        description: `Connect Google Calendar and Outlook so your Revnator events and your external events stay in step — book a slot in either place and there's no risk of a double-booking.`,
        features: [
          `Two-way Google Calendar sync`,
          `Two-way Outlook Calendar sync`,
          `Events linked to contacts, deals, and accounts`,
          `Month, week, day, and agenda views`,
        ],
        ctaText: `Get started free`,
      },
      {
        label: `SCHEDULING`,
        heading: `Scheduling that respects how your team works`,
        description: `Recurring events, all-day events, per-rep time zones, buffers between meetings, and daily booking caps — the controls a real sales calendar needs.`,
        features: [
          `Recurring and all-day events`,
          `Per-rep availability and time zones`,
          `Buffers between back-to-back meetings`,
          `Daily booking caps to protect focus time`,
        ],
        ctaText: `Start free trial`,
      },
    ],
    comparisonHeading: `A meeting booking tool that's actually part of your CRM.`,
    comparisonCards: [
      {
        title: `vs. Calendly`,
        description: `Calendly is a $12+/user/month scheduling silo. Revnator's booking pages are included — and every booking lands as a CRM contact.`,
      },
      {
        title: `vs. Chili Piper`,
        description: `Chili Piper is enterprise-priced meeting routing. Revnator gives you booking pages and AI meeting prep on every plan.`,
      },
      {
        title: `vs. back-and-forth email`,
        description: `Stop trading "does Tuesday work?" emails. Share one /book link and let prospects self-schedule around your availability.`,
      },
    ],
    comparisonStats: [
      { number: `/book`, label: `your public booking link` },
      { number: `AI`, label: `prep brief before every call` },
      { number: `2-way`, label: `Google & Outlook sync` },
    ],
    ctaHeading: `Start booking meetings the smart way`,
    ctaSubheading: `Booking pages and AI meeting prep, included on every plan. Start free — no credit card required.`,
  },

  // ═══════════════════════ 7. CHAT ═══════════════════════
  chat: {
    name: `Team Chat`,
    badge: `COLLABORATION`,
    heroHeading: `Internal Sales Chat Built Into Your Sales Workspace`,
    heroDescription: `Real-time sales team communication that lives where you sell — no separate Slack to pay for, no extra tab to switch to. Channels, messaging, and typing indicators, right next to your pipeline.`,
    shortDescription: `Real-time team chat built into the sales workspace.`,
    cardFeatures: [`Real-time chat channels`, `No separate Slack needed`, `Lives in your workspace`],
    capabilities: [
      { icon: `MessageCircle`, title: `Real-time chat channels` },
      { icon: `Zap`, title: `Instant message delivery` },
      { icon: `Users`, title: `Team channels & members` },
      { icon: `Bell`, title: `Unread message counts` },
      { icon: `RefreshCw`, title: `Live typing indicators` },
    ],
    featureBlocks: [
      {
        label: `BUILT IN`,
        heading: `Sales team communication without another app`,
        description: `Chat is part of the Revnator workspace. There's no separate Slack subscription and no extra tab to manage — your team talks where the deals, contacts, and tasks already live.`,
        features: [
          `Built directly into the sales workspace`,
          `No separate Slack or Teams subscription`,
          `One login and one app for your reps`,
          `Auto-seeded #general and #sales channels`,
        ],
        ctaText: `Get started free`,
      },
      {
        label: `REAL-TIME`,
        heading: `Messages that arrive the instant they're sent`,
        description: `Real-time delivery, live typing indicators, and per-channel unread counts keep the whole sales team in sync as deals move.`,
        features: [
          `Real-time message delivery`,
          `Live typing indicators`,
          `Unread counts on every channel`,
          `Edit and delete messages`,
        ],
        ctaText: `Try it free`,
      },
      {
        label: `ORGANIZED`,
        heading: `Channels for every team, region, and campaign`,
        description: `Create channels for teams, territories, or active campaigns. A clean two-panel layout keeps conversations tidy and easy to follow.`,
        features: [
          `Create channels for any team or topic`,
          `Channel membership control`,
          `Clean two-panel chat layout`,
          `Load-more history on every channel`,
        ],
        ctaText: `Start free`,
      },
      {
        label: `IN CONTEXT`,
        heading: `Talk shop without leaving your pipeline`,
        description: `Because chat sits in the same workspace as contacts, deals, and tasks, your team discusses live deals with the underlying data only a click away — no context-switching.`,
        features: [
          `Chat alongside contacts, deals, and tasks`,
          `No context-switching between apps`,
          `Everything under one Revnator login`,
          `Included on every plan`,
        ],
        ctaText: `Start free trial`,
      },
    ],
    comparisonHeading: `Internal sales chat that doesn't cost extra.`,
    comparisonCards: [
      {
        title: `vs. Slack`,
        description: `Slack is another $7–15/user/month and another tab. Revnator chat is included and lives right next to your pipeline.`,
      },
      {
        title: `vs. Microsoft Teams`,
        description: `Teams is heavyweight and disconnected from your CRM. Revnator chat is lightweight and built for the way sales teams work.`,
      },
      {
        title: `vs. email threads`,
        description: `Internal deal chatter doesn't belong in your inbox. Revnator gives your team a real-time channel for it.`,
      },
    ],
    comparisonStats: [
      { number: `$0`, label: `extra cost — it's included` },
      { number: `Real-time`, label: `message delivery` },
      { number: `1 app`, label: `chat and CRM together` },
    ],
    ctaHeading: `Bring your sales team into one workspace`,
    ctaSubheading: `Built-in team chat, included on every plan. Start free — no credit card required.`,
  },

  // ═══════════════════════ 8. AI SDR ═══════════════════════
  'ai-sdr': {
    name: `AI SDR`,
    badge: `AI`,
    heroHeading: `AI SDR Software That Powers Every Module — Your Way`,
    heroDescription: `An embedded AI sales assistant you open with Ctrl+K, AI scoring in every module, and a choice of how to run it: Revnator credits, your own AI key with BYOAI, or self-hosted Ollama. This is the AI hub of your sales OS.`,
    shortDescription: `Embedded AI assistant, BYOAI, and AI scoring across every module.`,
    cardFeatures: [`Embedded AI assistant (Ctrl+K)`, `BYOAI — bring your own key`, `Self-hosted Ollama support`],
    capabilities: [
      { icon: `Sparkles`, title: `Embedded AI assistant (Ctrl+K)` },
      { icon: `Brain`, title: `BYOAI — 6 providers` },
      { icon: `Shield`, title: `Self-hosted Ollama AI` },
      { icon: `CreditCard`, title: `AI credits system` },
      { icon: `Zap`, title: `AI scoring in every module` },
    ],
    featureBlocks: [
      {
        label: `AI ASSISTANT`,
        heading: `An AI sales assistant one keystroke away`,
        description: `Press Ctrl+K anywhere in Revnator to open an AI assistant that answers questions about your pipeline and takes action — creating tasks and updating records server-side — while remembering your conversation.`,
        features: [
          `Open instantly from anywhere with Ctrl+K (⌘K)`,
          `Answers questions about your contacts and pipeline`,
          `Executes real actions — creates tasks, updates records`,
          `Remembers your conversation across sessions`,
        ],
        ctaText: `Try the assistant free`,
      },
      {
        label: `BYOAI`,
        heading: `Bring your own AI key — or use ours`,
        description: `Choose how AI runs in Revnator: managed AI credits, your own provider key with BYOAI and zero credits used, or self-hosted Ollama. Six providers are supported, and you can switch source anytime.`,
        features: [
          `BYOAI with 6 providers: Anthropic, OpenAI, Google, Groq, Mistral, Cohere`,
          `Zero Revnator credits used on your own key`,
          `AES-256-GCM encrypted key storage`,
          `Switch AI source anytime in settings`,
        ],
        ctaText: `Connect your key free`,
      },
      {
        label: `SELF-HOSTED AI`,
        heading: `Run AI on your own hardware with Ollama`,
        description: `Privacy-first teams can route every AI call to Ollama — running locally on a rep's own machine, or on a remote Ollama server you control — so sensitive sales data never leaves your infrastructure.`,
        features: [
          `Self-hosted Ollama support`,
          `Local on-device mode or remote-server mode`,
          `Pull and choose your own open models`,
          `Your data never leaves your infrastructure`,
        ],
        ctaText: `Get started free`,
      },
      {
        label: `AI EVERYWHERE`,
        heading: `AI scoring and automation in every module`,
        description: `The AI SDR isn't one feature — it's lead scoring, deal scoring, account health, sequence generation, reply analysis, meeting prep, and a daily briefing, all routed through one universal AI engine.`,
        features: [
          `Per-contact AI agents with lead scores and next actions`,
          `Deal and account AI scoring across the pipeline`,
          `AI sequence generator and subject-line optimizer`,
          `AI credits with a monthly allowance plus top-up packs`,
        ],
        ctaText: `Start free trial`,
      },
    ],
    comparisonHeading: `An AI sales platform you control — not a black box.`,
    comparisonCards: [
      {
        title: `vs. standalone AI SDR tools`,
        description: `Tools like 11x and Artisan lock you into their model and their pricing. Revnator lets you bring your own key or self-host entirely.`,
      },
      {
        title: `vs. HubSpot & Salesforce AI`,
        description: `Their AI is a paid add-on you can't see inside. Revnator's AI is on every plan, with a usage ledger you can audit.`,
      },
      {
        title: `vs. ChatGPT in another tab`,
        description: `A chatbot that can't see your CRM is just typing practice. Revnator's assistant acts on your real pipeline.`,
      },
    ],
    comparisonStats: [
      { number: `Ctrl+K`, label: `AI assistant, anywhere` },
      { number: `6`, label: `BYOAI providers supported` },
      { number: `100%`, label: `self-hostable with Ollama` },
    ],
    ctaHeading: `Put an AI SDR to work in your pipeline`,
    ctaSubheading: `Bring your own AI key, self-host with Ollama, or use included credits. Start free — no credit card required.`,
  },

  // ═══════════════════════ 9. FORMS ═══════════════════════
  forms: {
    name: `Lead Capture Forms`,
    badge: `LEAD GEN`,
    heroHeading: `Lead Capture Forms With AI Hot-Lead Scoring Built In`,
    heroDescription: `A drag-and-drop form builder inside your CRM — every submission becomes a contact, and AI scores hot leads the moment they hit submit. B2B lead generation forms that route themselves.`,
    shortDescription: `Drag-and-drop forms that create contacts and score hot leads with AI.`,
    cardFeatures: [`AI hot-lead scoring`, `Submissions become contacts`, `Public hosted form pages`],
    capabilities: [
      { icon: `FileText`, title: `Drag-and-drop form builder` },
      { icon: `Sparkles`, title: `AI hot-lead scoring` },
      { icon: `Users`, title: `Auto contact creation` },
      { icon: `Globe`, title: `Public hosted form pages` },
      { icon: `Code`, title: `Embed & API integration` },
    ],
    featureBlocks: [
      {
        label: `AI SCORING`,
        heading: `Hot leads scored the moment they submit`,
        description: `When a form creates a contact, Revnator scores that lead with AI in the background. A strong score instantly raises a high-priority hot-lead suggestion and notification, so reps pounce while interest is fresh.`,
        features: [
          `AI lead scoring at submission time`,
          `High-priority alert the instant a hot lead arrives`,
          `Scoring runs in the background — visitors never wait`,
          `New leads flow straight into the AI suggestions queue`,
        ],
        ctaText: `Score leads free`,
      },
      {
        label: `FORM BUILDER`,
        heading: `Build B2B lead generation forms in minutes`,
        description: `A three-panel drag-and-drop builder with ten field types, a live preview of the visitor experience, and AI that suggests the right fields from your form's purpose.`,
        features: [
          `Drag-and-drop builder with 10 field types`,
          `AI suggests fields from your form's purpose`,
          `Live preview of what visitors will see`,
          `Configurable labels, help text, and validation`,
        ],
        ctaText: `Build a form free`,
      },
      {
        label: `AUTO-ROUTING`,
        heading: `Every submission becomes a CRM contact`,
        description: `Form submissions create or update a contact and can drop it onto a list automatically — no CSV exports, no manual data entry, no leads lost between tools.`,
        features: [
          `Submissions create or update contacts automatically`,
          `Auto-add new contacts to a chosen list`,
          `Notification email on every submission`,
          `Submissions table with CSV export`,
        ],
        ctaText: `Get started free`,
      },
      {
        label: `PUBLISH ANYWHERE`,
        heading: `Host it, embed it, or wire it up by API`,
        description: `Publish a hosted form page, embed an iframe on any website, or post submissions programmatically through the form's own API key — Revnator forms work wherever your leads are.`,
        features: [
          `Public hosted form page — no website required`,
          `Copy-paste iframe embed code for any site`,
          `Per-form API key for programmatic submissions`,
          `Works on any landing page or marketing site`,
        ],
        ctaText: `Start free trial`,
      },
    ],
    comparisonHeading: `Lead capture that scores and routes itself.`,
    comparisonCards: [
      {
        title: `vs. Typeform`,
        description: `Typeform collects answers but has no idea which lead is hot. Revnator scores every submission with AI the moment it lands.`,
      },
      {
        title: `vs. HubSpot Forms`,
        description: `HubSpot gates lead scoring behind Marketing Hub. Revnator scores form leads with AI on every plan.`,
      },
      {
        title: `vs. Google Forms + a spreadsheet`,
        description: `Google Forms won't create a CRM contact or flag a hot lead. Revnator does both, automatically, on submit.`,
      },
    ],
    comparisonStats: [
      { number: `10`, label: `form field types` },
      { number: `AI`, label: `hot-lead scoring at submit` },
      { number: `0`, label: `manual data entry` },
    ],
    ctaHeading: `Start capturing and scoring leads today`,
    ctaSubheading: `AI hot-lead scoring on every form submission. Start free — no credit card required.`,
  },
}

// ── Update routine ─────────────────────────────────────────────────────────

async function run(): Promise<void> {
  const configPath = path.resolve(dirname, '../payload.config.ts')
  const configUrl = new URL(`file:///${configPath.replace(/\\/g, '/')}`)
  const payload = await getPayload({
    config: (await import(configUrl.href)).default,
  })

  const result = await payload.find({ collection: 'modules', limit: 100, depth: 0 })
  const modules = result.docs

  console.log(`\n📦 Found ${modules.length} modules in the database.\n`)

  let updated = 0
  const unmatched: string[] = []

  for (const mod of modules) {
    const slug = mod.slug as string
    const c = content[slug]

    if (!c) {
      unmatched.push(`${slug} (no content defined)`)
      console.log(`  ⚠  Skipped: ${slug} — no content in this script`)
      continue
    }

    await payload.update({
      collection: 'modules',
      id: mod.id,
      data: {
        name: c.name,
        badge: c.badge,
        heroHeading: c.heroHeading,
        heroDescription: c.heroDescription,
        heroPrimaryCtaHref: GET_STARTED,
        shortDescription: c.shortDescription,
        cardFeatures: c.cardFeatures.map((text) => ({ text })),
        capabilities: c.capabilities.map((cap) => ({
          icon: cap.icon,
          title: cap.title,
        })) as Module['capabilities'],
        featureBlocks: c.featureBlocks.map((fb) => ({
          label: fb.label,
          heading: fb.heading,
          description: fb.description,
          features: fb.features.map((text) => ({ text })),
          ctaText: fb.ctaText,
          ctaHref: GET_STARTED,
        })),
        comparisonHeading: c.comparisonHeading,
        comparisonCards: c.comparisonCards.map((card) => ({
          title: card.title,
          description: card.description,
        })),
        comparisonStats: c.comparisonStats.map((stat) => ({
          number: stat.number,
          label: stat.label,
        })),
        ctaHeading: c.ctaHeading,
        ctaSubheading: c.ctaSubheading,
        ctaPrimaryHref: GET_STARTED,
      },
      context: { disableRevalidate: true },
    })

    updated++
    console.log(`  ✓ Updated: ${slug}  →  "${c.name}"`)
  }

  // Report content keys with no matching module
  const dbSlugs = new Set(modules.map((m) => m.slug as string))
  const orphanContent = Object.keys(content).filter((s) => !dbSlugs.has(s))

  console.log('\n────────────────────────────────────────')
  console.log(`✅ Modules updated:        ${updated} / ${modules.length}`)
  if (unmatched.length > 0) {
    console.log(`⚠️  Modules without content: ${unmatched.length}`)
    for (const u of unmatched) console.log(`     - ${u}`)
  }
  if (orphanContent.length > 0) {
    console.log(`⚠️  Content without a module: ${orphanContent.join(', ')}`)
  }
  console.log('────────────────────────────────────────\n')

  process.exit(0)
}

run().catch((err) => {
  console.error('Module content update failed:', err)
  process.exit(1)
})
