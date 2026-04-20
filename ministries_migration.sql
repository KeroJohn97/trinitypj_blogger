-- 1. Create the Ministries Table
CREATE TABLE IF NOT EXISTS public.ministries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  tagline text,
  color text,
  description text NOT NULL,
  photos text[] DEFAULT '{}',
  faqs jsonb DEFAULT '[]',
  pdf jsonb,
  disclaimer text,
  attachment jsonb,
  library jsonb DEFAULT '[]',
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now()
);

-- 2. Add columns if they are missing (for existing tables)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='ministries' AND COLUMN_NAME='sort_order') THEN
    ALTER TABLE public.ministries ADD COLUMN sort_order integer DEFAULT 0;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='ministries' AND COLUMN_NAME='is_active') THEN
    ALTER TABLE public.ministries ADD COLUMN is_active boolean DEFAULT true;
  END IF;
END $$;

-- 3. Create Performance Index for Sorting
CREATE INDEX IF NOT EXISTS idx_ministries_sort_order ON public.ministries (sort_order);

-- 4. Enable Row Level Security
ALTER TABLE public.ministries ENABLE ROW LEVEL SECURITY;

-- 5. Universal Access Policy (Safe for Dev/Test)
DROP POLICY IF EXISTS "Universal Access Ministries" ON public.ministries;
CREATE POLICY "Universal Access Ministries" 
ON public.ministries FOR ALL 
TO anon, authenticated 
USING (true) 
WITH CHECK (true);

-- 6. Seed Initial Data with Sequential Sorting
INSERT INTO public.ministries (slug, name, tagline, color, description, photos, faqs, pdf, disclaimer, attachment, library, sort_order)
VALUES 
(
  'boys-brigade', 
  'Boys'' Brigade', 
  '1st Petaling Jaya Company', 
  'blue', 
  'The Boys'' Brigade in Malaysia is an international uniformed youth organisation...',
  ARRAY[
    'https://trinitypj.com/wp-content/uploads/Must-have.jpg',
    'https://trinitypj.com/wp-content/uploads/Must-have-2.jpg'
  ],
  '[{"question": "What is the Boys'' Brigade?", "answer": "The Boy''s Brigade (BB) is the first uniformed youth organisation..."}]'::jsonb,
  null, null, null, '[]', 0
),
(
  'girls-brigade',
  'Girls'' Brigade',
  '1st Petaling Jaya Company',
  'green',
  'The Girls'' Brigade in Malaysia is a Christian organisation...',
  ARRAY['https://trinitypj.com/wp-content/uploads/BB-GB-Enrolment-2018-26.jpg'],
  '[{"question": "Aim of the Girls’ Brigade", "answer": "To help girls to become followers of the Lord Jesus Christ..."}]'::jsonb,
  null, null, null, '[]', 1
),
(
  'christian-education',
  'Christian Education',
  null, 'green',
  'The Christian Education Committee is entrusted with the functions and duties...',
  '{}', '[]', null, null, null, '[]', 2
),
(
  'church-school',
  'Church School',
  null, 'green',
  'We partner with local and international missions to reach the unreached...',
  ARRAY['https://trinitypj.com/wp-content/uploads/Church-School-1-min.png'],
  '[{"question": "Who can join?", "answer": "We welcome all children from 3-12 years old!"}]'::jsonb,
  null, null, null, '[]', 3
),
(
  'membership',
  'Church Membership',
  null, null,
  'To be a member of Trinity Methodist Church Petaling Jaya means pledging...',
  '{}', '[]', null, null, null, '[]', 4
),
(
  'stewardship-finance',
  'Stewardship & Finance',
  null, null,
  'The Stewardship and Finance committee is promoted to cultivate Christian Stewardship...',
  '{}', '[]', null, null, null, '[]', 5
),
(
  'the-clarion',
  'THE CLARION',
  'The official newsletter of the TMCPJ',
  null,
  'The Clarion is the official newsletter of the Trinity Methodist Church, Petaling Jaya...',
  '{}', '[]', null, null, null, '[]', 6
),
(
  'oasis-centre',
  'TMC Oasis Lay Pastoral Care and Counselling Centre',
  null, null,
  'Weighed down by life’s challenges? Christian counselling is provided at the OASIS Centre.',
  '{}', '[]', null, null, null, '[]', 7
),
(
  'visitations',
  'Visitations',
  null, null,
  'Visiting the parishioners is a pivotal part of pastoral oversight in TMC PJ.',
  ARRAY['https://trinitypj.com/wp-content/uploads/Visitations-Ministry.jpg'],
  '[]', null, null, null, '[]', 8
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  color = EXCLUDED.color,
  description = EXCLUDED.description,
  photos = EXCLUDED.photos,
  faqs = EXCLUDED.faqs,
  pdf = EXCLUDED.pdf,
  disclaimer = EXCLUDED.disclaimer,
  attachment = EXCLUDED.attachment,
  library = EXCLUDED.library,
  sort_order = EXCLUDED.sort_order;
