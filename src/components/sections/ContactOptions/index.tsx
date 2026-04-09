import React from 'react'
import { Mail, HelpCircle, Briefcase } from 'lucide-react'
import { contactOptions } from '../_contact/contactData'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Mail,
  HelpCircle,
  Briefcase,
}

export function ContactOptions(): React.ReactElement {
  return (
    <section className="bg-bg pb-8">
      <div className="mx-auto max-w-container px-6 md:px-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {contactOptions.map((option) => {
            const Icon = iconMap[option.icon]
            return (
              <div
                key={option.title}
                className="rounded-2xl border border-light bg-white p-6 text-center transition-colors hover:border-primary/30"
              >
                {/* Icon */}
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-light">
                  {Icon && <Icon size={20} className="text-primary" />}
                </div>

                <h3 className="mt-3 font-heading text-base font-semibold text-dark">
                  {option.title}
                </h3>

                <a
                  href={option.href}
                  className="mt-1.5 inline-block font-body text-[13px] font-medium text-primary hover:underline"
                >
                  {option.linkLabel}
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
