
CREATE TABLE public.submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  data_id text NOT NULL,
  user_id text NOT NULL,
  grade text NOT NULL,
  dyslexia boolean,
  results jsonb NOT NULL,
  client_timestamp bigint NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.submissions TO anon, authenticated;
GRANT ALL ON public.submissions TO service_role;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can insert submissions" ON public.submissions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anyone can read submissions" ON public.submissions FOR SELECT TO anon, authenticated USING (true);
CREATE INDEX submissions_grade_idx ON public.submissions(grade);
CREATE INDEX submissions_client_ts_idx ON public.submissions(client_timestamp);
