'use client'

interface AdBannerProps {
  slot: string
  size?: 'leaderboard' | 'rectangle' | 'responsive'
  className?: string
}

const SIZE_DIMS: Record<string, { w: string; h: string; label: string }> = {
  leaderboard: { w: 'w-full max-w-3xl', h: 'h-24', label: '728×90 — Leaderboard Ad' },
  rectangle:   { w: 'w-full max-w-sm',  h: 'h-64', label: '336×280 — Rectangle Ad' },
  responsive:  { w: 'w-full',           h: 'h-24', label: 'Responsive Ad' },
}

export default function AdBanner({ slot, size = 'responsive', className = '' }: AdBannerProps) {
  const dims = SIZE_DIMS[size]

  if (process.env.NODE_ENV === 'development') {
    return (
      <div className={`${dims.w} ${dims.h} mx-auto flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg text-gray-400 text-xs font-medium ${className}`}>
        📢 {dims.label} (slot: {slot})
      </div>
    )
  }

  // Production: Google AdSense
  return (
    <div className={`${dims.w} mx-auto overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT || ''}
        data-ad-slot={slot}
        data-ad-format={size === 'responsive' ? 'auto' : undefined}
        data-full-width-responsive={size === 'responsive' ? 'true' : undefined}
      />
    </div>
  )
}
