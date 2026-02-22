import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Complete Dog Health Guide — VetRefill',
  description: 'Everything you need to know about keeping your dog healthy — vaccinations, common illnesses, preventive care and when to visit the vet.',
}

export default function DogHealthGuide() {
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
            Complete Dog Health Guide: What Every Owner Should Know
          </h1>
          <p className="text-gray-500 text-sm">8 min read · Dogs</p>
        </div>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

          <p className="text-xl text-gray-600 leading-relaxed">
            Dogs are loyal companions, but keeping them healthy requires consistent attention and care. This guide covers the essential health information every dog owner needs — from routine checkups to recognizing early signs of illness.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Vaccination Schedule</h2>
            <p>Vaccinations are the cornerstone of preventive dog health care. Core vaccines that all dogs should receive include:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong>Distemper, Parvovirus, Adenovirus (DAP/DHPPi):</strong> Given at 6–8 weeks, 10–12 weeks, 14–16 weeks, then every 1–3 years.</li>
              <li><strong>Rabies:</strong> First dose at 12–16 weeks, booster at 1 year, then every 1–3 years depending on local laws.</li>
              <li><strong>Bordetella (Kennel Cough):</strong> Recommended if your dog frequents dog parks, boarding facilities, or groomers.</li>
              <li><strong>Leptospirosis:</strong> Recommended for dogs with outdoor exposure or contact with wildlife.</li>
            </ul>
            <p className="mt-3">Always keep a vaccination record and schedule annual vet visits to stay up to date.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Regular Preventive Care</h2>
            <p>Prevention is far better — and cheaper — than treatment. Key preventive measures include:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong>Annual wellness exams:</strong> Your vet can catch problems early before they become serious.</li>
              <li><strong>Dental hygiene:</strong> Brush your dog's teeth 2–3 times per week. Dental disease affects over 80% of dogs by age 3.</li>
              <li><strong>Flea, tick & heartworm prevention:</strong> Use monthly preventatives year-round. Heartworm disease is fatal if untreated.</li>
              <li><strong>Deworming:</strong> Puppies should be dewormed every 2 weeks until 12 weeks of age, then regularly thereafter.</li>
              <li><strong>Weight management:</strong> Nearly 60% of dogs are overweight. Excess weight leads to joint problems, diabetes, and shorter lifespan.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Health Problems in Dogs</h2>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Ear Infections</h3>
                <p>Very common, especially in floppy-eared breeds. Signs include head shaking, scratching at ears, odor, and redness. Caused by bacteria, yeast, or mites. Requires veterinary diagnosis and medication.</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Skin Allergies</h3>
                <p>Dogs can be allergic to food, pollen, dust mites, or flea saliva. Symptoms include excessive itching, licking paws, red skin, and hot spots. Your vet may recommend allergy testing, dietary changes, or medication.</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Arthritis & Joint Problems</h3>
                <p>Common in older dogs and large breeds. Signs are stiffness, limping, reluctance to climb stairs, and decreased activity. Management includes weight control, anti-inflammatory medication, joint supplements, and gentle exercise.</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Gastrointestinal Issues</h3>
                <p>Vomiting and diarrhea are common but can indicate anything from dietary indiscretion to serious illness. A single episode is usually not alarming. Repeated episodes, blood in stool, or lethargy require immediate vet attention.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">When to Go to the Vet Immediately</h2>
            <p>Some symptoms require emergency veterinary care without delay:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Difficulty breathing or rapid breathing</li>
              <li>Bloated or distended abdomen (especially in large breeds — can be fatal GDV)</li>
              <li>Collapse or inability to stand</li>
              <li>Seizures lasting more than 2 minutes or repeated seizures</li>
              <li>Suspected poisoning (chocolate, grapes, xylitol, rat poison)</li>
              <li>Severe trauma from a car accident or fall</li>
              <li>Pale, white, blue, or yellow gums</li>
              <li>Eye injuries or sudden vision loss</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Exercise & Mental Health</h2>
            <p>Physical and mental stimulation are essential for a healthy dog. Most dogs need at least 30–60 minutes of exercise daily, though this varies greatly by breed. Under-exercised dogs often develop behavioral problems like destructive chewing, excessive barking, and anxiety.</p>
            <p className="mt-3">Mental enrichment — puzzle feeders, training sessions, new environments — is just as important as physical exercise for overall wellbeing.</p>
          </section>

          <section className="bg-green-50 rounded-xl p-6 border border-green-100">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Keep Track of Your Dog's Medications</h2>
            <p className="text-gray-700">Managing a dog's prescriptions and refill dates can be challenging. VetRefill helps veterinary clinics automate prescription reminders so you never miss a refill — keeping your pet protected year-round.</p>
            <Link href="/signup" className="inline-block mt-4 bg-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors">
              Try VetRefill Free
            </Link>
          </section>

        </div>
      </div>
    </div>
  )
}
