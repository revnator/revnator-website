import React from 'react'
import { MapPin, Clock, Zap, Linkedin, Twitter, Github } from 'lucide-react'
import { contactInfoBlocks } from '../_contact/contactData'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  MapPin,
  Clock,
  Zap,
}

export function ContactInfo(): React.ReactElement {
  return (
    <div>
      <h3 className="font-heading text-lg font-semibold text-dark">Other ways to reach us</h3>

      <div className="mt-6 flex flex-col gap-6">
        {contactInfoBlocks.map((block) => {
          const Icon = iconMap[block.icon]
          return (
            <div key={block.label}>
              {Icon && <Icon size={18} className="text-primary" />}
              <span className="mt-2 block font-body text-xs font-medium uppercase tracking-[0.1em] text-muted">
                {block.label}
              </span>
              <p className="mt-1 font-body text-sm text-body">{block.text}</p>
            </div>
          )
        })}
      </div>

      {/* Social */}
      <div className="mt-8 border-t border-light pt-6">
        <span className="block font-body text-xs font-medium uppercase tracking-[0.1em] text-muted">
          Follow us
        </span>
        <div className="mt-3 flex items-center gap-4">
          <a
            href="#"
            className="text-muted transition-colors hover:text-primary"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="#"
            className="text-muted transition-colors hover:text-primary"
            aria-label="Twitter"
          >
            <Twitter size={20} />
          </a>
          <a
            href="#"
            className="text-muted transition-colors hover:text-primary"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
        </div>
      </div>
    </div>
  )
}
