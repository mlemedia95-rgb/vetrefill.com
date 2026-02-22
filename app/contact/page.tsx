'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('https://formspree.io/f/xpwzqqge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <p className="text-5xl mb-4">✉️</p>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-3">Contact Us</h1>
        <p className="text-gray-600">Have a question, story tip, or feedback? We&apos;d love to hear from you!</p>
      </div>

      {status === 'success' ? (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
          <p className="text-4xl mb-3">✅</p>
          <h2 className="text-xl font-bold text-green-800 mb-2">Message Sent!</h2>
          <p className="text-green-700">Thank you for reaching out. We&apos;ll get back to you as soon as possible.</p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">Name *</label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Your name"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">Email *</label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-1.5">Subject *</label>
            <select
              id="subject"
              required
              value={formData.subject}
              onChange={e => setFormData(prev => ({ ...prev, subject: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm text-gray-700 bg-white"
            >
              <option value="">Select a subject...</option>
              <option value="General Question">General Question</option>
              <option value="Story Tip">Story Tip / News Submission</option>
              <option value="Error Report">Error / Correction Report</option>
              <option value="Advertising">Advertising Enquiry</option>
              <option value="Partnership">Partnership / Collaboration</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1.5">Message *</label>
            <textarea
              id="message"
              required
              rows={6}
              value={formData.message}
              onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
              placeholder="Tell us how we can help..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm resize-none"
            />
          </div>

          {status === 'error' && (
            <p className="text-red-600 text-sm bg-red-50 px-4 py-3 rounded-lg">
              Something went wrong. Please try again or email us at{' '}
              <a href="mailto:dreaminvestmentcompany1@gmail.com" className="underline">
                dreaminvestmentcompany1@gmail.com
              </a>
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold py-4 rounded-xl transition-colors text-lg"
          >
            {status === 'sending' ? 'Sending...' : 'Send Message →'}
          </button>

          <p className="text-xs text-gray-400 text-center">
            Or email us directly at{' '}
            <a href="mailto:dreaminvestmentcompany1@gmail.com" className="text-orange-500 hover:underline">
              dreaminvestmentcompany1@gmail.com
            </a>
          </p>
        </form>
      )}
    </div>
  )
}
