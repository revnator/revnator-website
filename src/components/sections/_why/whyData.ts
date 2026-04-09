// ── Pain Points ──

export interface PainPointCard {
  number: string
  title: string
  description: string
}

export const painPoints: PainPointCard[] = [
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
]

// ── Before / After ──

export interface ToolRow {
  name: string
  price: string
}

export interface CapabilityRow {
  text: string
}

export const withoutTools: ToolRow[] = [
  { name: 'HubSpot CRM', price: '$90/mo' },
  { name: 'Outreach', price: '$100/mo' },
  { name: 'Calendly', price: '$15/mo' },
  { name: 'Slack', price: '$12/mo' },
  { name: 'Mailchimp', price: '$30/mo' },
  { name: 'Spreadsheets', price: '$0 (hours lost)' },
]

export const withCapabilities: CapabilityRow[] = [
  { text: 'Contact CRM' },
  { text: 'Email sequences' },
  { text: 'Calendar & booking' },
  { text: 'Team chat' },
  { text: 'Campaigns' },
  { text: 'Reports & analytics' },
]

// ── Value Propositions ──

export interface ValuePropBlock {
  icon: string
  heading: string
  description: string
  bullets: string[]
}

export const valueProps: ValuePropBlock[] = [
  {
    icon: 'Zap',
    heading: 'Up and running in 5 minutes',
    description:
      'No implementation team needed. No training sessions. Sign up, import contacts, launch your first sequence — all in one sitting.',
    bullets: [
      'One-click email connection (Gmail, Outlook)',
      'CSV import with smart field mapping',
      'Pre-built sequence templates to start immediately',
    ],
  },
  {
    icon: 'Target',
    heading: 'Designed for reps, not admins',
    description:
      'Every other CRM needs a dedicated admin. Revnator is opinionated and self-serve — your reps open it and start selling.',
    bullets: [
      'Daily workspace with tasks, calls, and follow-ups',
      'Pipeline updates with drag-and-drop simplicity',
      'Zero configuration required to get value',
    ],
  },
  {
    icon: 'Sparkles',
    heading: 'AI that works with your team, not instead of it',
    description:
      "Revnator's AI handles the grunt work — researching accounts, drafting emails, suggesting next steps — while your reps focus on conversations.",
    bullets: [
      'AI-drafted email personalization',
      'Smart next-step suggestions',
      'Account research automation',
    ],
  },
]

// ── FAQ ──

export interface WhyFAQItem {
  question: string
  answer: string
}

export const whyFAQs: WhyFAQItem[] = [
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
      "Not at all. Revnator is fully self-serve. Connect your email, import contacts, and you're selling in minutes.",
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
]
