import { NextRequest, NextResponse } from 'next/server'
import { fetchAllFeeds } from '@/lib/rss/fetcher'
import { rewriteArticle, generateSlug, detectCategory, estimateReadingTime } from '@/lib/groq/rewriter'
import { createServiceClient } from '@/lib/supabase/service'

export const maxDuration = 60

export async function GET(req: NextRequest) {
  // Auth check
  const auth = req.headers.get('authorization')
  const secret = process.env.CRON_SECRET
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createServiceClient()
  let processed = 0
  let skipped = 0
  let errors = 0

  try {
    const feedItems = await fetchAllFeeds()
    console.log(`[fetch-news] Fetched ${feedItems.length} items from RSS feeds`)

    // Limit to 5 articles per run (Vercel Hobby plan)
    const MAX_PER_RUN = 5
    let count = 0

    for (const item of feedItems) {
      if (count >= MAX_PER_RUN) break
      if (!item.link || !item.title) { skipped++; continue }

      // Check for duplicate
      const { data: existing } = await supabase
        .from('rss_items')
        .select('id')
        .eq('source_url', item.link)
        .maybeSingle()

      if (existing) { skipped++; continue }

      try {
        // AI rewrite via Groq
        const rewritten = await rewriteArticle(
          item.title,
          item.content || item.contentSnippet || '',
          item.sourceName
        )

        const category = detectCategory(rewritten.title + ' ' + (rewritten.excerpt || ''), item.sourceName)
        const slug = generateSlug(rewritten.title)
        const readingTime = estimateReadingTime(rewritten.content)

        // Ensure slug uniqueness
        const { data: slugCheck } = await supabase
          .from('news')
          .select('id')
          .eq('slug', slug)
          .maybeSingle()

        const finalSlug = slugCheck ? `${slug}-${Date.now()}` : slug

        // Insert article
        const { data: newsRow, error: newsError } = await supabase
          .from('news')
          .insert({
            slug: finalSlug,
            title: rewritten.title,
            original_title: item.title,
            content: rewritten.content,
            excerpt: rewritten.excerpt,
            category,
            tags: rewritten.tags || [],
            image_url: item.enclosure?.url || null,
            image_alt: rewritten.title,
            source_url: item.link,
            source_name: item.sourceName,
            published_at: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
            is_published: true,
            view_count: 0,
            reading_time: readingTime,
          })
          .select('id')
          .single()

        if (newsError) {
          console.error(`[fetch-news] Insert error for "${item.title}":`, newsError.message)
          errors++
          continue
        }

        // Mark source URL as processed
        await supabase.from('rss_items').insert({
          source_url: item.link,
          news_id: newsRow?.id || null,
        })

        processed++
        count++
        console.log(`[fetch-news] ✅ Published: "${rewritten.title}"`)

        // Rate limit between articles
        if (count < MAX_PER_RUN) {
          await new Promise(r => setTimeout(r, 1500))
        }
      } catch (err) {
        console.error(`[fetch-news] Error processing "${item.title}":`, err)
        errors++
        // Mark as attempted to avoid retrying on next run
        try {
          await supabase.from('rss_items').insert({
            source_url: item.link,
            news_id: null,
          })
        } catch {
          // Ignore duplicate key errors
        }
      }
    }

    return NextResponse.json({
      success: true,
      processed,
      skipped,
      errors,
      total_fetched: feedItems.length,
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    console.error('[fetch-news] Fatal error:', err)
    return NextResponse.json(
      { error: 'Internal server error', details: String(err) },
      { status: 500 }
    )
  }
}
