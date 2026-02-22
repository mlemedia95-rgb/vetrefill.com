import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Bird Health Tips: Keeping Your Pet Bird Healthy — VetRefill',
  description: 'Learn how to keep your pet bird healthy with proper diet, housing, signs of illness, and when to visit an avian vet.',
}

export default function BirdHealthTips() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/articles" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 text-sm font-medium mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Articles
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🦜</span>
            <span className="bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">Health</span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-4">
            Bird Health Tips: Keeping Your Feathered Friend Happy & Healthy
          </h1>
          <p className="text-gray-500 text-sm">6 min read · Birds</p>
        </div>

        <div className="space-y-8 text-gray-700 leading-relaxed">

          <p className="text-xl text-gray-600 leading-relaxed">
            Pet birds — from budgies and cockatiels to parrots and canaries — can live for decades with proper care. But birds are masters at hiding illness, and by the time symptoms are obvious, they may already be seriously unwell. This guide helps you give your bird the best life possible.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Bird Nutrition: What to Feed</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">Pellets (60–70% of diet)</h3>
                <p>High-quality formulated pellets should form the majority of your bird's diet. They are nutritionally complete and avoid the selective eating problem seen with seed mixes. Choose a reputable brand appropriate for your bird's species and size.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">Fresh Vegetables & Fruits (20–30%)</h3>
                <p>Dark leafy greens (kale, spinach, chard), carrots, bell peppers, broccoli, and berries are excellent. Offer a variety daily. Remove uneaten fresh food after a few hours to prevent spoilage.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">Seeds (10% — treats only)</h3>
                <p>Seeds are high in fat and nutritionally incomplete. They should not be the primary food source. Use as enrichment or training treats only.</p>
              </div>
            </div>

            <div className="bg-red-50 rounded-xl p-5 border border-red-100 mt-4">
              <h3 className="font-semibold text-red-800 mb-2">❌ Foods Toxic to Birds</h3>
              <ul className="list-disc pl-5 space-y-1 text-red-700 text-sm">
                <li><strong>Avocado:</strong> Highly toxic, can cause heart failure and death</li>
                <li><strong>Chocolate & caffeine:</strong> Toxic to birds</li>
                <li><strong>Onions & garlic:</strong> Cause digestive and blood problems</li>
                <li><strong>Apple seeds & fruit pits:</strong> Contain cyanide</li>
                <li><strong>Alcohol & soda:</strong> Never</li>
                <li><strong>Salt:</strong> Even small amounts can be dangerous</li>
                <li><strong>Mushrooms:</strong> Can cause digestive failure</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Housing & Environment</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Cage size:</strong> Bigger is always better. Your bird should be able to fully spread its wings and move freely. Horizontal space is more important than height for most species.</li>
              <li><strong>Bar spacing:</strong> Must be appropriate for the species — too wide can trap heads or feet.</li>
              <li><strong>Temperature:</strong> Keep between 18–29°C (65–85°F). Avoid drafts and sudden temperature changes.</li>
              <li><strong>Ventilation:</strong> Good air quality is critical. Birds have highly sensitive respiratory systems. Never use non-stick (Teflon/PTFE) cookware near birds — fumes are instantly fatal.</li>
              <li><strong>Toxic fumes:</strong> Scented candles, air fresheners, cleaning products, and cigarette smoke can kill birds. Always use bird-safe products.</li>
              <li><strong>Light:</strong> Birds need natural light cycles. 10–12 hours of light, 10–12 hours of darkness. Cover the cage at night.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Signs Your Bird May Be Sick</h2>
            <p>Birds hide illness instinctively. Watch for these warning signs:</p>
            <div className="space-y-3 mt-4">
              {[
                { sign: 'Fluffed feathers', detail: 'A bird sitting fluffed up for extended periods is trying to conserve heat — a sign of illness or cold.' },
                { sign: 'Sitting on the cage floor', detail: 'Healthy birds perch. A bird on the floor is often very unwell.' },
                { sign: 'Changes in droppings', detail: 'Color, consistency, or frequency changes can indicate infection, dietary problems, or organ disease.' },
                { sign: 'Loss of appetite', detail: 'Birds have fast metabolisms and need to eat frequently. A bird not eating for more than 24 hours is an emergency.' },
                { sign: 'Labored or open-mouth breathing', detail: 'Always an emergency. Indicates respiratory infection or other serious illness.' },
                { sign: 'Nasal discharge or sneezing', detail: 'Occasional sneezing is normal, but persistent discharge suggests respiratory infection.' },
                { sign: 'Feather destruction or bald patches', detail: 'Can indicate parasites, nutritional deficiency, or psychological stress (feather-plucking).' },
              ].map(({ sign, detail }) => (
                <div key={sign} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{sign}</h3>
                  <p className="text-sm">{detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Bird Diseases</h2>
            <div className="space-y-4">
              {[
                { name: 'Psittacosis (Parrot Fever)', desc: 'Bacterial infection caused by Chlamydia psittaci. Can spread to humans. Signs: lethargy, discharge from eyes/nose, diarrhea, difficulty breathing. Requires antibiotic treatment.' },
                { name: 'Aspergillosis', desc: 'Fungal infection of the respiratory system. Caused by poor ventilation, moldy food, or damp bedding. Chronic and difficult to treat. Prevention through good hygiene is key.' },
                { name: 'Proventricular Dilatation Disease (PDD)', desc: 'Viral disease affecting the digestive system. Causes weight loss despite normal eating. No cure; managed with supportive care.' },
                { name: 'Feather Destructive Behavior', desc: 'Birds may pluck or destroy feathers due to stress, boredom, skin conditions, or underlying illness. Requires both medical evaluation and behavioral intervention.' },
              ].map(({ name, desc }) => (
                <div key={name} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-1">{name}</h3>
                  <p className="text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Find an Avian Vet</h2>
            <p>Not all veterinarians have avian training. Birds require a vet experienced with exotic animals. Find a certified avian vet before an emergency arises — not during one. Annual health checks are recommended for all pet birds.</p>
          </section>

          <section className="bg-green-50 rounded-xl p-6 border border-green-100">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Track Your Bird's Medications</h2>
            <p className="text-gray-700">Birds on antifungal treatment, antibiotics, or other medications need consistent care. VetRefill helps veterinary clinics automatically remind pet owners when refills are due.</p>
            <Link href="/signup" className="inline-block mt-4 bg-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors">
              Try VetRefill Free
            </Link>
          </section>

        </div>
      </div>
    </div>
  )
}
