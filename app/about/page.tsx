import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about VetRefill Animal News — your trusted source for animal stories, wildlife news, and pet care tips.',
}

const RSS_SOURCES = [
  { name: 'BBC Science & Environment', desc: 'World-class science and wildlife reporting' },
  { name: 'National Geographic', desc: 'Iconic wildlife photography and storytelling' },
  { name: 'The Dodo', desc: 'Heartwarming animal rescue and adoption stories' },
  { name: 'PetMD', desc: 'Veterinary-backed pet health and care information' },
  { name: 'American Kennel Club', desc: 'Expert dog breed information and care guides' },
  { name: 'iHeartCats', desc: 'Cat care, adoption, and heartwarming feline stories' },
  { name: 'Bird Watching Daily', desc: 'Birding news, tips, and species spotlights' },
  { name: 'Dogster / Catster', desc: 'Expert pet lifestyle guides and stories' },
]

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <p className="text-6xl mb-4">🐾</p>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">About VetRefill Animal News</h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
          Your daily destination for animal stories, wildlife discoveries, and pet care insights from across the globe.
        </p>
      </div>

      {/* Mission */}
      <section className="bg-orange-50 rounded-2xl p-8 mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          At VetRefill Animal News, we believe the animal kingdom deserves more attention. From heartwarming rescue stories to groundbreaking wildlife research, we curate and editorially adapt the most compelling animal content from trusted sources worldwide.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Our automated news system monitors reputable animal and nature publications, selecting the most relevant and interesting stories. Each article is editorially rewritten to provide fresh perspective while maintaining accuracy and always attributing original sources.
        </p>
      </section>

      {/* What We Cover */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">What We Cover</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { emoji: '🐕', cat: 'Dogs', desc: 'Breeds, training, health, and dog stories', slug: 'dogs' },
            { emoji: '🐈', cat: 'Cats', desc: 'Cat care, behavior, breeds, and feline news', slug: 'cats' },
            { emoji: '🦁', cat: 'Wildlife', desc: 'Conservation, research, and wild animal discoveries', slug: 'wildlife' },
            { emoji: '🐦', cat: 'Birds', desc: 'Birding, species spotlights, and avian science', slug: 'birds' },
            { emoji: '🦎', cat: 'Exotic', desc: 'Reptiles, amphibians, and unusual animal stories', slug: 'exotic' },
            { emoji: '📰', cat: 'General', desc: 'Animal news that spans multiple categories', slug: 'general' },
          ].map(({ emoji, cat, desc, slug }) => (
            <Link
              key={cat}
              href={`/categories/${slug}`}
              className="bg-white rounded-xl p-4 border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all group"
            >
              <div className="text-3xl mb-2">{emoji}</div>
              <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{cat}</h3>
              <p className="text-xs text-gray-500 mt-1">{desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* News Sources */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Our News Sources</h2>
        <p className="text-gray-600 mb-6">
          We source content from these reputable publications. All original reporting is credited and linked with every article.
        </p>
        <div className="space-y-3">
          {RSS_SOURCES.map((source) => (
            <div key={source.name} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100">
              <span className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-2"></span>
              <div>
                <h3 className="font-semibold text-gray-900">{source.name}</h3>
                <p className="text-sm text-gray-500">{source.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial Policy */}
      <section className="bg-gray-50 rounded-2xl p-8 mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Editorial Policy</h2>
        <div className="space-y-3 text-gray-700 leading-relaxed">
          <p>
            <strong>Original Attribution:</strong> Every article includes a clear attribution to the original source with a nofollow link. We respect the work of original journalists and publishers.
          </p>
          <p>
            <strong>Editorial Adaptation:</strong> Our content is not a direct copy. Each story is rewritten to provide additional context, clarity, and a fresh editorial perspective.
          </p>
          <p>
            <strong>Accuracy:</strong> We strive to maintain factual accuracy. If you spot an error, please{' '}
            <Link href="/contact" className="text-orange-600 hover:underline">contact us</Link>.
          </p>
          <p>
            <strong>No Medical Advice:</strong> Content on this site is for informational and entertainment purposes only. Always consult a licensed veterinarian for pet health decisions.
          </p>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/news" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-xl transition-colors">
          Read Latest News
        </Link>
        <Link href="/quiz" className="inline-block bg-white border-2 border-orange-500 text-orange-600 font-bold px-8 py-3 rounded-xl hover:bg-orange-50 transition-colors">
          Take the Quiz 🎯
        </Link>
        <Link href="/contact" className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-8 py-3 rounded-xl transition-colors">
          Contact Us ✉️
        </Link>
      </div>
    </div>
  )
}
