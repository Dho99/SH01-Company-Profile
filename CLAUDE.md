# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️ Next.js version warning

This project runs **Next.js 16.2.9 with React 19**. Per `AGENTS.md`, this Next.js has breaking changes versus older versions — APIs, conventions, and file structure may differ from training data. **Read the relevant guide in `node_modules/next/dist/docs/` before writing Next.js-specific code.** Heed deprecation notices.

## Commands

```bash
npm run dev      # start dev server at http://localhost:3000
npm run build    # production build
npm run start    # serve production build
npm run lint     # eslint (flat config, eslint-config-next core-web-vitals + typescript)
```

No test framework is configured.

## Architecture

Single-page marketing site for "LEXA Software House" built on the Next.js App Router. There is one route (`app/page.tsx`) that composes the whole landing page from section components in fixed order: `Navbar → Hero → Stats → About → Services → Portfolio → Technologies → WhyChoose → Testimonials → Footer`, plus a floating `ScrollToTop`.

Key structural conventions:

- **Content lives in `lib/site.ts`, not in components.** All copy, nav links, stats, services, projects, technologies, testimonials, and footer nav are exported as `as const` data objects. Edit content there — section components only render it. To keep this module JSX-free, **icons are referenced by string id** (e.g. `icon: "rocket"`) and each section maps those ids to `lucide-react` components locally (see `components/sections/stats.tsx` for the pattern). When adding a data item with an icon, add the matching entry to the section's local `icons` map too.

- **Component layers** under `components/`:
  - `ui/` — shadcn/ui-style primitives (`button`, `card`, `badge`, `input`). `Button` uses `class-variance-authority` variants and a `data-slot` attribute; `asChild` swaps the element for a Radix `Slot`.
  - `sections/` — full landing-page sections, each reads from `lib/site.ts`.
  - `layout/` — `navbar` (the only `"use client"` component, holds mobile-menu `useState`) and `footer`.
  - `brand/logo.tsx` — `Logo` + inline-SVG `LogoMark`, with `dark`/`light` variant for placement on light vs. dark surfaces.
  - `section-heading.tsx`, `scroll-to-top.tsx` — shared helpers.

- **Server components by default.** Add `"use client"` only when interactivity is needed (currently only `navbar`).

## Styling

- **Tailwind CSS v4**, configured entirely in `app/globals.css` via `@import "tailwindcss"` and `@theme inline` — there is no `tailwind.config.js`. Add design tokens by defining a CSS variable in `:root`/`.dark` and exposing it under `@theme inline`.
- Colors use **oklch** and a custom brand palette beyond shadcn defaults: `brand`, `brand-soft`, `navy`, `navy-deep`, `navy-foreground` (use as `bg-brand`, `text-navy-deep`, etc.). Dark mode is variable-driven via the `.dark` class (`@custom-variant dark`).
- Merge classes with `cn()` from `lib/utils.ts` (clsx + tailwind-merge). Custom utilities `.bg-network-grid` (hero dotted backdrop) and `.no-scrollbar` are defined at the bottom of `globals.css`.
- Fonts: Inter via `next/font/google` bound to `--font-sans` in `app/layout.tsx`.

## Imports

Path alias `@/*` maps to the project root (e.g. `@/components/...`, `@/lib/site`).

## CMS Build Plan

Goal: make all landing-page content editable via an authenticated `/admin` CMS backed by PostgreSQL (Prisma ORM + `@auth/prisma-adapter`, NextAuth/Auth.js v5 **Credentials** login, JWT sessions). Landing is rewired to read from the DB; a seed migrates current `lib/site.ts` content so the site looks identical on first run. Full plan: `C:\Users\Lenovo\.claude\plans\analisislah-struktur-landing-page-rippling-sundae.md`.

Work **one step at a time, on explicit go-ahead**. Tick `- [x]` as each step lands.

### Next.js 16 constraints (verified in `node_modules/next/dist/docs/`)
- Use `proxy.ts` (Node runtime), not `middleware.ts`. Primary admin guard is the layout `await auth()` + redirect.
- `cookies()` / `headers()` / route `params` / `searchParams` are **async** — always `await`.
- `cacheComponents` on by default. Public reads: `'use cache'` + `cacheTag('cms:<entity>')` + `cacheLife`; mutations call `revalidateTag('cms:<entity>', 'max')` (2-arg form). Fallback: `<Suspense>` + uncached reader.
- `next.config.ts`: `serverExternalPackages: ['@prisma/client']`.

