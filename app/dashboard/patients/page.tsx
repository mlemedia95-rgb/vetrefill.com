import { createClient } from '@/lib/supabase/server'
import PatientsClient from './PatientsClient'

export default async function PatientsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: patients } = await supabase
    .from('patients')
    .select('*')
    .eq('clinic_id', user!.id)
    .order('created_at', { ascending: false })

  return <PatientsClient initialPatients={patients || []} clinicId={user!.id} />
}
