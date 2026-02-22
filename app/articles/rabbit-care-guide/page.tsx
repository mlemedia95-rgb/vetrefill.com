import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Rabbit Care Guide: Health, Diet & Illness — VetRefill',
  description: 'Complete rabbit care guide covering diet, housing, common health problems and emergency signs every rabbit owner should know.',
}

export default function RabbitCareGuide() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/articles" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 text-sm font-medium mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Articles
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🐇</span>
            <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">Care</span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-4">
            Rabbit Care Guide: Health, Diet & What to Do When They're Sick
          </h1>
          <p className="text-gray-500 text-sm">8 min read · Rabbits</p>
        </div>

        <div className="space-y-8 text-gray-700 leading-relaxed">

          <p className="text-xl text-gray-600 leading-relaxed">
            Rabbits are gentle, intelligent animals but they are also surprisingly fragile. They require specialized care that many new owners don't expect. This guide will help you keep your rabbit healthy and recognize problems early.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Rabbit Nutrition: What to Feed</h2>
            <p>A proper rabbit diet is critical — poor diet causes the majority of health problems in pet rabbits.</p>

            <div className="space-y-4 mt-4">
              <div className="bg-green-50 rounded-xl p-5 border border-green-100">
                <h3 className="font-semibold text-gray-900 mb-2">🌿 Hay (80% of the diet)</h3>
                <p>Unlimited fresh Timothy hay (or orchard grass for adults) must always be available. Hay keeps the digestive system moving and prevents GI stasis — the number one killer of pet rabbits. It also wears down constantly growing teeth.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">🥬 Fresh Leafy Greens (15%)</h3>
                <p>Provide 1–2 cups of leafy greens per day per 2kg of body weight. Good choices: romaine lettuce, bok choy, cilantro, parsley, basil, dill. Introduce new greens slowly to avoid digestive upset.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">🫘 Pellets (5%)</h3>
                <p>High-quality plain timothy pellets — ¼ cup per 2kg of body weight per day for adults. Avoid muesli-style mixes with seeds and dried fruit — rabbits pick out the sugary bits and leave the healthy parts.</p>
              </div>
              <div className="bg-red-50 rounded-xl p-5 border border-red-100">
                <h3 className="font-semibold text-red-800 mb-2">❌ Foods to Avoid</h3>
                <ul className="list-disc pl-5 space-y-1 text-red-700 text-sm">
                  <li>Iceberg lettuce (causes diarrhea)</li>
                  <li>Cabbage, broccoli, cauliflower (causes gas — dangerous for rabbits)</li>
                  <li>Fruits and carrots (high sugar — treats only, small amounts)</li>
                  <li>Chocolate, onions, garlic, avocado (toxic)</li>
                  <li>Processed human food of any kind</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Housing & Environment</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Space:</strong> Rabbits need a minimum enclosure of 3m x 2m, plus daily free-roaming time of at least 3–4 hours. Small hutches sold in pet stores are inadequate.</li>
              <li><strong>Temperature:</strong> Rabbits tolerate cool temperatures well but suffer in heat. Keep them below 26°C (79°F). Heat stroke is a common cause of death in summer.</li>
              <li><strong>Flooring:</strong> Avoid wire-bottom cages — cause painful sore hocks. Use solid flooring with soft bedding (paper bedding or hay).</li>
              <li><strong>Company:</strong> Rabbits are social animals. Consider adopting a bonded pair — single rabbits can suffer from loneliness and depression.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Health Problems in Rabbits</h2>
            <div className="space-y-4">
              {[
                { name: 'GI Stasis', desc: 'The most common and deadly rabbit emergency. The digestive system slows or stops completely. Signs: not eating, no droppings, hunched posture, tooth grinding. Requires immediate emergency vet care — a rabbit can die within 24–48 hours.' },
                { name: 'Dental Disease', desc: 'Rabbit teeth grow continuously. Without enough hay to wear them down, teeth can overgrow and misalign, causing pain and inability to eat. Regular dental checks are essential.' },
                { name: 'Ear Mites', desc: 'Cause intense itching, head shaking, and crusty brown discharge in the ears. Contagious to other rabbits. Treated with medication from a vet.' },
                { name: 'Snuffles (Pasteurella)', desc: 'Bacterial respiratory infection causing runny nose, sneezing, and eye discharge. Chronic condition that can be managed but rarely cured. Stress worsens flare-ups.' },
                { name: 'Uterine Cancer', desc: 'Affects up to 80% of unspayed female rabbits over 4 years old. Spaying is strongly recommended for all female rabbits before 2 years of age.' },
                { name: 'Flystrike', desc: 'Flies lay eggs on soiled fur near the bottom. Maggots can consume tissue rapidly. Fatal within hours. Keep hutches clean and check your rabbit\'s bottom daily.' },
              ].map(({ name, desc }) => (
                <div key={name} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-1">{name}</h3>
                  <p className="text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Emergency Signs — Go to the Vet Immediately</h2>
            <div className="bg-red-50 rounded-xl p-5 border border-red-200">
              <ul className="list-disc pl-6 space-y-1.5 text-red-700">
                <li>Not eating for more than 6–8 hours</li>
                <li>No droppings for more than 4–6 hours</li>
                <li>Hunched posture and teeth grinding</li>
                <li>Labored breathing or tipping head to one side</li>
                <li>Collapse or seizures</li>
                <li>Swollen, hard abdomen</li>
                <li>Maggots visible on the body (flystrike)</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Vaccinations for Rabbits</h2>
            <p>In many countries, rabbits should be vaccinated against:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong>Myxomatosis:</strong> Fatal viral disease spread by insects. Vaccination is annual.</li>
              <li><strong>Rabbit Hemorrhagic Disease (RHDV1 & RHDV2):</strong> Highly contagious and rapidly fatal. Annual or biannual vaccination recommended.</li>
            </ul>
            <p className="mt-3">Check with your local vet which diseases are present in your area and what schedule is recommended.</p>
          </section>

          <section className="bg-green-50 rounded-xl p-6 border border-green-100">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Keep Your Rabbit's Medications on Track</h2>
            <p className="text-gray-700">Rabbits on medication for dental disease, ear mites, or respiratory infections need consistent prescription refills. VetRefill helps clinics send automatic reminders so rabbits never miss a dose.</p>
            <Link href="/signup" className="inline-block mt-4 bg-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors">
              Try VetRefill Free
            </Link>
          </section>

        </div>
      </div>
    </div>
  )
}
