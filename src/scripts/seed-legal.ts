/**
 * Seed script for legal documents.
 *
 * Run from project root:
 *   npx tsx src/scripts/seed-legal.ts
 */
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import path from 'path'
import { getPayload } from 'payload'
import { fileURLToPath } from 'url'
import type { LegalDocument } from '../payload-types'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// ── Lexical JSON helpers ──

function text(content: string, format?: number): Record<string, unknown> {
  return { type: 'text', text: content, format: format ?? 0, detail: 0, mode: 'normal', style: '', version: 1 }
}

function paragraph(...children: Record<string, unknown>[]): Record<string, unknown> {
  return { type: 'paragraph', children, direction: 'ltr', format: '', indent: 0, textFormat: 0, textStyle: '', version: 1 }
}

function heading(tag: 'h2' | 'h3', content: string): Record<string, unknown> {
  return { type: 'heading', tag, children: [text(content)], direction: 'ltr', format: '', indent: 0, version: 1 }
}

function listItem(content: string): Record<string, unknown> {
  return { type: 'listitem', children: [text(content)], direction: 'ltr', format: '', indent: 0, value: 1, version: 1 }
}

function unorderedList(items: string[]): Record<string, unknown> {
  return { type: 'list', listType: 'bullet', tag: 'ul', children: items.map(listItem), direction: 'ltr', format: '', indent: 0, start: 1, version: 1 }
}

function lexicalBody(children: Record<string, unknown>[]): LegalDocument['body'] {
  return { root: { type: 'root', children, direction: 'ltr', format: '', indent: 0, version: 1 } } as LegalDocument['body']
}

// ── Privacy Policy full body ──

const privacyPolicyBody = lexicalBody([
  heading('h2', 'Introduction'),
  paragraph(text('This Privacy Policy describes how Revnator ("we", "us", or "our") collects, uses, and shares information about you when you use our website, platform, and related services (collectively, the "Services"). We are committed to protecting your privacy and handling your data transparently.')),
  paragraph(text('By using our Services, you agree to the collection and use of information in accordance with this policy. If you do not agree with the terms of this policy, please do not access or use our Services.')),

  heading('h2', 'Information We Collect'),
  heading('h3', 'Information you provide'),
  paragraph(text('We collect information you provide directly to us, such as when you create an account, fill out a form, make a purchase, communicate with us, or otherwise interact with our Services.')),
  unorderedList([
    'Account information: name, email address, password, company name, and job title',
    'Payment information: billing address and payment card details (processed securely by our payment provider)',
    'Communications: messages you send to us, feedback, and support requests',
    'Content: data you upload or enter into the platform, including contacts, deals, and email content',
  ]),
  heading('h3', 'Information collected automatically'),
  paragraph(text('When you use our Services, we automatically collect certain information about your device and usage patterns. This includes your IP address, browser type, operating system, referring URLs, pages viewed, and the dates and times of your visits.')),

  heading('h2', 'How We Use Your Information'),
  paragraph(text('We use the information we collect to provide, maintain, and improve our Services, to process transactions, to communicate with you, and to comply with legal obligations. Specifically, we use your information for the following purposes:')),
  unorderedList([
    'Providing and operating the Revnator platform and its features',
    'Processing payments and managing your subscription',
    'Sending transactional emails, updates, and security alerts',
    'Responding to your support requests and inquiries',
    'Analyzing usage patterns to improve our product and user experience',
    'Detecting, preventing, and addressing technical issues or fraud',
  ]),

  heading('h2', 'How We Share Your Information'),
  paragraph(text('We do not sell your personal information. We may share your information with third-party service providers who perform services on our behalf, such as payment processing, email delivery, hosting, and analytics. These providers are contractually obligated to use your information only as necessary to provide services to us.')),
  paragraph(text('We may also disclose your information if required to do so by law, or if we believe in good faith that such action is necessary to comply with legal obligations, protect our rights or safety, or investigate potential violations of our terms of service.')),

  heading('h2', 'Data Retention'),
  paragraph(text('We retain your personal information for as long as your account is active or as needed to provide you with our Services. If you close your account, we will delete or anonymize your personal data within 90 days, unless we are required to retain it for legal or regulatory purposes.')),
  paragraph(text('Usage logs and analytics data are retained in aggregated, anonymized form for up to 24 months for product improvement purposes.')),

  heading('h2', 'Your Rights'),
  paragraph(text('Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, delete, or export your data. You may also have the right to object to or restrict certain processing activities.')),
  unorderedList([
    'Access: Request a copy of the personal data we hold about you',
    'Correction: Request that we correct inaccurate or incomplete data',
    'Deletion: Request that we delete your personal data',
    'Portability: Request a machine-readable copy of your data',
    'Objection: Object to processing of your data for certain purposes',
  ]),
  paragraph(text('To exercise any of these rights, please contact us at privacy@revnator.com. We will respond to your request within 30 days.')),

  heading('h2', 'Cookies and Tracking'),
  paragraph(text('We use cookies and similar tracking technologies to collect information about your browsing activity on our website. We use privacy-focused analytics (Plausible) that do not use cookies for tracking. Essential cookies are used for authentication and security purposes only.')),
  paragraph(text('You can control cookie preferences through your browser settings. Disabling essential cookies may affect the functionality of our Services.')),

  heading('h2', 'International Data Transfers'),
  paragraph(text('Your information may be transferred to and processed in countries other than the country in which you reside. We take appropriate safeguards to ensure that your personal information remains protected in accordance with this Privacy Policy, including the use of Standard Contractual Clauses approved by relevant regulatory authorities.')),

  heading('h2', "Children's Privacy"),
  paragraph(text('Our Services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal information, we will take steps to delete such information promptly.')),

  heading('h2', 'Changes to This Policy'),
  paragraph(text('We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically for any changes.')),

  heading('h2', 'Contact Us'),
  paragraph(text('If you have any questions about this Privacy Policy or our data practices, please contact us at privacy@revnator.com or write to us at: Revnator, Coimbatore, Tamil Nadu, India.')),
])

