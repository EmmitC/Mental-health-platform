# SereneMind: mental health platform

Next.js (App Router) + React 19 + Tailwind CSS v4 + Motion.

## Commands

- `npm run dev`: dev server (`next dev`)
- `npm run build`: production build
- `npm run typecheck`: `tsc --noEmit`

## Structure

- `src/app/`: routes. Route groups give each area its own shell: `(public)`, `(client)`, `(counselor)`, `(admin)`. `login`, `register`, `booking/[[...id]]` and `session-lobby` sit outside those groups.
- `src/views/`: page components. Each takes a `navigate(page, params?)` prop and is rendered by a thin route wrapper in `src/app`.
- `src/components/`: shared UI (`Nav`, sidebars, `Shells` for layouts and role gates, `Icon`, `Toast`) and `animation/` helpers (`Reveal`, `Counter`, `ProgressRing`).
- `src/lib/nav.tsx`: `Page` ids, the page-to-URL map, and `AppProvider` (demo role session in `sessionStorage`, `navigate`, `signIn`, `signOut`).
- `src/lib/motion.ts`: shared easing, spring and variant tokens.
- `src/data/`: mock data and the booking calendar helper.
- `src/app/globals.css`: Tailwind v4 import and theme tokens (Freud-inspired palette, Urbanist).

## Conventions

- Views and components using hooks or browser APIs start with `"use client"`.
- Export components as default exports.
- Use double quotes for strings containing apostrophes.
- Use tokens from `globals.css` (`sage`, `slate`, `ember`, `sun`, ...), not raw hex, except one-off shadows.
- Motion: reuse `src/lib/motion.ts`; animate transform and opacity; respect reduced motion (`MotionConfig` is set in `AppProvider`).
- Auth is a demo only. Portals are gated client-side in `components/Shells.tsx`; there is no real backend.
