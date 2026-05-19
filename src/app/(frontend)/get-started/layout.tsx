import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Try Revnator Free — Join the Beta',
  description:
    'Sign up for early access to Revnator, the all-in-one sales workspace for lean B2B teams.',
  openGraph: {
    title: 'Try Revnator Free — Join the Beta',
    description: 'Join the early access program for the sales OS built for closers.',
  },
}

export default function GetStartedLayout({ children }: { children: React.ReactNode }) {
  return children
}