const placeholderBody = lexicalBody([
  paragraph(text('This document is being finalized. Please check back soon or contact legal@revnator.com for the current version.')),
])

// ── Document data ──

interface LegalSeed {
  title: string
  slug: string
  description: string
  icon: NonNullable<LegalDocument['icon']>
  lastUpdated: string
  effectiveDate: string
  body: LegalDocument['body']
}

const docs: LegalSeed[] = [
  {
    title: 'Privacy Policy',
    slug: 'privacy-policy',
    description: 'How we collect, use, and protect your data',
    icon: 'Shield',
    lastUpdated: '2026-04-09',
    effectiveDate: '2026-04-09',
    body: privacyPolicyBody,
  },
  {
    title: 'Terms of Service',
    slug: 'terms-of-service',
    description: 'The legal agreement between you and Revnator',
    icon: 'FileText',
    lastUpdated: '2026-04-09',
    effectiveDate: '2026-04-09',
    body: placeholderBody,
  },
  {
    title: 'Cookie Policy',
    slug: 'cookie-policy',
    description: 'How and why we use cookies',
    icon: 'Cookie',
    lastUpdated: '2026-04-09',
    effectiveDate: '2026-04-09',
    body: placeholderBody,
  },
  {
    title: 'Data Processing Agreement',
    slug: 'dpa',
    description: 'GDPR-compliant data processing terms',
    icon: 'Lock',
    lastUpdated: '2026-04-09',
    effectiveDate: '2026-04-09',
    body: placeholderBody,
  },
  {
    title: 'Acceptable Use Policy',
    slug: 'acceptable-use',
    description: "What you can and can't do with Revnator",
    icon: 'Scale',
    lastUpdated: '2026-04-09',
    effectiveDate: '2026-04-09',
    body: placeholderBody,
  },
  {
    title: 'Security',
    slug: 'security',
    description: 'Our security practices and certifications',
    icon: 'ShieldCheck',
    lastUpdated: '2026-04-09',
    effectiveDate: '2026-04-09',
    body: placeholderBody,
  },
]

async function seed(): Promise<void> {
  const configPath = path.resolve(dirname, '../payload.config.ts')
  const configUrl = new URL(`file:///${configPath.replace(/\\/g, '/')}`)

  const payload = await getPayload({
    config: (await import(configUrl.href)).default,
  })

  // ── Delete existing docs (idempotent re-seed) ──
  console.log('Deleting existing legal documents...\n')

  const existing = await payload.find({
    collection: 'legal-documents',
    limit: 100,
  })
  for (const doc of existing.docs) {
    await payload.delete({
      collection: 'legal-documents',
      id: doc.id,
    })
    console.log(`  DELETE "${doc.title}"`)
  }

  // ── Seed Docs ──
  console.log('\nSeeding legal documents...\n')

  for (const doc of docs) {
    await payload.create({
      collection: 'legal-documents',
      data: {
        title: doc.title,
        slug: doc.slug,
        description: doc.description,
        icon: doc.icon,
        lastUpdated: doc.lastUpdated,
        effectiveDate: doc.effectiveDate,
        isPublished: true,
        body: doc.body,
      },
    })
    console.log(`  CREATE "${doc.title}"`)
  }

  console.log('\nDone!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
