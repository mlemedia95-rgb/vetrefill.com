import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Senior Dog Care: Keeping Your Aging Dog Healthy — VetRefill',
  description: 'As dogs age, their needs change. Learn how to adjust diet, exercise, and veterinary care to keep your senior dog comfortable and healthy.',
}

export default function SeniorDogCare() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/articles" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 text-sm font-medium mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Articles
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🐕</span>
            <span className="bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">Health</span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-4">
            Senior Dog Care: How to Keep Your Aging Dog Comfortable & Healthy
          </h1>
          <p className="text-gray-500 text-sm">9 min read · Dogs</p>
        </div>

        <div className="space-y-8 text-gray-700 leading-relaxed">

          <p className="text-xl text-gray-600 leading-relaxed">
            Dogs age faster than we do, and their needs change significantly in their senior years. With the right care, many dogs remain active and comfortable well into old age. Here's how to give your senior dog the quality of life they deserve.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">When Is a Dog Considered Senior?</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm mt-2">
                <thead>
                  <tr className="bg-green-50">
                    <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Breed Size</th>
                    <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Senior Age Begins</th>
                    <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Average Lifespan</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Small (under 10kg)', '10–12 years', '14–16 years'],
                    ['Medium (10–25kg)', '8–10 years', '12–14 years'],
                    ['Large (25–40kg)', '7–8 years', '10–12 years'],
                    ['Giant (over 40kg)', '5–6 years', '8–10 years'],
                  ].map(([size, senior, lifespan]) => (
                    <tr key={size} className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2">{size}</td>
                      <td className="border border-gray-200 px-4 py-2">{senior}</td>
                      <td className="border border-gray-200 px-4 py-2">{lifespan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Veterinary Care for Senior Dogs</h2>
            <p>Senior dogs should see the vet more frequently than younger dogs:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong>Every 6 months:</strong> Full physical examination for dogs over 7–8 years old</li>
              <li><strong>Annual blood work:</strong> Comprehensive panel to check kidney function, liver, thyroid, blood sugar, and blood cell counts</li>
              <li><strong>Urinalysis:</strong> Detects early kidney disease, diabetes, and infections</li>
              <li><strong>Blood pressure check:</strong> Hypertension becomes more common with age</li>
              <li><strong>Dental cleaning:</strong> Dental disease worsens with age and causes systemic health problems</li>
              <li><strong>Eye and joint evaluation:</strong> Cataracts and arthritis are very common in older dogs</li>
            </ul>
            <p className="mt-3">Early detection of conditions like kidney disease, hypothyroidism, or cancer significantly improves outcomes and quality of life.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Nutrition for Senior Dogs</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">Lower Calories</h3>
                <p>Senior dogs are typically less active and have slower metabolisms. Feeding the same amount as their younger years leads to obesity, which worsens arthritis, heart disease, and diabetes. Switch to a senior formula or reduce portions.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">High-Quality Protein</h3>
                <p>Contrary to old advice, senior dogs do NOT need low protein unless they have specific kidney disease. High-quality protein helps maintain muscle mass, which decreases naturally with age. Look for real meat as the first ingredient.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">Joint Support Supplements</h3>
                <p>Glucosamine and chondroitin support joint health and can reduce arthritis pain. Omega-3 fatty acids (fish oil) have anti-inflammatory effects. Many senior dog foods include these, or they can be added as supplements.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">Digestibility</h3>
                <p>Older dogs often have less efficient digestion. Higher-quality, more digestible ingredients become more important. Wet food may be easier to eat and digest, especially for dogs with dental problems.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Exercise for Senior Dogs</h2>
            <p>Senior dogs still need regular exercise — but it should be adjusted for their abilities:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong>Shorter, more frequent walks:</strong> 2–3 shorter walks rather than one long one reduces joint strain</li>
              <li><strong>Low-impact activities:</strong> Swimming is excellent for dogs with arthritis — provides exercise without joint stress</li>
              <li><strong>Avoid overexertion:</strong> Watch for limping, lagging behind, or reluctance to move — these signal the activity is too intense</li>
              <li><strong>Mental stimulation:</strong> Puzzle toys and gentle training sessions keep minds sharp even when physical activity is limited</li>
              <li><strong>Warm up and cool down:</strong> Older joints need time to warm up before exercise</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Senior Dog Health Problems</h2>
            <div className="space-y-4">
              {[
                { name: 'Arthritis', desc: 'Affects the majority of dogs over 8 years old. Signs: stiffness after rest, reluctance to climb stairs, limping. Managed with anti-inflammatories, pain medication, joint supplements, physiotherapy, and weight management.' },
                { name: 'Cognitive Dysfunction Syndrome (Dog Dementia)', desc: 'Similar to Alzheimer\'s in humans. Signs: confusion, getting lost in familiar places, disturbed sleep, staring at walls, reduced interaction. Medications and enrichment activities can slow progression.' },
                { name: 'Hypothyroidism', desc: 'Underactive thyroid gland causes weight gain, lethargy, hair loss, and skin problems. Very common in middle-aged to senior dogs. Easily managed with daily thyroid medication.' },
                { name: 'Heart Disease', desc: 'Especially common in small breeds. Signs: coughing (especially at night), exercise intolerance, labored breathing, weight loss. Managed with medication — many dogs live comfortably for years with treatment.' },
                { name: 'Kidney Disease', desc: 'Very common in older dogs. Early detection through regular blood tests allows for dietary management that can significantly slow progression. Signs of advanced disease: increased thirst, weight loss, vomiting.' },
                { name: 'Cancer', desc: 'Risk increases significantly with age. Regular vet exams and knowing your dog\'s normal body can help detect lumps early. Many cancers in dogs are treatable if caught early.' },
              ].map(({ name, desc }) => (
                <div key={name} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-1">{name}</h3>
                  <p className="text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Making Your Home Senior-Dog Friendly</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Non-slip rugs on slippery floors to prevent falls</li>
              <li>Ramps or steps to help access furniture or the car</li>
              <li>Raised food and water bowls for dogs with neck/back problems</li>
              <li>Orthopedic dog bed with memory foam for joint support</li>
              <li>Keep food, water, and bed on the same floor to minimize stair use</li>
              <li>Nightlights for dogs with vision problems</li>
            </ul>
          </section>

          <section className="bg-green-50 rounded-xl p-6 border border-green-100">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Senior Dogs Often Need Multiple Medications</h2>
            <p className="text-gray-700">Older dogs frequently require ongoing medications for arthritis, heart disease, thyroid conditions, and more. VetRefill helps veterinary clinics automatically remind owners when prescriptions need refilling — so senior dogs never miss critical medications.</p>
            <Link href="/signup" className="inline-block mt-4 bg-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors">
              Try VetRefill Free
            </Link>
          </section>

        </div>
      </div>
    </div>
  )
}
