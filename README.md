# Euro Rotary Marathon 2026 | Fast & Furriest

A premium, high-performance web platform built for the most exclusive rotary marathon event. Designed with a luxury aesthetic (Gold, Ivory, and Deep Black), this application manages the entire event lifecycle from registration to broadcast.

## 🏎️ Core Features

- **Premium Landing Experience**: A high-impact, editorial-style interface with glassmorphism, glowing accents, and smooth Framer Motion animations.
- **Secure Registration**: Multi-step registration system with real-time validation and a strict age-gate (maximum 18 years).
- **Payment Gateway**: Full integration with Razorpay for secure registration fee processing.
- **Admin Mission Control**: A sophisticated dashboard for organizers to manage participants, verify payments, and monitor event stats.
- **Newsletter System**:
  - Integrated subscription form in the global footer.
  - Automated "Welcome to the Inner Circle" email triggers.
  - Admin "Campaign Center" to send branded HTML broadcasts to all active subscribers.
- **Automated Bib Assignment**: Real-time generation of race bib numbers upon successful payment.

## 🛠️ Technology Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL + SSR Auth)
- **Payments**: [Razorpay](https://razorpay.com/)
- **Email Service**: [Nodemailer](https://nodemailer.com/) (Custom Branded HTML Templates)
- **Icons**: [Lucide React](https://lucide.dev/)

## ⚙️ Environment Configuration

Create a `.env.local` file with the following keys:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret

# SMTP (Newsletter & Confirmations)
SMTP_HOST=your_host.example.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASS=your_app_password
SMTP_SECURE=false # Set to true for Port 465
```

## 🏗️ Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Database Setup**:
   - Create a `participants` table with columns: `id`, `full_name`, `email`, `gender`, `age`, `bib_number`, `status`.
   - Create a `newsletter_subscriptions` table with columns: `id`, `email`, `created_at`, `unsubscribed`.
   - Enable Row Level Security (RLS) on both.

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Build for Production**:
   ```bash
   npm run build
   ```

## 🛡️ Security

- **RLS Policies**: All sensitive data is protected via Supabase Row Level Security. Public users can only insert registration data; only authenticated admins (`admin@akimbolabs.site`) can view or manage records.
- **Validation**: Strict server-side validation for all inputs, specially focusing on age and email integrity.
- **Authentication**: JWT-based session management using Next.js Middleware.

---
© 2026 Euro Rotary. Built for performance.
