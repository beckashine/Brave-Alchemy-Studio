# Brave Alchemy Studio

> Websites for businesses that don't want boring websites.

**Live site:** [www.bravealchemystudio.com](https://www.bravealchemystudio.com)

Marketing site and client-intake system for a solo web design studio. A single-scroll homepage paired with a multi-step "Start a Project" order form that validates input, blocks spam, and emails real submissions — no third-party form builder or CMS involved.

## Features

- **Single-scroll homepage** — hero, services, before/after showcase, and CTA sections built to match an approved design mockup, with a terminal/monospace visual identity and restrained scroll/hover motion (Framer Motion).
- **Multi-step order form** (`/start-a-project`) — branches between "Website" and "Digital Ops" project types, with conditional fields, client-side + server-side validation (Zod), and a review step before submission.
- **Server-validated email delivery** — the form's Route Handler re-validates every submission against the same Zod schema before sending, so the API can't be bypassed by a malformed or malicious request. On success it sends a formatted notification to the studio and a confirmation to the client (Resend).
- **Spam protection** — honeypot field on the form; bots that fill it get a fake success response with no email sent.
- **Typed content model** — pricing tiers, service rules, and FAQ copy live in typed local data files (`/data`), sourced from the studio's actual pricing/service docs rather than hardcoded into components, so copy and numbers can't drift out of sync across sections.
- **No payment fields in the form** — pricing is invoiced manually via PayPal after scope is confirmed, by design (see `docs/reference/service-rules.md`).

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router), TypeScript |
| Styling | Tailwind CSS |
| Motion | Framer Motion |
| Forms | React Hook Form + Zod |
| Email | Resend |
| Icons | lucide-react |
| Deploy | Netlify |

## Project structure

```
app/                    routes: homepage, /about, /start-a-project, API route for form submission
components/redesign/    homepage + shared layout (header/footer) sections
components/form/        multi-step order form wizard, fields, confirmation screen
components/ui/          shared low-level UI primitives (button, card, etc.)
data/                   typed content: pricing, service rules, order-form schema, nav
lib/email.ts            Resend email templates + send functions
docs/reference/         source-of-truth docs the data files are translated from
roadmap.md              full build plan (phases, design tokens, content model)
```

## Running locally

```bash
npm install
npm run dev
```

Set these in `.env.local` to enable email sending — without `RESEND_API_KEY`, the app still runs but the form submission endpoint returns an error instead of sending mail:

```
RESEND_API_KEY=
RESEND_FROM_EMAIL=
STUDIO_NOTIFICATION_EMAIL=
```

## Notes

See `roadmap.md` for the full build plan and design-token rationale.