### Data model (Prisma → PostgreSQL)
- **Auth (adapter models):** `User` (+`passwordHash`, `role Role @default(ADMIN)`), `Account`, `Session`, `VerificationToken`, `enum Role { ADMIN EDITOR }`.
- **`SiteSetting`** singleton: contact/social (name, tagline, email, phone, location, linkedin, instagram, facebook, youtube) + prose copy — hero (eyebrow, heading, highlight, description, primary/secondary CTA label+href), about (eyebrow, heading, description, commitmentTitle, commitmentText, cta label+href), footer (tagline, newsletterTitle, newsletterText).
- **`SectionHeading`**: `key @unique` (services|portfolio|technologies|whyChoose|testimonials) + eyebrow + title.
- **List entities** (each `sortOrder Int`, `published Boolean @default(true)`, timestamps): `Stat`(icon,value,label) · `AboutPoint`(text) · `Service`(icon,title,description) · `Project`(category,title,description) · `Technology`(icon,label,color) · `Reason`(icon,title,description) · `Testimonial`(quote,name,role) · `NavLink`(label,href,hasDropdown,`group` enum HEADER|FOOTER_NAV|FOOTER_SERVICE).
- **Icon integrity:** id→component maps stay in section components; valid-id lists centralized in `lib/cms/icons.ts` (used by zod + admin `<select>`). Whitelists: stats[rocket,clients,team,calendar] · services[code,mobile,system,design,consulting,support] · reasons[quality,team,delivery,satisfaction,support] · technologies[laravel,react,nextjs,vue,flutter,node,php,python,mysql,aws,docker,git] · project category[Corporate,E-Commerce,Logistics,Education].

### Checklist
- [x] **0. Embed plan into CLAUDE.md** (this section).
- [x] **1. Deps & config** — add `next-auth@beta`, `@auth/prisma-adapter`, `@prisma/client`, `bcryptjs`, `zod`, `@prisma/adapter-pg`, `pg`, `dotenv`; dev `prisma`, `tsx`, `@types/bcryptjs`. `next.config.ts` serverExternalPackages + cacheComponents. `.env.example`. `prisma.config.ts` with datasource.
- [x] **2. Prisma schema** — auth + CMS models + enums; `prisma generate` (Prisma 7, `prisma-client-js` generator).
- [x] **3. DB client** — `lib/db.ts` singleton (`@prisma/adapter-pg` adapter + hot-reload guard).
- [x] **4. Auth** — `lib/auth.ts` (Credentials + PrismaAdapter + JWT + role callbacks); `app/api/auth/[...nextauth]/route.ts`.
- [x] **5. Icon + zod layer** — `lib/cms/icons.ts` (valid-id lists), `lib/cms/schemas.ts` (all entity schemas).
- [x] **6. Query layer** — `lib/cms/queries.ts` (cached public readers + tags; uncached admin readers).
- [x] **7. Seed** — `prisma/seed.ts` from `lib/site.ts` + all section copy + admin user.
- [x] **8. Rewire landing** — all `components/sections/*` + `navbar`/`footer` → async DB-backed; `generateMetadata` in `app/layout.tsx` from DB.
- [x] **9. Login flow** — `app/(admin)/login` page + server actions (`lib/actions.ts`).
- [x] **10. Admin shell** — `app/(admin)/admin/layout.tsx` guard + sidebar + dashboard page.
- [x] **11. Singleton editors** — `SiteSetting` form (full 27-field form), `SectionHeading` form, all with `useActionState` + revalidateTag.
- [x] **12. List CRUD ×8** — stats, aboutPoints, services, projects, technologies, reasons, testimonials, navLinks: list + create + edit + delete; shared `lib/cms/crud-actions.ts` + `components/admin/crud-form.tsx`.
- [x] **13. Optional `proxy.ts`** — `/admin` matcher with cookie-based guard.
- [x] **14. Polish** — `npm run lint` clean, `tsc --noEmit` clean, `useActionState` error surfacing.

### Verification (needs user-supplied `DATABASE_URL`)
`npm install` → fill `.env` → `npx prisma migrate dev --name init` → `npx prisma db seed` → `npm run dev`: `/` renders identically (seed parity); `/admin` redirects to `/login`; sign in; edit content → reload `/` shows changes; sign out re-gates `/admin`; `npm run lint` clean.
