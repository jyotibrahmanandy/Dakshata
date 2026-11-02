-- Dakshata Supabase SQL Schema
-- Online Course Catalog & Recommendation Platform

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES (Extends Supabase auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  avatar_url text,
  phone text,
  target_role text,
  current_level text default 'Beginner', -- Beginner, Intermediate, Advanced
  budget_max integer default 5000,
  weekly_hours integer default 10,
  preferred_languages text[] default array['English', 'Hindi'],
  current_skills text[] default array[]::text[],
  is_admin boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. CATEGORIES
create table if not exists public.categories (
  id text primary key,
  name text not null,
  slug text unique not null,
  description text,
  icon text,
  item_count integer default 0,
  section text not null default 'it_certifications',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. PROVIDERS
create table if not exists public.providers (
  id text primary key,
  name text not null,
  slug text unique not null,
  logo text,
  description text,
  affiliate_network text,
  home_url text,
  rating numeric(3, 2) default 4.8,
  courses_count integer default 0,
  badge_text text,
  api_integrated boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. COURSES
create table if not exists public.courses (
  id text primary key,
  provider text not null,
  provider_id text references public.providers(id) on delete set null,
  external_id text,
  title text not null,
  slug text unique not null,
  tagline text,
  description text not null,
  long_description text,
  url text not null,
  affiliate_url text not null,
  image text not null,
  price integer not null default 0,
  original_price integer not null default 0,
  currency text default 'INR',
  level text default 'Beginner',
  duration_hours integer default 20,
  language text default 'English',
  rating numeric(3, 2) default 4.8,
  rating_count integer default 0,
  certificate boolean default true,
  is_free boolean default false,
  tags text[] default array[]::text[],
  category_id text references public.categories(id) on delete set null,
  institution text,
  instructor text,
  what_you_will_learn text[] default array[]::text[],
  syllabus jsonb default '[]'::jsonb,
  best_value_score numeric(5, 1) default 0,
  deal_of_the_day boolean default false,
  deal_of_the_week boolean default false,
  last_synced_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. WISHLISTS
create table if not exists public.wishlists (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  course_id text references public.courses(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (user_id, course_id)
);

-- 6. ENROLLMENTS & LEARNING PROGRESS
create table if not exists public.enrollments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  course_id text references public.courses(id) on delete cascade not null,
  status text not null default 'saved', -- saved, in_progress, completed
  progress_percent integer default 0,
  started_at timestamp with time zone default timezone('utc'::text, now()) not null,
  completed_at timestamp with time zone,
  last_accessed timestamp with time zone default timezone('utc'::text, now()) not null,
  notes text,
  certificate_url text,
  certificate_date date,
  unique (user_id, course_id)
);

-- 7. REVIEWS
create table if not exists public.reviews (
  id uuid default uuid_generate_v4() primary key,
  course_id text references public.courses(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete set null,
  user_name text not null,
  user_avatar text,
  role text,
  rating integer not null check (rating >= 1 and rating <= 5),
  comment text not null,
  helpful_votes integer default 0,
  verified_enrollment boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. LEARNING PATHS
create table if not exists public.learning_paths (
  id text primary key,
  role text not null,
  title text not null,
  slug text unique not null,
  description text not null,
  estimated_months integer not null default 6,
  target_salary_inr text,
  job_growth text,
  category text,
  skills_covered text[] default array[]::text[],
  steps jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 9. AFFILIATE CLICKS
create table if not exists public.affiliate_clicks (
  id uuid default uuid_generate_v4() primary key,
  course_id text references public.courses(id) on delete set null,
  course_title text,
  provider text not null,
  price_inr integer default 0,
  estimated_commission_inr integer default 0,
  user_id uuid references public.profiles(id) on delete set null,
  source text default 'catalog_card',
  ip_pseudo text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 10. PRICE HISTORY
create table if not exists public.price_history (
  id uuid default uuid_generate_v4() primary key,
  course_id text references public.courses(id) on delete cascade not null,
  price integer not null,
  recorded_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 11. NOTIFICATIONS
create table if not exists public.notifications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  message text not null,
  link text,
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ROW LEVEL SECURITY (RLS) POLICIES
alter table public.profiles enable row level security;
alter table public.wishlists enable row level security;
alter table public.enrollments enable row level security;
alter table public.reviews enable row level security;
alter table public.notifications enable row level security;
alter table public.courses enable row level security;
alter table public.categories enable row level security;
alter table public.providers enable row level security;
alter table public.learning_paths enable row level security;
alter table public.affiliate_clicks enable row level security;

-- Public can read courses, categories, providers, learning paths, and reviews
create policy "Allow public read courses" on public.courses for select using (true);
create policy "Allow public read categories" on public.categories for select using (true);
create policy "Allow public read providers" on public.providers for select using (true);
create policy "Allow public read learning_paths" on public.learning_paths for select using (true);
create policy "Allow public read reviews" on public.reviews for select using (true);

-- User Profiles: users can select and update their own profile
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Wishlists: users manage their own wishlist
create policy "Users can read own wishlist" on public.wishlists for select using (auth.uid() = user_id);
create policy "Users can insert into own wishlist" on public.wishlists for insert with check (auth.uid() = user_id);
create policy "Users can delete from own wishlist" on public.wishlists for delete using (auth.uid() = user_id);

-- Enrollments: users manage their own learning enrollments
create policy "Users can read own enrollments" on public.enrollments for select using (auth.uid() = user_id);
create policy "Users can insert own enrollments" on public.enrollments for insert with check (auth.uid() = user_id);
create policy "Users can update own enrollments" on public.enrollments for update using (auth.uid() = user_id);

-- Notifications
create policy "Users can view own notifications" on public.notifications for select using (auth.uid() = user_id);

-- Affiliate click logging
create policy "Allow insert affiliate clicks" on public.affiliate_clicks for insert with check (true);
