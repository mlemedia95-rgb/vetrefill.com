import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Cat Nutrition Tips — VetRefill',
  description: 'Learn what to feed your cat, how often, and which ingredients to avoid. A complete guide to feline nutrition.',
}

export default function CatNutritionTips() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/articles" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 text-sm font-medium mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Articles
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🐈</span>
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">Nutrition</span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-4">
            Cat Nutrition Tips: How to Feed Your Cat the Right Way
          </h1>
          <p className="text-gray-500 text-sm">6 min read · Cats</p>
        </div>

        <div className="space-y-8 text-gray-700 leading-relaxed">

          <p className="text-xl text-gray-600 leading-relaxed">
            Cats are obligate carnivores — meaning they must eat meat to survive. Unlike dogs, they cannot thrive on a vegetarian diet. Understanding feline nutritional needs is essential for keeping your cat healthy and happy.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cats Are Obligate Carnivores</h2>
            <p>Cats have unique dietary requirements that set them apart from other pets:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong>Taurine:</strong> An essential amino acid cats cannot produce themselves. Found only in animal tissue. Deficiency causes blindness and heart disease. Always choose cat food with adequate taurine.</li>
              <li><strong>Arachidonic acid:</strong> A fatty acid cats cannot synthesize — must come from animal fat.</li>
              <li><strong>Vitamin A:</strong> Dogs can convert beta-carotene from plants, but cats cannot. They need pre-formed vitamin A from animal sources.</li>
              <li><strong>High protein:</strong> Cats use protein for energy, unlike dogs and humans who primarily use carbohydrates.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Wet vs. Dry Cat Food</h2>
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                <h3 className="font-semibold text-gray-900 mb-2">🥫 Wet Food (Recommended)</h3>
                <p>Wet food contains 70–80% moisture, which is crucial for cats. Cats naturally have low thirst drive and rarely drink enough water from a bowl. Chronic dehydration leads to kidney disease — one of the leading causes of death in cats. Feeding wet food greatly reduces this risk.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">🥣 Dry Kibble</h3>
                <p>More convenient and better for dental health. However, only 10% moisture. If feeding dry food exclusively, ensure your cat has access to a water fountain (cats prefer moving water). Many vets recommend mixing wet and dry.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How Often Should You Feed Your Cat?</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Kittens (under 6 months):</strong> 3–4 small meals per day. Growing kittens need frequent nutrition.</li>
              <li><strong>Adult cats (1–7 years):</strong> 2 meals per day is standard. Avoid free-feeding dry food as it leads to obesity.</li>
              <li><strong>Senior cats (7+ years):</strong> 2–3 smaller meals. Older cats may have reduced appetite and need more palatable food.</li>
            </ul>
            <p className="mt-3">Measure portions carefully. Obesity in cats leads to diabetes, arthritis, and liver disease.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Foods That Are Toxic to Cats</h2>
            <div className="bg-red-50 rounded-xl p-5 border border-red-100">
              <ul className="list-disc pl-6 space-y-1.5 text-red-700">
                <li><strong>Onions & Garlic:</strong> Destroy red blood cells, causing anemia — even in small amounts</li>
                <li><strong>Chocolate:</strong> Contains theobromine, toxic to cats</li>
                <li><strong>Grapes & Raisins:</strong> Can cause kidney failure</li>
                <li><strong>Xylitol:</strong> Found in sugar-free products — dangerously toxic</li>
                <li><strong>Raw fish (in large amounts):</strong> Contains thiaminase, which destroys vitamin B1</li>
                <li><strong>Alcohol:</strong> Even tiny amounts can be fatal</li>
                <li><strong>Dog food:</strong> Lacks taurine and other feline-specific nutrients — not safe as a regular diet</li>
                <li><strong>Milk & dairy:</strong> Most adult cats are lactose intolerant — causes diarrhea</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Reading Cat Food Labels</h2>
            <p>When choosing cat food, look for:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong>Named protein first:</strong> "Chicken," "Salmon," or "Turkey" — not "meat by-products" or "animal digest"</li>
              <li><strong>AAFCO statement:</strong> Look for "complete and balanced" on the label</li>
              <li><strong>Low carbohydrates:</strong> Cats don't need much. Avoid foods with corn, wheat, or soy as primary ingredients</li>
              <li><strong>No artificial preservatives:</strong> Avoid BHA, BHT, ethoxyquin</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Hydration: The Most Overlooked Cat Health Issue</h2>
            <p>Cats evolved in desert environments and have a naturally low thirst drive. In the wild, they get most of their water from prey. Domestic cats eating dry food are often chronically dehydrated, which stresses the kidneys over time.</p>
            <p className="mt-3">Tips to increase your cat's water intake:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Use a cat water fountain — cats prefer moving water</li>
              <li>Place multiple water bowls in different locations</li>
              <li>Add a splash of low-sodium chicken broth to water</li>
              <li>Feed wet food as at least part of their diet</li>
            </ul>
          </section>

          <section className="bg-green-50 rounded-xl p-6 border border-green-100">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Never Miss Your Cat's Medication Refills</h2>
            <p className="text-gray-700">Cats on prescription diets or medications need consistent care. VetRefill helps veterinary clinics automatically remind pet owners when it's time to refill prescriptions.</p>
            <Link href="/signup" className="inline-block mt-4 bg-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors">
              Try VetRefill Free
            </Link>
          </section>

        </div>
      </div>
    </div>
  )
}
