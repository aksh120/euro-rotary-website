CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    unsubscribed BOOLEAN DEFAULT FALSE
);

ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public subscription" 
ON newsletter_subscriptions 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

CREATE POLICY "Allow admins to view newsletter" 
ON newsletter_subscriptions 
FOR SELECT 
TO authenticated 
USING (
  auth.jwt() ->> 'email' IN ('admin@akimbolabs.site')
);

CREATE POLICY "Allow admins to delete newsletter" 
ON newsletter_subscriptions 
FOR DELETE
TO authenticated 
USING (
  auth.jwt() ->> 'email' IN ('admin@akimbolabs.site')
);