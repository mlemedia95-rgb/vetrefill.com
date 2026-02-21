import { Clinic } from '@/lib/types'

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
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
          <span className="text-green-700 text-sm font-semibold">
            {clinic?.name?.charAt(0)?.toUpperCase() || 'C'}
          </span>
        </div>
      </div>
    </header>
  )
}
