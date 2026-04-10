export interface ModuleFeatureBlockData {
  label: string
  heading: string
  description: string
  bullets: string[]
  cta: {
    text: string
    href: string
  }
  image?: { url: string; alt: string } | null
}
