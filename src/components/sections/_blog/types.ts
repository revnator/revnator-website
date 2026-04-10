export interface BlogPostCard {
  id: number
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  author: { name: string; initials: string; bio: string }
  tags: string[]
}
