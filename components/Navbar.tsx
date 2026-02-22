'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, PawPrint, ChevronDown } from 'lucide-react'

const CATEGORIES = [
  { href: '/categories/dogs', label: '🐕 Dogs' },
  { href: '/categories/cats', label: '🐈 Cats' },
  { href: '/categories/wildlife', label: '🦁 Wildlife' },
  { href: '/categories/birds', label: '🐦 Birds' },
  { href: '/categories/exotic', label: '🦎 Exotic' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [catOpen, setCatOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center shadow-sm group-hover:bg-orange-600 transition-colors">
              <PawPrint className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-gray-900">Vet</span>
              <span className="text-xl font-extrabold text-orange-500">Refill</span>
              <span className="text-xs text-gray-400 block leading-none -mt-0.5">Animal News</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link href="/" className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/') ? 'text-orange-600 bg-orange-50' : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'}`}>
              Home
            </Link>
            <Link href="/news" className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/news') ? 'text-orange-600 bg-orange-50' : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'}`}>
              Latest News
            </Link>

            {/* Categories dropdown */}
            <div className="relative" onMouseEnter={() => setCatOpen(true)} onMouseLeave={() => setCatOpen(false)}>
              <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors">
                Categories <ChevronDown className="w-4 h-4" />
              </button>
              {catOpen && (
                <div className="absolute top-full left-0 mt-1 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                  {CATEGORIES.map(cat => (
                    <Link key={cat.href} href={cat.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                      {cat.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/quiz" className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/quiz') ? 'text-orange-600 bg-orange-50' : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'}`}>
              🎯 Quiz
            </Link>
            <Link href="/about" className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/about') ? 'text-orange-600 bg-orange-50' : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'}`}>
              About
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
          {[
            { href: '/', label: '🏠 Home' },
            { href: '/news', label: '📰 Latest News' },
            { href: '/quiz', label: '🎯 Quiz' },
            { href: '/about', label: 'ℹ️ About' },
            { href: '/contact', label: '✉️ Contact' },
          ].map(item => (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">
              {item.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-gray-100">
            <p className="text-xs font-semibold text-gray-400 px-3 pb-1">CATEGORIES</p>
            {CATEGORIES.map(cat => (
              <Link key={cat.href} href={cat.href} onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
