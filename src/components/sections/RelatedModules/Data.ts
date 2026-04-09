export interface RelatedModuleItem {
  icon: string
  name: string
  description: string
  href: string
}

export interface RelatedModulesData {
  label: string
  heading: string
  modules: RelatedModuleItem[]
}
