# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — dev server (Turbopack) at http://localhost:3000
- `npm run build` / `npm start` — production build / serve
- `npm run lint` — `next lint` (ESLint 9 flat config in `eslint.config.mjs`)

No test framework is configured. Plain JavaScript (JSX), no TypeScript; `@/*` maps to `src/*` (see `jsconfig.json`).

## Architecture

Next.js 15 App Router site (React 19, Tailwind v4, antd, lucide-react) for Area36, a vacation-rental brand for chalets/villas in the Qafqaz region of Azerbaijan (production domain `area36.az`).

**i18n (next-intl):** Locales `en` (default) and `az`, with `localePrefix: 'always'` ([src/i18n/routing.js](src/i18n/routing.js)). All pages live under `src/app/[locale]/`. [src/middleware.js](src/middleware.js) excludes `api`, `_next`, and any path containing a dot. UI strings and per-property text live in [messages/en.json](messages/en.json) and [messages/az.json](messages/az.json); always add keys to both. Use `Link`/`useRouter` from `@/i18n/routing`, not `next/link`.

**Property data is split in two places:**
- [src/components/data/homes.js](src/components/data/homes.js) — static, non-translatable fields (slug, price, images, geo, owner, Airbnb IDs, Beds24 prop/room IDs, `features` array of English keys).
- `messages/*.json` under `Homes.<slug>` — translated `title`, `description`, `location`, `type`, and `features.<feature key>`. Each entry in `home.features` must have a matching key in `Homes.<slug>.features` in both locale files, or the detail page renders a missing-translation string.

Adding a property = new entry in `homes.js` + `Homes.<slug>` block in both message files + images under `public/images`. The detail page [src/app/[locale]/[slug]/page.js](src/app/[locale]/[slug]/page.js) uses `generateStaticParams` with `dynamicParams = false`, so slugs come only from `homes.js`. It also generates SEO metadata and JSON-LD (`VacationRental`); `getFeatureIcon` there maps feature text (English and Azerbaijani substrings) to lucide icons.

**Booking & availability (Beds24 only, no iCal):** Three homes (Royal, Family, Golden Loft) carry `beds24PropId` and `beds24RoomId` in `homes.js`; other homes have no calendar (sidebar shows the "no calendar" notice). All data is read live from the Beds24 API v2 with a read-only token in env `BEDS24_TOKEN` (also set in Vercel; it is a Beds24 long life token: it never expires while in use (it only expires after 90 days of no use). If it is revoked, the API returns 401/403, the routes log `BEDS24_AUTH_FAILED` and the UI shows the calendar-unavailable message; create a new long life token in Beds24 and update `.env.local` and Vercel `BEDS24_TOKEN`).
- [BookingSidebar](src/components/Booking/BookingSidebar.jsx) calls `GET /api/calendar?slug=...` ([route](src/app/api/calendar/route.js)): booked nights (`numAvail = 0`), per-day `minStay`, and the room's `maxPeople` (caps the adults + children stepper). There is no fallback source; any failure returns 502 and the UI shows `Details.calendarUnavailable`.
- `GET /api/offer?slug&arrival&departure&adults&children` ([route](src/app/api/offer/route.js)) returns the final stay price from Beds24 `/inventory/rooms/offers` (AZN); the sidebar's "Total" shows this value, never a locally computed sum.
- "Continue" goes to `/[locale]/[slug]/book` ([page](src/app/[locale]/[slug]/book/page.js)), which embeds the Beds24 `booking2.php` iframe ([Beds24Embed](src/components/Booking/Beds24Embed.jsx)) with `checkin`, `numnight`, `numadult`, `numchild`, `br1-<roomId>=Book`. The guest form, final price and booking happen inside Beds24.
- **Language:** only the Beds24 `lang` param differs from the site locale: `az` -> `lang=tr` (the Azerbaijani texts are stored in Beds24's Turkish slot), `en` -> `lang=en`. `<html lang>` and hreflang stay `az`/`en`.
- Adding a Beds24 home = `beds24PropId` + `beds24RoomId` in `homes.js`.

**Payments:** the sidebar no longer has a deposit button. Reservations are made in the Beds24 form (no payment there; Beds24 emails the guest, then the owner collects the deposit via WhatsApp). `POST /api/payment` (Epoint) and the pages under `src/app/[locale]/payment/` still exist but are unused.

**Other config:** [next.config.mjs](next.config.mjs) holds permanent redirects for renamed slugs (area36-* ↔ qafqaz-*), a www→apex redirect, security headers, and immutable caching for `/images/*`. When renaming a slug, add a redirect there. `robots.js` and `sitemap.js` in `src/app/` generate SEO files.
