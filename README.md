# VetRefill — Veterinary Prescription Refill Management SaaS

A complete SaaS application for veterinary clinics to manage prescription refills and automate pet owner reminders.

## Tech Stack

- **Next.js 15** (App Router) with TypeScript
- **Tailwind CSS v4** for styling
- **Supabase** for PostgreSQL database + authentication
- **Resend** for transactional email notifications
- **Paddle** for subscription billing

## Features

- **Landing Page** — Hero, features, pricing (Free vs Pro), testimonials
- **Auth** — Clinic signup/login via Supabase Auth (email confirmation)
- **Dashboard** — Overview stats, upcoming refills (7-day view)
- **Patients** — Add/search/delete patients (pet name, species, owner contact)
- **Prescriptions** — Create/track prescriptions, one-click mark-as-refilled, manual reminder send
- **Automated Reminders** — Cron job sends Resend emails 3 days before refill date
- **Settings** — Clinic profile management, Paddle subscription upgrade/cancel
- **Free plan**: 10 reminders/month | **Pro plan**: $29/month unlimited

## Getting Started

### 1. Clone and install

```bash
cd vetrefill
npm install
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Run the SQL schema: paste contents of `supabase/schema.sql` in the Supabase SQL editor
3. Copy your project URL and anon key

### 3. Set up Resend

1. Create an account at [resend.com](https://resend.com)
2. Add and verify your sending domain
3. Create an API key

### 4. Set up Paddle

1. Create an account at [paddle.com](https://paddle.com)
2. Create a product with a monthly price of $29
3. Copy your client token and price ID
4. Set up webhook pointing to `https://vetrefill.com/api/webhook/paddle`

### 5. Configure environment variables

Fill in `.env.local` with your values:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

RESEND_API_KEY=your_resend_api_key

NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=your_paddle_client_token
PADDLE_API_KEY=your_paddle_api_key
NEXT_PUBLIC_PADDLE_PRO_PRICE_ID=your_paddle_pro_price_id

NEXT_PUBLIC_APP_URL=https://vetrefill.com
CRON_SECRET=your_random_secret_for_cron_auth
```

### 6. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Automated Reminders (Cron)

The cron job at `/api/cron/send-reminders` runs daily at 9 AM UTC (configured in `vercel.json`). It:

1. Finds all active prescriptions with `refill_date` = 3 days from today
2. Checks the clinic hasn't exceeded their monthly limit (free plan: 10/month)
3. Sends a branded reminder email to the pet owner via Resend
4. Marks the prescription as `reminder_sent = true`
5. Increments the free plan usage counter

## Database Schema

See `supabase/schema.sql` for the full schema with RLS policies.

## Deployment

Deploy to Vercel for automatic cron job support:

```bash
vercel --prod
```

Add all environment variables in the Vercel dashboard.

## Project Structure

```
vetrefill/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── patients/
│   │   │   ├── page.tsx
│   │   │   └── PatientsClient.tsx
│   │   ├── prescriptions/
│   │   │   ├── page.tsx
│   │   │   └── PrescriptionsClient.tsx
│   │   └── settings/
│   │       ├── page.tsx
│   │       └── SettingsClient.tsx
│   ├── api/
│   │   ├── send-reminder/route.ts
│   │   ├── cron/send-reminders/route.ts
│   │   └── webhook/paddle/route.ts
│   ├── layout.tsx
│   ├── page.tsx         <- Landing page
│   └── globals.css
├── components/
│   └── dashboard/
│       ├── Sidebar.tsx
│       └── Header.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   └── types.ts
├── middleware.ts
├── supabase/schema.sql
└── vercel.json
```
