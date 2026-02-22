import type { Category } from '@/lib/types'
import { CATEGORY_COLORS, CATEGORY_EMOJIS, CATEGORY_LABELS } from '@/lib/types'

interface CategoryBadgeProps {
  category: Category
  size?: 'sm' | 'md'
}

export default function CategoryBadge({ category, size = 'md' }: CategoryBadgeProps) {
  const colors = CATEGORY_COLORS[category]
  const emoji = CATEGORY_EMOJIS[category]
  const label = CATEGORY_LABELS[category]
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs px-2.5 py-1'

  return (
    <span className={`inline-flex items-center gap-1 font-semibold rounded-full border ${colors.bg} ${colors.text} ${colors.border} ${sizeClass}`}>
      <span>{emoji}</span>
      {label}
    </span>
  )
}
