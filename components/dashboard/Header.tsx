import { Bell, Crown } from 'lucide-react'
import { Clinic } from '@/lib/types'
import Link from 'next/link'

interface HeaderProps {
  clinic: Clinic | null
}

export default function DashboardHeader({ clinic }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      <div>
        <h1 className="text-sm text-gray-500">
          {clinic?.name || 'Your Clinic'}
        </h1>
      </div>
      <div className="flex items-center gap-3">
        {clinic?.subscription_status === 'free' && (
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:opacity-90 transition-opacity"
          >
            <Crown className="w-3.5 h-3.5" />
            Upgrade to Pro
          </Link>
        )}
        {clinic?.subscription_status === 'pro' && (
          <span className="flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
            <Crown className="w-3.5 h-3.5" />
            Pro
          </span>
        )}
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
          <span className="text-green-700 text-sm font-semibold">
            {clinic?.name?.charAt(0)?.toUpperCase() || 'C'}
          </span>
        </div>
      </div>
    </header>
  )
}
