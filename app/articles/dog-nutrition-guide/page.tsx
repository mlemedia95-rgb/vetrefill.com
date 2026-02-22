import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Dog Nutrition 101 — VetRefill',
  description: 'Learn what dogs need in their diet, how much to feed them, dangerous foods to avoid, and how nutrition affects long-term health.',
}

export default function DogNutritionGuide() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/articles" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 text-sm font-medium mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Articles
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🐕</span>
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">Nutrition</span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-4">
            Dog Nutrition 101: Feeding Your Dog for a Long, Healthy Life
          </h1>
          <p className="text-gray-500 text-sm">7 min read · Dogs</p>
        </div>

        <div className="space-y-8 text-gray-700 leading-relaxed">

          <p className="text-xl text-gray-600 leading-relaxed">
            What you feed your dog directly affects their energy, coat quality, immune system, and lifespan. With so many pet food options available, it can be overwhelming. Here's a clear, science-backed guide to dog nutrition.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Essential Nutrients Dogs Need</h2>
            <p>A complete and balanced dog diet must include:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong>Protein:</strong> The most important nutrient. Dogs need animal-based proteins (chicken, beef, fish, lamb) for muscle maintenance, immune function, and energy. Look for a named protein source as the first ingredient.</li>
              <li><strong>Fats:</strong> Essential for brain function, coat health, and energy. Omega-3 and omega-6 fatty acids are especially important. Sources include fish oil and chicken fat.</li>
              <li><strong>Carbohydrates:</strong> Not strictly required but provide energy and fiber. Good sources are sweet potatoes, brown rice, and oats. Avoid foods with excessive corn syrup or artificial fillers.</li>
              <li><strong>Vitamins & Minerals:</strong> Calcium and phosphorus for bones, vitamin A for vision, B vitamins for metabolism. A quality commercial food usually covers these.</li>
              <li><strong>Water:</strong> Often overlooked but critical. Dogs should always have access to fresh, clean water.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How Much to Feed Your Dog</h2>
            <p>Feeding amounts depend on age, size, activity level, and metabolism. General guidelines:</p>
            <div className="overflow-x-auto mt-4">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-green-50">
                    <th className="border border-gray-200 px-4 py-2 text-left font-semibold text-gray-900">Dog Size</th>
                    <th className="border border-gray-200 px-4 py-2 text-left font-semibold text-gray-900">Adult Weight</th>
                    <th className="border border-gray-200 px-4 py-2 text-left font-semibold text-gray-900">Daily Food (approx.)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Toy', 'Under 5 kg', '⅓ – ½ cup'],
                    ['Small', '5–10 kg', '½ – 1 cup'],
                    ['Medium', '10–25 kg', '1 – 2 cups'],
                    ['Large', '25–40 kg', '2 – 3 cups'],
                    ['Giant', 'Over 40 kg', '3 – 4+ cups'],
                  ].map(([size, weight, amount]) => (
                    <tr key={size} className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2">{size}</td>
                      <td className="border border-gray-200 px-4 py-2">{weight}</td>
                      <td className="border border-gray-200 px-4 py-2">{amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-gray-500">Always follow the guidelines on your specific food's packaging and adjust based on your dog's body condition. Consult your vet if unsure.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Feeding Frequency by Age</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Puppies (under 6 months):</strong> 3–4 meals per day. Small stomachs need frequent feeding.</li>
              <li><strong>Puppies (6–12 months):</strong> 2–3 meals per day.</li>
              <li><strong>Adult dogs (1–7 years):</strong> 2 meals per day is ideal. Avoid one large meal which can increase bloat risk.</li>
              <li><strong>Senior dogs (7+ years):</strong> 2 smaller meals per day. May need senior-specific formula with lower calories and joint support.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Foods That Are Dangerous for Dogs</h2>
            <div className="bg-red-50 rounded-xl p-5 border border-red-100">
              <p className="font-semibold text-red-800 mb-3">Never feed your dog these foods:</p>
              <ul className="list-disc pl-6 space-y-1.5 text-red-700">
                <li><strong>Chocolate:</strong> Contains theobromine — toxic to dogs, can cause seizures and death</li>
                <li><strong>Grapes & Raisins:</strong> Can cause sudden kidney failure</li>
                <li><strong>Xylitol:</strong> Found in sugar-free gum, peanut butter, baked goods — causes life-threatening blood sugar drop</li>
                <li><strong>Onions & Garlic:</strong> Damage red blood cells, causing anemia</li>
                <li><strong>Macadamia Nuts:</strong> Cause weakness, vomiting, tremors</li>
                <li><strong>Alcohol:</strong> Even small amounts cause liver and brain damage</li>
                <li><strong>Avocado:</strong> Contains persin, which is toxic to dogs</li>
                <li><strong>Cooked Bones:</strong> Splinter and can cause internal injuries</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Dry vs. Wet vs. Raw Food</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-1">Dry Kibble</h3>
                <p>Most convenient and cost-effective. Helps with dental health due to the crunchy texture. Choose a brand with a named protein as the first ingredient and AAFCO certification.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-1">Wet / Canned Food</h3>
                <p>Higher moisture content (good for hydration and kidney health). More palatable for picky eaters and senior dogs. More expensive and must be refrigerated after opening.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-1">Raw Food Diet (BARF)</h3>
                <p>Some owners report improved coat and energy. However, raw diets carry risks of bacterial contamination (Salmonella, E. coli) and nutritional imbalance. Always consult your vet before switching to raw.</p>
              </div>
            </div>
          </section>

          <section className="bg-green-50 rounded-xl p-6 border border-green-100">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Manage Your Dog's Medications Alongside Nutrition</h2>
            <p className="text-gray-700">Good nutrition works best alongside proper medication management. VetRefill helps veterinary clinics send automatic prescription refill reminders to pet owners — ensuring dogs never miss critical medications.</p>
            <Link href="/signup" className="inline-block mt-4 bg-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors">
              Try VetRefill Free
            </Link>
          </section>

        </div>
      </div>
    </div>
  )
}
