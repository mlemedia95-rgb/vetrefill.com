export const dynamic = 'force-dynamic'

import { createClient } from '@supabase/supabase-js'
import NewsCard from '@/components/NewsCard'
import AdBanner from '@/components/AdBanner'
import { NewsArticle, Category } from '@/lib/types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Latest Animal News',
  description: 'Browse the latest animal news, wildlife stories, and pet care updates from around the world.',
}

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

const CATEGORIES: { value: string; label: string }[] = [
  { value: 'all', label: '🐾 All' },
  { value: 'dogs', label: '🐕 Dogs' },
  { value: 'cats', label: '🐈 Cats' },
  { value: 'wildlife', label: '🦁 Wildlife' },
  { value: 'birds', label: '🐦 Birds' },
  { value: 'exotic', label: '🦎 Exotic' },
  { value: 'general', label: '📰 General' },
]

async function getNews(category: string, page: number) {
  const perPage = 12
  const from = (page - 1) * perPage
  const to = from + perPage - 1

  let query = getSupabase()
    .from('news')
    .select('*', { count: 'exact' })
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .range(from, to)

  if (category !== 'all') {
    query = query.eq('category', category)
  }

  const { data, count } = await query
  return { articles: (data as NewsArticle[]) || [], total: count || 0 }
}

export const revalidate = 1800

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>
}) {
  const params = await searchParams
  const category = params.category || 'all'
  const page = Math.max(1, parseInt(params.page || '1', 10))
  const perPage = 12

  const { articles, total } = await getNews(category, page)
  const totalPages = Math.ceil(total / perPage)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Animal News</h1>
        <p className="text-gray-500">The latest stories from the animal kingdom</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => {
          const isActive = category === cat.value
          return (
            <a
              key={cat.value}
              href={`/news?category=${cat.value}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600 border border-gray-200'
              }`}
            >
              {cat.label}
            </a>
          )
        })}
      </div>

      <AdBanner slot="news-top" />

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-6">
          {articles.map((article) => (
            <NewsCard key={article.id} article={article} size="md" />
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <p className="text-5xl mb-4">🐾</p>
          <h2 className="text-xl font-bold text-gray-700 mb-2">No stories yet</h2>
          <p className="text-gray-500">Check back soon — new animal stories are added every few hours!</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          {page > 1 && (
            <a
              href={`/news?category=${category}&page=${page - 1}`}
              className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
            >
              ← Previous
            </a>
          )}
          <div className="flex gap-1">
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map((pageNum) => (
              <a
                key={pageNum}
                href={`/news?category=${category}&page=${pageNum}`}
                className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                  page === pageNum
                    ? 'bg-orange-500 text-white'
                    : 'border border-gray-200 text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                }`}
              >
                {pageNum}
              </a>
            ))}
          </div>
          {page < totalPages && (
            <a
              href={`/news?category=${category}&page=${page + 1}`}
              className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
            >
              Next →
            </a>
          )}
        </div>
      )}

      <div className="mt-10">
        <AdBanner slot="news-bottom" />
      </div>
    </div>
  )
}
