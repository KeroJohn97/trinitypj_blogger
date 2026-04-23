-- Ensure extensions are active
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create a dedicated table for the Announcements feed
CREATE TABLE announcements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  caption TEXT,
  sort_order SERIAL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Policy for ANON access (Since we are skipping Auth for now)
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anon access" ON announcements FOR ALL TO anon USING (true) WITH CHECK (true);

-- Create a dedicated table for the Small groups
CREATE TABLE small_groups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  leader_name TEXT,
  meeting_day TEXT, -- e.g., "Friday"
  meeting_time TEXT, -- e.g., "8:00 PM"
  location_area TEXT, -- e.g., "SS2" or "Section 14"
  contact_number TEXT,
  category TEXT DEFAULT 'General', -- e.g., 'Young Adults', 'Families'
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE small_groups ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anon access" ON small_groups FOR ALL TO anon USING (true) WITH CHECK (true);

-- Create a dedicated table for the Prayer gathering
CREATE TABLE IF NOT EXISTS prayer_gathering (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL DEFAULT 'lighthouse',
  is_active BOOLEAN DEFAULT true,
  title TEXT NOT NULL,
  day TEXT,
  time TEXT,
  venue TEXT,
  mode TEXT DEFAULT 'Physical',
  leader TEXT,
  contact TEXT,
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS so it's not totally locked
ALTER TABLE prayer_gathering ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read (for testing/public site)
CREATE POLICY "Allow public read" ON prayer_gathering FOR SELECT TO anon USING (true);

-- Allow full access for now (since we're skipping complex Auth for this step)
CREATE POLICY "Allow full access" ON prayer_gathering FOR ALL TO anon USING (true) WITH CHECK (true);

-- Add a sort_order column to your existing table
ALTER TABLE prayer_gathering 
ADD COLUMN sort_order INTEGER DEFAULT 0;

-- Optional: Create an index to make sorting lightning fast
CREATE INDEX idx_gathering_sort_order ON prayer_gathering (sort_order);

CREATE TABLE IF NOT EXISTS small_group (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  area TEXT, -- Replacing 'venue' with 'area' for better context
  day TEXT,
  time TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_featured BOOLEAN DEFAULT false
);

-- Enable RLS
ALTER TABLE small_group ENABLE ROW LEVEL SECURITY;

-- Allow public read and full access for anon (standard for our current setup)
CREATE POLICY "Allow public read" ON small_group FOR SELECT TO anon USING (true);
CREATE POLICY "Allow full access" ON small_group FOR ALL TO anon USING (true) WITH CHECK (true);

-- 1. Create the LCEC Settings Table
CREATE TABLE IF NOT EXISTS public.lcec_settings (
  id integer PRIMARY KEY DEFAULT 1,
  banner_image_id uuid REFERENCES public.media_assets(id) ON DELETE SET NULL,
  chart_image_id uuid REFERENCES public.media_assets(id) ON DELETE SET NULL,
  updated_at timestamp with time zone DEFAULT now(),
  -- Ensure only one record ever exists
  CONSTRAINT singleton_id CHECK (id = 1)
);

-- 2. Initialize the Singleton Row
INSERT INTO public.lcec_settings (id)
VALUES (1)
ON CONFLICT (id) DO NOTHING;

-- 3. Security (Optional but Recommended)
-- Enable Row Level Security
ALTER TABLE public.lcec_settings ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to view the settings (needed for the public webpage)
CREATE POLICY "Public Read LCEC Settings" 
ON public.lcec_settings FOR SELECT 
USING (true);

-- Policy: Allow authenticated users (Admins) to manage settings
-- Note: Adjust this policy if you have specific 'admin' roles
CREATE POLICY "Admins Manage LCEC Settings" 
ON public.lcec_settings FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- 1. Clear out the previous restrictive policies
DROP POLICY IF EXISTS "Public Read LCEC Settings" ON public.lcec_settings;
DROP POLICY IF EXISTS "Admins Manage LCEC Settings" ON public.lcec_settings;
DROP POLICY IF EXISTS "Allow public read" ON public.lcec_settings;
DROP POLICY IF EXISTS "Allow all access for dev" ON public.lcec_settings;

-- 2. Create a Universal Access Policy (Safe for Dev/Test)
-- This allows both 'authenticated' (logged in) and 'anon' (API keys) to manage the table
CREATE POLICY "Universal Access" 
ON public.lcec_settings 
FOR ALL 
TO anon, authenticated 
USING (true) 
WITH CHECK (true);

-- 3. Ensure RLS is still active (but now permitted by the policy above)
ALTER TABLE public.lcec_settings ENABLE ROW LEVEL SECURITY;

-- Create the Alpha Media Repository
CREATE TABLE IF NOT EXISTS public.alpha_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL CHECK (category IN ('journey', 'advertising')),
  type text NOT NULL CHECK (type IN ('video', 'image')),
  youtube_id text,
  image_id uuid REFERENCES public.media_assets(id) ON DELETE SET NULL,
  title text,
  description text,
  language text CHECK (language IN ('en', 'zh', 'ms')),
  reg_qr_id_physical uuid REFERENCES public.media_assets(id) ON DELETE SET NULL,
  reg_qr_id_online uuid REFERENCES public.media_assets(id) ON DELETE SET NULL,
  reg_url_physical text,
  reg_url_online text,
  additional_image_ids uuid[] DEFAULT '{}',
  sort_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable Security
ALTER TABLE public.alpha_media ENABLE ROW LEVEL SECURITY;

-- Allow Global Access for Management
CREATE POLICY "Universal Access Alpha" 
ON public.alpha_media FOR ALL 
TO anon, authenticated 
USING (true) 
WITH CHECK (true);

-- 1. Ensure the generator extension is active (Consolidated above)
-- 2. Force the 'id' column to generate UUIDs automatically for new rows (Consolidated above)
-- 3. Security Check (already a Primary Key)
ALTER TABLE public.alpha_media 
ALTER COLUMN id SET NOT NULL;

-- 1. Add the additional_image_ids column as a UUID array
ALTER TABLE public.alpha_media 
ADD COLUMN IF NOT EXISTS additional_image_ids uuid[] DEFAULT '{}';

-- 2. (Optional) Refresh the view if you are using any custom views 
-- that include alpha_media columns.

-- 1. Create the landing_notices table
CREATE TABLE IF NOT EXISTS public.landing_notices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_id uuid REFERENCES public.media_assets(id),
  video_url text, -- Supports YouTube/Vimeo URLs
  link_url text,
  link_label text DEFAULT 'Learn More',
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  expiry_date timestamp with time zone,
  created_at timestamp with time zone DEFAULT now()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.landing_notices ENABLE ROW LEVEL SECURITY;

-- 3. Allow public read access (So website visitors can see the notices)
CREATE POLICY "Allow public read access" ON public.landing_notices
  FOR SELECT USING (true);

-- 4. Allow authenticated users (Admins) to perform all actions
CREATE POLICY "Allow admin manage access" ON public.landing_notices
  FOR ALL TO authenticated USING (true);

-- 1. Create the Vision Pillars Table
CREATE TABLE IF NOT EXISTS public.vision_pillars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_id uuid REFERENCES public.media_assets(id) ON DELETE SET NULL,
  sort_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.vision_pillars ENABLE ROW LEVEL SECURITY;

-- 3. Create a Universal Access Policy
-- This allows the table to be managed by the Admin portal and read by the public site
-- (Matches the security pattern used in your other tables like alpha_media and landing_notices)
CREATE POLICY "Universal Access Vision" 
ON public.vision_pillars FOR ALL 
TO anon, authenticated 
USING (true) 
WITH CHECK (true);
