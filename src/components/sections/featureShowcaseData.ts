export interface FeatureShowcaseData {
  label: string
  heading: string
  description: string
  bullets: string[]
  linkLabel: string
  linkHref: string
  bgClass: string
  frameBgClass: string
}

export const showcase1Data: FeatureShowcaseData = {
  label: 'OUTREACH',
  heading: 'Send emails that actually get replies',
  description:
    'Build multi-step sequences with personalization, A/B testing, and automated follow-ups. Track opens, clicks, and replies in real time.',
  bullets: [
    'Multi-step email sequences with smart scheduling',
    'Built-in email warm-up and deliverability tools',
    'Open, click, and reply tracking with analytics',
    'SendGrid integration with unsubscribe handling',
  ],
  linkLabel: 'Explore Outreach',
  linkHref: '/platform/outreach',
  bgClass: 'bg-white',
  frameBgClass: 'bg-bg',
}

export const showcase2Data: FeatureShowcaseData = {
  label: 'PIPELINE',
  heading: 'See every deal. Miss nothing.',
  description:
    'Drag-and-drop Kanban board with deal detail views, stage progression, and revenue forecasting built in.',
  bullets: [
    'Visual Kanban with drag-and-drop deal management',
    'Arrow-style stage progress bar on every deal',
    'Revenue forecasting dashboard with weighted pipeline',
    'Pipeline reports with custom date ranges',
  ],
  linkLabel: 'Explore Pipeline',
  linkHref: '/platform/pipeline',
  bgClass: 'bg-bg',
  frameBgClass: 'bg-white',
}

export const showcase3Data: FeatureShowcaseData = {
  label: 'SCHEDULING',
  heading: 'Book meetings without the back-and-forth',
  description:
    'Full calendar with Calendly-style booking pages. Share your availability link and let prospects book directly.',
  bullets: [
    'Personal booking pages at /book/your-slug',
    'Calendar view with daily, weekly, and monthly layouts',
    'Automatic timezone detection for global teams',
    'Integrated with tasks and deal timelines',
  ],
  linkLabel: 'Explore Calendar',
  linkHref: '/platform/calendar',
  bgClass: 'bg-white',
  frameBgClass: 'bg-bg',
}
