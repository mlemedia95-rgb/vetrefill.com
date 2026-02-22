import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import Image from 'next/image'
import type { NewsArticle, Category } from '@/lib/types'
import { CATEGORY_COLORS, CATEGORY_EMOJIS } from '@/lib/types'

const FALLBACK_IMAGES: Record<Category, string> = {
  dogs:    'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80',
  cats:    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80',
  wildlife:'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=400&q=80',
  birds:   'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&q=80',
  exotic:  'https://images.unsplash.com/photo-1597764690523-15bea4c581c9?w=400&q=80',
  general: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=400&q=80',
}

interface RelatedNewsProps {
  currentSlug: string
  category: Category
}

async function getRelatedArticles(currentSlug: string, category: Category): Promise<NewsArticle[]> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const { data } = await supabase
    .from('news')
    .select('id, slug, title, excerpt, category, image_url, published_at, reading_time, tags, source_name, source_url, is_published, view_count, updated_at')
    .eq('is_published', true)
    .eq('category', category)
    .neq('slug', currentSlug)
    .order('published_at', { ascending: false })
    .limit(4)
  return (data || []) as NewsArticle[]
}

export default async function RelatedNews({ currentSlug, category }: RelatedNewsProps) {
  const articles = await getRelatedArticles(currentSlug, category)
  if (articles.length === 0) return null

  const colors = CATEGORY_COLORS[category]
  const emoji = CATEGORY_EMOJIS[category]

  return (
    <section className="mt-12 pt-8 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        {emoji} More {category.charAt(0).toUpperCase() + category.slice(1)} Stories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {articles.map((article) => (
          <Link key={article.slug} href={`/news/${article.slug}`} className="group flex gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200">
            <div className="relative w-24 h-20 flex-shrink-0 rounded-lg overflow-hidden">
              <Image
                src={article.image_url || FALLBACK_IMAGES[category]}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                unoptimized={!!article.image_url}
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className={`text-xs font-semibold ${colors.text} ${colors.bg} px-1.5 py-0.5 rounded-full`}>
                {emoji} {category}
              </span>
              <h3 className="text-sm font-semibold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2 mt-1 leading-snug">
                {article.title}
              </h3>
              <p className="text-xs text-gray-400 mt-1">{article.reading_time} min read</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
