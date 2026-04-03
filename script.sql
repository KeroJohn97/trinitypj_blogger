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

-- Create a dedicated table for the Alpha videos
CREATE TABLE alpha_videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  video_id TEXT NOT NULL, -- The YouTube ID (e.g., 'hB7u7S_77S8')
  title TEXT NOT NULL,
  description TEXT,
  sort_order SERIAL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE alpha_videos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anon access" ON alpha_videos FOR ALL TO anon USING (true) WITH CHECK (true);

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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  is_featured BOOLEAN DEFAULT false
);

-- Enable RLS
ALTER TABLE small_group ENABLE ROW LEVEL SECURITY;

-- Allow public read and full access for anon (standard for our current setup)
CREATE POLICY "Allow public read" ON small_group FOR SELECT TO anon USING (true);
CREATE POLICY "Allow full access" ON small_group FOR ALL TO anon USING (true) WITH CHECK (true);