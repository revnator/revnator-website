'use client'

import React, { useState } from 'react'
import { cn } from '@/utilities/ui'
import { subjectOptions } from '../_contact/contactData'

interface FormData {
  firstName: string
  lastName: string
  email: string
  company: string
  subject: string
  message: string
}

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  subject: '',
  message: '',
}

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}): React.ReactElement {
  return (
    <div>
      <label className="mb-1.5 block font-body text-[13px] font-medium text-body">
        {label}
        {required && <span className="ml-0.5 text-error">*</span>}
      </label>
      {children}
    </div>
  )
}

const inputClasses =
  'w-full rounded-lg border border-light bg-white px-3.5 py-2.5 font-body text-sm text-body placeholder:text-muted/60 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'

export function ContactForm(): React.ReactElement {
  const [form, setForm] = useState<FormData>(initialFormData)
  const [submitted, setSubmitted] = useState(false)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ): void {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault()
    console.log('Contact form submitted:', form)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setForm(initialFormData)
    }, 5000)
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-bg p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/[0.12]">
          <span className="font-heading text-2xl text-accent">&#10003;</span>
        </div>
        <h3 className="mt-4 font-heading text-xl font-bold text-dark">
          Thanks! We&rsquo;ll be in touch soon.
        </h3>
        <p className="mt-2 font-body text-sm text-muted">
          We typically respond within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl bg-bg p-8 md:p-10">
      <h2 className="font-heading text-[22px] font-bold text-dark">Send us a message</h2>
      <p className="mt-2 font-body text-sm text-muted">
        We&rsquo;ll get back to you within 24 hours.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        {/* First + Last name row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="First name" required>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
              className={inputClasses}
              placeholder="Jane"
            />
          </Field>
          <Field label="Last name" required>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
              className={inputClasses}
              placeholder="Doe"
            />
          </Field>
        </div>

        {/* Email */}
        <Field label="Email" required>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className={inputClasses}
            placeholder="jane@company.com"
          />
        </Field>

        {/* Company */}
        <Field label="Company">
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Acme Inc."
          />
        </Field>

        {/* Subject */}
        <Field label="Subject" required>
          <select
            name="subject"
            value={form.subject}
            onChange={handleChange}
            required
            className={cn(inputClasses, !form.subject && 'text-muted/60')}
          >
            <option value="" disabled>
              Select a topic
            </option>
            {subjectOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </Field>

        {/* Message */}
        <Field label="Message" required>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            className={cn(inputClasses, 'resize-none')}
            placeholder="Tell us how we can help..."
          />
        </Field>

        {/* Submit */}
        <button
          type="submit"
          className="mt-2 flex h-12 w-full items-center justify-center rounded-lg bg-primary font-body text-sm font-semibold text-white transition-colors hover:bg-primary-dark focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Send message
        </button>

        <p className="text-center font-body text-xs text-muted">
          By submitting, you agree to our Privacy Policy and Terms.
        </p>
      </form>
    </div>
  )
}
