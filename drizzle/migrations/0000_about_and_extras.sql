ALTER TABLE public.progress ADD COLUMN IF NOT EXISTS avatar jsonb NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE public.progress ADD COLUMN IF NOT EXISTS streak jsonb NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE public.progress ADD COLUMN IF NOT EXISTS badges jsonb NOT NULL DEFAULT '{}'::jsonb;

CREATE TABLE public.about_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind text NOT NULL DEFAULT 'text',
  content text NOT NULL DEFAULT '',
  image_url text,
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.about_blocks TO anon, authenticated;
GRANT ALL ON public.about_blocks TO service_role;
ALTER TABLE public.about_blocks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "About blocks are public" ON public.about_blocks FOR SELECT TO anon, authenticated USING (true);