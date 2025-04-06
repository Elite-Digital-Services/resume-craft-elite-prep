
-- Create the resumes table to store user resumes
CREATE TABLE IF NOT EXISTS public.resumes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  template VARCHAR NOT NULL DEFAULT 'modern',
  language VARCHAR NOT NULL DEFAULT 'english',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add RLS policies for the resumes table
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to only see their own resumes
CREATE POLICY "Users can view their own resumes" 
  ON public.resumes
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy to allow users to insert their own resumes
CREATE POLICY "Users can insert their own resumes" 
  ON public.resumes
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy to allow users to update their own resumes
CREATE POLICY "Users can update their own resumes" 
  ON public.resumes
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy to allow users to delete their own resumes
CREATE POLICY "Users can delete their own resumes" 
  ON public.resumes
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at on record update
CREATE TRIGGER update_resumes_updated_at
BEFORE UPDATE ON public.resumes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
