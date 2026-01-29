-- Create a table for email subscribers
CREATE TABLE public.email_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  source TEXT NOT NULL DEFAULT 'popup',
  campaign TEXT,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Enable Row Level Security
ALTER TABLE public.email_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts for the popup form (public subscription)
CREATE POLICY "Anyone can subscribe" 
ON public.email_subscribers 
FOR INSERT 
WITH CHECK (true);

-- Only authenticated admins could read (we'll handle this via edge function)
CREATE POLICY "No public read access" 
ON public.email_subscribers 
FOR SELECT 
USING (false);

-- Create index for faster lookups
CREATE INDEX idx_email_subscribers_email ON public.email_subscribers (email);
CREATE INDEX idx_email_subscribers_campaign ON public.email_subscribers (campaign);