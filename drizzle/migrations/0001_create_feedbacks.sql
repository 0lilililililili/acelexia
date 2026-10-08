CREATE TABLE public.feedbacks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  username text NOT NULL DEFAULT 'guest',
  rating integer NOT NULL,
  comment text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.feedbacks TO service_role;
ALTER TABLE public.feedbacks ENABLE ROW LEVEL SECURITY;