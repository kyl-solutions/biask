# biask — Session Loader

Read these files to understand the current project state:

1. `MEMORY.md` — Full project context, design decisions, architecture, status
2. `src/app/page.tsx` — Main timeline page
3. `src/app/globals.css` — Design tokens (@theme)
4. `src/lib/types.ts` — TypeScript interfaces
5. `src/lib/content.ts` — Content loading
6. `src/components/Header.tsx` — Sticky header with Review/Submit CTAs + GitHub link
7. `src/components/FlowOverlay.tsx` — Shared modal (progress bar, step counter)
8. `src/components/ReviewFlow.tsx` — 5-step review → GitHub Issue
9. `src/components/SubmitConflictFlow.tsx` — 5-step conflict submission → GitHub Issue
10. `functions/api/review.ts` — CF Pages Function: review → GitHub Issue
11. `functions/api/submit-conflict.ts` — CF Pages Function: submission → GitHub Issue

## Current State
- **V2 live** at https://14ea7e-20260225-v2-ux-polish-biask.pages.dev
- **GitHub:** https://github.com/kyl-solutions/biask (public, open source)
- **GitHub Issues pipeline active:** Reviews + conflict submissions create tracked issues with 12 custom labels
- 8 beats written (1917 Balfour → 2023 October 7)
- 13 React components built (Header, Hero, HowItWorks, FlowOverlay, ReviewFlow, SubmitConflictFlow, CommunityComposition, TimelineScrubber, BeatSection, NarrativeCard, AgreedFacts, CausalConnector, ProvenanceBar)
- Three-column layout (Israeli | Agreed Facts | Palestinian)
- Serverless: CF Pages Functions for review + submit-conflict → GitHub Issues
- Static export on Cloudflare Pages

## Architecture
- **Framework:** Next.js 16 + React 19
- **Styling:** Tailwind CSS 4 (@theme tokens)
- **Animation:** Framer Motion
- **Build:** Static export (`output: "export"`)
- **Hosting:** Cloudflare Pages
- **Serverless:** Cloudflare Pages Functions
- **Content:** JSON files (no database)
- **Issue Tracking:** GitHub Issues with 12 custom labels

## What's Next
- Custom domain (`biask.kyl.solutions`)
- Deep links per beat
- Mobile UX polish
- README + contribution guide
- Fine-grained PAT for production (replace `gh auth` OAuth token)
- OG image PNG conversion
- Real contributor review process

## Parking Lot
- **Counterfactual "What If" layer** — designed in Pencil, not built. Open question: must-have or distraction?

What are we working on?
