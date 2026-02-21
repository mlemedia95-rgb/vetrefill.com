'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Patient } from '@/lib/types'

const supabase = createClient()
import { UserPlus, Search, X, Loader2, Dog, Cat, Bird, PawPrint, Phone, Mail, Trash2 } from 'lucide-react'

interface PatientsClientProps {
  initialPatients: Patient[]
  clinicId: string
}

const SPECIES_OPTIONS = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Hamster', 'Guinea Pig', 'Reptile', 'Other']

const SpeciesIcon = ({ species }: { species: string }) => {
  const lower = species.toLowerCase()
  if (lower === 'dog') return <Dog className="w-4 h-4" />
  if (lower === 'cat') return <Cat className="w-4 h-4" />
  if (lower === 'bird') return <Bird className="w-4 h-4" />
  return <PawPrint className="w-4 h-4" />
}

export default function PatientsClient({ initialPatients, clinicId }: PatientsClientProps) {
  const [patients, setPatients] = useState<Patient[]>(initialPatients)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    pet_name: '',
    species: 'Dog',
    owner_name: '',
    owner_email: '',
    owner_phone: '',
  })
  const [error, setError] = useState('')

  const filtered = patients.filter(p =>
    p.pet_name.toLowerCase().includes(search.toLowerCase()) ||
    p.owner_name.toLowerCase().includes(search.toLowerCase()) ||
    p.species.toLowerCase().includes(search.toLowerCase())
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { data, error: insertError } = await supabase
      .from('patients')
      .insert({ ...formData, clinic_id: clinicId })
      .select()
      .single()

    setLoading(false)

    if (insertError) {
      setError('Failed to add patient. Please try again.')
      return
    }

    setPatients(prev => [data, ...prev])
    setShowModal(false)
    setFormData({ pet_name: '', species: 'Dog', owner_name: '', owner_email: '', owner_phone: '' })
  }

  const handleDelete = async (id: string) => {
    await supabase.from('patients').delete().eq('id', id)
    setPatients(prev => prev.filter(p => p.id !== id))
    setDeleteId(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
          <p className="text-gray-500 text-sm mt-1">{patients.length} patient{patients.length !== 1 ? 's' : ''} registered</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          Add patient
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by pet name, owner, or species..."
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2">
            <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {/* Patients List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <PawPrint className="w-8 h-8 text-blue-400" />
          </div>
          <h3 className="text-gray-900 font-medium mb-1">
            {search ? 'No patients found' : 'No patients yet'}
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            {search ? 'Try a different search term.' : 'Add your first patient to get started.'}
          </p>
          {!search && (
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              Add first patient
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="divide-y divide-gray-50">
            {filtered.map(patient => (
              <div key={patient.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center text-gray-600">
                    <SpeciesIcon species={patient.species} />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {patient.pet_name}
                      <span className="ml-2 text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        {patient.species}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mt-0.5">{patient.owner_name}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="hidden md:flex items-center gap-4 text-sm text-gray-500">
                    <a href={`mailto:${patient.owner_email}`} className="flex items-center gap-1.5 hover:text-green-600 transition-colors">
                      <Mail className="w-3.5 h-3.5" />
                      {patient.owner_email}
                    </a>
                    {patient.owner_phone && (
                      <a href={`tel:${patient.owner_phone}`} className="flex items-center gap-1.5 hover:text-green-600 transition-colors">
                        <Phone className="w-3.5 h-3.5" />
                        {patient.owner_phone}
                      </a>
                    )}
                  </div>
                  <button
                    onClick={() => setDeleteId(patient.id)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Patient Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Add new patient</h2>
              <button onClick={() => { setShowModal(false); setError('') }} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Pet name *</label>
                  <input
                    type="text"
                    value={formData.pet_name}
                    onChange={e => setFormData(p => ({ ...p, pet_name: e.target.value }))}
                    placeholder="Max"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Species *</label>
                  <select
                    value={formData.species}
                    onChange={e => setFormData(p => ({ ...p, species: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  >
                    {SPECIES_OPTIONS.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Owner name *</label>
                <input
                  type="text"
                  value={formData.owner_name}
                  onChange={e => setFormData(p => ({ ...p, owner_name: e.target.value }))}
                  placeholder="John Smith"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Owner email *</label>
                <input
                  type="email"
                  value={formData.owner_email}
                  onChange={e => setFormData(p => ({ ...p, owner_email: e.target.value }))}
                  placeholder="john@example.com"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Owner phone</label>
                <input
                  type="tel"
                  value={formData.owner_phone}
                  onChange={e => setFormData(p => ({ ...p, owner_phone: e.target.value }))}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); setError('') }}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-green-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {loading ? 'Adding...' : 'Add patient'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Delete patient?</h2>
            <p className="text-gray-500 text-sm mb-6">
              This will permanently delete the patient and all associated prescriptions. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 bg-red-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
