export type Category = 'dogs' | 'cats' | 'wildlife' | 'birds' | 'exotic' | 'general'

export interface NewsArticle {
  id: string
  slug: string
  title: string
  original_title?: string
  content: string
  excerpt?: string
  category: Category
  tags: string[]
  image_url?: string
  image_alt?: string
  source_url: string
  source_name?: string
  published_at: string
  updated_at: string
  is_published: boolean
  view_count: number
  reading_time: number
}

export interface RssItem {
  title?: string
  link?: string
  pubDate?: string
  content?: string
  contentSnippet?: string
  enclosure?: { url: string; type?: string; length?: number }
  categories?: string[]
  creator?: string
}

export interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctIndex: number
  explanation: string
  category: Category
  emoji: string
}

export const CATEGORY_LABELS: Record<Category, string> = {
  dogs: 'Dogs',
  cats: 'Cats',
  wildlife: 'Wildlife',
  birds: 'Birds',
  exotic: 'Exotic',
  general: 'General',
}

export const CATEGORY_EMOJIS: Record<Category, string> = {
  dogs: '🐕',
  cats: '🐈',
  wildlife: '🦁',
  birds: '🐦',
  exotic: '🦎',
  general: '🐾',
}

export const CATEGORY_COLORS: Record<Category, { bg: string; text: string; border: string }> = {
  dogs:    { bg: 'bg-amber-100',  text: 'text-amber-800',  border: 'border-amber-200' },
  cats:    { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' },
  wildlife:{ bg: 'bg-green-100',  text: 'text-green-800',  border: 'border-green-200' },
  birds:   { bg: 'bg-blue-100',   text: 'text-blue-800',   border: 'border-blue-200' },
  exotic:  { bg: 'bg-rose-100',   text: 'text-rose-800',   border: 'border-rose-200' },
  general: { bg: 'bg-gray-100',   text: 'text-gray-700',   border: 'border-gray-200' },
}
