export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import type { Metadata } from 'next'
import CategoryBadge from '@/components/CategoryBadge'
import ShareButtons from '@/components/ShareButtons'
import RelatedNews from '@/components/RelatedNews'
import AdBanner from '@/components/AdBanner'
import { NewsArticle, Category } from '@/lib/types'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

async function getArticle(slug: string): Promise<NewsArticle | null> {
  const { data } = await getSupabase()
    .from('news')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()
  return data as NewsArticle | null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) return { title: 'Article Not Found' }

  return {
    title: article.title,
    description: article.excerpt || article.title,
    openGraph: {
      title: article.title,
      description: article.excerpt || article.title,
      type: 'article',
      publishedTime: article.published_at,
      images: article.image_url
        ? [{ url: article.image_url, width: 1200, height: 630, alt: article.image_alt || article.title }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt || article.title,
      images: article.image_url ? [article.image_url] : [],
    },
  }
}

export const revalidate = 3600

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) notFound()

  const publishedDate = new Date(article.published_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const articleUrl = `https://vetrefill.com/news/${article.slug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    image: article.image_url,
    datePublished: article.published_at,
    dateModified: article.updated_at,
    author: {
      '@type': 'Organization',
      name: 'VetRefill Animal News',
    },
    publisher: {
      '@type': 'Organization',
      name: 'VetRefill Animal News',
      url: 'https://vetrefill.com',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
          <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
          <span>›</span>
          <Link href="/news" className="hover:text-orange-600 transition-colors">News</Link>
          <span>›</span>
          <Link href={`/categories/${article.category}`} className="hover:text-orange-600 transition-colors capitalize">
            {article.category}
          </Link>
        </nav>

        {/* Category */}
        <div className="mb-4">
          <CategoryBadge category={article.category as Category} size="md" />
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
          {article.title}
        </h1>

        {/* Meta Row */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-100">
          <span>🗓 {publishedDate}</span>
          <span>⏱ {article.reading_time} min read</span>
          {article.source_name && (
            <span>
              📰 Originally reported by{' '}
              <a
                href={article.source_url}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="text-orange-600 hover:underline"
              >
                {article.source_name}
              </a>
            </span>
          )}
        </div>

        {/* Hero Image */}
        {article.image_url && (
          <div className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden mb-8 shadow-md">
            <Image
              src={article.image_url}
              alt={article.image_alt || article.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>
        )}

        {/* Top Ad */}
        <AdBanner slot="article-top" />

        {/* Article Content */}
        <div
          className="prose max-w-none my-8"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8 pt-4 border-t border-gray-100">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Source Attribution */}
        {article.source_name && (
          <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mb-8 text-sm text-gray-600">
            <strong>Editorial Note:</strong> This article is an original editorial adaptation. The underlying story was{' '}
            <a
              href={article.source_url}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="text-orange-600 hover:underline font-medium"
            >
              originally reported by {article.source_name}
            </a>
            .
          </div>
        )}

        {/* Share Buttons */}
        <div className="mb-8">
          <ShareButtons url={articleUrl} title={article.title} />
        </div>

        {/* Bottom Ad */}
        <AdBanner slot="article-bottom" />

        {/* Related News */}
        <div className="mt-10">
          <RelatedNews currentSlug={article.slug} category={article.category as Category} />
        </div>
      </article>
    </>
  )
}
