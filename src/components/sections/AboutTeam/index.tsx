import React from 'react'
import { Linkedin, Twitter, Github } from 'lucide-react'
import type { AboutTeamData } from '../_about/aboutData'

export function AboutTeam({ data }: { data: AboutTeamData }): React.ReactElement {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-container px-6 md:px-12">
        {/* Header */}
        <div className="text-center">
          <span className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-primary">
            {data.label}
          </span>
          <h2 className="mt-4 font-heading text-h2 font-bold text-dark tracking-[-0.01em]">
            {data.heading}
          </h2>
          <p className="mx-auto mt-3 font-body text-base text-muted">
            {data.subheading}
          </p>
        </div>

        {/* Founder card */}
        <div className="mx-auto mt-12 max-w-[520px] rounded-2xl bg-bg p-8 text-center">
          {/* Avatar */}
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-light">
            <span className="font-heading text-4xl font-bold text-primary">
              {data.founder.initials}
            </span>
          </div>

          {/* Name */}
          <h3 className="mt-5 font-heading text-xl font-bold text-dark">
            {data.founder.name}
          </h3>

          {/* Title */}
          <p className="mt-1 font-body text-sm font-medium text-primary">
            {data.founder.title}
          </p>

          {/* Bio */}
          <p className="mt-4 font-body text-sm leading-[1.7] text-body">
            {data.founder.bio}
          </p>

          {/* Social links */}
          <div className="mt-5 flex items-center justify-center gap-3">
            <a
              href="#"
              className="text-muted transition-colors hover:text-primary"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="#"
              className="text-muted transition-colors hover:text-primary"
              aria-label="Twitter"
            >
              <Twitter size={16} />
            </a>
            <a
              href="#"
              className="text-muted transition-colors hover:text-primary"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
