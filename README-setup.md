# Euro Rotary Event Platform Setup

## Environment Variables
Create a `.env.local` file in the root directory with the following variables:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Custom Mail (SMTP)
SMTP_HOST=smtp.your-email-provider.com
SMTP_PORT=587
SMTP_USER=your_email@domain.com
SMTP_PASS=your_email_password
SMTP_FROM=Euro Rotary <no-reply@euro-rotary.com>
```

## Database Schema (Supabase)
Run the following SQL in your Supabase SQL Editor to set up the tables:

```sql
-- Participants Table
create table participants (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  full_name text not null,
  email text not null,
  phone text,
  gender text,
  status text default 'pending', -- pending, confirmed, cancelled
  bib_number text unique,
  payment_id text
);

-- Payments Table (Optional log, mainly handled via Razorpay ID in participants for simplicity)
create table payments (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  participant_id uuid references participants(id),
  razorpay_order_id text not null,
  razorpay_payment_id text,
  amount numeric not null,
  status text not null
);
```
