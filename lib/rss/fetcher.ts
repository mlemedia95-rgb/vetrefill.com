import Parser from 'rss-parser'
import { RSS_SOURCES } from './sources'
import type { RssItem } from '@/lib/types'

const parser = new Parser({
  timeout: 8000,
  headers: {
    'User-Agent': 'VetRefill Animal News/1.0 RSS Reader',
    'Accept': 'application/rss+xml, application/xml, text/xml',
  },
})

export interface FeedItem extends RssItem {
  sourceName: string
  sourceUrl: string
  defaultCategory: string
}

export async function fetchAllFeeds(): Promise<FeedItem[]> {
  const allItems: FeedItem[] = []
  const enabledSources = RSS_SOURCES.filter(s => s.enabled)

  const results = await Promise.allSettled(
    enabledSources.map(async (source) => {
      try {
        const feed = await parser.parseURL(source.url)
        return (feed.items || []).slice(0, 5).map(item => ({
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          content: item.content || item['content:encoded'],
          contentSnippet: item.contentSnippet,
          enclosure: item.enclosure as { url: string } | undefined,
          categories: item.categories,
          sourceName: source.name,
          sourceUrl: source.url,
          defaultCategory: source.defaultCategory,
        }))
      } catch (err) {
        console.error(`Failed to fetch RSS from ${source.name}:`, err)
        return []
      }
    })
  )

  for (const result of results) {
    if (result.status === 'fulfilled') {
      allItems.push(...result.value)
    }
  }

  return allItems
}
