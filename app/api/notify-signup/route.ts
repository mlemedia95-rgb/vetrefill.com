import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { clinicName, email } = await request.json()

    if (!clinicName || !email) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    await resend.emails.send({
      from: 'VetRefill <reminders@vetrefill.com>',
      to: 'dreaminvestmentcompany1@gmail.com',
      subject: '🎉 New clinic signed up: ' + clinicName,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f9fafb;">
  <div style="max-width: 600px; margin: 40px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(135deg, #16a34a, #15803d); padding: 32px 40px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 700;">🎉 New Signup!</h1>
      <p style="color: #bbf7d0; margin: 8px 0 0; font-size: 14px;">VetRefill Admin Notification</p>
    </div>
    <div style="padding: 40px;">
      <p style="color: #374151; font-size: 16px; margin: 0 0 24px;">A new clinic just signed up on VetRefill!</p>
      <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 20px; margin: 0 0 24px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="color: #6b7280; font-size: 14px; padding: 6px 0; width: 40%;">Clinic Name</td>
            <td style="color: #111827; font-size: 14px; font-weight: 600;">${clinicName}</td>
          </tr>
          <tr>
            <td style="color: #6b7280; font-size: 14px; padding: 6px 0;">Email</td>
            <td style="color: #111827; font-size: 14px; font-weight: 600;">${email}</td>
          </tr>
          <tr>
            <td style="color: #6b7280; font-size: 14px; padding: 6px 0;">Signed Up At</td>
            <td style="color: #111827; font-size: 14px; font-weight: 600;">${new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' })}</td>
          </tr>
        </table>
      </div>
    </div>
    <div style="background: #f9fafb; border-top: 1px solid #e5e7eb; padding: 20px 40px; text-align: center;">
      <p style="color: #9ca3af; font-size: 12px; margin: 0;">VetRefill Admin Notification</p>
    </div>
  </div>
</body>
</html>
      `.trim(),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Notify signup error:', err)
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 })
  }
}
