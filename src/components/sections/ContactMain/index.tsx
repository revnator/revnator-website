import React from 'react'
import { ContactForm } from '../ContactForm'
import { ContactInfo } from '../ContactInfo'

export function ContactMain(): React.ReactElement {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-container px-6 md:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[60fr_40fr]">
          {/* Left — Form */}
          <ContactForm />

          {/* Right — Info */}
          <ContactInfo />
        </div>
      </div>
    </section>
  )
}
