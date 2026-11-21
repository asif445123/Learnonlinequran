# Learn Online Quran Academy

Next.js (App Router, TypeScript) + Tailwind CSS + SweetAlert2.

## Run
    npm install
    npm run dev      # http://localhost:3000
    npm run build && npm start

## Before going live
- Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to your real domain.
- Update phone, email and WhatsApp in `src/lib/site-config.ts`.
- Replace `public/images/hero-quran-class.jpg` (and `og-image.jpg`, 1200x630) with a real photo if you have one.
- `src/app/api/enroll/route.ts` only logs requests: connect MongoDB or email there.
