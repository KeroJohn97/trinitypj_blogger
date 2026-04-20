-- UNIFIED COMMUNITIES DATABASE MIGRATION

-- 1. Create the Unified Communities Table
CREATE TABLE IF NOT EXISTS public.communities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('ministry', 'fellowship', 'small_group')),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  tagline text,
  description text,
  
  -- Logistics (Shared but nullable)
  meeting_day text,
  meeting_time text,
  location_name text,
  location_area text,
  
  -- People
  leader_name text,
  contact_info jsonb DEFAULT '{"email": null, "phone": null}',
  
  -- Media
  image text, -- Main photo (Media ID or URL)
  gallery jsonb DEFAULT '[]', -- photos[]
  
  -- Specialized Rich Content (JSONB Metadata)
  -- For Ministries: { faqs: [], pdf: {}, library: [] }
  -- For Small Groups: { language: 'English', zone: 'Section 14' }
  metadata jsonb DEFAULT '{}',
  
  -- System
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  is_featured boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- 2. Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_communities_type ON public.communities (type);
CREATE INDEX IF NOT EXISTS idx_communities_sort ON public.communities (sort_order);

-- 3. Migration Logic (Safely move existing data)

-- 3a. From ministries
INSERT INTO public.communities (
  type, slug, name, tagline, description, gallery, metadata, sort_order, is_active
)
SELECT 
  'ministry',
  slug,
  name,
  tagline,
  description,
  photos::jsonb,
  json_build_object(
    'faqs', faqs,
    'pdf', pdf,
    'disclaimer', disclaimer,
    'attachment', attachment,
    'library', library
  ),
  sort_order,
  is_active
FROM public.ministries
ON CONFLICT (slug) DO UPDATE SET
  type = 'ministry',
  metadata = EXCLUDED.metadata;

-- 3b. From church_groups (Fellowships)
INSERT INTO public.communities (
  type, slug, name, meeting_time, location_name, description, image, leader_name, sort_order, is_active
)
SELECT 
  'fellowship',
  slug,
  name,
  time,
  location,
  description,
  image,
  leader,
  sort_order,
  is_active
FROM public.church_groups
ON CONFLICT (slug) DO UPDATE SET
  type = 'fellowship';

-- 3c. From small_groups (Cell Groups)
INSERT INTO public.communities (
  type, slug, name, leader_name, meeting_day, meeting_time, location_area, metadata, is_active
)
SELECT 
  'small_group',
  'sg-' || lower(replace(name, ' ', '-')), -- Generate a temporary slug
  name,
  leader_name,
  meeting_day,
  meeting_time,
  location_area,
  json_build_object(
    'language', language,
    'zone', zone,
    'contact_number', contact_number
  ),
  is_active
FROM public.small_groups
ON CONFLICT (slug) DO NOTHING;

-- 4. Enable RLS
ALTER TABLE public.communities ENABLE ROW LEVEL SECURITY;

-- 5. Universal Development Policy
DROP POLICY IF EXISTS "Universal Access Communities" ON public.communities;
CREATE POLICY "Universal Access Communities" 
ON public.communities FOR ALL 
TO anon, authenticated 
USING (true) 
WITH CHECK (true);
