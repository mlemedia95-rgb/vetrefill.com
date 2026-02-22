import type { Category } from '@/lib/types'

export interface RssSource {
  url: string
  name: string
  defaultCategory: Category
  enabled: boolean
}

export const RSS_SOURCES: RssSource[] = [
  {
    url: 'https://feeds.bbci.co.uk/news/science_and_environment/rss.xml',
    name: 'BBC Science & Environment',
    defaultCategory: 'wildlife',
    enabled: true,
  },
  {
    url: 'https://www.thedodo.com/rss',
    name: 'The Dodo',
    defaultCategory: 'general',
    enabled: true,
  },
  {
    url: 'https://www.petmd.com/rss.xml',
    name: 'PetMD',
    defaultCategory: 'dogs',
    enabled: true,
  },
  {
    url: 'https://www.akc.org/rss/',
    name: 'American Kennel Club',
    defaultCategory: 'dogs',
    enabled: true,
  },
  {
    url: 'https://iheartcats.com/feed/',
    name: 'iHeartCats',
    defaultCategory: 'cats',
    enabled: true,
  },
  {
    url: 'https://www.birdwatchingdaily.com/feed/',
    name: 'Bird Watching Daily',
    defaultCategory: 'birds',
    enabled: true,
  },
  {
    url: 'https://www.catster.com/feed/',
    name: 'Catster',
    defaultCategory: 'cats',
    enabled: true,
  },
  {
    url: 'https://www.dogster.com/feed/',
    name: 'Dogster',
    defaultCategory: 'dogs',
    enabled: true,
  },
]
