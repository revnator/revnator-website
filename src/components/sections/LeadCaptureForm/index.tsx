'use client'

import React, { useState } from 'react'

type FormVariant = 'full' | 'light' | 'webinar'

interface LeadCaptureFormProps {
  variant: FormVariant
  title: string
  buttonText: string
}

function Field({
  label,
  type = 'text',
  name,
  required = true,
}: {
  label: string
  type?: string
  name: string
  required?: boolean
}): React.ReactElement {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block font-body text-[13px] font-medium text-body"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="h-11 w-full rounded-lg border border-light bg-white px-3 font-body text-sm text-body placeholder:text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </div>
  )
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string
  name: string
  options: string[]
}): React.ReactElement {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block font-body text-[13px] font-medium text-body"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="h-11 w-full rounded-lg border border-light bg-white px-3 font-body text-sm text-body focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  )
}

export function LeadCaptureForm({
  variant,
  title,
  buttonText,
}: LeadCaptureFormProps): React.ReactElement {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    console.log('Form submitted:', data)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-light bg-bg p-8 text-center">
        <p className="font-heading text-lg font-semibold text-dark">Thank you!</p>
        <p className="mt-2 font-body text-sm text-muted">
          {variant === 'webinar'
            ? "You're registered. Check your email for details."
            : 'Your download is on its way to your inbox.'}
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-light bg-bg p-8">
      <h3 className="font-heading text-lg font-semibold text-dark">{title}</h3>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
        {variant === 'full' && (
          <>
            <Field label="First name" name="firstName" />
            <Field label="Last name" name="lastName" />
            <Field label="Work email" name="email" type="email" />
            <Field label="Company name" name="company" />
            <SelectField
              label="Team size"
              name="teamSize"
              options={['1-5', '6-20', '21-50', '50+']}
            />
          </>
        )}

        {variant === 'light' && (
          <>
            <Field label="Work email" name="email" type="email" />
            <Field label="Company name" name="company" />
          </>
        )}

        {variant === 'webinar' && (
          <>
            <Field label="Name" name="name" />
            <Field label="Email" name="email" type="email" />
            <Field label="Company" name="company" />
          </>
        )}

        <button
          type="submit"
          className="mt-2 h-12 w-full rounded-lg bg-primary font-body text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:scale-[1.01] focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          {buttonText}
        </button>
      </form>

      <p className="mt-3 text-center font-body text-xs text-muted">
        {variant === 'light'
          ? 'Instant download. No spam.'
          : 'We respect your privacy. Unsubscribe anytime.'}
      </p>
    </div>
  )
}
