-- ============================================================
-- VYRAND — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- 1. Experience prices (overrides the static data in lib/experiences.ts)
create table if not exists public.experience_prices (
  id text primary key,          -- 'air' | 'alpine' | 'gravity' | 'vertical' | 'terrain'
  price_per_person numeric(8,2) not null default 70,
  updated_at timestamptz not null default now()
);

-- Seed with default prices
insert into public.experience_prices (id, price_per_person) values
  ('air',      70),
  ('alpine',   70),
  ('gravity',  70),
  ('vertical', 70),
  ('terrain',  70)
on conflict (id) do nothing;

-- 2. Bookings
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  experience_id text not null references public.experience_prices(id),
  booking_date date not null,
  booking_time text not null,
  group_size int not null check (group_size between 2 and 6),
  total_price numeric(8,2) not null,
  contact_name text not null,
  contact_email text not null,
  contact_phone text not null,
  notes text,
  status text not null default 'confirmed' check (status in ('confirmed', 'cancelled', 'completed')),
  created_at timestamptz not null default now()
);

-- 3. Row Level Security
alter table public.experience_prices enable row level security;
alter table public.bookings enable row level security;

-- experience_prices: anyone can read, only admins can write
create policy "Public can read prices"
  on public.experience_prices for select
  using (true);

create policy "Admins can update prices"
  on public.experience_prices for update
  using (auth.jwt() ->> 'role' = 'admin');

-- bookings: users can only see/create their own bookings
create policy "Users see own bookings"
  on public.bookings for select
  using (auth.uid() = user_id);

create policy "Users create own bookings"
  on public.bookings for insert
  with check (auth.uid() = user_id);

create policy "Users cancel own bookings"
  on public.bookings for update
  using (auth.uid() = user_id);

-- ============================================================
-- ADMIN SETUP (run separately after creating your admin user)
-- Replace 'your-admin-user-id' with your actual user UUID
-- from: Supabase Dashboard → Authentication → Users
-- ============================================================
-- update auth.users set raw_app_meta_data = raw_app_meta_data || '{"role":"admin"}'
--   where id = 'your-admin-user-id';
