import React from 'react'

const logos = ['LOGO', 'LOGO', 'LOGO', 'LOGO', 'LOGO', 'LOGO']

export function TrustedBy(): React.ReactElement {
  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto max-w-container px-6 text-center">
        <p className="font-body text-sm font-medium text-muted">
          Trusted by fast-growing sales teams
        </p>

        <div className="mt-8 hidden md:flex items-center justify-center gap-12 flex-wrap">
          {logos.map((label, i) => (
            <div
              key={i}
              className="flex items-center justify-center w-[120px] h-10 rounded-md bg-light"
            >
              <span className="font-body text-[11px] font-medium text-muted">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
