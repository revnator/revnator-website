import React from 'react'

export interface AboutFounderData {
  initials: string
  name: string
  title: string
  bio: string
  avatarUrl?: string | null
}

export interface AboutTeamData {
  label: string
  heading: string
  subheading: string
  founder: AboutFounderData
}

export function AboutTeam({ data }: { data: AboutTeamData }): React.ReactElement {
  return (
    <section className="w-full bg-bg py-24">
      <div className="mx-auto max-w-container px-6">
        <div className="text-center">
          <span className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-primary">
            {data.label}
          </span>
          <h2 className="mt-4 font-heading text-[32px] font-bold text-dark">
            {data.heading}
          </h2>
          <p className="mx-auto mt-3 max-w-[480px] font-body text-base text-muted">
            {data.subheading}
          </p>
        </div>

        <div className="mt-12 mx-auto max-w-[480px] rounded-2xl border border-light bg-white p-8 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-light overflow-hidden">
            {data.founder.avatarUrl ? (
              <img
                src={data.founder.avatarUrl}
                alt={data.founder.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="font-heading text-2xl font-bold text-primary">
                {data.founder.initials}
              </span>
            )}
          </div>
          <h3 className="mt-5 font-heading text-xl font-semibold text-dark">
            {data.founder.name}
          </h3>
          <span className="mt-1 block font-body text-sm text-primary">
            {data.founder.title}
          </span>
          <p className="mt-4 font-body text-sm leading-[1.7] text-body">
            {data.founder.bio}
          </p>
        </div>
      </div>
    </section>
  )
}
