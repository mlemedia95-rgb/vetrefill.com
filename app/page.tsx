export const dynamic = 'force-dynamic'

import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@supabase/supabase-js'
import NewsCard from '@/components/NewsCard'
import CategoryBadge from '@/components/CategoryBadge'
import AdBanner from '@/components/AdBanner'
import { NewsArticle, Category, CATEGORY_EMOJIS, CATEGORY_LABELS } from '@/lib/types'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

async function getLatestNews(limit = 7): Promise<NewsArticle[]> {
  const { data } = await getSupabase()
    .from('news')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(limit)
  return (data as NewsArticle[]) || []
}

async function getNewsByCategory(category: Category, limit = 4): Promise<NewsArticle[]> {
  const { data } = await getSupabase()
    .from('news')
    .select('*')
    .eq('is_published', true)
    .eq('category', category)
    .order('published_at', { ascending: false })
    .limit(limit)
  return (data as NewsArticle[]) || []
}

const FEATURED_CATEGORIES: Category[] = ['dogs', 'cats', 'wildlife', 'birds']

export const revalidate = 3600

export default async function HomePage() {
  const [latestNews, dogNews, catNews, wildlifeNews, birdNews] = await Promise.all([
    getLatestNews(7),
    getNewsByCategory('dogs', 4),
    getNewsByCategory('cats', 4),
    getNewsByCategory('wildlife', 4),
    getNewsByCategory('birds', 4),
  ])

  const heroArticle = latestNews[0]
  const gridArticles = latestNews.slice(1, 7)

  const categoryNewsMap: Record<string, NewsArticle[]> = {
    dogs: dogNews,
    cats: catNews,
    wildlife: wildlifeNews,
    birds: birdNews,
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {heroArticle ? (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
          <Link href={`/news/${heroArticle.slug}`} className="group block">
            <div className="relative w-full h-[420px] sm:h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={heroArticle.image_url || 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=1200&h=630&fit=crop'}
                alt={heroArticle.image_alt || heroArticle.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
                sizes="(max-width: 768px) 100vw, 1280px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="mb-3">
                  <CategoryBadge category={heroArticle.category as Category} size="md" />
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-3 group-hover:text-orange-300 transition-colors">
                  {heroArticle.title}
                </h1>
                {heroArticle.excerpt && (
                  <p className="text-gray-300 text-sm sm:text-base line-clamp-2 max-w-3xl">
                    {heroArticle.excerpt}
                  </p>
                )}
                <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                  {heroArticle.source_name && <span>{heroArticle.source_name}</span>}
                  <span>·</span>
                  <span>{heroArticle.reading_time} min read</span>
                  <span>·</span>
                  <span>{new Date(heroArticle.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>
            </div>
          </Link>
        </section>
      ) : (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
          <div className="relative w-full h-[420px] rounded-2xl overflow-hidden bg-gradient-to-br from-orange-100 to-amber-50 flex items-center justify-center">
            <div className="text-center">
              <p className="text-6xl mb-4">🐾</p>
              <h2 className="text-2xl font-bold text-gray-700 mb-2">Animal News Loading...</h2>
              <p className="text-gray-500 mb-6">Fresh stories are being fetched. Check back soon!</p>
              <Link href="/quiz" className="inline-block bg-orange-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors">
                Take the Animal Quiz 🎯
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Top Ad Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <AdBanner slot="top-home" />
      </div>

      {/* Latest News Grid */}
      {gridArticles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Latest Stories</h2>
            <Link href="/news" className="text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {gridArticles.map((article, idx) => (
              <NewsCard
                key={article.id}
                article={article}
                size={idx === 0 ? 'lg' : 'md'}
              />
            ))}
          </div>
        </section>
      )}

      {/* Category Sections */}
      {FEATURED_CATEGORIES.map((category) => {
        const articles = categoryNewsMap[category]
        if (!articles || articles.length === 0) return null

        return (
          <section key={category} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {CATEGORY_EMOJIS[category]} {CATEGORY_LABELS[category]} News
              </h2>
              <Link
                href={`/categories/${category}`}
                className="text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors"
              >
                More {CATEGORY_LABELS[category]} stories →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {articles.map(article => (
                <NewsCard key={article.id} article={article} size="sm" />
              ))}
            </div>
          </section>
        )
      })}

      {/* Mid-page Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdBanner slot="mid-home" />
      </div>

      {/* Quiz CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-8 sm:p-12 text-center text-white shadow-lg">
          <p className="text-4xl mb-4">🎯</p>
          <h2 className="text-3xl font-extrabold mb-3">How Well Do You Know Animals?</h2>
          <p className="text-orange-100 text-lg mb-6 max-w-xl mx-auto">
            Test your animal knowledge with our fun 10-question quiz. Discover if you&apos;re a Wildlife Expert or still learning!
          </p>
          <Link
            href="/quiz"
            className="inline-block bg-white text-orange-600 font-bold px-8 py-3 rounded-xl hover:bg-orange-50 transition-colors shadow-md text-lg"
          >
            Take the Quiz →
          </Link>
        </div>
      </section>

      {/* Bottom Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <AdBanner slot="bottom-home" />
      </div>
    </div>
  )
}
