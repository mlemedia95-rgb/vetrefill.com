import { NextRequest, NextResponse } from 'next/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'

// Paddle webhook handler for subscription events
export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('paddle-signature')

  // In production, verify the webhook signature using Paddle's SDK
  // For now, we'll process the event directly
  // TODO: Add signature verification using @paddle/paddle-node-sdk

  let event
  try {
    event = JSON.parse(body)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const supabase = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const clinicId = event.data?.custom_data?.clinic_id

  switch (event.event_type) {
    case 'subscription.activated':
    case 'subscription.updated': {
      if (clinicId) {
        await supabase
          .from('clinics')
          .update({
            subscription_status: 'pro',
            paddle_subscription_id: event.data.id,
            paddle_customer_id: event.data.customer_id,
          })
          .eq('id', clinicId)
      }
      break
    }

    case 'subscription.canceled':
    case 'subscription.paused': {
      if (clinicId) {
        await supabase
          .from('clinics')
          .update({
            subscription_status: 'free',
          })
          .eq('id', clinicId)
      }
      break
    }

    default:
      // Unhandled event type
      break
  }

  return NextResponse.json({ received: true })
}
