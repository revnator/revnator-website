export type LegalBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }

export interface LegalSection {
  id: string
  heading: string
  content: LegalBlock[]
}

export interface LegalDoc {
  slug: string
  title: string
  description: string
  icon: string
  lastUpdated: string
  effectiveDate: string
  sections: LegalSection[]
  isPlaceholder?: boolean
}

export const legalDocs: LegalDoc[] = [
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    description: 'How we collect, use, and protect your data',
    icon: 'Shield',
    lastUpdated: 'April 9, 2026',
    effectiveDate: 'April 9, 2026',
    sections: [
      {
        id: 'introduction',
        heading: 'Introduction',
        content: [
          {
            type: 'paragraph',
            text: 'This Privacy Policy describes how Revnator ("we", "us", or "our") collects, uses, and shares information about you when you use our website, platform, and related services (collectively, the "Services"). We are committed to protecting your privacy and handling your data transparently.',
          },
          {
            type: 'paragraph',
            text: 'By using our Services, you agree to the collection and use of information in accordance with this policy. If you do not agree with the terms of this policy, please do not access or use our Services.',
          },
        ],
      },
      {
        id: 'information-we-collect',
        heading: 'Information We Collect',
        content: [
          {
            type: 'h3',
            text: 'Information you provide',
          },
          {
            type: 'paragraph',
            text: 'We collect information you provide directly to us, such as when you create an account, fill out a form, make a purchase, communicate with us, or otherwise interact with our Services.',
          },
          {
            type: 'list',
            items: [
              'Account information: name, email address, password, company name, and job title',
              'Payment information: billing address and payment card details (processed securely by our payment provider)',
              'Communications: messages you send to us, feedback, and support requests',
              'Content: data you upload or enter into the platform, including contacts, deals, and email content',
            ],
          },
          {
            type: 'h3',
            text: 'Information collected automatically',
          },
          {
            type: 'paragraph',
            text: 'When you use our Services, we automatically collect certain information about your device and usage patterns. This includes your IP address, browser type, operating system, referring URLs, pages viewed, and the dates and times of your visits.',
          },
        ],
      },
      {
        id: 'how-we-use-your-information',
        heading: 'How We Use Your Information',
        content: [
          {
            type: 'paragraph',
            text: 'We use the information we collect to provide, maintain, and improve our Services, to process transactions, to communicate with you, and to comply with legal obligations. Specifically, we use your information for the following purposes:',
          },
          {
            type: 'list',
            items: [
              'Providing and operating the Revnator platform and its features',
              'Processing payments and managing your subscription',
              'Sending transactional emails, updates, and security alerts',
              'Responding to your support requests and inquiries',
              'Analyzing usage patterns to improve our product and user experience',
              'Detecting, preventing, and addressing technical issues or fraud',
            ],
          },
        ],
      },
      {
        id: 'how-we-share-your-information',
        heading: 'How We Share Your Information',
        content: [
          {
            type: 'paragraph',
            text: 'We do not sell your personal information. We may share your information with third-party service providers who perform services on our behalf, such as payment processing, email delivery, hosting, and analytics. These providers are contractually obligated to use your information only as necessary to provide services to us.',
          },
          {
            type: 'paragraph',
            text: 'We may also disclose your information if required to do so by law, or if we believe in good faith that such action is necessary to comply with legal obligations, protect our rights or safety, or investigate potential violations of our terms of service.',
          },
        ],
      },
      {
        id: 'data-retention',
        heading: 'Data Retention',
        content: [
          {
            type: 'paragraph',
            text: 'We retain your personal information for as long as your account is active or as needed to provide you with our Services. If you close your account, we will delete or anonymize your personal data within 90 days, unless we are required to retain it for legal or regulatory purposes.',
          },
          {
            type: 'paragraph',
            text: 'Usage logs and analytics data are retained in aggregated, anonymized form for up to 24 months for product improvement purposes.',
          },
        ],
      },
      {
        id: 'your-rights',
        heading: 'Your Rights',
        content: [
          {
            type: 'paragraph',
            text: 'Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, delete, or export your data. You may also have the right to object to or restrict certain processing activities.',
          },
          {
            type: 'list',
            items: [
              'Access: Request a copy of the personal data we hold about you',
              'Correction: Request that we correct inaccurate or incomplete data',
              'Deletion: Request that we delete your personal data',
              'Portability: Request a machine-readable copy of your data',
              'Objection: Object to processing of your data for certain purposes',
            ],
          },
          {
            type: 'paragraph',
            text: 'To exercise any of these rights, please contact us at privacy@revnator.com. We will respond to your request within 30 days.',
          },
        ],
      },
      {
        id: 'cookies-and-tracking',
        heading: 'Cookies and Tracking',
        content: [
          {
            type: 'paragraph',
            text: 'We use cookies and similar tracking technologies to collect information about your browsing activity on our website. We use privacy-focused analytics (Plausible) that do not use cookies for tracking. Essential cookies are used for authentication and security purposes only.',
          },
          {
            type: 'paragraph',
            text: 'You can control cookie preferences through your browser settings. Disabling essential cookies may affect the functionality of our Services.',
          },
        ],
      },
      {
        id: 'international-data-transfers',
        heading: 'International Data Transfers',
        content: [
          {
            type: 'paragraph',
            text: 'Your information may be transferred to and processed in countries other than the country in which you reside. We take appropriate safeguards to ensure that your personal information remains protected in accordance with this Privacy Policy, including the use of Standard Contractual Clauses approved by relevant regulatory authorities.',
          },
        ],
      },
      {
        id: 'childrens-privacy',
        heading: "Children's Privacy",
        content: [
          {
            type: 'paragraph',
            text: 'Our Services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal information, we will take steps to delete such information promptly.',
          },
        ],
      },
      {
        id: 'changes-to-this-policy',
        heading: 'Changes to This Policy',
        content: [
          {
            type: 'paragraph',
            text: 'We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically for any changes.',
          },
        ],
      },
      {
        id: 'contact-us',
        heading: 'Contact Us',
        content: [
          {
            type: 'paragraph',
            text: 'If you have any questions about this Privacy Policy or our data practices, please contact us at privacy@revnator.com or write to us at: Revnator, Coimbatore, Tamil Nadu, India.',
          },
        ],
      },
    ],
  },
  {
    slug: 'terms-of-service',
    title: 'Terms of Service',
    description: 'The legal agreement between you and Revnator',
    icon: 'FileText',
    lastUpdated: 'April 9, 2026',
    effectiveDate: 'April 9, 2026',
    sections: [],
    isPlaceholder: true,
  },
  {
    slug: 'cookie-policy',
    title: 'Cookie Policy',
    description: 'How and why we use cookies on our website',
    icon: 'Cookie',
    lastUpdated: 'April 9, 2026',
    effectiveDate: 'April 9, 2026',
    sections: [],
    isPlaceholder: true,
  },
  {
    slug: 'dpa',
    title: 'Data Processing Agreement',
    description: 'GDPR-compliant data processing terms',
    icon: 'Lock',
    lastUpdated: 'April 9, 2026',
    effectiveDate: 'April 9, 2026',
    sections: [],
    isPlaceholder: true,
  },
  {
    slug: 'acceptable-use',
    title: 'Acceptable Use Policy',
    description: "What you can and can't do with Revnator",
    icon: 'Scale',
    lastUpdated: 'April 9, 2026',
    effectiveDate: 'April 9, 2026',
    sections: [],
    isPlaceholder: true,
  },
  {
    slug: 'security',
    title: 'Security',
    description: 'Our security practices and certifications',
    icon: 'ShieldCheck',
    lastUpdated: 'April 9, 2026',
    effectiveDate: 'April 9, 2026',
    sections: [],
    isPlaceholder: true,
  },
]
