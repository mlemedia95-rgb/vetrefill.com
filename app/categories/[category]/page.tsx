export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import type { Metadata } from 'next'
import NewsCard from '@/components/NewsCard'
import AdBanner from '@/components/AdBanner'
import { NewsArticle, Category, CATEGORY_EMOJIS, CATEGORY_LABELS } from '@/lib/types'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

const VALID_CATEGORIES: Category[] = ['dogs', 'cats', 'wildlife', 'birds', 'exotic', 'general']

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category } = await params
  if (!VALID_CATEGORIES.includes(category as Category)) return { title: 'Not Found' }
  const cat = category as Category
  return {
    title: `${CATEGORY_EMOJIS[cat]} ${CATEGORY_LABELS[cat]} News`,
    description: `Latest ${CATEGORY_LABELS[cat].toLowerCase()} news, stories and updates from around the world.`,
  }
}

export const revalidate = 1800

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>
  searchParams: Promise<{ page?: string }>
}) {
  const { category } = await params
  const sp = await searchParams
  const page = Math.max(1, parseInt(sp.page || '1', 10))
  const perPage = 12

  if (!VALID_CATEGORIES.includes(category as Category)) notFound()

  const cat = category as Category
  const from = (page - 1) * perPage
  const to = from + perPage - 1

  const supabase = getSupabase()
  const { data, count } = await supabase
    .from('news')
    .select('*', { count: 'exact' })
    .eq('is_published', true)
    .eq('category', cat)
    .order('published_at', { ascending: false })
    .range(from, to)

  const articles: NewsArticle[] = (data as NewsArticle[]) || []
  const totalPages = Math.ceil((count || 0) / perPage)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          {CATEGORY_EMOJIS[cat]} {CATEGORY_LABELS[cat]} News
        </h1>
        <p className="text-gray-500">
          Latest {CATEGORY_LABELS[cat].toLowerCase()} stories from around the world
        </p>
      </div>

      {/* Other Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {VALID_CATEGORIES.filter(c => c !== cat).map((c) => (
          <a
            key={c}
            href={`/categories/${c}`}
            className="px-4 py-2 rounded-full text-sm font-medium bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600 border border-gray-200 transition-colors"
          >
            {CATEGORY_EMOJIS[c]} {CATEGORY_LABELS[c]}
          </a>
        ))}
      </div>

      <AdBanner slot={`cat-${cat}-top`} />

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-6">
          {articles.map((article) => (
            <NewsCard key={article.id} article={article} size="md" />
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <p className="text-5xl mb-4">{CATEGORY_EMOJIS[cat]}</p>
          <h2 className="text-xl font-bold text-gray-700 mb-2">No {CATEGORY_LABELS[cat]} stories yet</h2>
          <p className="text-gray-500">Check back soon — new stories are added every few hours!</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          {page > 1 && (
            <a
              href={`/categories/${cat}?page=${page - 1}`}
              className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
            >
              ← Previous
            </a>
          )}
          <div className="flex gap-1">
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map((pageNum) => (
              <a
                key={pageNum}
                href={`/categories/${cat}?page=${pageNum}`}
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
              href={`/categories/${cat}?page=${page + 1}`}
              className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
            >
              Next →
            </a>
          )}
        </div>
      )}

      <div className="mt-10">
        <AdBanner slot={`cat-${cat}-bottom`} />
      </div>
    </div>
  )
}
