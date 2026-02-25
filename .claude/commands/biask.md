# biask — Session Loader

Read these files to understand the current project state:

1. `MEMORY.md` — Full project context, design decisions, architecture, outreach status
2. `src/lib/conflicts/index.ts` — Conflict registry (all topics)
3. `src/components/ConflictTimeline.tsx` — Client component for timeline pages
4. `src/app/[conflict]/page.tsx` — Server component with generateStaticParams
5. `src/app/page.tsx` — Landing page
6. `src/app/about/page.tsx` — "What We Believe" (Superlinear Framework distilled)
7. `src/components/Header.tsx` — Unified site-wide nav (topic pills, active state, mobile menu)
8. `src/components/DisclosureBanner.tsx` — Pre-launch disclosure
9. `src/app/globals.css` — Design tokens (@theme)
10. `src/lib/types.ts` — TypeScript interfaces
11. `src/components/FlowOverlay.tsx` — Shared modal (progress bar, step counter)
12. `src/components/ReviewFlow.tsx` — 5-step review → GitHub Issue
13. `src/components/SubmitConflictFlow.tsx` — 5-step conflict submission → GitHub Issue
14. `functions/api/review.ts` — CF Pages Function: review → GitHub Issue
15. `functions/api/submit-conflict.ts` — CF Pages Function: submission → GitHub Issue

## Current State
- **V3.1 live** at https://ed9680-20260225-v3-nav-fix-biask.pages.dev
- **GitHub:** https://github.com/kyl-solutions/biask (public, open source)
- Three storefronts: `/israel-palestine`, `/ukraine`, `/january-6`
- Landing page at `/`, About at `/about`
- Unified site-wide nav with topic pills, active state highlighting, mobile hamburger menu
- GitHub Issues pipeline active: Reviews + conflict submissions create tracked issues
- Static export on Cloudflare Pages

## Architecture
- **Framework:** Next.js 16 + React 19
- **Styling:** Tailwind CSS 4 (@theme tokens)
- **Animation:** Framer Motion
- **Build:** Static export (`output: "export"`)
- **Hosting:** Cloudflare Pages
- **Serverless:** Cloudflare Pages Functions
- **Content:** JSON files per conflict (no database)
- **Dynamic routing:** `[conflict]/page.tsx` server component + `ConflictTimeline.tsx` client component
- **Theming:** CSS custom properties cascaded per-conflict, generic sideA/sideB model
- **Issue Tracking:** GitHub Issues with 12 custom labels

## Outreach
- See `.claude/commands/outreach.md` for email drafts and send schedule
- Dylan Burns email SENT 2026-02-25
- Brianna Wu — Week 2
- Zee Cohen-Sanchez — Week 3

## What's Next
- Custom domain (`biask.kyl.solutions`)
- Deep links per beat
- Mobile UX polish
- README + contribution guide
- Fine-grained PAT for production
- OG image per storefront
- Real contributor review process

## Parking Lot
- **Counterfactual "What If" layer** — designed in Pencil, not built

What are we working on?
