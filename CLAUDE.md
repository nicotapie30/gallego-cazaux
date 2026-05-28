# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server (localhost:3000)
npm run build    # production build
npm run lint     # eslint
npm run start    # production server (after build)
```

## Architecture

Next.js 16 App Router + React 19 + Tailwind v4 + TypeScript (strict). Real estate landing for Gallego Cazaux Negocios Inmobiliarios — Santa Rosa, La Pampa.

**Route structure:**
- `/` — Hero, featured properties, services, CTA
- `/propiedades` — Client component with sidebar filters (operation, type, price, bedrooms, city)
- `/propiedades/[slug]` — Property detail with gallery lightbox
- `/blog`, `/contacto`, `/faq`, `/sobre-nosotros`, `/privacidad`, `/terminos`
- `src/app/api/contact/route.ts` — POST handler (Resend integration — currently commented out)

**Data layer — mock → Sanity:**
All pages use inline mock arrays. Sanity client is configured in `src/lib/sanity.ts` but env vars are missing. When replacing mocks, use the query functions there and set:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
```

**Contact form email:**
`api/contact/route.ts` has Resend wired but disabled. Uncomment and set `RESEND_API_KEY` to activate.

## Design system

Colors defined as CSS variables in `src/app/globals.css` via `@theme inline`:
- Primary: `#018f33` (green — buttons, CTAs)
- Secondary: `#05103d` (dark blue — headings)
- Background: white / `#f8fafc` alternate

Fonts (Next.js `next/font/google`): Outfit (headings) + DM Sans (body) + JetBrains Mono (mono). Never swap to Inter/Roboto.

## Icons

- `lucide-react` — primary icon lib (imported via `src/lib/icons/index.ts`)
- `@phosphor-icons/react` — secondary
- `@icons-pack/react-simple-icons` — brand icons (Instagram only)
- Never emojis as icons

## Key business context

- WhatsApp: `+54 2954 272138` (pre-filled messages in property detail + header CTA)
- All user-facing text in Spanish (Argentine)
- Prices in ARS
- No auth — public landing + contact

## Types

`src/lib/types.ts` defines: `Property`, `Post`, `FAQ`, `PropertyFilters`. Extend here before adding new data shapes.

## Git hygiene — AI/dev tooling files

Never commit these — always in `.gitignore`:
- `.playwright-mcp/` — Playwright MCP logs/snapshots
- `.claude/settings.local.json` — local Claude permissions
- `openspec/` — OpenSpec spec artifacts
- Screenshot files generated during verification (e.g. `hero-*.png`)

If a new AI/dev tooling file appears → add it to `.gitignore` before committing.
