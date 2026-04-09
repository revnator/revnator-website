export interface Testimonial {
  quote: string
  name: string
  title: string
  initials: string
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'Revnator replaced three tools for us. Our reps spend less time on admin and more time closing.',
    name: 'Sarah M.',
    title: 'Head of Sales, TechCorp',
    initials: 'SM',
  },
  {
    quote:
      'The pipeline view is exactly what we needed. Clean, visual, and actually useful for forecasting.',
    name: 'James K.',
    title: 'Revenue Operations, ScaleUp Inc',
    initials: 'JK',
  },
  {
    quote:
      'Setting up email sequences took 5 minutes. No onboarding call needed. Just works.',
    name: 'Priya R.',
    title: 'SDR Lead, GrowthBase',
    initials: 'PR',
  },
]
