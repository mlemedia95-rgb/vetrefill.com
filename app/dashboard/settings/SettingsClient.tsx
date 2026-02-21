'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Clinic } from '@/lib/types'

const supabase = createClient()
import { Save, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

interface SettingsClientProps {
  clinic: Clinic | null
  userId: string
}

export default function SettingsClient({ clinic, userId }: SettingsClientProps) {
  const [formData, setFormData] = useState({
    name: clinic?.name || '',
    phone: clinic?.phone || '',
    address: clinic?.address || '',
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    const { error: updateError } = await supabase
      .from('clinics')
      .update(formData)
      .eq('id', userId)

    setSaving(false)

    if (updateError) {
      setError('Failed to save changes. Please try again.')
      return
    }

    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your clinic profile</p>
      </div>

      {/* Clinic Profile */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Clinic Profile</h2>
          <p className="text-sm text-gray-500 mt-0.5">Update your clinic information</p>
        </div>
        <form onSubmit={handleSave} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Clinic name</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
            <input
              type="email"
              value={clinic?.email || ''}
              disabled
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-500 bg-gray-50 cursor-not-allowed"
            />
            <p className="text-xs text-gray-400 mt-1">Email cannot be changed. Contact support for assistance.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
              placeholder="+1 (555) 000-0000"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Clinic address</label>
            <textarea
              value={formData.address}
              onChange={e => setFormData(p => ({ ...p, address: e.target.value }))}
              placeholder="123 Main St, City, State 12345"
              rows={2}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          {saved && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              Changes saved successfully!
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors disabled:opacity-60"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : 'Save changes'}
          </button>
        </form>
      </div>

      {/* Account */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Account</h2>
        </div>
        <div className="p-6 space-y-3">
          <div className="flex items-center justify-between py-2">
            <div>
              <div className="text-sm font-medium text-gray-900">Account created</div>
              <div className="text-xs text-gray-500">
                {clinic?.created_at ? new Date(clinic.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'N/A'}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between py-2 border-t border-gray-50">
            <div>
              <div className="text-sm font-medium text-red-600">Delete account</div>
              <div className="text-xs text-gray-500">Permanently delete your clinic and all data</div>
            </div>
            <button className="text-xs text-red-600 hover:text-red-700 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
