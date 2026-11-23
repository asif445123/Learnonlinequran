# Learn Online Quran Academy

Next.js (App Router, TypeScript) + Tailwind CSS + SweetAlert2.

## Run
Requires Node.js 20 or newer.

    npm install
    npm run dev      # http://localhost:3000
    npm run build && npm start

## Before going live
- Copy `.env.example` to `.env.local`, set `NEXT_PUBLIC_SITE_URL` to your real domain, and add your SMTP credentials. Never commit `.env.local` or expose `SMTP_PASS` in client-side code.
- The Contact Us form posts to `/api/contact` and sends mail through SMTP. `CONTACT_EMAIL` is optional and defaults to the configured admin inbox; `SMTP_FROM` is optional and should be an address verified by your SMTP provider.
- For Gmail, use `smtp.gmail.com` and a Google App Password (not your normal account password); Gmail requires 2-Step Verification to be enabled before creating one.
- Update phone, email and WhatsApp in `src/lib/site-config.ts`.
- Replace `public/images/hero-quran-class.jpg` (and `og-image.jpg`, 1200x630) with a real photo if you have one.
- `src/app/api/enroll/route.ts` only logs trial requests: connect MongoDB or email there if you want enrollment notifications.
