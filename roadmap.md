# Brave Alchemy Studio — Website Build Roadmap

> Websites for businesses that don't want boring websites.
> Clean code. Intentional design. Websites that work.

This roadmap turns the four reference docs (`Pricing NODE/NETWORK/SYSTEM`, `AI Automation Offerings`, `Client Order Form`, `Service Rules`) plus the homepage mockup into a buildable Next.js project. It's meant to be worked top-to-bottom, phase by phase, in Claude Code or your editor of choice.

---

## 0. Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 14+ (App Router)** | file-based routing, Route Handlers for the form backend, easy Vercel deploy |
| Language | **TypeScript** | the content model (packages, digital ops, form schema) is structured data — types catch mistakes before they hit prod |
| Styling | **Tailwind CSS** | fast to match a token-driven design system like this one |
| Motion | **Framer Motion** | blinking cursor, hover lifts, scroll-reveals, accordion open/close |
| Forms | **React Hook Form + Zod** | multi-step wizard + conditional fields + validation, per the Order Form doc |
| Email | **Resend** (Nodemailer as fallback) | send the intake form to you + a confirmation to the client, no separate backend needed |
| Icons | **lucide-react** | thin-line icons match the `</>`, target, lightning-bolt, terminal-glyph style in "Why Work With Me" |
| Deploy | **Vercel** | zero-config Next.js hosting, easy env vars, custom domain |

No CMS for v1 — pricing, packages, FAQ, and case studies live in typed local files (`/data`). You're the only content editor right now, so a CMS is overhead you don't need yet. Revisit if you start updating content weekly or bring on help (see Phase 10).

---

## 1. Design System

Sampled from the mockup — treat hex values as close approximations and eyeball-correct once you're in the browser:

```css
--bg:            #060706;   /* near-black, slight cool tint */
--surface:       #0a0b0a;   /* cards, slightly lifted from bg */
--border:        #1f2a1a;   /* thin hairline borders on cards/inputs */
--text-primary:  #eaeaea;
--text-muted:    #9a9a95;
--accent:        #c8e619;   /* neon lime-yellow-green — brand accent */
--accent-dim:    #8a9e12;   /* muted variant used in body copy accents */
--accent-fg:     #0a0b06;   /* text color ON solid accent buttons */
```

**Typography**
- Headers, nav, labels, prices, the `BA:~$` prompt, `// SECTION LABEL` eyebrows → **monospace** (JetBrains Mono, Space Mono, or IBM Plex Mono)
- Body copy → same mono, or a clean sans (Inter) if pure-mono body text feels too dense at paragraph length. Test both — the mockup reads as all-mono.

**Recurring UI patterns to componentize early**
- `SectionLabel` — `// SECTION HEADING` eyebrow, small caps, accent color
- `TerminalPrompt` — `BA:~$` badge used in the nav logo
- `BlinkingCursor` — the `_` underscore that blinks after "boring websites." and inside button labels like `START A PROJECT_`
- `BorderedCard` — 1px accent-tinted border, transparent/dark fill, used for feature cards, pricing cards, FAQ rows
- `ArrowLink` — text + `→` that shifts right on hover (portfolio cards, "VIEW MORE WORK", CTA banner)
- `PlusMinusAccordion` — FAQ rows, `+` rotates to `×` on open

Keep motion restrained: fade/slide-up on scroll into view, ~150–200ms hover transitions, cursor blink on a ~1s loop. Nothing bouncy — the brand is "clean code," not playful.

---

## 2. Content Model

Each reference doc becomes one typed data file. This is the actual translation work — do this before building sections, since components should just *map over* this data, not hardcode copy.

```
data/
  website-packages.ts   ← Pricing NODE/NETWORK/SYSTEM doc
  digital-ops.ts        ← AI Automation Offerings doc
  service-rules.ts       ← Service Rules doc (payment, revisions, timeline, domain, scope, 3rd-party)
  order-form-schema.ts   ← Client Order Form doc, as a Zod schema + step config
  faq.ts
  work.ts                ← portfolio case studies
  nav.ts
```

