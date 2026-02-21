import { createClient } from '@/lib/supabase/server'
import { Users, ClipboardList, Bell, TrendingUp, ArrowRight, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch stats
  const [
    { count: totalPatients },
    { count: activePrescriptions },
    { data: upcomingRefills },
    { data: clinic },
  ] = await Promise.all([
    supabase.from('patients').select('*', { count: 'exact', head: true }).eq('clinic_id', user!.id),
    supabase.from('prescriptions').select('*', { count: 'exact', head: true }).eq('clinic_id', user!.id).eq('status', 'active'),
    supabase
      .from('prescriptions')
      .select('*, patient:patients(*)')
      .eq('clinic_id', user!.id)
      .eq('status', 'active')
      .gte('refill_date', new Date().toISOString().split('T')[0])
      .lte('refill_date', new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
      .order('refill_date', { ascending: true })
      .limit(10),
    supabase.from('clinics').select('*').eq('id', user!.id).single(),
  ])

  // Count due today
  const today = new Date().toISOString().split('T')[0]
  const dueToday = upcomingRefills?.filter(p => p.refill_date === today).length || 0
  const dueSoon = upcomingRefills?.filter(p => p.refill_date !== today).length || 0

  const stats = [
    {
      label: 'Total Patients',
      value: totalPatients || 0,
      icon: Users,
      colorBg: 'bg-blue-50',
      colorIcon: 'text-blue-600',
      colorValue: 'text-blue-700',
      href: '/dashboard/patients',
    },
    {
      label: 'Active Prescriptions',
      value: activePrescriptions || 0,
      icon: ClipboardList,
      colorBg: 'bg-green-50',
      colorIcon: 'text-green-600',
      colorValue: 'text-green-700',
      href: '/dashboard/prescriptions',
    },
    {
      label: 'Due Today',
      value: dueToday,
      icon: Bell,
      colorBg: 'bg-yellow-50',
      colorIcon: 'text-yellow-600',
      colorValue: 'text-yellow-700',
      href: '/dashboard/prescriptions',
    },
    {
      label: 'Due This Week',
      value: dueSoon,
      icon: TrendingUp,
      colorBg: 'bg-purple-50',
      colorIcon: 'text-purple-600',
      colorValue: 'text-purple-700',
      href: '/dashboard/prescriptions',
    },
  ]

  const isFreePlan = clinic?.subscription_status === 'free'
  const refillsUsed = clinic?.refills_used_this_month || 0

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Overview of your clinic&apos;s prescription activity</p>
      </div>

      {/* Free plan warning */}
      {isFreePlan && refillsUsed >= 8 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
          <div className="flex-1 text-sm text-yellow-800">
            You&apos;ve used <strong>{refillsUsed}/10</strong> refill reminders this month.{' '}
            <Link href="/dashboard/settings" className="underline font-medium">Upgrade to Pro</Link> for unlimited reminders.
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, colorBg, colorIcon, colorValue, href }) => (
          <Link
            key={label}
            href={href}
            className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-shadow group"
          >
            <div className={`w-10 h-10 ${colorBg} rounded-lg flex items-center justify-center mb-3`}>
              <Icon className={`w-5 h-5 ${colorIcon}`} />
            </div>
            <div className={`text-3xl font-bold ${colorValue} mb-1`}>{value}</div>
            <div className="text-sm text-gray-500 flex items-center gap-1">
              {label}
              <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>
        ))}
      </div>

      {/* Upcoming Refills */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Upcoming Refills (7 days)</h2>
          <Link href="/dashboard/prescriptions" className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {!upcomingRefills || upcomingRefills.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <ClipboardList className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-gray-900 font-medium mb-1">No refills due this week</h3>
            <p className="text-sm text-gray-500">
              All caught up! Add prescriptions to start tracking refills.
            </p>
            <Link
              href="/dashboard/prescriptions"
              className="inline-flex items-center gap-2 mt-4 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
            >
              Add prescription
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {upcomingRefills.map((prescription) => {
              const refillDate = new Date(prescription.refill_date)
              const today = new Date()
              today.setHours(0, 0, 0, 0)
              const diffDays = Math.ceil((refillDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
              const isOverdue = diffDays < 0
              const isToday = diffDays === 0
              const isSoon = diffDays <= 3

              return (
                <div key={prescription.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-sm font-semibold text-gray-600">
                      {(prescription.patient as { pet_name: string })?.pet_name?.charAt(0)?.toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">
                        {(prescription.patient as { pet_name: string })?.pet_name} — {prescription.medication_name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {prescription.dosage} · {prescription.frequency}
                        {prescription.patient && ` · ${(prescription.patient as { owner_name: string }).owner_name}`}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        isOverdue ? 'bg-red-100 text-red-700' :
                        isToday ? 'bg-orange-100 text-orange-700' :
                        isSoon ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {isOverdue ? `${Math.abs(diffDays)}d overdue` :
                         isToday ? 'Due today' :
                         `Due in ${diffDays}d`}
                      </div>
                    </div>
                    {prescription.reminder_sent && (
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Bell className="w-3 h-3" /> Sent
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="grid md:grid-cols-2 gap-4">
        <Link
          href="/dashboard/patients"
          className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow flex items-center gap-4 group"
        >
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Manage Patients</div>
            <div className="text-sm text-gray-500">Add, view, and search patients</div>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-300 ml-auto group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
        </Link>
        <Link
          href="/dashboard/prescriptions"
          className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow flex items-center gap-4 group"
        >
          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
            <ClipboardList className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <div className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">Manage Prescriptions</div>
            <div className="text-sm text-gray-500">Create and track prescriptions</div>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-300 ml-auto group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
        </Link>
      </div>
    </div>
  )
}
