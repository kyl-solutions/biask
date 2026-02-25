# biask — Session Loader

Read these files to understand the current project state:

1. `MEMORY.md` — Full project context, design decisions, architecture, status
2. `src/app/page.tsx` — Main timeline page
3. `src/app/globals.css` — Design tokens
4. `src/lib/types.ts` — TypeScript interfaces
5. `src/lib/content.ts` — Content loading
6. `content/israel-palestine/meta.json` — Conflict metadata
7. `content/israel-palestine/beats/2023-october-7.json` — Example beat structure

## Current State
- **V1 built and deployed** to https://ab83e0-20260225-demo-biask.pages.dev
- 8 beats written (1917 Balfour → 2023 October 7)
- 10 React components built
- Timeline scrubber with keyboard + pointer navigation
- Three-column layout (Israeli | Agreed Facts | Palestinian)
- Static export on Cloudflare Pages

## What's Next
- Custom domain setup
- Deep links per beat
- Mobile UX polish
- Counterfactual layer (designed, not built)
- Open source setup (GitHub, README, contribution guide)
- Real contributor review process

What are we working on?
