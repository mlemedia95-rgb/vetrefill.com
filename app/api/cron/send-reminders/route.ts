import { NextRequest, NextResponse } from 'next/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// This route is meant to be called by a cron job (e.g., Vercel Cron, GitHub Actions)
// It sends reminders for prescriptions due in exactly 3 days
export async function GET(request: NextRequest) {
  // Verify the request is from the cron job
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // Get prescriptions due in 3 days that haven't had reminders sent
  const targetDate = new Date()
  targetDate.setDate(targetDate.getDate() + 3)
  const targetDateStr = targetDate.toISOString().split('T')[0]

  const { data: prescriptions, error } = await supabase
    .from('prescriptions')
    .select('*, patient:patients(*), clinic:clinics(*)')
    .eq('refill_date', targetDateStr)
    .eq('status', 'active')
    .eq('reminder_sent', false)

  if (error) {
    console.error('Cron error fetching prescriptions:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }

  let sent = 0
  let failed = 0

  for (const prescription of prescriptions || []) {
    const clinic = prescription.clinic as {
      id: string
      name: string
      email: string
      phone?: string
      subscription_status: string
      refills_used_this_month: number
    }
    const patient = prescription.patient as {
      pet_name: string
      species: string
      owner_name: string
      owner_email: string
    }

    // Check free plan limits
    if (clinic?.subscription_status === 'free' && (clinic?.refills_used_this_month || 0) >= 10) {
      continue
    }

    const refillDate = new Date(prescription.refill_date)
    const formattedDate = refillDate.toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
    })

    try {
      const { error: emailError } = await resend.emails.send({
        from: `${clinic?.name || 'VetRefill'} <reminders@vetrefill.com>`,
        to: patient.owner_email,
        subject: `Reminder: ${patient.pet_name}'s ${prescription.medication_name} refill is due in 3 days`,
        html: generateReminderEmail({
          petName: patient.pet_name,
          ownerName: patient.owner_name,
          medicationName: prescription.medication_name,
          dosage: prescription.dosage,
          frequency: prescription.frequency,
          refillDate: formattedDate,
          clinicName: clinic?.name || 'Your Veterinary Clinic',
          clinicPhone: clinic?.phone,
        }),
      })

      if (!emailError) {
        // Mark as sent
        await supabase
          .from('prescriptions')
          .update({ reminder_sent: true })
          .eq('id', prescription.id)

        // Increment counter for free plans
        if (clinic?.subscription_status === 'free') {
          await supabase
            .from('clinics')
            .update({ refills_used_this_month: (clinic.refills_used_this_month || 0) + 1 })
            .eq('id', clinic.id)
        }
        sent++
      } else {
        failed++
      }
    } catch {
      failed++
    }
  }

  return NextResponse.json({
    success: true,
    processed: prescriptions?.length || 0,
    sent,
    failed,
    date: targetDateStr,
  })
}

function generateReminderEmail({
  petName,
  ownerName,
  medicationName,
  dosage,
  frequency,
  refillDate,
  clinicName,
  clinicPhone,
}: {
  petName: string
  ownerName: string
  medicationName: string
  dosage: string
  frequency: string
  refillDate: string
  clinicName: string
  clinicPhone?: string
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f9fafb;">
  <div style="max-width: 600px; margin: 40px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(135deg, #16a34a, #15803d); padding: 32px 40px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 700;">🐾 Prescription Refill Reminder</h1>
      <p style="color: #bbf7d0; margin: 8px 0 0; font-size: 14px;">${clinicName}</p>
    </div>
    <div style="padding: 40px;">
      <p style="color: #374151; font-size: 16px; margin: 0 0 24px;">Hi ${ownerName},</p>
      <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
        <strong>${petName}</strong>'s prescription refill is due in <strong>3 days</strong>. Please contact us soon to avoid a gap in medication.
      </p>
      <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 20px; margin: 0 0 24px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="color: #6b7280; font-size: 14px; padding: 4px 0; width: 40%;">Pet</td><td style="color: #111827; font-size: 14px; font-weight: 500;">${petName}</td></tr>
          <tr><td style="color: #6b7280; font-size: 14px; padding: 4px 0;">Medication</td><td style="color: #111827; font-size: 14px; font-weight: 500;">${medicationName}</td></tr>
          <tr><td style="color: #6b7280; font-size: 14px; padding: 4px 0;">Dosage</td><td style="color: #111827; font-size: 14px; font-weight: 500;">${dosage}</td></tr>
          <tr><td style="color: #6b7280; font-size: 14px; padding: 4px 0;">Frequency</td><td style="color: #111827; font-size: 14px; font-weight: 500;">${frequency}</td></tr>
          <tr><td style="color: #6b7280; font-size: 14px; padding: 4px 0;">Refill Due</td><td style="color: #dc2626; font-size: 14px; font-weight: 600;">${refillDate}</td></tr>
        </table>
      </div>
      ${clinicPhone ? `<div style="text-align: center; margin: 0 0 24px;"><a href="tel:${clinicPhone}" style="display: inline-block; background: #16a34a; color: white; text-decoration: none; padding: 12px 32px; border-radius: 8px; font-weight: 600;">Call Us: ${clinicPhone}</a></div>` : ''}
      <p style="color: #6b7280; font-size: 14px;">Best regards,<br><strong style="color: #374151;">${clinicName}</strong></p>
    </div>
    <div style="background: #f9fafb; border-top: 1px solid #e5e7eb; padding: 20px 40px; text-align: center;">
      <p style="color: #9ca3af; font-size: 12px; margin: 0;">Sent by ${clinicName} via VetRefill</p>
    </div>
  </div>
</body>
</html>
  `.trim()
}
