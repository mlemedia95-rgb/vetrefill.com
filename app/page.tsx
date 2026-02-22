import Link from 'next/link'
import {
  Bell,
  Users,
  ClipboardList,
  CheckCircle,
  Shield,
  Clock,
  ArrowRight,
  Star,
  Pill,
  Mail
} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <Pill className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">VetRefill</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-green-600 transition-colors text-sm font-medium">Features</a>
              <a href="#testimonials" className="text-gray-600 hover:text-green-600 transition-colors text-sm font-medium">Reviews</a>
              <Link href="/articles" className="text-gray-600 hover:text-green-600 transition-colors text-sm font-medium">Articles</Link>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-gray-600 hover:text-green-600 transition-colors text-sm font-medium px-4 py-2">
                Log in
              </Link>
              <Link href="/signup" className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                Get started free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-50 to-white pt-20 pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Star className="w-4 h-4 fill-current" />
            Trusted by 500+ veterinary clinics
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Never Miss a Pet{' '}
            <span className="text-green-600">Prescription Refill</span>{' '}
            Again
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            VetRefill automates prescription reminders for your veterinary clinic.
            Keep pets healthy and owners happy with timely refill notifications — no manual tracking needed.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup" className="bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-700 transition-all shadow-lg shadow-green-200 flex items-center gap-2">
              Start free — no credit card
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="#features" className="text-gray-700 px-8 py-4 rounded-xl text-lg font-medium hover:bg-gray-100 transition-colors border border-gray-200">
              See how it works
            </a>
          </div>
          <p className="text-sm text-gray-500 mt-4">100% free — no credit card required</p>
        </div>

        {/* Dashboard Preview */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-100 px-6 py-4 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span className="text-xs text-gray-400 ml-3">vetrefill.com/dashboard</span>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                  <div className="text-2xl font-bold text-green-700">247</div>
                  <div className="text-sm text-green-600">Total Patients</div>
                </div>
                <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
                  <div className="text-2xl font-bold text-yellow-700">12</div>
                  <div className="text-sm text-yellow-600">Pending Refills</div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <div className="text-2xl font-bold text-blue-700">8</div>
                  <div className="text-sm text-blue-600">Reminders Sent Today</div>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { pet: 'Max (Golden Retriever)', med: 'Rimadyl 75mg', date: 'Due in 3 days', status: 'reminder_sent' },
                  { pet: 'Luna (Cat)', med: 'Methimazole 5mg', date: 'Due in 5 days', status: 'active' },
                  { pet: 'Buddy (Labrador)', med: 'Apoquel 16mg', date: 'Due tomorrow', status: 'urgent' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{item.pet}</div>
                      <div className="text-xs text-gray-500">{item.med}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500">{item.date}</span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        item.status === 'reminder_sent' ? 'bg-green-100 text-green-700' :
                        item.status === 'urgent' ? 'bg-red-100 text-red-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {item.status === 'reminder_sent' ? 'Reminder sent' :
                         item.status === 'urgent' ? 'Urgent' : 'Active'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Everything your clinic needs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From patient management to automated reminders, VetRefill handles the administrative work so you can focus on patient care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Bell,
                title: 'Automated Email Reminders',
                desc: 'Automatically send refill reminders to pet owners 3 days before their prescription runs out. Set it and forget it.',
                colorBg: 'bg-green-100',
                colorText: 'text-green-600',
              },
              {
                icon: Users,
                title: 'Patient Management',
                desc: 'Keep complete records of all your patients — pet details, owner contacts, and full prescription history in one place.',
                colorBg: 'bg-blue-100',
                colorText: 'text-blue-600',
              },
              {
                icon: ClipboardList,
                title: 'Prescription Tracking',
                desc: 'Track every prescription with medication names, dosages, frequencies, and refill dates. Never lose track of a script.',
                colorBg: 'bg-purple-100',
                colorText: 'text-purple-600',
              },
              {
                icon: CheckCircle,
                title: 'One-Click Refill Status',
                desc: 'Mark prescriptions as refilled with a single click. Keep your records up to date effortlessly.',
                colorBg: 'bg-emerald-100',
                colorText: 'text-emerald-600',
              },
              {
                icon: Shield,
                title: 'Secure & Reliable',
                desc: 'Built with veterinary data security in mind. All data is encrypted and access-controlled per clinic.',
                colorBg: 'bg-red-100',
                colorText: 'text-red-600',
              },
              {
                icon: Clock,
                title: 'Real-Time Dashboard',
                desc: 'See your pending refills, recent activity, and key metrics at a glance. Stay on top of your clinic\'s needs.',
                colorBg: 'bg-orange-100',
                colorText: 'text-orange-600',
              },
            ].map(({ icon: Icon, title, desc, colorBg, colorText }) => (
              <div key={title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colorBg}`}>
                  <Icon className={`w-6 h-6 ${colorText}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">How VetRefill works</h2>
            <p className="text-xl text-gray-600">Up and running in minutes</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Add your patients', desc: 'Import or manually add your patients with their pet details and owner contact information.' },
              { step: '02', title: 'Create prescriptions', desc: 'Enter prescription details including medication, dosage, frequency, and the refill date.' },
              { step: '03', title: 'Relax — we handle the rest', desc: 'VetRefill automatically emails pet owners 3 days before their prescription runs out.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Loved by veterinary professionals</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "VetRefill has completely eliminated missed refills at our clinic. Pet owners love the timely reminders and we've seen a 40% improvement in medication compliance.",
                author: "Dr. Sarah Mitchell",
                role: "Head Veterinarian, Paws & Care Animal Hospital",
              },
              {
                quote: "Setup took less than 10 minutes and the automated emails look professional. Our front desk spends zero time on manual refill follow-ups now.",
                author: "James Chen",
                role: "Clinic Manager, CityVet Medical Center",
              },
              {
                quote: "The dashboard gives me an instant view of everything happening at our clinic. I can see upcoming refills and act proactively rather than reactively.",
                author: "Dr. Rebecca Torres",
                role: "Owner, Sunshine Veterinary Practice",
              },
            ].map(({ quote, author, role }) => (
              <div key={author} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed italic">&ldquo;{quote}&rdquo;</p>
                <div>
                  <div className="font-semibold text-gray-900">{author}</div>
                  <div className="text-sm text-gray-500">{role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">100% Free — No Credit Card Required</h2>
          <p className="text-xl text-gray-600 mb-10">VetRefill is completely free to use. All features are included at no cost.</p>
          <div className="bg-white rounded-2xl p-8 border-2 border-green-200 shadow-sm max-w-lg mx-auto">
            <div className="mb-6">
              <span className="text-5xl font-extrabold text-gray-900">$0</span>
              <span className="text-gray-500 ml-1">/month</span>
            </div>
            <ul className="space-y-3 mb-8 text-left">
              {[
                'Unlimited refill reminders',
                'Unlimited patients',
                'Automated email notifications',
                'Dashboard & reporting',
                'Prescription tracking',
                'Priority support',
              ].map(feature => (
                <li key={feature} className="flex items-center gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link href="/signup" className="block w-full text-center bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors">
              Get started for free
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-green-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Ready to transform your clinic&apos;s refill management?
          </h2>
          <p className="text-xl text-green-200 mb-10">
            Join hundreds of veterinary clinics saving time and improving patient outcomes with VetRefill.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup" className="bg-white text-green-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-50 transition-all flex items-center gap-2 shadow-lg">
              Get started for free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="mailto:hello@vetrefill.com" className="text-green-200 px-8 py-4 rounded-xl text-lg font-medium hover:text-white transition-colors flex items-center gap-2 border border-green-500">
              <Mail className="w-5 h-5" />
              Contact sales
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <Pill className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-lg">VetRefill</span>
            </div>
            <div className="flex items-center gap-8 text-sm">
              <Link href="/articles" className="hover:text-white transition-colors">Articles</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <a href="mailto:hello@vetrefill.com" className="hover:text-white transition-colors">Contact</a>
            </div>
            <p className="text-sm">© 2024 VetRefill. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
