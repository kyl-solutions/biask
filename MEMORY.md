# biask - Project Memory

**Created:** 2026-02-25
**Status:** V2 Live — GitHub Issues pipeline active
**GitHub:** https://github.com/kyl-solutions/biask
**Codename:** biask (formerly dual-narrative)
**Name treatment:** bi*ask* — "bi" in Inter (structural), "*ask*" in Instrument Serif italic (inquiry). Lowercase b always.
**Name meaning:** bias + ask (interrogate your bias), bi (bidirectional, bilateral), ask (Socratic — the product asks, doesn't tell)

**Live URL (V1):** https://ab83e0-20260225-demo-biask.pages.dev
**Live URL (V2):** https://14ea7e-20260225-v2-ux-polish-biask.pages.dev
**CF Projects:** ab83e0-20260225-demo-biask (V1), 14ea7e-20260225-v2-ux-polish-biask (V2)

---

## Vision

**biask** — a platform that tells conflict stories from both sides simultaneously. Not false balance, not advocacy, but honest multiplicity. The reader should come away understanding WHY each side made the choices they did, not which side was "right."

**Go-to-market:** Open source → Demo with Israel/Palestine page → Get to Destiny.GG community → Community contributes Russia/Ukraine etc. → Kabelo personally works Rwanda.

---

## Architecture

### Tech Stack
- **Framework:** Next.js 16 + React 19
- **Styling:** Tailwind CSS 4 (@theme tokens)
- **Animation:** Framer Motion
- **Build:** Static export (`output: "export"`)
- **Hosting:** Cloudflare Pages
- **Content:** JSON files (no database, contributor-friendly)
- **Serverless:** Cloudflare Pages Functions (review + submit → GitHub Issues)
- **Issue Tracking:** GitHub Issues with 12 custom labels (stance, basis, perspective, submission)

### File Structure
```
src/
  app/
    layout.tsx          — Root layout with metadata + Google Fonts
    page.tsx            — Main timeline page (client component)
    globals.css         — Tailwind @theme tokens (18 design tokens)
  components/
    Header.tsx          — Sticky black header with biask wordmark + Review/Submit CTAs
    Hero.tsx            — "Israel / Palestine" hero section (trimmed V2)
    HowItWorks.tsx      — Three-pillar methodology explainer (SVG icons V2)
    FlowOverlay.tsx     — Shared full-screen modal with progress bar + step counter
    ReviewFlow.tsx      — 5-step structured review flow (claim → stance → basis → sources → perspective)
    SubmitConflictFlow.tsx — 5-step conflict submission flow (name → bias gap → turning points → sources → perspective)
    CommunityComposition.tsx — Contributor stats + balance bar
    TimelineScrubber.tsx — Draggable timeline with waypoint dots
    BeatSection.tsx     — Three-column layout for a single beat
    NarrativeCard.tsx   — Side narrative (Israeli or Palestinian)
    AgreedFacts.tsx     — Center column agreed facts + bridge statement
    CausalConnector.tsx — "Both sides agree this is rooted in ↓"
    ProvenanceBar.tsx   — Tinted provenance block with cross-review stats
  lib/
    types.ts            — TypeScript interfaces (Beat, Narrative, etc.)
    content.ts          — Static imports of all beat JSON data
content/
  israel-palestine/
    meta.json           — Conflict-level metadata
    beats/
      2023-october-7.json
      2005-gaza-disengagement.json
      2000-camp-david.json
      1993-oslo-accords.json
      1987-first-intifada.json
      1967-six-day-war.json
      1948-independence-nakba.json
      1917-balfour-declaration.json
functions/
  api/
    review.ts           — CF Pages Function: review → GitHub Issue
    submit-conflict.ts  — CF Pages Function: conflict submission → GitHub Issue
scripts/
  generate-og.ts        — SVG OG image generator
public/
  og.svg                — Share surface OG image
```

### Design Tokens (globals.css @theme)
- **Israeli:** bg #E8EEF5, accent #2563EB, prov #F0F4F8
- **Palestinian:** bg #F5EBE8, accent #B45309, prov #FAF5F2
- **Neutrals:** page-bg #F5F5F5, surface #FFFFFF, header #000000
- **Text:** primary #000, secondary #666, muted #AAA
- **Consensus:** agreed #16A34A, disputed #F59E0B
- **Fonts:** display = Instrument Serif, body = Inter

---

## Design Decisions Made

### Color Coding
- **Israeli narrative:** Blue tint (#E8EEF5 background, #2563EB accent)
- **Palestinian narrative:** Terracotta tint (#F5EBE8 background, #B45309 accent)
- **Center timeline:** Neutral white (#FFFFFF)
- **Header:** Black (#000000) for gravitas

### Typography
- **Headlines/Titles:** Instrument Serif (italic)
- **Body/UI:** Inter
- **Approach:** Editorial, publication-style - typography carries the visual hierarchy

### Interaction Model
1. **Center column** = "Agreed Across the Divide" — ONLY facts both sides confirm
2. **Side panels** = Where the stories diverge — perspectives, interpretations, context
3. **Disputed facts** = Flagged with amber dot + "DISPUTED" badge
4. **Bridge statements** = "Contributors who disagree about [X] agree that [Y]"
5. **Cross-review** = Folded into provenance bar: "Reviewed by N opposing-side contributors"
6. **Provenance bar** = Tinted block: editorial board, cross-review count, revisions, last updated
7. **Reverse chronology (default)** = Present → Past. User lands on latest beat, scrubs backward
8. **Timeline scrubber** = Draggable. Beats = waypoints. Time traveler UX.
9. **Two-layer model** = Share surface (OG card) + Deep surface (full three-column editorial)
10. **Any beat = valid entry point** = Links can drop you into any beat
11. **How This Works strip** = In-flow methodology (Motive Detective answer)
12. **Community Composition strip** = Contributor stats (Tribal Scanner answer)

### Trust Architecture
- **Language:** "Agreed across the divide" not "Adversarially Reviewed"
- **Motive Detective →** Provenance bars, methodology link, edit history
- **Source Assassin →** Structure = authority (system > individual), cross-review badges
- **Tribal Scanner →** Visual symmetry + contribution stats from both sides
- **Consensus Seeker →** Bridge statements, agreed/disputed indicators, center column as bedrock

### Design Principles
1. **Ambient, not aggressive** - Information reveals itself
2. **Symmetry is structural** - Both sides equal visual weight
3. **Depth is optional** - Surface reading works; deep dives available
4. **No hidden editorial** - Judgments are visible
5. **Typography over color** - Editorial gravitas through type
6. **Reverse by default** - People think backwards (present → cause)
7. **Causal, not temporal** - "What preceded this?" not "Next"
8. **Rigour without institution** - Trust signals feel social-native
9. **Two layers, not two modes** - Share → deep is a zoom, not toggle
10. **Counterfactuals are humbling** - History wasn't inevitable

---

## Content: 8 Beats (All Written)

| Beat | Israeli Title | Palestinian Title |
|------|--------------|-------------------|
| 2023 October 7 | The Darkest Day | The Breaking Point |
| 2005 Gaza Disengagement | A Painful Concession | A Repackaged Prison |
| 2000 Camp David | The Offer That Was Refused | The Offer That Wasn't |
| 1993 Oslo Accords | The Handshake That Changed Everything | The Peace That Built Settlements |
| 1987 First Intifada | The Shock of the Stones | The Awakening |
| 1967 Six-Day War | The Miracle & Its Burden | The Second Dispossession |
| 1948 Independence/Nakba | A State Is Born | The Catastrophe |
| 1917 Balfour Declaration | A People Returns Home | A Land Promised by Strangers |

---

## Pencil Design Node IDs

- Main page: `a50Ti`
- Header: `9xxFc` (wordmark: `hkn47` "bi" + `dIEak` "ask")
- Hero: `5v3Vr`
- How This Works: `P7Lhg`
- Community Composition: `Yd0p0`
- Timeline Section: `bTWC3`
- Center Column: `HhauU` (400px)
- Israeli Column: `ZLrUK`
- Palestinian Column: `RDv9l`
- Scrubber: `RnRy8`
- Beat 1948: center `626zR`, Israeli `gVDHu`, Palestinian `2ZiWf`
- Causal Connector: `9LweX`
- Beat 1917: center `hjOQm`, Israeli `Fvles`, Palestinian `WLXXN`

---

## Known Issues / Next Steps

### Done ✅
- ~~Open source: GitHub repo~~ → https://github.com/kyl-solutions/biask
- ~~Contribution flows~~ → ReviewFlow + SubmitConflictFlow → GitHub Issues pipeline live
- ~~Header CTAs~~ → "Review This Page" + "+ Submit a Conflict" wired to flows

### Active
- **Custom domain:** Need to set `biask.kyl.solutions` via CF dashboard
- **OG image:** Currently SVG — some social platforms may need PNG conversion
- **Mobile responsive:** Three-column layout stacks to single column on mobile. Could polish.
- **Deep links:** Each beat should be a shareable URL (e.g., `/beat/1948-independence-nakba`)
- **README + contribution guide:** Repo exists but no README yet
- **Content review:** All beat content is editorial-board-written — real version needs actual contributor process
- **GitHub token:** Currently using `gh auth` OAuth token as CF secret. Should create a fine-grained PAT scoped to `biask` repo Issues-only for production.

### Parking Lot (Features on the Cutting Room Floor)
- **Counterfactual "What If" layer:** Designed in Pencil but not yet built. Concept: at each beat, show an emulated alternative — "What if Camp David had succeeded?" — grounded in real-world understanding of the forces at play. Not fan fiction, but disciplined counterfactual reasoning that reveals how fragile/contingent each outcome was. **Open question: is this a must-have or a distraction from the core dual-narrative mission?** Design principle #10 ("Counterfactuals are humbling — history wasn't inevitable") argues for it. But it adds editorial complexity (now THREE perspectives per beat) and could undermine the trust architecture if speculative claims aren't held to the same cross-review standard.
- **Keyboard nav:** Arrow keys work for scrubber. Touch swipe gestures for mobile.

---

## Session Log

### 2026-02-25 (Session 1 - Design)
- Full design in Pencil: three-column layout, trust architecture, provenance bars
- Major pivots: center column as consensus bedrock, reverse chronology, timeline scrubber, two-layer model
- Named "biask" with dual-font wordmark

### 2026-02-25 (Session 2 - Build)
- Scaffolded Next.js 16 + Tailwind 4 + Framer Motion
- Wrote all 8 beat JSON files with full narratives, context, sources, provenance
- Built 10 React components (Header, Hero, HowItWorks, CommunityComposition, TimelineScrubber, BeatSection, NarrativeCard, AgreedFacts, CausalConnector, ProvenanceBar)
- Built main timeline page with scrubber navigation, causal connectors, end state
- Generated OG image for share surface
- **Deployed to Cloudflare Pages:** https://ab83e0-20260225-demo-biask.pages.dev

### 2026-02-25 (Session 3 - UX Polish + Contribution Flows)
- **Section reorder:** HowItWorks → Hero → CommunityComposition (methodology first, then conflict name)
- **Hero trimmed:** py-16→py-8, text-6xl→text-5xl — less scroll before content
- **SVG icons:** Replaced emojis (🤝✅👁️) with elegant single-stroke SVG icons (HandshakeIcon, ShieldCheckIcon, CrossReviewIcon)
- **Header CTAs:** Added "Review This Page" (ghost button) + "+ Submit a Conflict" (white CTA) + GitHub SVG icon
- **Causal connector moved INTO center column:** Critical UX fix — "What preceded this?" now sits directly below consensus content inside the three-column grid, not floating below the entire grid. Feels like a continuation of the reading experience.
- **Built FlowOverlay.tsx:** Shared modal component with backdrop blur, progress bar (step N of M), close button. Uses Framer Motion AnimatePresence.
- **Built ReviewFlow.tsx:** 5-step structured review — (1) select claim from current beat, (2) agree/disagree/nuance, (3) basis type (academic/journalistic/firsthand/institutional/other), (4) provide sources, (5) perspective familiarity. Stores to localStorage as `biask-reviews`.
- **Built SubmitConflictFlow.tsx:** 5-step conflict submission — (1) conflict name + region + parties, (2) "What do most people get wrong?" (the biask hook), (3) key turning points (seeds beat structure), (4) sources from both sides, (5) contributor perspective + willingness. Stores to localStorage as `biask-conflict-submissions`.
- **Key insight:** These flows ARE the product. They're Socratic prompt packs that teach contributors how to think about conflict. The output becomes either a revision brief (Review) or a conflict seed brief (Submit).
- **Deployed V2:** https://14ea7e-20260225-v2-ux-polish-biask.pages.dev

### 2026-02-25 (Session 4 - GitHub Issues Pipeline)
- **Git init + GitHub repo:** Created `kyl-solutions/biask` (public), initial commit with all 41 files
- **CF Pages Functions:** Built two serverless endpoints:
  - `POST /api/review` → creates GitHub Issue with stance/basis/source labels
  - `POST /api/submit-conflict` → creates GitHub Issue with editorial checklist
- **12 custom labels:** review:agree/disagree/nuance, basis:academic/journalistic/firsthand/institutional, perspective:side-a/side-b/both/outside, conflict-submission
- **Client-side wiring:** Both flows now call API first, fall back to localStorage. Success screen shows direct issue link.
- **Token:** `GITHUB_TOKEN` set as CF Pages secret (via `wrangler pages secret put`)
- **API version fix:** GitHub API needs `2022-11-28`, not `2025-01-01`
- **Tested E2E:** Review → Issue #3, Conflict → Issue #4 (both created successfully, closed as test)
- **All docs updated:** MEMORY.md, session loaders, CLAUDE.md repo mapping, Obsidian mirror
- **Parking lot:** Documented counterfactual "What If" feature as open question — must-have vs. distraction

---

*This file is the single source of truth for project context. Update after every session.*
