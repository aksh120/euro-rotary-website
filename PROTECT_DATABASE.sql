ALTER TABLE participants ADD COLUMN IF NOT EXISTS age INTEGER;

ALTER TABLE participants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public registration" 
ON participants 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow admins to view all data" 
ON participants 
FOR SELECT 
TO authenticated 
USING (
  auth.jwt() ->> 'email' IN ('admin@akimbolabs.site')
);

CREATE POLICY "Allow admins to update data" 
ON participants 
FOR UPDATE 
TO authenticated 
USING (
  auth.jwt() ->> 'email' IN ('admin@akimbolabs.site')
);

CREATE POLICY "Allow admins to delete data" 
ON participants 
FOR DELETE 
TO authenticated 
USING (
  auth.jwt() ->> 'email' IN ('admin@akimbolabs.site')
);