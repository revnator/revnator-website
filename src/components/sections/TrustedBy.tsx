import React from 'react'

export interface TrustedByLogo {
  name: string
  logoUrl?: string | null
}

export interface TrustedByData {
  label: string
  logos: TrustedByLogo[]
}

export function TrustedBy({ data }: { data: TrustedByData }): React.ReactElement {
  const placeholders = data.logos.length > 0 ? data.logos : Array.from({ length: 6 }, () => ({ name: 'LOGO', logoUrl: null }))

  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto max-w-container px-6 text-center">
        <p className="font-body text-sm font-medium text-muted">
          {data.label}
        </p>

        <div className="mt-8 hidden md:flex items-center justify-center gap-12 flex-wrap">
          {placeholders.map((item, i) => (
            <div
              key={item.name + i}
              className="flex items-center justify-center w-[120px] h-10 rounded-md bg-light"
            >
              {item.logoUrl ? (
                <img src={item.logoUrl} alt={item.name} className="h-6 w-auto object-contain" />
              ) : (
                <span className="font-body text-[11px] font-medium text-muted">
                  {item.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
