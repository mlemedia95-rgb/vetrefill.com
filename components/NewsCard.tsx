import Link from 'next/link'
import Image from 'next/image'
import { Clock } from 'lucide-react'
import CategoryBadge from './CategoryBadge'
import type { NewsArticle, Category } from '@/lib/types'

interface NewsCardProps {
  article: NewsArticle
  size?: 'sm' | 'md' | 'lg'
}

const FALLBACK_IMAGES: Record<Category, string> = {
  dogs:    'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80',
  cats:    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80',
  wildlife:'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800&q=80',
  birds:   'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=800&q=80',
  exotic:  'https://images.unsplash.com/photo-1597764690523-15bea4c581c9?w=800&q=80',
  general: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&q=80',
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000)
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function NewsCard({ article, size = 'md' }: NewsCardProps) {
  const imgSrc = article.image_url || FALLBACK_IMAGES[article.category]
  const isLarge = size === 'lg'
  const isSm = size === 'sm'

  return (
    <Link href={`/news/${article.slug}`} className="group block">
      <article className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 h-full flex flex-col`}>
        {/* Image */}
        <div className={`relative overflow-hidden flex-shrink-0 ${isLarge ? 'h-64' : isSm ? 'h-36' : 'h-48'}`}>
          <Image
            src={imgSrc}
            alt={article.image_alt || article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes={isLarge ? '(max-width: 768px) 100vw, 700px' : '(max-width: 768px) 100vw, 400px'}
            unoptimized={!!article.image_url}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute top-3 left-3">
            <CategoryBadge category={article.category} size="sm" />
          </div>
        </div>

        {/* Content */}
        <div className={`flex flex-col flex-1 ${isLarge ? 'p-6' : isSm ? 'p-3' : 'p-4'}`}>
          <h3 className={`font-bold text-gray-900 group-hover:text-orange-600 transition-colors leading-snug mb-2 line-clamp-2 ${isLarge ? 'text-xl' : isSm ? 'text-sm' : 'text-base'}`}>
            {article.title}
          </h3>
          {!isSm && article.excerpt && (
            <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-3 flex-1">
              {article.excerpt}
            </p>
          )}
          <div className="flex items-center gap-3 text-xs text-gray-400 mt-auto pt-2 border-t border-gray-50">
            <span>{formatDate(article.published_at)}</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.reading_time} min read
            </span>
            {article.source_name && (
              <span className="ml-auto text-gray-300 truncate max-w-24">{article.source_name}</span>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}
