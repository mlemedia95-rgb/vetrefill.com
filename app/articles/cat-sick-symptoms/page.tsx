import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Is My Cat Sick? Warning Signs to Watch For — VetRefill',
  description: 'Cats hide illness well. Learn the warning signs that your cat may be sick and when to seek emergency veterinary care.',
}

export default function CatSickSymptoms() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/articles" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 text-sm font-medium mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Articles
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🐈</span>
            <span className="bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">Health</span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-4">
            Is My Cat Sick? Warning Signs Every Cat Owner Must Know
          </h1>
          <p className="text-gray-500 text-sm">7 min read · Cats</p>
        </div>

        <div className="space-y-8 text-gray-700 leading-relaxed">

          <p className="text-xl text-gray-600 leading-relaxed">
            Cats are masters at hiding pain and illness — an instinct inherited from their wild ancestors. By the time obvious symptoms appear, a cat may already be seriously unwell. Learning to spot subtle changes early can save your cat's life.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Cats Hide Illness</h2>
            <p>In the wild, showing weakness makes an animal a target for predators. Domestic cats retain this instinct, masking signs of pain and discomfort. This means cat owners must be observant of even subtle behavioral and physical changes.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Early Warning Signs of Illness</h2>
            <div className="space-y-4">
              {[
                {
                  sign: 'Changes in eating or drinking habits',
                  detail: 'Eating significantly less or more than usual, or sudden increase in water intake (a common sign of diabetes or kidney disease) are red flags. A cat that stops eating for more than 24–48 hours needs veterinary attention.',
                },
                {
                  sign: 'Lethargy or decreased activity',
                  detail: 'All cats sleep a lot, but if your normally active cat suddenly sleeps all day, hides, or shows no interest in play or interaction, something may be wrong.',
                },
                {
                  sign: 'Changes in litter box habits',
                  detail: 'Urinating more or less than usual, straining to urinate, blood in urine, or avoiding the litter box are serious signs. A male cat straining to urinate is a medical emergency — can be fatal within hours.',
                },
                {
                  sign: 'Weight loss or gain',
                  detail: 'Unexplained weight changes, especially rapid weight loss, can indicate hyperthyroidism, diabetes, cancer, or kidney disease in cats.',
                },
                {
                  sign: 'Changes in coat quality',
                  detail: 'A healthy cat grooms regularly. A dull, matted, or unkempt coat suggests the cat is feeling unwell or is in pain (often from arthritis making grooming difficult).',
                },
                {
                  sign: 'Vomiting or diarrhea',
                  detail: 'Occasional hairballs are normal. But frequent vomiting (more than once or twice a week), vomiting blood, or persistent diarrhea require a vet visit.',
                },
                {
                  sign: 'Breathing changes',
                  detail: 'Cats should breathe quietly and effortlessly. Open-mouth breathing, wheezing, rapid breathing, or labored breathing is always an emergency.',
                },
                {
                  sign: 'Behavioral changes',
                  detail: 'Increased aggression, hiding, excessive vocalization (especially at night in seniors), or sudden clinginess can all indicate pain or illness.',
                },
              ].map(({ sign, detail }) => (
                <div key={sign} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-1">{sign}</h3>
                  <p className="text-sm">{detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Emergency Signs: Go to the Vet Immediately</h2>
            <div className="bg-red-50 rounded-xl p-5 border border-red-200">
              <p className="font-semibold text-red-800 mb-3">Do not wait — seek emergency care if your cat shows:</p>
              <ul className="list-disc pl-6 space-y-1.5 text-red-700">
                <li>Difficulty breathing or open-mouth breathing</li>
                <li>Male cat straining or crying in the litter box (urinary blockage)</li>
                <li>Collapse or inability to walk/stand</li>
                <li>Seizures</li>
                <li>Suspected poisoning</li>
                <li>Pale, white, blue, or yellow gums</li>
                <li>Sudden paralysis of back legs (aortic thromboembolism — a cardiac emergency)</li>
                <li>Severe trauma or injury</li>
                <li>Not eating for more than 48 hours (hepatic lipidosis risk)</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Illnesses in Cats</h2>
            <div className="space-y-4">
              {[
                { name: 'Chronic Kidney Disease (CKD)', desc: 'Very common in older cats. Signs include increased thirst and urination, weight loss, vomiting, and lethargy. Manageable with diet and medication but not curable.' },
                { name: 'Hyperthyroidism', desc: 'Overactive thyroid gland, mostly in cats over 10 years. Signs: weight loss despite good appetite, hyperactivity, vomiting. Treatable with medication, radioactive iodine, or surgery.' },
                { name: 'Diabetes', desc: 'Increasing in cats, often linked to obesity and high-carb diets. Signs: excessive thirst, urination, weight loss. Managed with insulin injections and diet changes.' },
                { name: 'Upper Respiratory Infections', desc: 'Cat "colds" — sneezing, runny eyes, nasal discharge. Usually viral (herpesvirus, calicivirus). Most resolve on their own but can be serious in kittens or immunocompromised cats.' },
                { name: 'Dental Disease', desc: 'Over 70% of cats have dental disease by age 3. Bad breath, drooling, pawing at mouth, and reduced appetite are signs. Regular dental cleanings under anesthesia are recommended.' },
              ].map(({ name, desc }) => (
                <div key={name} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-1">{name}</h3>
                  <p className="text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What to Do If You Think Your Cat Is Sick</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Observe and note symptoms, when they started, and how severe they are</li>
              <li>Check your cat's gums — they should be pink and moist</li>
              <li>Check if your cat is eating, drinking, and using the litter box</li>
              <li>Call your veterinarian — describe symptoms clearly</li>
              <li>For emergency signs, go to the nearest emergency animal hospital immediately</li>
            </ol>
          </section>

          <section className="bg-green-50 rounded-xl p-6 border border-green-100">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Stay on Top of Your Cat's Medications</h2>
            <p className="text-gray-700">Cats with chronic conditions need consistent medication. VetRefill helps veterinary clinics automatically remind pet owners when prescriptions are due for refill — keeping sick cats on track.</p>
            <Link href="/signup" className="inline-block mt-4 bg-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors">
              Try VetRefill Free
            </Link>
          </section>

        </div>
      </div>
    </div>
  )
}
