'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Check, Minus } from 'lucide-react'
import { cn } from '@/utilities/ui'

type BillingPeriod = 'monthly' | 'annual'

export interface PlanFeatureData {
  text: string
  included: boolean
}

export interface PricingPlanData {
  name: string
  monthlyPrice: number
  annualPrice: number
  period: string
  description: string
  features: PlanFeatureData[]
  ctaLabel: string
  ctaHref: string
  highlighted: boolean
}

export interface PricingPlansSectionData {
  label: string
  heading: string
  subheading: string
  trialNote: string
  plans: PricingPlanData[]
}

function BillingToggle({
  period,
  onChange,
}: {
  period: BillingPeriod
  onChange: (p: BillingPeriod) => void
}): React.ReactElement {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="relative flex h-11 w-60 items-center rounded-[22px] bg-light p-1">
        {/* Sliding pill */}
        <div
          className={cn(
            'absolute top-1 h-9 w-[calc(50%-4px)] rounded-[18px] bg-primary transition-transform duration-200 ease-out',
            period === 'annual' ? 'translate-x-[calc(100%+4px)]' : 'translate-x-0',
          )}
        />
        <button
          type="button"
          onClick={() => onChange('monthly')}
          className={cn(
            'relative z-10 flex-1 text-center font-body text-sm font-medium transition-colors duration-200',
            period === 'monthly' ? 'text-white' : 'text-body',
          )}
        >
          Monthly
        </button>
        <button
          type="button"
          onClick={() => onChange('annual')}
          className={cn(
            'relative z-10 flex-1 text-center font-body text-sm font-medium transition-colors duration-200',
            period === 'annual' ? 'text-white' : 'text-body',
          )}
        >
          Annual
        </button>
      </div>
      <span className="rounded-full bg-accent/[0.12] px-2.5 py-0.5 font-heading text-[11px] font-semibold text-[#065F46]">
        Save 20%
      </span>
    </div>
  )
}

function PlanCard({
  plan,
  period,
}: {
  plan: PricingPlanData
  period: BillingPeriod
}): React.ReactElement {
  const price = period === 'annual' ? plan.annualPrice : plan.monthlyPrice
  const isFree = plan.monthlyPrice === 0

  return (
    <div
      className={cn(
        'relative flex flex-col rounded-2xl p-7',
        plan.highlighted
          ? 'border-2 border-primary shadow-[0_8px_32px_rgba(110,51,177,0.12)]'
          : 'border border-light',
        'bg-white',
      )}
    >
      {plan.highlighted && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1.5 font-heading text-[11px] font-semibold uppercase text-white">
          Most Popular
        </span>
      )}

      <h3 className="font-heading text-lg font-semibold text-dark">{plan.name}</h3>

      <div className="mt-2 flex items-baseline gap-1">
        <span className="font-heading text-[40px] font-extrabold leading-none text-dark">
          {isFree ? 'Free' : `$${price}`}
        </span>
        <span className="font-body text-sm text-muted">{plan.period}</span>
      </div>

      <p className="mt-2 font-body text-[13px] text-muted">{plan.description}</p>

      <div className="my-5 h-px bg-light" />

      <ul className="flex flex-1 flex-col gap-2">
        {plan.features.map((f) => (
          <li key={f.text} className="flex items-start gap-2.5">
            {f.included ? (
              <Check size={16} className="mt-0.5 flex-shrink-0 text-accent" />
            ) : (
              <Minus size={16} className="mt-0.5 flex-shrink-0 text-light" />
            )}
            <span
              className={cn(
                'font-body text-[13px]',
                f.included ? 'text-body' : 'text-muted',
              )}
            >
              {f.text}
            </span>
          </li>
        ))}
      </ul>

      <Link
        href={plan.ctaHref}
        className={cn(
          'mt-6 flex h-11 items-center justify-center rounded-lg font-body text-[13px] font-semibold transition-all hover:scale-[1.02] focus:ring-2 focus:ring-primary focus:ring-offset-2',
          plan.highlighted
            ? 'bg-primary text-white hover:bg-primary-dark'
            : 'border-[1.5px] border-primary bg-transparent text-primary hover:bg-primary/5',
        )}
      >
        {plan.ctaLabel}
      </Link>
    </div>
  )
}

export function PricingPlansSection({ data }: { data: PricingPlansSectionData }): React.ReactElement {
  const [period, setPeriod] = useState<BillingPeriod>('annual')

  return (
    <section className="bg-bg pb-12 pt-16">
      <div className="mx-auto max-w-container px-6 md:px-12">
        {/* Hero header */}
        <div className="text-center">
          <span className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-primary">
            {data.label}
          </span>
          <h1 className="mt-4 font-heading text-h1 font-bold leading-[1.15] text-dark">
            {data.heading}
          </h1>
          <p className="mx-auto mt-4 max-w-[520px] font-body text-lg text-muted">
            {data.subheading}
          </p>

          <div className="mt-8">
            <BillingToggle period={period} onChange={setPeriod} />
          </div>
        </div>

        {/* Plan cards */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {data.plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} period={period} />
          ))}
        </div>

        <p className="mt-6 text-center font-body text-[13px] text-muted">
          {data.trialNote}
        </p>
      </div>
    </section>
  )
}
