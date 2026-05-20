/**
 * Seed script: replaces the body of every existing documentation page with
 * comprehensive, product-accurate content.
 *
 * This script does NOT create or delete sections/pages — it only updates the
 * `body` (and `lastUpdated`) of pages that already exist in the database. Run
 * `seed-docs.ts` first if the doc sections/pages have not been created yet.
 *
 * Run from project root:
 *   npx tsx src/scripts/seed-docs-content.ts
 */
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import path from 'path'
import { getPayload } from 'payload'
import { fileURLToPath } from 'url'
import type { DocPage, DocSection } from '../payload-types'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// ── Lexical JSON helpers ───────────────────────────────────────────────────

function text(content: string, format = 0): Record<string, unknown> {
  return { type: 'text', text: content, format, detail: 0, mode: 'normal', style: '', version: 1 }
}

/** Bold inline text. */
function b(content: string): Record<string, unknown> {
  return text(content, 1)
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

/** Convenience: a paragraph from a single plain string. */
function p(content: string): Record<string, unknown> {
  return paragraph(text(content))
}

function heading(tag: 'h2' | 'h3', content: string): Record<string, unknown> {
  return { type: 'heading', tag, children: [text(content)], direction: 'ltr', format: '', indent: 0, version: 1 }
}
const h2 = (s: string): Record<string, unknown> => heading('h2', s)
const h3 = (s: string): Record<string, unknown> => heading('h3', s)

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

// The Code block's `language` select only defines typescript/javascript/css.
// Anything else is stored as an empty language (still renders as plain code).
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

// ── Documentation content ──────────────────────────────────────────────────
// Keyed by `${sectionSlug}/${pageSlug}`.

const content: Record<string, DocPage['body']> = {
  // ════════════════════════ GETTING STARTED ════════════════════════
  'getting-started/welcome': body([
    p(
      'Welcome to the Revnator documentation. Revnator is an AI-native B2B Sales OS built for small sales teams — it replaces the usual stack of separate CRM, outreach, pipeline, calendar, and reporting tools with a single connected workspace.',
    ),
    h2('What is Revnator?'),
    p(
      'Revnator brings every part of the sales motion into one app: capturing a lead, qualifying it, running outreach, working the deal, and reporting on the result. Because the data lives in one place, an AI agent can watch every contact, score it, and tell each rep what to do next — without anyone copying records between tools.',
    ),
    h2('The modules'),
    p('Revnator is organised into modules that share the same contact and account data:'),
    unorderedList([
      'Contacts — every lead and customer, with a per-contact AI agent that scores them and suggests the next best action',
      'Accounts — company-level records with AI health scoring and risk flags',
      'Email & Sequences — multi-step, AI-personalised outreach sent from your own inbox',
      'Pipeline — a drag-and-drop deal board with AI win-likelihood scoring and at-risk detection',
      'Sales Ops — tasks, missions (guided playbooks), a shared calendar, booking pages, and team chat',
      'Reports — dashboards for revenue, email, pipeline, and tasks, with AI-written insights',
      'Forms — embeddable lead-capture forms that create contacts automatically and score hot leads',
      'Integrations — connected inboxes, calendars, enrichment providers, and the public API',
    ]),
    h2('AI is built in, not bolted on'),
    p(
      'Every module uses AI through a single universal router. You can connect your own AI provider key (Anthropic, OpenAI, Google, Groq, Mistral, or Cohere) and use zero credits, or fall back to Revnator-managed AI billed against a monthly credit allowance. AI features include lead and deal scoring, a daily briefing, sequence generation, subject-line optimisation, reply analysis, and meeting prep.',
    ),
    h2('Where to start'),
    p(
      'New to Revnator? Start with the Quick Start Guide — the in-app onboarding wizard gets you to your first sent email in a couple of minutes. If you are moving from another CRM, read Importing Contacts next. To send outreach, connect your inbox first via Connecting Your Email.',
    ),
  ]),

  'getting-started/quick-start': body([
    p(
      'When you first sign in, Revnator runs a six-step onboarding wizard that takes you from an empty workspace to your first AI-personalised sequence. This guide mirrors that wizard — you can follow it in order or revisit any step later.',
    ),
    h2('Step 1 — Welcome'),
    p(
      'The wizard opens with a short summary of what you are about to set up. Click "Let\'s get started" to begin. Every step after this one is skippable; anything you skip reappears as a checklist on your workspace dashboard.',
    ),
    h2('Step 2 — Set up your workspace'),
    p(
      'Enter your workspace name, your full name, job title, company size, and industry. The workspace name is what your team sees in the sidebar — you can rename it later under Settings → Workspace.',
    ),
    h2('Step 3 — Connect your email'),
    p(
      'Connect the inbox you send from. Gmail and Outlook connect with one click via OAuth; any other provider connects over SMTP. Sequences send through this inbox, so replies land in your normal mailbox and sent mail appears in your Sent folder.',
    ),
    bannerBlock(
      'info',
      'Connect your email before importing contacts — Revnator can then match existing threads to the contacts you bring in.',
    ),
    h2('Step 4 — Add your first contact'),
    p(
      'Enter a name, email, company, and title. Revnator automatically finds or creates the matching company account. To bring in many contacts at once, use the bulk-import link instead — see Importing Contacts.',
    ),
    h2('Step 5 — Create your first sequence'),
    p(
      'Describe your goal, audience, and tone, and Revnator\'s AI generates a complete multi-step sequence — subject lines, bodies, and send delays. Review the preview and click "Create this sequence", or start from a blank sequence instead.',
    ),
    h2('Step 6 — Done'),
    p(
      'The final step summarises what you completed and what you skipped. Click "Go to my workspace" to land on your dashboard, where the AI daily briefing and any unfinished onboarding items are waiting.',
    ),
  ]),

  'getting-started/connecting-email': body([
    p(
      'Revnator sends every campaign and sequence email through your own connected inbox — not a shared relay. Recipients see your real address, replies arrive in your normal mailbox, and sent messages appear in your Sent folder. This page covers connecting and managing inboxes.',
    ),
    h2('Where to connect an inbox'),
    p(
      'Go to Email → Settings. The Connected Email Accounts panel shows three options: Gmail, Outlook, and Other Providers (SMTP). You can connect more than one inbox and pick a default.',
    ),
    h2('Gmail and Outlook (OAuth)'),
    orderedList([
      'On Email → Settings, click Connect under Gmail or Outlook.',
      'Sign in to the provider and approve the requested permissions — send and read access only.',
      'You are returned to Revnator with the inbox connected and tokens stored encrypted at rest.',
    ]),
    p(
      'Gmail sends through the Gmail API and Outlook through Microsoft Graph. Access tokens refresh automatically before they expire, so you do not need to reconnect.',
    ),
    h2('Other providers (SMTP)'),
    p(
      'For Zoho, Yahoo, iCloud, Fastmail, GoDaddy, Hostinger, Amazon SES, or any custom server, choose Other Providers and pick a preset. Presets auto-fill the host, port, and security settings — you only enter your address and password (an app-specific password where the provider requires one). Revnator tests the connection before saving and stores the password encrypted.',
    ),
    bannerBlock(
      'warning',
      'Many providers block plain password logins. If an SMTP connection fails, generate an app-specific password in your email provider\'s security settings and use that instead.',
    ),
    h2('Sending domains (optional)'),
    p(
      'For higher-volume sending you can authenticate a domain instead of an individual inbox. In the Sending Domains section, add your domain, copy the generated DNS CNAME records into your DNS provider, and click Verify. Once the status turns to "verified" the domain can be set as your default sender.',
    ),
    h2('Managing connected inboxes'),
    p(
      'Each connected account shows a provider badge. Use Set as default to choose which inbox sends by default, and Disconnect to remove an account — disconnecting an OAuth inbox also revokes Revnator\'s tokens with the provider.',
    ),
  ]),

  // ════════════════════════ CONTACTS ════════════════════════
  'contacts/overview': body([
    p(
      'The Contacts module is your single source of truth for every lead and customer. Each contact carries its own AI agent that watches engagement signals, scores the contact 0–100, and suggests the next best action.',
    ),
    h2('The contacts table'),
    p(
      'Contacts → View Contacts opens the main table. Rows are clickable and lead to the contact detail page. The table includes a Score column with a colour-coded AI badge — 🔥 80+, ⬆ 60+, → 40+, and grey below 40 — plus search, filtering, and a global bulk-select checkbox.',
    ),
    h2('Adding contacts'),
    p('There are three ways to add contacts:'),
    unorderedList([
      'Manually — Contacts → Add Contact, which opens a form for name, email, phone, company, job title, and more',
      'By import — Contacts → Import, a CSV wizard covered in Importing Contacts',
      'Automatically — published Forms create a contact from every submission',
    ]),
    p(
      'When you add a contact with a company name, Revnator automatically finds or creates the matching account so contacts and companies stay linked.',
    ),
    h2('The contact detail page'),
    p(
      'The detail page uses a 60/40 layout with six tabs: Overview, Activity, Emails, Tasks, Deals, and Details. Fields are edited inline — click a value, change it, and click away to save. The right column holds a Quick Edit card and the AI Agent card with the lead score, the reasoning behind it, and the suggested next best action.',
    ),
    h2('Bulk actions'),
    p(
      'Select rows with the checkboxes to reveal the bulk-action bar: soft-delete, add to a list, or enrich the selected contacts. Bulk enrichment runs in the background so the table stays responsive.',
    ),
    bannerBlock(
      'info',
      'Deletes are always soft deletes — a removed contact is hidden, not destroyed, so it can be recovered if needed.',
    ),
  ]),

  'contacts/importing-contacts': body([
    p(
      'The bulk-import tool brings your existing contacts into Revnator from a spreadsheet. It runs as a four-step wizard that handles column mapping, duplicate handling, and validation for you.',
    ),
    h2('Prepare your file'),
    p(
      'Export your contacts as a CSV file with a header row. Each contact needs at least an email address. UTF-8 encoding avoids garbled characters. A typical file looks like this:',
    ),
    codeBlock(
      'name,email,company,job_title,phone,country,lead_status\nJane Smith,jane@acme.com,Acme Corp,VP Sales,+1-555-0101,United States,New\nJohn Doe,john@globex.com,Globex Inc,Head of Growth,+1-555-0202,Canada,Qualified',
      'csv',
    ),
    h2('Step 1 — Upload'),
    p('Go to Contacts → Import and upload your CSV file. The wizard reads the header row and previews the first few rows so you can confirm it parsed correctly.'),
    h2('Step 2 — Map columns'),
    p(
      'Match each column in your file to a Revnator contact field. Common headers like Email, Name, and Company are detected automatically — review the mappings and correct anything that is wrong. A column that does not match a built-in field can be mapped to a custom field.',
    ),
    h2('Step 3 — Options'),
    p(
      'Choose how the import behaves: how to handle rows whose email already exists in your workspace, and optionally a list to add every imported contact to. To merge new data into existing records rather than skip them, enable "Update existing contacts".',
    ),
    h2('Step 4 — Import'),
    p(
      'Start the import and watch the progress bar. When it finishes you get a summary of how many contacts were created, updated, and skipped.',
    ),
    h2('Troubleshooting'),
    bannerBlock(
      'warning',
      'If the import reports duplicate emails and you expected updates, return to Step 3 and turn on "Update existing contacts" — this merges instead of skipping.',
    ),
    unorderedList([
      'Invalid email format — every row must contain a valid email address',
      'Encoding issues — re-save the CSV as UTF-8 if names appear garbled',
      'Missing headers — the first row must contain column names, not data',
    ]),
  ]),

  'contacts/custom-fields': body([
    p(
      'Custom fields let you store data that the built-in contact fields do not cover — a renewal date, an account tier, a referral source, or anything else specific to how your team sells.',
    ),
    h2('Creating a custom field'),
    orderedList([
      'Open Contacts → Contact Settings.',
      'In the Custom Fields manager, click Add Field.',
      'Give the field a name and choose its type.',
      'Save — the field is immediately available on every contact.',
    ]),
    h2('Field types'),
    p(
      'Each custom field has a type that controls how it is entered and displayed. Choose the type that matches the data so values stay consistent across contacts. The manager shows a type badge next to every field.',
    ),
    h2('Ordering fields'),
    p(
      'Drag fields in the Custom Fields manager to reorder them. The order you set here is the order they appear on the contact detail page.',
    ),
    h2('Where custom fields appear'),
    p(
      'Custom field values are edited on the Details tab of the contact detail page, inline like every other field. Custom fields are also available as mapping targets in the import wizard, so spreadsheet columns without a built-in match can still be imported.',
    ),
    h2('Custom fields for accounts and deals'),
    p(
      'The same system exists for the Accounts and Pipeline modules. Account custom fields are managed in Account Settings and deal custom fields in Pipeline Settings — each set is scoped to its own module.',
    ),
    bannerBlock(
      'info',
      'Deleting a custom field removes its stored values from every contact. Export the data first if you might need it later.',
    ),
  ]),

  'contacts/lists-and-filters': body([
    p(
      'Lists and filters are two ways to work with a subset of your contacts. A filter is a temporary, on-the-fly query; a list is a saved, named group you build up over time.',
    ),
    h2('Filtering the contacts table'),
    p(
      'Click Filter on the contacts table to open the filter slide-over. You can narrow the table by lead status, list membership, tags, country, date added, and last contacted. Filters are written into the URL, so a filtered view can be bookmarked or shared with a teammate.',
    ),
    h2('Working with lists'),
    p(
      'Contacts → Lists shows every list as a card. Lists are useful for stable groups — a target account list, a webinar audience, a newsletter segment. From the Lists page you can create, rename, clone, or delete a list.',
    ),
    h2('Adding contacts to a list'),
    p('There are several ways to add contacts to a list:'),
    unorderedList([
      'On the contact detail page, use the list chips — click "+" to add, or the x on a chip to remove',
      'On the contacts table, select rows and choose "Add to list" from the bulk-action bar',
      'During import, pick a list in the Options step to add every imported contact at once',
    ]),
    h2('List detail'),
    p(
      'Opening a list shows its contacts in a table with the same bulk-select behaviour as the main table — you can remove contacts from the list, move them to another list, or soft-delete them.',
    ),
    h2('Filter or list — which to use?'),
    p(
      'Use a filter when you need an answer right now and the criteria are objective ("Qualified contacts in Canada"). Use a list when you are curating a group by hand or want a stable audience to enrol into a sequence.',
    ),
  ]),

  'contacts/lifecycle-stages': body([
    p(
      'Lead statuses (sometimes called lifecycle stages) track where each contact sits in your sales process — for example New, Working, Qualified, Customer, or Lost. They are fully customisable to match how your team sells.',
    ),
    h2('Managing lead statuses'),
    p(
      'Open Contacts → Contact Settings and find the Lead Statuses section. From there you can add a status, rename it, reorder the list, and remove statuses you do not use.',
    ),
    h2('Colours and order'),
    p(
      'Each status has a colour, set with the colour picker. The colour is used wherever the status appears — the table badge, filters, and the contact detail page. Drag statuses to set their order, which should usually mirror the real progression of your pipeline.',
    ),
    h2('Setting a contact\'s status'),
    p(
      'A contact\'s lead status is editable inline from the Quick Edit card on the detail page, or in bulk from the contacts table. The Email Inbox also lets you change a status while reading a reply.',
    ),
    h2('How lead status feeds AI'),
    p(
      'The per-contact AI agent uses lead status as one of its scoring signals — a contact marked Qualified is weighted differently from one marked New. Keeping statuses accurate makes lead scores and next-best-action suggestions more reliable.',
    ),
    bannerBlock(
      'info',
      'Lead status is also a filter on the contacts table, so a clean set of statuses doubles as a fast way to segment your database.',
    ),
  ]),

  // ════════════════════════ ACCOUNTS ════════════════════════
  'accounts/overview': body([
    p(
      'The Accounts module gives you the company-level view of your data. Where Contacts tracks individual people, Accounts rolls those people up into the organisations they belong to — with their own notes, deals, tasks, and AI health score.',
    ),
    h2('How accounts are created'),
    p(
      'Accounts are created automatically. When you add or import a contact with a company name, Revnator finds the matching account or creates a new one and links the contact to it. You can also create accounts directly from the Accounts page.',
    ),
    h2('The accounts list'),
    p(
      'The Accounts page lists every company with search plus industry and country filters. Rows are clickable and open the account detail page. Bulk-select is available for deleting accounts in batches.',
    ),
    h2('The account detail page'),
    p('The account detail page has five tabs:'),
    unorderedList([
      'Contacts — every person linked to this company',
      'Activity — a timeline synthesised from notes and tasks',
      'Notes — free-form notes with full create, edit, and delete',
      'Deals — every opportunity tied to this account',
      'Tasks — tasks linked to the account, with an inline "Add Task" form',
    ]),
    p('Account fields are edited inline, and the right sidebar shows account custom fields and the AI Insights card.'),
    h2('Industries'),
    p(
      'Revnator ships with a 60-item, LinkedIn-standard industry list. The picker is searchable and supports free-text entry, and any custom industries you add are managed in Account Settings.',
    ),
  ]),

  'accounts/account-health': body([
    p(
      'Every account carries an AI health score so you can see, at a glance, which companies are thriving and which need attention. The score combines engagement, pipeline, and activity into a single 0–100 number.',
    ),
    h2('What the score measures'),
    p(
      'When an account is analysed, Revnator gathers its linked contacts, its deals, its tasks, and the email engagement aggregated across all of its contacts. It passes that picture to AI and gets back three things:',
    ),
    unorderedList([
      'A health score from 0 to 100',
      'A risk level — low, medium, or high',
      'A two-to-three-sentence summary explaining the score',
    ]),
    h2('The AI Insights card'),
    p(
      'On the account detail page, the right sidebar shows the AI card with the score badge, the risk pill, the summary, and the time it was last analysed. Click Re-analyse at any time to refresh it after activity on the account.',
    ),
    h2('Reading risk levels'),
    p(
      'A high-risk account is one where the AI sees warning signs — stalled deals, falling email engagement, or no recent activity. Treat high-risk accounts as a prompt to reach out before an opportunity slips.',
    ),
    h2('Health rules'),
    p(
      'Alongside AI scoring, Account Settings includes a Health Rules section for defining your own deterministic health criteria. AI scoring and health rules complement each other — rules encode your explicit policy, AI catches the patterns rules miss.',
    ),
    bannerBlock(
      'info',
      'Account scoring is one of several AI features that draw on your AI credits or your connected AI provider key. See Setting Up Integrations for how AI billing works.',
    ),
  ]),

  // ════════════════════════ EMAIL & SEQUENCES ════════════════════════
  'email/overview': body([
    p(
      'The Email module is where outreach happens. It has three areas: Sequences for multi-step automated outreach, Inbox for reading and triaging replies, and Settings for connected inboxes and sending domains.',
    ),
    h2('Sequences are the outreach engine'),
    p(
      'Sequences are the primary way to run outreach in Revnator. A sequence is an ordered set of steps — emails, LinkedIn touches, and call tasks — with delays between them. Each email step can be AI-personalised per contact, and the whole sequence is thread-aware and pauses automatically when a contact replies.',
    ),
    h2('The Sequences hub'),
    p(
      'Email → Sequences opens the hub: four stat cards (Active Sequences, Contacts Enrolled, Sent This Month, Avg Reply Rate) above a filterable list of sequences. A ✨ AI badge marks any sequence that uses AI personalisation. Filter tabs split sequences into All, Active, Draft, Paused, and Archived.',
    ),
    h2('Inbox'),
    p(
      'The Inbox is a two-panel view of email activity — a list on the left, the selected thread on the right. Filter tabs cover All, Unread, Replied, Campaign, and Sequence. From the Inbox you can change a contact\'s lead status, add them to a list, or mark a thread as dealt with.',
    ),
    h2('Settings'),
    p(
      'Email → Settings holds your connected inboxes and authenticated sending domains. Connect at least one inbox before sending — see Connecting Your Email.',
    ),
    bannerBlock(
      'info',
      'Sequences send on a schedule that runs every 15 minutes, so a step due "now" goes out within the next cycle rather than instantly.',
    ),
  ]),

  'email/creating-sequences': body([
    p(
      'A sequence is a repeatable outreach play. This page covers building one in the sequence builder, the step types available, and the settings that control how it sends.',
    ),
    h2('The sequence builder'),
    p(
      'Email → Sequences → New sequence opens the builder, a two-panel screen: settings on the left, the visual step editor on the right. Add steps, reorder them, and edit each one in place.',
    ),
    h2('Generate a sequence with AI'),
    p(
      'When creating a new sequence, use "✨ Generate with AI" in the builder header. Provide a goal, audience, step count, tone, and a differentiator, and Revnator drafts every step — subjects, bodies, and delays — for you to review and edit.',
    ),
    h2('Step types'),
    unorderedList([
      'Email — a subject and body, with optional AI personalisation and a thread mode',
      'LinkedIn — creates a task with notes when the step is due, for a manual LinkedIn touch',
      'Call — creates a call task with your script so a rep can follow up by phone',
    ]),
    h2('Delays and thread mode'),
    p(
      'Each step has a delay — a number plus a unit of hours, days, or weeks — measured from the previous step. Email steps also have a thread mode: New thread starts a fresh email, while Same thread sends as a reply on the existing conversation with an "Re:" subject.',
    ),
    h2('Enrolling contacts'),
    p(
      'Add contacts to a sequence with the enrol modal. It supports search and list selection and automatically excludes contacts who are already enrolled or who have unsubscribed. Step one is scheduled to fire on the next send cycle.',
    ),
    h2('Sequence settings'),
    p('The sequence Settings tab controls how the whole sequence behaves:'),
    unorderedList([
      'General — name, description, status, from-name override, and reply-to address',
      'Sending — email-account rotation across multiple connected inboxes with a per-account daily limit',
      'Behaviour — pause on reply, pause on out-of-office, and stop on link click',
      'Danger Zone — archive or delete the sequence',
    ]),
    bannerBlock(
      'warning',
      'Email rotation only appears when you have two or more connected inboxes. Rotating sends across inboxes protects sender reputation at higher volumes.',
    ),
  ]),

  'email/personalization': body([
    p(
      'Revnator personalises outreach in two layers: variables that substitute known contact data, and AI personalisation that rewrites each message for the individual recipient at send time.',
    ),
    h2('Variables'),
    p(
      'Variables are tokens that are replaced with a contact\'s data when the email sends — name, company, job title, and other fields. Use the variable picker while writing a subject or body to insert them. Variables are resolved first, so the AI sees the already-substituted text.',
    ),
    h2('AI personalisation'),
    p(
      'Each email step has an AI Personalise section. Turn it on and the step is rewritten for every contact individually when it sends, using their name, company, title, notes, lead status, and the history of previous sends in that sequence.',
    ),
    h2('Choosing a tone'),
    p('The AI Personalise section includes a tone selector. The available tones are:'),
    unorderedList([
      'Professional — polished and businesslike',
      'Friendly — warm and approachable',
      'Casual — relaxed and conversational',
      'Direct — short and to the point',
      'Consultative — advisory, problem-focused',
    ]),
    p(
      'You can also add free-text AI instructions, up to 200 characters, to steer the rewrite — for example "mention their recent funding round".',
    ),
    h2('Optimising subject lines'),
    p(
      'Under any step\'s subject field, "✨ Optimize subject" generates three alternative subject lines. Click one to use it. Steps with AI personalisation on are marked with a ✨ AI badge in the builder.',
    ),
    h2('Reliable by design'),
    p(
      'If an AI call fails for any reason, the step falls back to the original template text and still sends — personalisation never blocks outreach. Sends record whether they were AI-personalised so you can compare performance.',
    ),
    bannerBlock(
      'info',
      'AI personalisation runs once per contact per step at send time. Connect your own AI provider key under Settings → AI to run it without using Revnator credits.',
    ),
  ]),

  // ════════════════════════ PIPELINE ════════════════════════
  'pipeline/overview': body([
    p(
      'The Pipeline module tracks deals from first opportunity to closed-won or closed-lost. It pairs a visual deal board with AI scoring that predicts which deals will close and flags the ones at risk.',
    ),
    h2('Pipeline areas'),
    unorderedList([
      'Overview — a dashboard of metric cards, charts, recent deals, and a "needs attention" list',
      'Deals — the kanban board and list view where you work deals day to day',
      'Forecasting — revenue projections and deals that need attention',
      'Reports — conversion, win/loss, and deal analytics',
      'Settings — stages, deal custom fields, stall detection, and display preferences',
    ]),
    h2('Stages'),
    p(
      'Deals move through pipeline stages. If you have no stages yet, Revnator seeds six sensible defaults. In Pipeline Settings you can rename stages, reorder them, set a colour and a probability for each, and mark which stages count as Won or Lost.',
    ),
    h2('The deal board'),
    p(
      'Pipeline → Deals shows a kanban board with drag-and-drop between stages, plus a list-view toggle. Each card shows the deal value, the linked account, a probability badge, the close date (red when overdue), and a days-in-stage indicator.',
    ),
    h2('AI on the board'),
    p(
      'Every deal card carries a coloured left border from AI scoring — green for healthy, amber for watch, red for low score or at-risk — and a ⚠️ icon when the deal has been flagged at risk. See Forecasting for how AI deal scoring works.',
    ),
    bannerBlock(
      'info',
      'Deals link to both accounts and contacts. A deal\'s contacts are managed on its detail page through the deal–contact association.',
    ),
  ]),

  'pipeline/creating-deals': body([
    p(
      'A deal represents a single revenue opportunity. This page covers creating deals, moving them through stages, and closing them out.',
    ),
    h2('Creating a deal'),
    p(
      'Create a deal from the Pipeline → Deals board. Give it a name and value, choose a stage, and associate the account it belongs to. New deals start in the first stage of your pipeline.',
    ),
    h2('The deal detail page'),
    p(
      'Opening a deal shows its detail page: inline-editable fields, an arrow-step progress indicator across your stages, and tabs for Activity and Contacts. The right sidebar holds Quick Actions, a stall alert when the deal has gone quiet, and a Danger Zone. Every field stays editable regardless of the deal\'s stage.',
    ),
    h2('Moving deals through stages'),
    p(
      'Drag a card between columns on the board, or use the stage progress indicator on the detail page. Stage changes are recorded on the deal\'s activity timeline.',
    ),
    h2('Linking contacts and accounts'),
    p(
      'Associate the account from the deal sidebar so the deal appears on that company\'s Deals tab. Add the people involved on the deal\'s Contacts tab — the same deal then surfaces on each linked contact\'s Deals tab.',
    ),
    h2('Closing a deal'),
    p(
      'Use Mark as Won or Mark as Lost. Marking a deal lost opens a modal to capture the lost reason, which feeds win/loss reporting. Won and lost deals show a banner with a Reopen button if you need to revisit them.',
    ),
    h2('The AI deal card'),
    p(
      'Above Quick Actions, the AI card shows the deal\'s score, an AI win-likelihood percentage, a list of risk factors, and a recommended action. Refresh it manually whenever the deal changes materially.',
    ),
  ]),

  'pipeline/forecasting': body([
    p(
      'Forecasting turns your open pipeline into a revenue projection and surfaces the deals most likely to slip. It combines deterministic rollups with AI deal scoring.',
    ),
    h2('The forecast page'),
    p(
      'Pipeline → Forecasting shows five metric cards, a six-month grouped bar chart of projected revenue, a "Deals Needing Attention" table, and a horizontal "Pipeline by Stage" chart. A Quick Note modal lets you log a note against any at-risk deal without leaving the page.',
    ),
    h2('AI deal scoring'),
    p(
      'AI scores each deal 0–100 with a written reason, a list of risk factors, and a recommended next action. The model resolves the deal\'s linked contact and uses your recent won and lost deals as context, so scores reflect how your deals actually close.',
    ),
    h2('Automatic at-risk detection'),
    p(
      'A daily check flags deals that look stuck — for example no activity for 14+ days, the same stage for 28+ days, a contact who has stopped opening emails, or no open tasks or upcoming meetings. Flagged deals get an "At risk" badge, an urgent AI suggestion, and a notification. The flag clears automatically once the deal recovers.',
    ),
    h2('Reading the forecast'),
    p(
      'Each stage carries a probability, so the forecast weights open deal value by where each deal sits. Use the "Deals Needing Attention" table as your working list — those are the deals where action now changes the outcome.',
    ),
    bannerBlock(
      'info',
      'At-risk detection also writes to your AI suggestions queue, so risky deals show up alongside hot leads in your daily workflow.',
    ),
  ]),

  // ════════════════════════ CALENDAR ════════════════════════
  'calendar/overview': body([
    p(
      'The Calendar lives in the Sales Ops module and gives you a shared view of meetings, events, and anything else time-bound — with AI meeting prep built in.',
    ),
    h2('Calendar views'),
    p(
      'The Calendar offers Month, Week, Day, and Agenda views. Switch views from the toggle at the top to move between a high-level overview and a detailed day plan.',
    ),
    h2('Creating events'),
    p(
      'Create an event from the calendar. The event modal covers the event type, an all-day toggle, recurrence, and links to related records — a contact, a deal, an account, or a mission — so an event stays connected to the work it belongs to.',
    ),
    h2('AI meeting prep'),
    p(
      'Open an event and click "📋 Prepare with AI". Revnator generates a briefing from the event\'s linked contact, deal, and account — who you are meeting, where the deal stands, and what to focus on. The brief expands inline in the event popover.',
    ),
    h2('Linked records'),
    p(
      'Because events link to contacts, deals, and accounts, a meeting also appears on those records — for example on a contact\'s Activity tab — keeping the full history in one place.',
    ),
    bannerBlock(
      'info',
      'To let prospects book time with you directly, set up a Booking Page — see the next section.',
    ),
  ]),

  'calendar/booking-pages': body([
    p(
      'Booking pages let prospects and customers schedule time with you without the back-and-forth. You publish a page; they pick a meeting type and an open slot.',
    ),
    h2('Creating a booking page'),
    p('Create a booking page with the four-step wizard:'),
    orderedList([
      'Name and slug — the page name and the URL it lives at',
      'Meeting types — the kinds of meetings people can book, with durations',
      'Availability — the days, hours, time zone, and buffers you are open for bookings',
      'Confirmation — the message bookers see after they schedule',
    ]),
    h2('Availability settings'),
    p(
      'Availability controls when slots are offered: active days and hours, your time zone, a buffer between meetings, and an optional cap on bookings per day.',
    ),
    h2('The public booking page'),
    p(
      'A published page is reachable at /book/[slug] and needs no login. Visitors move through a five-step flow — choose a meeting type, pick a date, pick a time, fill in a short form, and confirm. The confirmation step offers an .ics calendar file to download.',
    ),
    h2('What happens on a booking'),
    p(
      'A completed booking is recorded in Revnator. Because the booker\'s details are captured on the form, their information flows into your data the same way a form submission does.',
    ),
    bannerBlock(
      'info',
      'Share the /book/[slug] link in your email signature or sequences so prospects can self-schedule the moment they are ready.',
    ),
  ]),

  // ════════════════════════ TASKS & MISSIONS ════════════════════════
  'tasks/tasks-overview': body([
    p(
      'Tasks are the to-do layer of Revnator — calls to make, emails to send, meetings to hold. They live in the Sales Ops module and can link to any contact, deal, account, or mission.',
    ),
    h2('Task views'),
    p(
      'The Tasks screen offers three views from one toggle: a List, a Kanban board grouped by status, and a Calendar laid out by due date. Use whichever fits the moment — list for triage, board for flow, calendar for planning.',
    ),
    h2('Statuses and types'),
    p('Every task has a status and a type:'),
    unorderedList([
      'Statuses — To do, In progress, In review, and Done',
      'Types — Call, Email, Meeting, LinkedIn, and Other',
    ]),
    h2('Creating and editing tasks'),
    p(
      'The Add Task modal captures the title, due date, priority, type, notes, and pickers to link a contact, deal, account, or mission. Clicking a task opens a 480px detail slide-over with inline editing and Comments and Activity tabs — completing a task triggers a small confetti celebration.',
    ),
    h2('Filtering and bulk actions'),
    p(
      'The filter slide-over narrows tasks by status, priority, type, due date, and assignee. Select tasks to bulk-complete or bulk-delete them.',
    ),
    h2('AI task priority'),
    p(
      'Turn on the "✨ AI Priority" toggle next to the view selector and Revnator reorders your pending tasks by what matters most. It factors in the lead score of any linked contact and the AI score of any linked deal, and adds a short reason chip to each task explaining the ranking.',
    ),
    bannerBlock(
      'info',
      'Sequence steps of type LinkedIn or Call automatically create tasks, so manual touches from your outreach show up in this same list.',
    ),
  ]),

  'tasks/mission-templates': body([
    p(
      'Missions are guided playbooks — a named goal with a structured set of tasks behind it. Where a single task is one action, a mission is an entire campaign or initiative.',
    ),
    h2('Mission templates'),
    p('Revnator ships with five mission templates, each of which seeds eight ready-made tasks when you create a mission from it:'),
    unorderedList([
      'SDR Outreach — a cold-outreach play for sales development',
      'BDR Account Penetration — breaking into a target account',
      'ABM Campaign — a coordinated account-based marketing push',
      'Partnership Development — building a channel or partner relationship',
      'Growth Marketing Sprint — a focused growth experiment',
    ]),
    h2('The mission detail page'),
    p('Open a mission to see four tabs:'),
    unorderedList([
      'Tasks — the mission\'s tasks, grouped by status',
      'Overview — the mission\'s details, editable inline',
      'Members — invite teammates by email and set their role',
      'Activity — a timeline derived from mission events',
    ]),
    h2('AI mission insights'),
    p(
      'At the top of the Overview tab, the AI Insight card reports the mission\'s status — on track, at risk, blocked, or complete — with a short summary and an explicit list of blockers, so you can see whether a mission is healthy without reading every task.',
    ),
    h2('Working a mission'),
    p(
      'Treat the seeded tasks as a starting checklist — add, remove, or re-order them to fit the specific account or campaign. The mission dashboard on the Sales Ops home page shows progress bars across all active missions.',
    ),
  ]),

  // ════════════════════════ REPORTS ════════════════════════
  'reports/overview': body([
    p(
      'The Reports module turns your activity into dashboards. It has four report areas, each with its own metrics, charts, and AI-written insights.',
    ),
    h2('The four reports'),
    unorderedList([
      'Overview — revenue won, pipeline value, emails sent, reply rate, tasks completed, and new contacts, with period-over-period comparisons',
      'Email Reports — a sent-over-time chart, a Sent → Opened → Clicked → Replied funnel, subject-line analysis, and a best-time-to-send heatmap',
      'Pipeline Reports — stage conversion, deals won over time, and win/loss analysis',
      'Tasks Reports — completion rate, tasks by type, overdue tasks, and a 12-week completion trend',
    ]),
    h2('Date ranges'),
    p(
      'Every report has a date-range filter with preset ranges plus a custom range. The selected range is stored in the URL so a report view can be bookmarked or shared.',
    ),
    h2('AI report insights'),
    p(
      'Each report page has an AI Insights card at the top. It reads the data currently on the page and returns a headline, key insights, anomalies it noticed, and recommendations — a written interpretation of the numbers, not just the numbers.',
    ),
    h2('Exporting'),
    p(
      'Report tables — top deals, email performance, task completion, and others — each have a CSV export button, and the Overview report has a Print button for a clean printed copy.',
    ),
    bannerBlock(
      'info',
      'The currency and default date range used across Reports are set in Reports → Settings.',
    ),
  ]),

  'reports/custom-reports': body([
    p(
      'Revnator\'s reports are purpose-built rather than assembled from a drag-and-drop builder. This page covers the ways you can tailor reporting to your team: preferences, raw-data export, and AI insights.',
    ),
    h2('Report preferences'),
    p(
      'Reports → Settings holds two workspace preferences: the default date range that every report opens with, and the currency used to display monetary values. Set these once and every report respects them.',
    ),
    h2('Exporting your data'),
    p(
      'For analysis outside Revnator, Reports → Settings includes an Export Your Data section that downloads Contacts, Deals, Email Sends, and Tasks as CSV files. Individual report tables also export to CSV, so you can pull a specific table — top deals, campaign performance, overdue tasks — straight into a spreadsheet or BI tool.',
    ),
    h2('Filtering for a custom view'),
    p(
      'The date-range filter on each report, combined with the type filters on Email Reports (campaign vs sequence) and the search pickers, lets you scope a report down to exactly the slice you care about. Because the filters live in the URL, a configured view can be saved as a bookmark.',
    ),
    h2('AI insights as analysis'),
    p(
      'For interpretation rather than raw figures, the AI Insights card on each report writes up the data — surfacing anomalies and recommendations specific to the range and filters you have applied.',
    ),
    bannerBlock(
      'info',
      'Need a metric the built-in reports do not cover? Export the underlying CSV from Reports → Settings, or pull it through the public API\'s analytics endpoint — see the API Reference.',
    ),
  ]),

  // ════════════════════════ FORMS ════════════════════════
  'forms/creating-forms': body([
    p(
      'Forms capture leads from anywhere — your website, a landing page, a campaign — and turn every submission into a Revnator contact automatically.',
    ),
    h2('The form builder'),
    p(
      'Forms → New opens the builder, a three-panel screen: a field-type picker on the left, a drag-and-drop canvas in the middle, and field configuration on the right. Drag field types onto the canvas and reorder them by dragging.',
    ),
    h2('Field types'),
    p('The builder offers ten field types: Text, Email, Phone, Textarea, Dropdown, Checkbox, Radio, Date, Number, and Hidden. Each field can be configured with a label, placeholder, help text, a required toggle, and options for dropdown and radio fields.'),
    h2('AI field suggestions'),
    p(
      'Click "✨ AI Suggestions" in the builder and Revnator proposes up to eight fields based on the form\'s name and description. Preview them and use "Add all" to drop them onto the canvas at once.',
    ),
    h2('Previewing'),
    p(
      'The Live Preview modal renders the form exactly as a visitor will see it, so you can check layout and validation before publishing.',
    ),
    h2('Form settings'),
    p(
      'Forms → Settings sets workspace defaults: the default thank-you message, a notification email address for new submissions, and whether new forms are active by default.',
    ),
    h2('Hot-lead scoring'),
    p(
      'When a form creates a contact, Revnator scores that lead with AI in the background. A strong score raises a high-priority "Hot lead from form" suggestion and notification — the visitor never waits on AI, but you hear about a good lead fast.',
    ),
  ]),

  'forms/embedding-forms': body([
    p(
      'Once a form is built, publish it and put it in front of visitors. Revnator gives you two ways to do that and routes every submission straight into your CRM.',
    ),
    h2('Getting the embed code'),
    p(
      'From the Forms table, open the action menu on a form and choose "Copy Embed Code". The modal has two tabs:',
    ),
    unorderedList([
      'Embed — an iframe snippet to paste into any web page',
      'Direct link — a hosted URL you can share anywhere',
    ]),
    h2('The hosted form'),
    p(
      'Every published form has a public page at /f/[api_key] that needs no login. It renders your fields, validates input, submits to Revnator, and then shows your thank-you message or redirects — whichever you configured.',
    ),
    h2('What happens on submission'),
    p('When someone submits a form, Revnator:'),
    orderedList([
      'Records the submission and increments the form\'s submission count',
      'Creates or updates a contact from the submitted data when an email field is present',
      'Adds the contact to the linked list, if the form is configured with one',
      'Runs background AI hot-lead scoring on the new contact',
    ]),
    h2('Viewing submissions'),
    p(
      'Each form has a submissions table with columns built from its fields, search, a date filter, CSV export, and a detail slide-over. Forms → Submissions aggregates submissions across every form with a Form Name column.',
    ),
    bannerBlock(
      'info',
      'Set a notification email in Forms → Settings to be alerted the moment a form is submitted.',
    ),
  ]),

  // ════════════════════════ INTEGRATIONS ════════════════════════
  'integrations/available-integrations': body([
    p(
      'The Integrations module connects Revnator to the rest of your stack. The Integrations page shows a searchable grid of integrations across six categories: Email, CRM, Calendar, Productivity, Enrichment, and Messaging.',
    ),
    h2('Live integrations'),
    p('Several integrations are live today:'),
    unorderedList([
      'SendGrid — email delivery infrastructure for tracking pixels and unsubscribe links',
      'Stripe — billing and subscription management',
      'Google Calendar — calendar sync',
      'Outlook Calendar — calendar sync',
    ]),
    p(
      'Connected email inboxes (Gmail, Outlook, and SMTP providers) are managed separately under Email → Settings — see Connecting Your Email.',
    ),
    h2('Coming soon'),
    p(
      'Many more integrations are listed as coming soon — CRMs, productivity tools, and messaging platforms. Clicking a coming-soon card registers your interest so you are notified when it ships.',
    ),
    h2('Contact enrichment'),
    p(
      'Revnator supports bring-your-own-licence enrichment through Apollo, Hunter, ZeroBounce, Clearbit, and People Data Labs. You connect your own provider API keys and Revnator orchestrates enrichment — you pay the provider directly, with no resold credits. Enrichment providers are managed under Settings → Enrichment.',
    ),
    h2('AI providers'),
    p(
      'Under Settings → AI you can connect your own AI provider key — Anthropic, OpenAI, Google, Groq, Mistral, or Cohere — so AI features run on your account, or use Revnator-managed AI credits instead.',
    ),
    bannerBlock(
      'info',
      'The next page explains how to actually connect integrations, enrichment providers, AI providers, and the public API.',
    ),
  ]),

  'integrations/setup': body([
    p(
      'This page walks through connecting the four kinds of external services Revnator supports: app integrations, enrichment providers, AI providers, and API access.',
    ),
    h2('Connecting an integration'),
    p(
      'On the Integrations page, click a card to connect it. Google Calendar and Outlook Calendar connect immediately; coming-soon cards register your interest. The Manage modal on a connected integration shows when it was connected and offers a Disconnect button.',
    ),
    h2('Connecting enrichment providers'),
    p(
      'Open Settings → Enrichment. For each provider — Apollo, Hunter, ZeroBounce, Clearbit, or People Data Labs — the connect modal walks you through where to get an API key. Revnator verifies the key against the provider before saving and stores it encrypted. Once connected, an "Enrich Contact" button appears on the contact detail page and an "Enrich" bulk action appears on the contacts table.',
    ),
    h2('Connecting an AI provider'),
    p(
      'Open Settings → AI. You have two choices: connect your own provider key (Anthropic, OpenAI, Google, Groq, Mistral, or Cohere) so AI features run on your account with no credits used, or rely on Revnator-managed credits. Keys are verified before saving and stored with AES-256-GCM encryption. The Usage History table shows every AI call, its feature, provider, model, and credit cost.',
    ),
    h2('API and MCP'),
    p(
      'Settings → API is where you generate API keys for the public REST API and copy the configuration for the Revnator MCP server, which lets AI tools such as Claude Desktop and Cursor work with your workspace directly. See the API Reference section for details.',
    ),
    bannerBlock(
      'info',
      'All external credentials — OAuth tokens, SMTP passwords, enrichment keys, and AI keys — are encrypted at rest. Revnator never stores them in plaintext.',
    ),
  ]),

  // ════════════════════════ API REFERENCE ════════════════════════
  'api/authentication': body([
    p(
      'The Revnator public API is a versioned REST API under /api/v1. Every request is authenticated with an API key tied to your workspace. This page covers generating a key and authenticating requests.',
    ),
    h2('Generating an API key'),
    orderedList([
      'Open Settings → API in the Revnator app.',
      'Click Generate key and give it a descriptive name, such as "Production sync".',
      'Choose an expiry — Never, 30 days, 90 days, or 1 year.',
      'Copy the key immediately. The full key is shown only once; afterwards only a masked preview is stored.',
    ]),
    p('API keys have the form rvn_live_ followed by a long random string:'),
    codeBlock('rvn_live_a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2', 'bash'),
    h2('Authenticating a request'),
    p(
      'Send your key in the X-Revnator-API-Key header on every request. Revnator does not use the Authorization: Bearer scheme.',
    ),
    codeBlock(
      'curl https://app.revnator.com/api/v1/contacts \\\n  -H "X-Revnator-API-Key: rvn_live_your_key_here"',
      'bash',
    ),
    h2('Response shape'),
    p(
      'Every endpoint returns the same JSON envelope. A success has data populated and error null; a failure has data null and error set to a message string.',
    ),
    codeBlock(
      '{ "data": { "contacts": [], "total": 0 }, "error": null }\n\n{ "data": null, "error": "Invalid or revoked API key" }',
      'json',
    ),
    h2('Scopes'),
    p(
      'Each key carries scopes that define what it can do — read and write scopes for contacts, deals, sequences, tasks, accounts, plus analytics:read and ai:read / ai:write. By default a new key is granted the full set of scopes.',
    ),
    h2('Key security'),
    p(
      'Treat an API key like a password. Never commit it to source control, embed it in client-side code, or paste it into shared documents. Only the SHA-256 hash of a key is stored — Revnator cannot recover a lost key, only replace it.',
    ),
    bannerBlock(
      'warning',
      'If a key is exposed, revoke it immediately from Settings → API and generate a new one. A revoked key stops working at once.',
    ),
  ]),

  'api/rate-limits': body([
    p(
      'The Revnator API applies limits to keep the service fast and fair for everyone. This page explains the limits that exist and how to handle them.',
    ),
    h2('AI endpoint limits'),
    p(
      'AI endpoints are the most tightly limited because each call is a paid model round-trip. POST /api/v1/ai/trigger is capped at 10 requests per minute per API key. Exceeding it returns HTTP 429 with the error "Too many requests. Try again in a minute."',
    ),
    h2('Pagination limits'),
    p(
      'List endpoints never return more than 50 records in one response. Use the limit and offset query parameters to page through larger result sets — limit defaults to 20 and is capped at 50.',
    ),
    codeBlock(
      'curl "https://app.revnator.com/api/v1/contacts?limit=50&offset=100" \\\n  -H "X-Revnator-API-Key: rvn_live_your_key_here"',
      'bash',
    ),
    h2('Handling 429 responses'),
    p(
      'When you receive a 429, pause and retry after a short delay. For AI endpoints, wait at least a minute. Build exponential backoff into any client that calls the API in a loop.',
    ),
    h2('Fair use'),
    p(
      'Endpoints that are not explicitly rate-limited are still expected to be used reasonably. Page through data rather than polling tight loops, request only the records you need, and cache responses where you can. Sustained abusive traffic may have a key throttled or revoked.',
    ),
    bannerBlock(
      'info',
      'If you need to react to changes rather than poll, see the Webhooks page for the recommended patterns.',
    ),
  ]),

  'api/endpoints': body([
    p(
      'The Revnator API exposes the core CRM objects under /api/v1. All endpoints require the X-Revnator-API-Key header and return the standard { data, error } envelope. The base URL is https://app.revnator.com/api/v1.',
    ),
    h2('Contacts'),
    unorderedList([
      'GET /contacts — list contacts (limit, offset, search, status, list_id)',
      'POST /contacts — create a contact (name and email required)',
      'GET, PATCH, DELETE /contacts/{id} — read, update, or soft-delete one contact',
      'GET, POST /contacts/{id}/notes — list or add notes',
      'POST /contacts/{id}/tasks — create a task for a contact',
      'POST /contacts/{id}/sequences — enrol a contact into a sequence',
    ]),
    h2('Accounts and Deals'),
    unorderedList([
      'GET, POST /accounts and GET, PATCH, DELETE /accounts/{id}',
      'GET, POST /deals and GET, PATCH, DELETE /deals/{id}',
      'POST /deals/{id}/stage — move a deal to a new stage (logs an activity)',
    ]),
    h2('Sequences and Tasks'),
    unorderedList([
      'GET, POST /sequences and GET, PATCH, DELETE /sequences/{id}',
      'POST /sequences/{id}/enroll — bulk-enrol contacts; GET /sequences/{id}/contacts',
      'GET, POST /tasks and GET, PATCH, DELETE /tasks/{id}',
      'POST /tasks/{id}/complete — mark a task complete',
    ]),
    h2('Pipeline, Search, and Analytics'),
    unorderedList([
      'GET /pipeline/stages — list pipeline stages',
      'GET /pipeline/deals — deal counts and totals per stage',
      'GET /search?q=...&types=contacts,deals,accounts,tasks — cross-object search',
      'GET /analytics?period=7d|30d|90d — rollups for contacts, deals, emails, and tasks',
    ]),
    h2('AI'),
    unorderedList([
      'GET /ai/suggestions — pending AI suggestions',
      'POST /ai/suggestions/{id}/accept — accept a suggestion',
      'POST /ai/trigger — score one contact and persist its next best action (rate-limited)',
    ]),
    h2('Example request and response'),
    p('Create a contact:'),
    codeBlock(
      'curl -X POST https://app.revnator.com/api/v1/contacts \\\n  -H "X-Revnator-API-Key: rvn_live_your_key_here" \\\n  -H "Content-Type: application/json" \\\n  -d \'{ "name": "Jane Smith", "email": "jane@acme.com", "company": "Acme Corp" }\'',
      'bash',
    ),
    codeBlock(
      '{\n  "data": {\n    "id": "…",\n    "name": "Jane Smith",\n    "email": "jane@acme.com",\n    "company": "Acme Corp",\n    "created_at": "2026-05-20T10:00:00Z"\n  },\n  "error": null\n}',
      'json',
    ),
    h2('The MCP server'),
    p(
      'For AI tools, Revnator publishes an MCP server (@revnator/mcp) that wraps these endpoints as 33 tools across nine groups. Install it and authenticate with the same rvn_live_ key so assistants like Claude Desktop and Cursor can work with your workspace directly. Copy the configuration from Settings → API.',
    ),
  ]),

  'api/webhooks': body([
    p(
      'A common question is whether Revnator can push events to your systems. This page explains the current options for keeping an external system in sync with Revnator.',
    ),
    h2('Outbound webhooks'),
    p(
      'Revnator does not yet offer user-configurable outbound webhooks — there is no setting today to register a URL and receive event callbacks. Until that ships, use one of the patterns below.',
    ),
    h2('Polling the API'),
    p(
      'The most reliable way to detect changes is to poll the relevant list endpoint on a schedule. List endpoints return records newest-first, so you can page through recent activity and stop once you reach records you have already seen. Respect the pagination cap of 50 records per page.',
    ),
    codeBlock(
      'curl "https://app.revnator.com/api/v1/contacts?limit=50" \\\n  -H "X-Revnator-API-Key: rvn_live_your_key_here"',
      'bash',
    ),
    h2('The analytics endpoint'),
    p(
      'For periodic summaries rather than individual records, GET /api/v1/analytics?period=7d|30d|90d returns rollups for contacts, deals, emails, and tasks in a single call — a lightweight way to keep a dashboard fresh.',
    ),
    h2('The MCP server'),
    p(
      'If your goal is to let an AI assistant act on Revnator data on demand, the MCP server (@revnator/mcp) is usually a better fit than a polling loop — the assistant queries Revnator live whenever it needs to.',
    ),
    h2('Triggering AI on demand'),
    p(
      'To act when something changes on your side — for example a new lead in another system — POST that contact to /api/v1/contacts and then call POST /api/v1/ai/trigger to score it immediately, rather than waiting for the hourly background agent.',
    ),
    bannerBlock(
      'info',
      'Native outbound webhooks are on the roadmap. Until then, polling the list endpoints is the supported way to stay in sync.',
    ),
  ]),
}

// ── Main update routine ────────────────────────────────────────────────────

async function run(): Promise<void> {
  const configPath = path.resolve(dirname, '../payload.config.ts')
  const configUrl = new URL(`file:///${configPath.replace(/\\/g, '/')}`)

  const payload = await getPayload({
    config: (await import(configUrl.href)).default,
  })

  // 1 ── List everything currently in the database
  const sectionsResult = await payload.find({
    collection: 'doc-sections',
    limit: 200,
    sort: 'order',
    depth: 0,
  })
  const pagesResult = await payload.find({
    collection: 'doc-pages',
    limit: 500,
    depth: 1,
    sort: 'order',
  })

  const sections = sectionsResult.docs as DocSection[]
  const pages = pagesResult.docs as DocPage[]

  const sectionById = new Map<number, DocSection>()
  for (const s of sections) sectionById.set(s.id, s)

  console.log('\n📚 Doc sections in database:')
  for (const s of sections) {
    console.log(`  • ${s.title} (/${s.slug})`)
  }

  console.log(`\n📄 Doc pages in database (${pages.length}):`)
  for (const p of pages) {
    const sectionSlug =
      typeof p.section === 'object' && p.section !== null
        ? (p.section as DocSection).slug
        : sectionById.get(p.section as number)?.slug ?? '?'
    console.log(`  • ${sectionSlug}/${p.slug} — "${p.title}"`)
  }

  // 2 ── Update each page's body from the content map
  console.log('\n✏️  Updating page content...\n')

  let updated = 0
  const unmatched: string[] = []

  for (const page of pages) {
    const sectionSlug =
      typeof page.section === 'object' && page.section !== null
        ? (page.section as DocSection).slug
        : sectionById.get(page.section as number)?.slug

    if (!sectionSlug) {
      unmatched.push(`${page.slug} (no resolvable section)`)
      continue
    }

    const key = `${sectionSlug}/${page.slug}`
    const newBody = content[key]

    if (!newBody) {
      unmatched.push(key)
      continue
    }

    await payload.update({
      collection: 'doc-pages',
      id: page.id,
      data: {
        body: newBody,
        lastUpdated: '2026-05-20',
      },
      context: { disableRevalidate: true },
    })
    updated++
    console.log(`  ✓ Updated: ${key}`)
  }

  // 3 ── Report content keys that had no matching page
  const dbKeys = new Set(
    pages.map((p) => {
      const sectionSlug =
        typeof p.section === 'object' && p.section !== null
          ? (p.section as DocSection).slug
          : sectionById.get(p.section as number)?.slug
      return `${sectionSlug}/${p.slug}`
    }),
  )
  const contentWithoutPage = Object.keys(content).filter((k) => !dbKeys.has(k))

  console.log('\n────────────────────────────────────────')
  console.log(`✅ Sections found:        ${sections.length}`)
  console.log(`✅ Pages found:           ${pages.length}`)
  console.log(`✅ Pages updated:         ${updated}`)
  if (unmatched.length > 0) {
    console.log(`⚠️  Pages with no content: ${unmatched.length}`)
    for (const u of unmatched) console.log(`     - ${u}`)
  } else {
    console.log('✅ Every page had matching content.')
  }
  if (contentWithoutPage.length > 0) {
    console.log(`⚠️  Content with no page:  ${contentWithoutPage.length}`)
    for (const c of contentWithoutPage) console.log(`     - ${c}`)
  }
  console.log('────────────────────────────────────────\n')

  process.exit(0)
}

run().catch((err) => {
  console.error('Content seed failed:', err)
  process.exit(1)
})
