# Brave Alchemy Studio — Project Context

Marketing site + functional client-intake system for a solo web design studio ("Websites for businesses that don't want boring websites"). Single-scroll homepage + a multi-step "Start a Project" order form that emails real submissions.

**Before doing any work, read `roadmap.md`** — it's the full build plan (phases, file structure, design tokens, content model, order-form spec). This file is just the quick-reference summary Claude Code should keep in context.

## Stack
Next.js 14+ (App Router) · TypeScript · Tailwind CSS · Framer Motion · React Hook Form + Zod · Resend (email) · lucide-react · deployed on Vercel.

## Source content — read before writing data files
Don't invent copy for pricing, features, or FAQ answers. Real content lives in:
- `docs/reference/pricing-node-network-system.md` → `data/website-packages.ts`
- `docs/reference/digital-ops-offerings.md` → `data/digital-ops.ts`
- `docs/reference/client-order-form.md` → `data/order-form-schema.ts`
- `docs/reference/service-rules.md` → `data/service-rules.ts` (also backs FAQ + form confirmation copy)
- `docs/design/homepage-mockup.png` → visual reference for every homepage section's layout, spacing, and component style

## Naming
The product category is **Digital Ops** (Dashboard / Digital Assistant / AI Operations tiers). The source doc is titled "AI Automation Offerings" — don't reintroduce "Automations" as a user-facing label anywhere in code, copy, or file names.

## Design tokens (see roadmap.md §1 for full rationale)
```css
--bg: #060706;
--surface: #0a0b0a;
--border: #1f2a1a;
--text-primary: #eaeaea;
--text-muted: #9a9a95;
--accent: #c8e619;
--accent-dim: #8a9e12;
--accent-fg: #0a0b06;
```
Monospace type throughout (JetBrains Mono / Space Mono / IBM Plex Mono). Motion stays restrained — fade/slide on scroll, ~150–200ms hover transitions, no bounce.

## Working conventions
- Follow the phase order in `roadmap.md` §9 — don't jump to the order-form backend before the static homepage exists.
- Content/pricing/copy comes from `docs/reference/*.md`, not invented.
- Flag anything in `roadmap.md` §10 (Open Questions) rather than guessing — e.g. don't assume the 4 portfolio pieces are real clients.
- No payment fields anywhere in the order form — PayPal invoicing is manual, off-site, per `service-rules.md`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