**`website-packages.ts`** — NODE ($500) / NETWORK ($1,200) / SYSTEM ($2,000+), each with: name, price, tagline, features[], "best for" line (NODE only), included revisions, standard/functional page add-on pricing ($400 / $800 / custom quote).

**`digital-ops.ts`** — DASHBOARD ($750+) / DIGITAL ASSISTANT ($1,200+) / AI OPERATIONS ($3,500+), each with: name, price, tagline (*"See your business."* / *"Ask your business."* / *"Automate your business."*), features[], examples[]. Also carry over the pricing-driver notes (data sources, integrations, workflow complexity) — useful as tooltip/expandable copy so visitors understand why "+".

**`service-rules.ts`** — structured version of payment (50/50 split), revisions per tier, timeline (1–3 weeks, starts after content + deposit received), domain/hosting (client-owned), scope-change policy, third-party cost responsibility. This single source of truth powers the FAQ answers *and* the order-form confirmation screen copy, so the numbers can't drift out of sync between sections.

**`order-form-schema.ts`** — the multi-step form structure (detailed in §6).

**`work.ts`** — Verde Plants, Ironwell Coffee, Lumen Studio, Beacon Creative. ⚠️ **Confirm before launch**: are these real past clients (need permission + live links) or placeholder examples (need relabeling, e.g. "Concept" or swap for real work)? Flag this — don't ship placeholder client names as if real.

---

## 3. Site Map

The mockup reads as a single scrolling homepage with anchor-linked nav (`WORK`, `SERVICES`, `PROCESS`, `ABOUT`, `FAQ`). Two things aren't fully resolved by the screenshot — decide these before Phase 1:

