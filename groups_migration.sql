-- 1. Create the Communities Table (Unified Schema)
-- This ensures the table exists even if groups_migration is run standalone
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
  image text,
  photos jsonb DEFAULT '[]',
  
  -- Specialized Rich Content (JSONB Metadata)
  metadata jsonb DEFAULT '{}',
  
  -- System
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  is_featured boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- 2. Performance Indexes
CREATE INDEX IF NOT EXISTS idx_communities_type ON public.communities (type);
CREATE INDEX IF NOT EXISTS idx_communities_sort ON public.communities (sort_order);

-- 3. Enable RLS
ALTER TABLE public.communities ENABLE ROW LEVEL SECURITY;

-- 4. Access Policy
DROP POLICY IF EXISTS "Universal Access Communities" ON public.communities;
CREATE POLICY "Universal Access Communities" 
ON public.communities FOR ALL 
TO anon, authenticated 
USING (true) 
WITH CHECK (true);

-- 5. Seed Fellowship Groups Data
INSERT INTO public.communities (type, slug, name, meeting_time, location_name, sort_order)
VALUES 
(
  'fellowship',
  'methodist-senior-fellowship', 
  'Methodist Senior Fellowship', 
  'Saturday, 11:00 AM', 
  'TLS Sanctuary Activity Room', 
  0
),
(
  'fellowship',
  'methodist-adult-fellowship', 
  'Methodist Adult Fellowship', 
  'Fridays, 10:00 AM', 
  'Church Library', 
  1
),
(
  'fellowship',
  'methodist-women', 
  'Methodist Women', 
  'Saturdays, 8:00 AM', 
  'Fellowship Hall', 
  2
),
(
  'fellowship',
  'methodist-youth-fellowship', 
  'Methodist Youth Fellowship', 
  'Thursdays, 6:30 PM', 
  'Zoom & In-Person', 
  3
),
(
  'fellowship',
  'trinity-kindergarten', 
  'Kindergarten', 
  'Sundays, 12:30 PM', 
  'Church Annex 101', 
  4
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  meeting_time = EXCLUDED.meeting_time,
  location_name = EXCLUDED.location_name,
  sort_order = EXCLUDED.sort_order,
  type = 'fellowship';
