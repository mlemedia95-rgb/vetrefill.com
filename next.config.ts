import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.bbci.co.uk' },
      { protocol: 'https', hostname: '**.bbc.co.uk' },
      { protocol: 'https', hostname: '**.nationalgeographic.com' },
      { protocol: 'https', hostname: '**.thedodo.com' },
      { protocol: 'https', hostname: '**.petmd.com' },
      { protocol: 'https', hostname: '**.akc.org' },
      { protocol: 'https', hostname: '**.iheartcats.com' },
      { protocol: 'https', hostname: '**.birdwatchingdaily.com' },
      { protocol: 'https', hostname: '**.pawmygosh.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: '**.wordpress.com' },
      { protocol: 'https', hostname: '**.wp.com' },
      { protocol: 'https', hostname: '**.imgur.com' },
      { protocol: 'https', hostname: '**.cloudfront.net' },
      { protocol: 'https', hostname: '**.redd.it' },
    ],
  },
}

export default nextConfig