- **`ABOUT`** — the nav has an About link but no distinct "About" section appears in the mock. Either (a) repurpose "Why Work With Me" as the About anchor, or (b) design a short About block (your photo/bio, already hinted at in the footer's "BA" mark + tagline). Recommend (b) — a sentence or two of real bio builds more trust than a repurposed features grid.
- **Digital Ops** — not present in the mockup at all. See §5 for where it slots in.

```
/                    home (all sections, single scroll)
/start-a-project     multi-step order form (own route — shareable, cleaner on mobile than a modal)
/work                optional: full portfolio grid ("VIEW MORE WORK" destination)
```

Keep `/work` as a stub in v1 if you only have 4 case studies — the homepage grid may be enough until the portfolio grows.

---

## 4. Homepage — Section by Section

| Section | Source | Notes |
|---|---|---|
| **Header/Nav** | mock | Sticky, `BA:~$ BRAVE ALCHEMY STUDIO_` logo, 5 nav links, bordered `START A PROJECT_` button (top-right) |
| **Hero** | mock | H1 with accent underscore cursor, subhead, primary CTA button, illustration (right side, static image asset), `system.ready` / `BAStudio // v1.0` footer strip inside the hero card |
| **Why Work With Me** | mock | 4-up grid: Clean Code / Intentional Design / Built to Perform / Direct Collaboration — icon + label + 2-line description each |
| **Selected Work** | `work.ts` | 4-up card grid, image + title + category tags + arrow link; "VIEW MORE WORK_" button below |
| **Choose Your Build** | `website-packages.ts` + `digital-ops.ts` | See §5 — this is where Digital Ops needs to slot in |
| **How It Works** | mock (4 numbered steps) | 01 Tell me what you need → 02 Pick your build → 03 I build it right → 04 You launch with confidence, plus a closing CTA banner |
| **FAQ** | `faq.ts` (backed by `service-rules.ts`) | Accordion list left, sticky "Ready to Start" CTA card right |
| **Footer** | mock | Logo/tagline, Navigation column, Connect column (email, socials), copyright line |

---

## 5. Where Digital Ops Fits (per your answer: build it now)

The homepage mock only shows the website-build packages (NODE/NETWORK/SYSTEM). Since Digital Ops is a separate revenue line with its own pricing and framing, don't bolt it awkwardly onto the same card row. Recommended approach:

**Tab switch inside "Choose Your Build."** Keep one section, add a small toggle above the pricing cards: `WEBSITES` / `DIGITAL OPS`. Switching swaps the three cards (NODE/NETWORK/SYSTEM ↔ DASHBOARD/DIGITAL ASSISTANT/AI OPERATIONS) with a quick crossfade. This keeps the `SERVICES` nav anchor meaningful without adding a whole new page, and reuses the `BorderedCard` component as-is.

This also means **Step 1 of the order form needs a fork**: "What do you need?" → *Website* or *Digital Ops* → then show the matching three tiers. ⚠️ The Order Form reference doc only covers website-intake questions (business/goals, existing assets, design direction, functional requirements). It has **no equivalent qualifying questions for Digital Ops** (e.g. what tools/data sources they currently use, what the assistant should know, what systems need connecting). That intake content doesn't exist yet — you'll need to draft it. Suggested minimum set to start:

- Which Digital Ops type? (Dashboard / Digital Assistant / AI Operations)
- What tool(s)/data source(s) does this connect to today? (spreadsheets, CRM, POS, etc.)
- What should it do, in your own words?
- Any existing accounts/APIs we'll need access to?

---

## 6. "Start a Project" Order Form — Functional Spec

Since you want this fully functional at launch, this is the highest-effort section. Build the UI first (Phase 4), wire the backend after (Phase 5) — don't do both at once.

**Flow (per Order Form doc, with the Digital Ops fork added):**

1. **Choose your build** — Website vs Digital Ops → tier cards (price + summary shown inline, reuses `website-packages.ts` / `digital-ops.ts`)
2. **Client information** — Name*, Business name*, Email*, Phone, Business website, Social links
3. **Business + goals** — free-text business description, goals (multi-select: more customers, leads, newsletter, showcase work, sell products, bookings, orders, info, other)
4. **Existing assets** — multi-select (logo, brand colors/fonts, photos, written content, socials, domain, hosting, "nothing yet") + free-text "anything else"
5. **Design direction** — free-text style/vibe + inspiration links
6. **Functional requirements** — ⚠️ **conditionally rendered**: only show if SYSTEM tier selected, OR a functional-page add-on chosen, OR the Digital Ops branch was picked (with its own question set from §5). Options: online store, cart, checkout, booking, payments, client login, calculator/tool, API integration, database, other + free-text "what should it do"
7. **Timeline** — preferred launch (ASAP / 2 weeks / 1 month / no deadline / specific date), with the note that this is a requested target, not a guarantee
8. **Review + submit** — recap of selections, then `SUBMIT PROJECT REQUEST`

**Conditional logic to implement in `order-form-schema.ts`:**
- Step 1 branch (Website/Digital Ops) changes which tiers show in-step and which downstream questions appear in Step 6
- Step 6 only renders per the trigger conditions above — otherwise skip straight to Step 7
- Required fields enforced client-side (Zod) before advancing steps, not just on final submit

**Submission handling (no on-site payment — PayPal invoicing stays manual per Service Rules):**
- `POST /api/submit-project` (Route Handler)
- Send a formatted email to `hello@bravealchemystudio.com` with all answers
- Send an auto-confirmation email to the client: *"Got it — I'll review your request and follow up with pricing confirmation and a PayPal invoice for your deposit."* (matches the documented flow: review → confirm scope/pricing → PayPal request → deposit → project begins)
- Honeypot field (or Turnstile) for spam — no need for anything heavier at this scale
- On success: swap the form for a styled confirmation state matching the brand voice — don't just alert() or redirect to a blank page

**Explicitly out of scope for the form:** no payment fields, no card input, no PayPal SDK embed. The docs are clear that PayPal is handled off-site after manual quote confirmation — don't let the form imply otherwise.

---

## 7. Environment & Integrations Checklist

- [ ] `RESEND_API_KEY` (or chosen provider) + verified sending domain for `bravealchemystudio.com`
- [ ] Confirm destination inbox: `hello@bravealchemystudio.com`
- [ ] Vercel project created, env vars set (dev + prod)
- [ ] Custom domain connected + DNS (A/CNAME + email sending records — SPF/DKIM if sending from your domain)
- [ ] Analytics decision (Vercel Analytics or Plausible — lightweight, fits the "clean" brand better than GA4)
- [ ] Confirm real social handles for footer icons (Instagram, X, LinkedIn, GitHub shown in mock — verify all four are actually in use)
- [ ] Spam protection key (Turnstile site/secret key, if used)

---

## 8. Proposed Folder Structure

```
app/
  layout.tsx
  page.tsx                    ← homepage, composes section components
  start-a-project/
    page.tsx
  work/
    page.tsx                  ← optional full portfolio
  api/
    submit-project/
      route.ts                ← form submission handler
components/
  layout/
    Header.tsx
    Footer.tsx
  sections/
    Hero.tsx
    WhyWorkWithMe.tsx
    SelectedWork.tsx
    ChooseYourBuild.tsx       ← includes Website/Digital Ops tab switch
    HowItWorks.tsx
    Faq.tsx
  ui/
    BorderedCard.tsx
    SectionLabel.tsx
    BlinkingCursor.tsx
    ArrowLink.tsx
    PlusMinusAccordion.tsx
  form/
    StepWizard.tsx
    steps/
      Step1BuildChoice.tsx
      Step2ClientInfo.tsx
      Step3BusinessGoals.tsx
      Step4ExistingAssets.tsx
      Step5DesignDirection.tsx
      Step6FunctionalRequirements.tsx
      Step7Timeline.tsx
      Step8Review.tsx
data/
  website-packages.ts
  digital-ops.ts
  service-rules.ts
  order-form-schema.ts
  faq.ts
  work.ts
  nav.ts
lib/
  email.ts                    ← Resend client + templates
  validation.ts                ← shared Zod schemas
```

---

## 9. Build Phases

- [ ] **Phase 0 — Setup**: `create-next-app` (TS + Tailwind + App Router), fonts, Tailwind theme config with the design tokens from §1, base layout shell
- [ ] **Phase 1 — Static homepage skeleton**: Header/Nav, Hero, Why Work With Me, Footer — get the look and feel right before building everything else
- [ ] **Phase 2 — Data-driven sections**: Selected Work grid, Choose Your Build (with Website/Digital Ops tab switch), How It Works, FAQ accordion — all reading from `/data`
- [ ] **Phase 3 — Motion + responsive pass**: blinking cursor, hover states, scroll-reveal, mobile/tablet breakpoints for every section built so far
- [ ] **Phase 4 — Order form UI**: full step wizard, all fields, conditional Step 6 logic, client-side validation — no backend yet, log submissions to console
- [ ] **Phase 5 — Order form backend**: Route Handler, email delivery (studio + client confirmation), honeypot/spam protection, error states, real end-to-end test
- [ ] **Phase 6 — Content finalization**: confirm/replace portfolio case studies, write real About copy, verify all social links and the contact email
- [ ] **Phase 7 — SEO + performance**: metadata, OG image, sitemap.xml, robots.txt, `next/image` everywhere, Lighthouse pass
- [ ] **Phase 8 — Accessibility + QA**: keyboard nav through the form wizard, contrast check on lime-on-black text, aria-labels on icon-only buttons, cross-browser check
- [ ] **Phase 9 — Deploy**: Vercel + custom domain + verified sending domain, smoke-test the live form
- [ ] **Phase 10 — Post-launch**: analytics review, author the Digital Ops intake questions properly if they're still placeholder, evaluate a lightweight CMS if content updates become frequent

---

## 10. Open Questions To Resolve Before/During Build

- [ ] Exact brand hex codes + font family — this roadmap's values are sampled from a compressed screenshot; confirm against your source design file if one exists
- [ ] Where About content lives (repurpose "Why Work With Me" vs. new section)
- [ ] Are the 4 portfolio pieces real clients (need live links/permission) or placeholders (need relabeling)?
- [ ] Digital Ops order-form questions — need to be authored, current doc doesn't cover them
- [ ] Do submissions need to persist anywhere beyond email (e.g. a simple Airtable/Sheet log for your own records), or is email-only sufficient for v1?
