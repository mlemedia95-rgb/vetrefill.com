import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'

const articles = [
  {
    slug: 'dog-health-guide',
    title: 'Complete Dog Health Guide: What Every Owner Should Know',
    excerpt: 'Learn the essential health basics for your dog — from vaccination schedules to common illnesses and when to visit the vet.',
    animal: 'Dog',
    emoji: '🐕',
    readTime: '8 min read',
    category: 'Health',
  },
  {
    slug: 'dog-nutrition-guide',
    title: 'Dog Nutrition 101: Feeding Your Dog for a Long, Healthy Life',
    excerpt: 'Discover what dogs really need in their diet, how much to feed them, and which foods are dangerous to avoid.',
    animal: 'Dog',
    emoji: '🐕',
    readTime: '7 min read',
    category: 'Nutrition',
  },
  {
    slug: 'cat-nutrition-tips',
    title: 'Cat Nutrition Tips: How to Feed Your Cat the Right Way',
    excerpt: 'Cats have unique nutritional needs. Find out what to feed your cat, how often, and what ingredients to watch out for.',
    animal: 'Cat',
    emoji: '🐈',
    readTime: '6 min read',
    category: 'Nutrition',
  },
  {
    slug: 'cat-sick-symptoms',
    title: 'Is My Cat Sick? Warning Signs Every Cat Owner Must Know',
    excerpt: 'Cats hide illness well. Learn the subtle signs your cat may be unwell and when to seek emergency veterinary care.',
    animal: 'Cat',
    emoji: '🐈',
    readTime: '7 min read',
    category: 'Health',
  },
  {
    slug: 'rabbit-care-guide',
    title: 'Rabbit Care Guide: Health, Diet & What to Do When They\'re Sick',
    excerpt: 'Rabbits are sensitive animals. This complete guide covers feeding, housing, common health problems, and emergency signs.',
    animal: 'Rabbit',
    emoji: '🐇',
    readTime: '8 min read',
    category: 'Care',
  },
  {
    slug: 'bird-health-tips',
    title: 'Bird Health Tips: Keeping Your Feathered Friend Happy & Healthy',
    excerpt: 'From diet to signs of illness, learn how to keep your pet bird in peak condition and when to call the vet.',
    animal: 'Bird',
    emoji: '🦜',
    readTime: '6 min read',
    category: 'Health',
  },
  {
    slug: 'hamster-care-guide',
    title: 'Hamster Care Guide: Nutrition, Health & Common Problems',
    excerpt: 'Small but sensitive — hamsters need proper care to thrive. This guide covers everything from diet to signs of illness.',
    animal: 'Hamster',
    emoji: '🐹',
    readTime: '5 min read',
    category: 'Care',
  },
  {
    slug: 'senior-dog-care',
    title: 'Senior Dog Care: How to Keep Your Aging Dog Comfortable & Healthy',
    excerpt: 'As dogs age, their needs change significantly. Learn how to adjust their diet, exercise, and vet care for their golden years.',
    animal: 'Dog',
    emoji: '🐕',
    readTime: '9 min read',
    category: 'Health',
  },
]

const categoryColors: Record<string, string> = {
  Health: 'bg-red-100 text-red-700',
  Nutrition: 'bg-green-100 text-green-700',
  Care: 'bg-blue-100 text-blue-700',
}

export const metadata = {
  title: 'Pet Health Articles — VetRefill',
  description: 'Expert articles on pet health, nutrition, and care for dogs, cats, rabbits, birds, hamsters and more.',
}

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Pet Health Articles</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Expert guides on nutrition, health, and care for your beloved pets — written to help you make the best decisions for their wellbeing.
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{article.emoji}</span>
                    <span className="text-sm font-medium text-gray-500">{article.animal}</span>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[article.category]}`}>
                    {article.category}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors leading-snug">
                  {article.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readTime}
                  </div>
                  <span className="text-green-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read more <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
