'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Prescription, Patient } from '@/lib/types'

const supabase = createClient()
import { Plus, Search, X, Loader2, ClipboardList, CheckCircle, Bell, AlertCircle, Filter } from 'lucide-react'

interface PrescriptionsClientProps {
  initialPrescriptions: Prescription[]
  patients: Pick<Patient, 'id' | 'pet_name' | 'species' | 'owner_name'>[]
  clinicId: string
  subscriptionStatus: string
  refillsUsed: number
}

const FREQUENCY_OPTIONS = [
  'Once daily',
  'Twice daily',
  'Three times daily',
  'Every 8 hours',
  'Every 12 hours',
  'Weekly',
  'As needed',
  'Other',
]

const statusColors: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  refilled: 'bg-blue-100 text-blue-700',
  expired: 'bg-gray-100 text-gray-600',
}

export default function PrescriptionsClient({
  initialPrescriptions,
  patients,
  clinicId,
  subscriptionStatus,
  refillsUsed,
}: PrescriptionsClientProps) {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(initialPrescriptions)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    patient_id: '',
    medication_name: '',
    dosage: '',
    frequency: 'Once daily',
    refill_date: '',
    notes: '',
  })
  const [error, setError] = useState('')

  const filtered = prescriptions.filter(p => {
    const patient = p.patient as Patient | undefined
    const matchesSearch =
      p.medication_name.toLowerCase().includes(search.toLowerCase()) ||
      patient?.pet_name.toLowerCase().includes(search.toLowerCase()) ||
      patient?.owner_name.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getDaysUntilRefill = (refillDate: string) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const refill = new Date(refillDate)
    return Math.ceil((refill.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!formData.patient_id) {
      setError('Please select a patient')
      return
    }

    setLoading(true)

    const { data, error: insertError } = await supabase
      .from('prescriptions')
      .insert({ ...formData, clinic_id: clinicId })
      .select('*, patient:patients(*)')
      .single()

    setLoading(false)

    if (insertError) {
      setError('Failed to create prescription. Please try again.')
      return
    }

    setPrescriptions(prev => [data, ...prev])
    setShowModal(false)
    setFormData({ patient_id: '', medication_name: '', dosage: '', frequency: 'Once daily', refill_date: '', notes: '' })
  }

  const handleMarkRefilled = async (id: string) => {
    setUpdatingId(id)
    const { data } = await supabase
      .from('prescriptions')
      .update({ status: 'refilled' })
      .eq('id', id)
      .select('*, patient:patients(*)')
      .single()

    if (data) {
      setPrescriptions(prev => prev.map(p => p.id === id ? data : p))
    }
    setUpdatingId(null)
  }

  const handleSendReminder = async (id: string) => {
    setUpdatingId(id)
    try {
      const res = await fetch('/api/send-reminder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prescriptionId: id }),
      })
      if (res.ok) {
        setPrescriptions(prev => prev.map(p => p.id === id ? { ...p, reminder_sent: true } : p))
      }
    } catch {
      // handle error
    }
    setUpdatingId(null)
  }

  const canSendReminder = subscriptionStatus === 'pro' || refillsUsed < 10

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Prescriptions</h1>
          <p className="text-gray-500 text-sm mt-1">{prescriptions.length} prescription{prescriptions.length !== 1 ? 's' : ''} total</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New prescription
        </button>
      </div>

      {/* Free plan reminder count */}
      {subscriptionStatus === 'free' && (
        <div className={`rounded-xl px-4 py-3 flex items-center gap-3 ${
          refillsUsed >= 10 ? 'bg-red-50 border border-red-200' : 'bg-blue-50 border border-blue-200'
        }`}>
          <AlertCircle className={`w-5 h-5 flex-shrink-0 ${refillsUsed >= 10 ? 'text-red-600' : 'text-blue-600'}`} />
          <p className={`text-sm ${refillsUsed >= 10 ? 'text-red-800' : 'text-blue-800'}`}>
            <strong>{refillsUsed}/10</strong> reminders used this month.{' '}
            {refillsUsed >= 10 ? (
              <a href="/dashboard/settings" className="underline font-medium">Upgrade to Pro for unlimited reminders.</a>
            ) : (
              `${10 - refillsUsed} remaining on your free plan.`
            )}
          </p>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by patient or medication..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2">
              <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          {['all', 'active', 'refilled', 'expired'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                statusFilter === status
                  ? 'bg-green-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Prescriptions list */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <ClipboardList className="w-8 h-8 text-green-400" />
          </div>
          <h3 className="text-gray-900 font-medium mb-1">
            {search || statusFilter !== 'all' ? 'No prescriptions found' : 'No prescriptions yet'}
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            {search || statusFilter !== 'all'
              ? 'Try adjusting your search or filters.'
              : 'Create your first prescription to start tracking refills.'}
          </p>
          {!search && statusFilter === 'all' && (
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create prescription
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="divide-y divide-gray-50">
            {filtered.map(prescription => {
              const patient = prescription.patient as Patient | undefined
              const daysUntil = getDaysUntilRefill(prescription.refill_date)
              const isOverdue = daysUntil < 0
              const isUrgent = daysUntil >= 0 && daysUntil <= 1
              const isSoon = daysUntil > 1 && daysUntil <= 3

              return (
                <div key={prescription.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-sm font-semibold text-green-700 flex-shrink-0">
                        {patient?.pet_name?.charAt(0)?.toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-gray-900">{prescription.medication_name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[prescription.status]}`}>
                            {prescription.status}
                          </span>
                          {prescription.reminder_sent && (
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Bell className="w-3 h-3" /> Reminder sent
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600 mt-0.5">
                          {patient?.pet_name} ({patient?.species}) — {patient?.owner_name}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {prescription.dosage} · {prescription.frequency}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="text-right">
                        <div className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          prescription.status === 'refilled' ? 'bg-blue-100 text-blue-700' :
                          isOverdue ? 'bg-red-100 text-red-700' :
                          isUrgent ? 'bg-orange-100 text-orange-700' :
                          isSoon ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {prescription.status === 'refilled' ? 'Refilled' :
                           isOverdue ? `${Math.abs(daysUntil)}d overdue` :
                           daysUntil === 0 ? 'Due today' :
                           `${daysUntil}d left`}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {new Date(prescription.refill_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </div>
                      {prescription.status === 'active' && (
                        <div className="flex items-center gap-1.5">
                          {!prescription.reminder_sent && canSendReminder && (
                            <button
                              onClick={() => handleSendReminder(prescription.id)}
                              disabled={updatingId === prescription.id}
                              className="text-xs px-2.5 py-1.5 border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-60 flex items-center gap-1"
                            >
                              {updatingId === prescription.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Bell className="w-3 h-3" />}
                              Remind
                            </button>
                          )}
                          <button
                            onClick={() => handleMarkRefilled(prescription.id)}
                            disabled={updatingId === prescription.id}
                            className="text-xs px-2.5 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-60 flex items-center gap-1"
                          >
                            {updatingId === prescription.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle className="w-3 h-3" />}
                            Mark refilled
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Add Prescription Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white">
              <h2 className="text-lg font-semibold text-gray-900">New prescription</h2>
              <button onClick={() => { setShowModal(false); setError('') }} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Patient *</label>
                <select
                  value={formData.patient_id}
                  onChange={e => setFormData(p => ({ ...p, patient_id: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  required
                >
                  <option value="">Select a patient...</option>
                  {patients.map(patient => (
                    <option key={patient.id} value={patient.id}>
                      {patient.pet_name} ({patient.species}) — {patient.owner_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Medication name *</label>
                <input
                  type="text"
                  value={formData.medication_name}
                  onChange={e => setFormData(p => ({ ...p, medication_name: e.target.value }))}
                  placeholder="e.g. Rimadyl, Apoquel"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Dosage *</label>
                  <input
                    type="text"
                    value={formData.dosage}
                    onChange={e => setFormData(p => ({ ...p, dosage: e.target.value }))}
                    placeholder="e.g. 75mg"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Frequency *</label>
                  <select
                    value={formData.frequency}
                    onChange={e => setFormData(p => ({ ...p, frequency: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  >
                    {FREQUENCY_OPTIONS.map(f => <option key={f}>{f}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Refill date *</label>
                <input
                  type="date"
                  value={formData.refill_date}
                  onChange={e => setFormData(p => ({ ...p, refill_date: e.target.value }))}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes (optional)</label>
                <textarea
                  value={formData.notes}
                  onChange={e => setFormData(p => ({ ...p, notes: e.target.value }))}
                  placeholder="Any special instructions..."
                  rows={2}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
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
                  {loading ? 'Creating...' : 'Create prescription'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
