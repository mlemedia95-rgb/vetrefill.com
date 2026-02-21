export interface Clinic {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  subscription_status: 'free' | 'pro'
  paddle_customer_id?: string
  paddle_subscription_id?: string
  refills_used_this_month: number
  refills_reset_at: string
  created_at: string
}

export interface Patient {
  id: string
  clinic_id: string
  pet_name: string
  species: string
  owner_name: string
  owner_email: string
  owner_phone?: string
  created_at: string
}

export interface Prescription {
  id: string
  clinic_id: string
  patient_id: string
  medication_name: string
  dosage: string
  frequency: string
  refill_date: string
  status: 'active' | 'refilled' | 'expired'
  reminder_sent: boolean
  notes?: string
  created_at: string
  patient?: Patient
}

export interface DashboardStats {
  total_patients: number
  pending_refills: number
  sent_today: number
  active_prescriptions: number
}
