'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function BetaSignupPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'beta-signup',
          source: 'get-started-page',
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Something went wrong')
      }

      setIsSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <main className="min-h-[80vh] flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
            <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-heading text-3xl font-bold text-dark">
            Thanks for your interest!
          </h1>
          <p className="mt-4 font-body text-lg text-muted leading-relaxed">
            We&apos;ll send you an email with a link to access Revnator shortly.
          </p>
          <p className="mt-2 font-body text-sm text-muted">
            Check your inbox at <span className="font-semibold text-dark">{formData.email}</span>
          </p>
          <div className="mt-8 rounded-xl border border-light bg-white p-6">
            <p className="font-heading text-sm font-semibold text-primary uppercase tracking-wider">
              EARLY ACCESS BETA
            </p>
            <p className="mt-2 font-body text-sm text-muted">
              You&apos;re joining our early access program. We&apos;re onboarding new teams every week and will reach out with your login details soon.
            </p>
          </div>
          <Link
            href="/"
            className="mt-8 inline-block font-body text-sm font-semibold text-primary hover:underline"
          >
            ← Back to homepage
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="font-heading text-sm font-semibold text-primary uppercase tracking-wider">
            EARLY ACCESS
          </p>
          <h1 className="mt-3 font-heading text-3xl font-bold text-dark">
            Try Revnator free
          </h1>
          <p className="mt-3 font-body text-base text-muted">
            Join the beta. Get early access to the all-in-one sales workspace built for closers.
          </p>
        </div>

        <div className="rounded-2xl border border-light bg-white p-8 shadow-sm">
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block font-body text-sm font-medium text-dark mb-1.5">
                  First name
                </label>
                <input
                  id="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full rounded-lg border border-light bg-bg px-4 py-3 font-body text-sm text-dark placeholder:text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Jane"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block font-body text-sm font-medium text-dark mb-1.5">
                  Last name
                </label>
                <input
                  id="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  className="w-full rounded-lg border border-light bg-bg px-4 py-3 font-body text-sm text-dark placeholder:text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Smith"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block font-body text-sm font-medium text-dark mb-1.5">
                Work email
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full rounded-lg border border-light bg-bg px-4 py-3 font-body text-sm text-dark placeholder:text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="jane@company.com"
              />
            </div>
          </div>

          {error && (
            <p className="mt-4 font-body text-sm text-error">{error}</p>
          )}

          <input type="text" name="website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="mt-6 w-full rounded-lg bg-primary px-6 py-3.5 font-body text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Joining...' : 'Join the Beta — It\'s Free'}
          </button>

          <p className="mt-4 text-center font-body text-xs text-muted">
            No credit card required · No account creation · We&apos;ll invite you when ready
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="font-body text-xs text-muted">
            Trusted by 200+ sales teams in early access
          </p>
        </div>
      </div>
    </main>
  )
}
