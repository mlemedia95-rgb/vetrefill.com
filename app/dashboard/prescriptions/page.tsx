import { createClient } from '@/lib/supabase/server'
import PrescriptionsClient from './PrescriptionsClient'

export default async function PrescriptionsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [{ data: prescriptions }, { data: patients }, { data: clinic }] = await Promise.all([
    supabase
      .from('prescriptions')
      .select('*, patient:patients(*)')
      .eq('clinic_id', user!.id)
      .order('refill_date', { ascending: true }),
    supabase
      .from('patients')
      .select('id, pet_name, species, owner_name')
      .eq('clinic_id', user!.id)
      .order('pet_name', { ascending: true }),
    supabase.from('clinics').select('subscription_status, refills_used_this_month').eq('id', user!.id).single(),
  ])

  return (
    <PrescriptionsClient
      initialPrescriptions={prescriptions || []}
      patients={patients || []}
      clinicId={user!.id}
      subscriptionStatus={clinic?.subscription_status || 'free'}
      refillsUsed={clinic?.refills_used_this_month || 0}
    />
  )
}
