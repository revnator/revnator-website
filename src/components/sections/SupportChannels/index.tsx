import React from 'react'
import Link from 'next/link'
import { BookOpen, Mail, Users } from 'lucide-react'
import { supportChannels } from '../_support/supportData'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  BookOpen,
  Mail,
  Users,
}

export function SupportChannels(): React.ReactElement {
  return (
    <section className="bg-bg pt-12 pb-16">
      <div className="mx-auto max-w-container px-6 md:px-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {supportChannels.map((channel) => {
            const Icon = iconMap[channel.icon]
            return (
              <div
                key={channel.title}
                className="group flex flex-col items-center rounded-2xl border border-light bg-white p-7 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(19,15,30,0.08)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-light">
                  {Icon && <Icon size={24} className="text-primary" />}
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-dark">
                  {channel.title}
                </h3>
                <p className="mt-2 font-body text-sm text-muted">
                  {channel.description}
                </p>
                <Link
                  href={channel.href}
                  className="mt-4 font-body text-sm font-medium text-primary hover:underline"
                >
                  {channel.linkText} &rarr;
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
