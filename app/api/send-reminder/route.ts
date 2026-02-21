import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { prescriptionId } = await request.json()

    if (!prescriptionId) {
      return NextResponse.json({ error: 'Missing prescriptionId' }, { status: 400 })
    }

    // Fetch prescription with patient and clinic info
    const { data: prescription, error: fetchError } = await supabase
      .from('prescriptions')
      .select('*, patient:patients(*)')
      .eq('id', prescriptionId)
      .eq('clinic_id', user.id)
      .single()

    if (fetchError || !prescription) {
      return NextResponse.json({ error: 'Prescription not found' }, { status: 404 })
    }

    // Fetch clinic info
    const { data: clinic } = await supabase
      .from('clinics')
      .select('*')
      .eq('id', user.id)
      .single()

    // Check free plan limits
    if (clinic?.subscription_status === 'free' && (clinic?.refills_used_this_month || 0) >= 10) {
      return NextResponse.json({ error: 'Monthly reminder limit reached. Upgrade to Pro.' }, { status: 403 })
    }

    const patient = prescription.patient as {
      pet_name: string
      species: string
      owner_name: string
      owner_email: string
    }

    const refillDate = new Date(prescription.refill_date)
    const formattedDate = refillDate.toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
    })

    // Send email via Resend
    const { error: emailError } = await resend.emails.send({
      from: `${clinic?.name || 'VetRefill'} <reminders@vetrefill.com>`,
      to: patient.owner_email,
      subject: `Reminder: ${patient.pet_name}'s ${prescription.medication_name} refill is due soon`,
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

    if (emailError) {
      console.error('Resend error:', emailError)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    // Mark reminder as sent
    await supabase
      .from('prescriptions')
      .update({ reminder_sent: true })
      .eq('id', prescriptionId)

    // Increment usage counter for free plans
    if (clinic?.subscription_status === 'free') {
      await supabase
        .from('clinics')
        .update({ refills_used_this_month: (clinic.refills_used_this_month || 0) + 1 })
        .eq('id', user.id)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Send reminder error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
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
  <title>Prescription Refill Reminder</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f9fafb;">
  <div style="max-width: 600px; margin: 40px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #16a34a, #15803d); padding: 32px 40px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 700;">🐾 Prescription Refill Reminder</h1>
      <p style="color: #bbf7d0; margin: 8px 0 0; font-size: 14px;">${clinicName}</p>
    </div>

    <!-- Body -->
    <div style="padding: 40px;">
      <p style="color: #374151; font-size: 16px; margin: 0 0 24px;">Hi ${ownerName},</p>

      <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
        This is a friendly reminder that <strong>${petName}</strong>'s prescription is due for a refill soon.
      </p>

      <!-- Prescription Details -->
      <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 20px; margin: 0 0 24px;">
        <h2 style="color: #166534; font-size: 16px; margin: 0 0 16px; font-weight: 600;">Prescription Details</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="color: #6b7280; font-size: 14px; padding: 4px 0; width: 40%;">Pet</td>
            <td style="color: #111827; font-size: 14px; font-weight: 500; padding: 4px 0;">${petName}</td>
          </tr>
          <tr>
            <td style="color: #6b7280; font-size: 14px; padding: 4px 0;">Medication</td>
            <td style="color: #111827; font-size: 14px; font-weight: 500; padding: 4px 0;">${medicationName}</td>
          </tr>
          <tr>
            <td style="color: #6b7280; font-size: 14px; padding: 4px 0;">Dosage</td>
            <td style="color: #111827; font-size: 14px; font-weight: 500; padding: 4px 0;">${dosage}</td>
          </tr>
          <tr>
            <td style="color: #6b7280; font-size: 14px; padding: 4px 0;">Frequency</td>
            <td style="color: #111827; font-size: 14px; font-weight: 500; padding: 4px 0;">${frequency}</td>
          </tr>
          <tr>
            <td style="color: #6b7280; font-size: 14px; padding: 4px 0;">Refill Due</td>
            <td style="color: #dc2626; font-size: 14px; font-weight: 600; padding: 4px 0;">${refillDate}</td>
          </tr>
        </table>
      </div>

      <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
        Please contact us to arrange a refill before your pet's medication runs out.
      </p>

      ${clinicPhone ? `
      <div style="text-align: center; margin: 0 0 24px;">
        <a href="tel:${clinicPhone}" style="display: inline-block; background: #16a34a; color: white; text-decoration: none; padding: 12px 32px; border-radius: 8px; font-weight: 600; font-size: 15px;">
          Call Us: ${clinicPhone}
        </a>
      </div>
      ` : ''}

      <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0;">
        Best regards,<br>
        <strong style="color: #374151;">${clinicName}</strong>
      </p>
    </div>

    <!-- Footer -->
    <div style="background: #f9fafb; border-top: 1px solid #e5e7eb; padding: 20px 40px; text-align: center;">
      <p style="color: #9ca3af; font-size: 12px; margin: 0;">
        This reminder was sent by ${clinicName} using VetRefill.<br>
        If you believe this was sent in error, please contact your veterinary clinic.
      </p>
    </div>
  </div>
</body>
</html>
  `.trim()
}
