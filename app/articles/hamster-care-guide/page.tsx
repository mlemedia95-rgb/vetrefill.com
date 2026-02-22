import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Hamster Care Guide: Nutrition, Health & Common Problems — VetRefill',
  description: 'Everything you need to know about hamster care — proper diet, housing, common illnesses, and signs that your hamster needs a vet.',
}

export default function HamsterCareGuide() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/articles" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 text-sm font-medium mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Articles
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🐹</span>
            <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">Care</span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-4">
            Hamster Care Guide: Nutrition, Health & Common Problems
          </h1>
          <p className="text-gray-500 text-sm">5 min read · Hamsters</p>
        </div>

        <div className="space-y-8 text-gray-700 leading-relaxed">

          <p className="text-xl text-gray-600 leading-relaxed">
            Hamsters may be small, but they have specific care needs that are often underestimated. With the right diet, housing, and health awareness, a hamster can live 2–3 happy years. Here's everything you need to know.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Hamster Nutrition</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">Pellets or Lab Blocks (Base Diet)</h3>
                <p>High-quality hamster pellets or lab blocks should form the foundation of their diet. They provide balanced nutrition and prevent selective eating. Avoid colorful seed mixes — hamsters pick out their favorite (usually fatty) pieces and leave the rest.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">Fresh Foods (Small Amounts Daily)</h3>
                <p>Small portions of fresh vegetables make great supplements: broccoli, cucumber, bell peppers, carrots, spinach. Always introduce new foods slowly and in tiny amounts to avoid digestive upset.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">Protein Sources</h3>
                <p>Hamsters are omnivores and benefit from occasional protein. Plain cooked chicken, mealworms, or plain scrambled egg (tiny amounts) are good protein sources. Once or twice a week is enough.</p>
              </div>
            </div>

            <div className="bg-red-50 rounded-xl p-5 border border-red-100 mt-4">
              <h3 className="font-semibold text-red-800 mb-2">❌ Foods to Avoid</h3>
              <ul className="list-disc pl-5 space-y-1 text-red-700 text-sm">
                <li>Citrus fruits (too acidic)</li>
                <li>Onions, garlic, leeks (toxic)</li>
                <li>Chocolate and candy</li>
                <li>Almonds (contain cyanide)</li>
                <li>Lettuce (iceberg) — causes diarrhea</li>
                <li>Sticky foods like peanut butter — can get stuck in cheek pouches</li>
                <li>Alcohol, caffeine, or salty foods</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Housing Requirements</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Cage size:</strong> Minimum 80cm x 50cm floor space (larger is always better). Many cages sold in pet stores are far too small, causing stress and stereotypical behaviors like bar-chewing.</li>
              <li><strong>Bedding depth:</strong> At least 20–30cm of deep bedding (paper-based or aspen shavings) for burrowing. Burrowing is a critical behavioral need for hamsters.</li>
              <li><strong>Wheel:</strong> Essential. Minimum 25–28cm diameter (larger for Syrian hamsters) so the back remains straight while running. Silent spinner wheels are best.</li>
              <li><strong>Temperature:</strong> Keep between 18–24°C (65–75°F). Hamsters can enter torpor (false hibernation) in cold temperatures below 15°C, which can be mistaken for death.</li>
              <li><strong>No wire floors:</strong> Can catch feet and cause injury. Solid or deep bedding only.</li>
              <li><strong>Syrian hamsters:</strong> Must be housed alone — they are territorial and will fight to the death if housed together after 8–10 weeks of age.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Health Problems</h2>
            <div className="space-y-4">
              {[
                { name: 'Wet Tail (Proliferative Ileitis)', desc: 'The most serious hamster illness. Caused by Lawsonia intracellularis bacteria, often triggered by stress. Signs: very wet, matted fur around the tail, diarrhea, lethargy, hunched posture. Rapidly fatal — see a vet within hours of noticing symptoms. Most common in Syrian hamsters under 6 weeks old.' },
                { name: 'Respiratory Infections', desc: 'Symptoms include wheezing, clicking sounds, discharge from nose and eyes, and lethargy. Caused by bacteria or viruses. Can be caught from humans (wash hands before handling). Requires antibiotic treatment.' },
                { name: 'Cheek Pouch Problems', desc: 'Hamsters store food in cheek pouches. Sticky or sharp foods can cause the pouch to become impacted, infected, or everted (turned inside out). Affected hamster may paw at face and have visible pouch hanging out. Requires vet attention.' },
                { name: 'Dental Problems', desc: 'Overgrown or misaligned teeth make eating painful. Signs include weight loss, drooling, and difficulty eating. Provide wooden chew toys to maintain teeth. Vet may need to trim overgrown teeth.' },
                { name: 'Diabetes', desc: 'Very common in Campbell\'s dwarf hamsters. Signs: excessive thirst and urination, weight loss, lethargy. Managed with diet — reduce sugary foods and emphasize pellets and low-sugar vegetables.' },
                { name: 'Tumors', desc: 'Common in hamsters over 1.5 years old. Can appear as lumps anywhere on the body. Not all are malignant. Consult a vet — some can be surgically removed.' },
              ].map(({ name, desc }) => (
                <div key={name} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-1">{name}</h3>
                  <p className="text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Signs Your Hamster Needs a Vet</h2>
            <div className="bg-red-50 rounded-xl p-5 border border-red-200">
              <ul className="list-disc pl-6 space-y-1.5 text-red-700">
                <li>Wet fur around the tail and diarrhea (wet tail — emergency)</li>
                <li>Not eating or drinking for more than 24 hours</li>
                <li>Labored or noisy breathing</li>
                <li>Any visible lumps or swellings</li>
                <li>Blood in urine or droppings</li>
                <li>Loss of balance, circling, or head tilt (inner ear problem)</li>
                <li>Significant weight loss</li>
                <li>Unresponsive or cold to the touch (check for torpor vs. illness)</li>
              </ul>
            </div>
          </section>

          <section className="bg-green-50 rounded-xl p-6 border border-green-100">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Managing Your Hamster's Treatment</h2>
            <p className="text-gray-700">Hamsters on antibiotic or other treatments need consistent dosing schedules. VetRefill helps veterinary clinics automatically remind pet owners when medications need refilling.</p>
            <Link href="/signup" className="inline-block mt-4 bg-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors">
              Try VetRefill Free
            </Link>
          </section>

        </div>
      </div>
    </div>
  )
}
