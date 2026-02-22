import Link from 'next/link'
import { PawPrint } from 'lucide-react'

const CATEGORIES = [
  { href: '/categories/dogs', label: '🐕 Dogs' },
  { href: '/categories/cats', label: '🐈 Cats' },
  { href: '/categories/wildlife', label: '🦁 Wildlife' },
  { href: '/categories/birds', label: '🐦 Birds' },
  { href: '/categories/exotic', label: '🦎 Exotic' },
  { href: '/categories/general', label: '🐾 General' },
]

const QUICK_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/news', label: 'Latest News' },
  { href: '/quiz', label: '🎯 Animal Quiz' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
]

const LEGAL_LINKS = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
]

const RSS_SOURCES = [
  'BBC Science & Environment',
  'National Geographic',
  'The Dodo',
  'PetMD',
  'American Kennel Club',
  'iHeartCats',
  'Bird Watching Daily',
  'Dogster / Catster',
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Column 1: Logo + About */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center shadow-sm">
                <PawPrint className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-extrabold text-white">Vet</span>
                <span className="text-xl font-extrabold text-orange-400">Refill</span>
                <span className="text-xs text-gray-500 block leading-none -mt-0.5">Animal News</span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Your daily dose of animal news, wildlife stories, and pet care tips.
              Stay informed about the animal kingdom — from your backyard to the wild.
            </p>
            <div className="flex gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on X (Twitter)"
                className="w-8 h-8 bg-gray-800 hover:bg-orange-500 rounded-lg flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="w-8 h-8 bg-gray-800 hover:bg-orange-500 rounded-lg flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Categories */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Categories</h3>
            <ul className="space-y-2">
              {CATEGORIES.map(cat => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    className="text-sm text-gray-400 hover:text-orange-400 transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-orange-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mt-6 mb-4">Legal</h3>
            <ul className="space-y-2">
              {LEGAL_LINKS.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-orange-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: News Sources */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">News Sources</h3>
            <p className="text-xs text-gray-500 mb-3">Content sourced and editorially adapted from:</p>
            <ul className="space-y-1.5">
              {RSS_SOURCES.map(source => (
                <li key={source} className="flex items-center gap-1.5 text-xs text-gray-400">
                  <span className="w-1 h-1 bg-orange-500 rounded-full flex-shrink-0"></span>
                  {source}
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-600 mt-4 leading-relaxed">
              All articles are editorially rewritten. Original reporting credited to respective sources.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">
            © {currentYear} VetRefill Animal News. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            For entertainment & informational purposes. Always consult a licensed veterinarian for pet health advice.
          </p>
        </div>
      </div>
    </footer>
  )
}
