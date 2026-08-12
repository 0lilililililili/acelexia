DROP POLICY IF EXISTS "anyone can read submissions" ON public.submissions;
DROP POLICY IF EXISTS "anyone can insert submissions" ON public.submissions;

REVOKE ALL ON public.submissions FROM anon;
REVOKE ALL ON public.submissions FROM authenticated;
GRANT ALL ON public.submissions TO service_role;

ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;