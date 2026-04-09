'use client'

import React, { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { whyFAQs } from '../_why/whyData'

export function WhyFAQ(): React.ReactElement {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  function toggle(index: number): void {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-prose-narrow px-6 md:px-12">
        {/* Header */}
        <div className="text-center">
          <h2 className="font-heading text-[28px] font-bold text-dark tracking-[-0.01em]">
            Common questions
          </h2>
        </div>

        {/* Accordion */}
        <div className="mt-12">
          {whyFAQs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div key={faq.question} className="border-b border-light">
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="flex w-full items-center justify-between py-4 text-left"
                >
                  <span className="font-body text-[15px] font-medium text-dark">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <X size={20} className="flex-shrink-0 text-primary" />
                  ) : (
                    <Plus size={20} className="flex-shrink-0 text-muted" />
                  )}
                </button>

                <div
                  className={cn(
                    'grid transition-[grid-template-rows] duration-200 ease-out',
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 pt-1 font-body text-[15px] leading-[1.7] text-body">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
