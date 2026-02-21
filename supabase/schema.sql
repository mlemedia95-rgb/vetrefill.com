-- VetRefill Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Clinics table (maps to auth.users)
create table if not exists public.clinics (
  id uuid references auth.users(id) on delete cascade primary key,
  name text not null,
  email text not null unique,
  phone text,
  address text,
  subscription_status text default 'free' check (subscription_status in ('free', 'pro')),
  paddle_customer_id text,
  paddle_subscription_id text,
  refills_used_this_month integer default 0,
  refills_reset_at timestamptz default date_trunc('month', now()) + interval '1 month',
  created_at timestamptz default now()
);

-- Patients table
create table if not exists public.patients (
  id uuid default uuid_generate_v4() primary key,
  clinic_id uuid references public.clinics(id) on delete cascade not null,
  pet_name text not null,
  species text not null,
  owner_name text not null,
  owner_email text not null,
  owner_phone text,
  created_at timestamptz default now()
);

-- Prescriptions table
create table if not exists public.prescriptions (
  id uuid default uuid_generate_v4() primary key,
  clinic_id uuid references public.clinics(id) on delete cascade not null,
  patient_id uuid references public.patients(id) on delete cascade not null,
  medication_name text not null,
  dosage text not null,
  frequency text not null,
  refill_date date not null,
  status text default 'active' check (status in ('active', 'refilled', 'expired')),
  reminder_sent boolean default false,
  notes text,
  created_at timestamptz default now()
);

-- Row Level Security
alter table public.clinics enable row level security;
alter table public.patients enable row level security;
alter table public.prescriptions enable row level security;

-- Clinics policies
create policy "Clinics can view their own data"
  on public.clinics for select
  using (auth.uid() = id);

create policy "Clinics can update their own data"
  on public.clinics for update
  using (auth.uid() = id);

-- Patients policies
create policy "Clinics can view their own patients"
  on public.patients for select
  using (auth.uid() = clinic_id);

create policy "Clinics can insert their own patients"
  on public.patients for insert
  with check (auth.uid() = clinic_id);

create policy "Clinics can update their own patients"
  on public.patients for update
  using (auth.uid() = clinic_id);

create policy "Clinics can delete their own patients"
  on public.patients for delete
  using (auth.uid() = clinic_id);

-- Prescriptions policies
create policy "Clinics can view their own prescriptions"
  on public.prescriptions for select
  using (auth.uid() = clinic_id);

create policy "Clinics can insert their own prescriptions"
  on public.prescriptions for insert
  with check (auth.uid() = clinic_id);

create policy "Clinics can update their own prescriptions"
  on public.prescriptions for update
  using (auth.uid() = clinic_id);

create policy "Clinics can delete their own prescriptions"
  on public.prescriptions for delete
  using (auth.uid() = clinic_id);

-- Function to handle new user signup (creates clinic record)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.clinics (id, name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'clinic_name', 'My Clinic'),
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger on auth.users insert
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Index for performance
create index if not exists idx_patients_clinic_id on public.patients(clinic_id);
create index if not exists idx_prescriptions_clinic_id on public.prescriptions(clinic_id);
create index if not exists idx_prescriptions_patient_id on public.prescriptions(patient_id);
create index if not exists idx_prescriptions_refill_date on public.prescriptions(refill_date);
create index if not exists idx_prescriptions_status on public.prescriptions(status);
