-- ============================================================
-- WhyCreatives Supabase Migration — Full Schema Setup
-- Run this FIRST on a new Supabase project to create all
-- tables, indexes, RLS policies, storage, and cron.
-- ============================================================

-- ============================================================
-- 1. EXTENSIONS
-- ============================================================
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_net";
-- pg_cron is enabled by default on Supabase

-- ============================================================
-- 2. TABLES
-- ============================================================

-- 2a. contact_submissions
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new'::text,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2b. insights
CREATE TABLE IF NOT EXISTS public.insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  meta_description TEXT NOT NULL,
  content_markdown TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}'::text[],
  category TEXT DEFAULT 'Insights'::text,
  featured_image TEXT,
  author TEXT DEFAULT 'WhyCreatives Team'::text,
  read_time INTEGER DEFAULT 5,
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- 2c. job_applications
CREATE TABLE IF NOT EXISTS public.job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  "position" TEXT NOT NULL,
  portfolio_url TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new'::text,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2d. portfolio_works
CREATE TABLE IF NOT EXISTS public.portfolio_works (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  media_type TEXT DEFAULT 'image'::text,
  website_url TEXT
);

-- 2e. team_members
CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  linkedin_url TEXT,
  email TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ============================================================
-- 3. INDEXES
-- ============================================================

-- contact_submissions
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON public.contact_submissions USING btree (status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON public.contact_submissions USING btree (created_at DESC);

-- insights
CREATE INDEX IF NOT EXISTS idx_insights_slug ON public.insights USING btree (slug);
CREATE INDEX IF NOT EXISTS idx_insights_category ON public.insights USING btree (category);
CREATE INDEX IF NOT EXISTS idx_insights_published ON public.insights USING btree (is_published, published_at DESC);

-- job_applications
CREATE INDEX IF NOT EXISTS idx_job_applications_position ON public.job_applications USING btree ("position");
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON public.job_applications USING btree (status);
CREATE INDEX IF NOT EXISTS idx_job_applications_created_at ON public.job_applications USING btree (created_at DESC);

-- portfolio_works
CREATE INDEX IF NOT EXISTS idx_portfolio_works_category ON public.portfolio_works USING btree (category);
CREATE INDEX IF NOT EXISTS idx_portfolio_works_featured ON public.portfolio_works USING btree (is_featured);
CREATE INDEX IF NOT EXISTS idx_portfolio_works_order ON public.portfolio_works USING btree (display_order);

-- team_members
CREATE INDEX IF NOT EXISTS idx_team_members_display_order ON public.team_members USING btree (display_order);

-- ============================================================
-- 4. ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_works ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- contact_submissions policies
CREATE POLICY "Allow anyone to submit contact form"
  ON public.contact_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view submissions"
  ON public.contact_submissions FOR SELECT
  USING ((SELECT auth.role()) = 'authenticated');

-- insights policies
CREATE POLICY "Authenticated full access"
  ON public.insights FOR ALL
  TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Public read access for published insights"
  ON public.insights FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

-- job_applications policies
CREATE POLICY "Allow public to submit job application"
  ON public.job_applications FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view applications"
  ON public.job_applications FOR SELECT
  USING ((SELECT auth.role()) = 'authenticated');

-- portfolio_works policies
CREATE POLICY "Allow public read access"
  ON public.portfolio_works FOR SELECT
  USING (true);

CREATE POLICY "Allow authenticated insert"
  ON public.portfolio_works FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update"
  ON public.portfolio_works FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated delete"
  ON public.portfolio_works FOR DELETE
  TO authenticated
  USING (true);

-- team_members policies
CREATE POLICY "Allow public read access to team members"
  ON public.team_members FOR SELECT
  USING (is_active = true);

CREATE POLICY "Allow authenticated users to manage team members"
  ON public.team_members FOR ALL
  USING ((SELECT auth.role()) = 'authenticated');

-- ============================================================
-- 5. STORAGE BUCKET
-- ============================================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'portfolio-images',
  'portfolio-images',
  true,
  524288000,  -- 500 MB
  ARRAY['image/jpeg','image/jpg','image/png','image/webp','image/gif','video/mp4','video/webm','video/quicktime']
) ON CONFLICT (id) DO NOTHING;

-- Storage RLS policies
CREATE POLICY "Public read access for portfolio images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio-images');

CREATE POLICY "Authenticated users can upload portfolio images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'portfolio-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update portfolio images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'portfolio-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete portfolio images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'portfolio-images' AND auth.role() = 'authenticated');

-- ============================================================
-- 6. ADMIN USER
-- Create the admin account for dashboard access.
-- After running this migration, the admin can log in at /admin-login
-- Email: whycreativesagency@gmail.com
-- Password: WhyCreativesAdmin2026!
-- ============================================================

DO $$
DECLARE
  new_user_id UUID := gen_random_uuid();
  new_identity_id UUID := gen_random_uuid();
  new_email TEXT := 'whycreativesagency@gmail.com';
  hashed_password TEXT := crypt('WhyCreativesAdmin2026!', gen_salt('bf', 10));
BEGIN
  INSERT INTO auth.users (
    id, instance_id, aud, role, email, encrypted_password,
    email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
    is_sso_user, is_anonymous, created_at, updated_at,
    confirmation_token, recovery_token, email_change_token_new,
    email_change, phone_change, phone_change_token,
    email_change_token_current, reauthentication_token
  ) VALUES (
    new_user_id, '00000000-0000-0000-0000-000000000000',
    'authenticated', 'authenticated', new_email, hashed_password,
    now(), '{"provider":"email","providers":["email"]}'::jsonb,
    '{"email_verified":true}'::jsonb,
    false, false, now(), now(),
    '', '', '', '', '', '', '', ''
  );

  INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, created_at, updated_at
  ) VALUES (
    new_identity_id, new_user_id, new_user_id,
    json_build_object('sub', new_user_id::text, 'email', new_email, 'email_verified', true)::jsonb,
    'email', now(), now()
  );
END $$;

-- ============================================================
-- 7. CRON JOB (Daily Insight Generation)
-- Requires: pg_cron and pg_net extensions (enabled by default)
-- Requires: GROQ_API_KEY set in Edge Function secrets
-- NOTE: Replace NEW_PROJECT_REF below with your new project ref
-- ============================================================

-- UNCOMMENT and update after deploying edge functions:
-- SELECT cron.schedule(
--   'daily-insight-generation',
--   '30 3 * * *',
--   $$
--   SELECT net.http_post(
--     url := 'https://NEW_PROJECT_REF.supabase.co/functions/v1/generate-daily-insight',
--     headers := '{"Content-Type": "application/json"}'::jsonb,
--     body := '{}'::jsonb
--   ) AS request_id;
--   $$
-- );
