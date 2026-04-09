export interface ComparisonCard {
  title: string
  description: string
}

export interface ComparisonStat {
  value: string
  label: string
}

export interface ModuleComparisonData {
  label: string
  heading: string
  cards: ComparisonCard[]
  stats: ComparisonStat[]
}
