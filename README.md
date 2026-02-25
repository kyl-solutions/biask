# bi*ask*

**Every event in a conflict, told simultaneously from both perspectives.**

biask is a structured disagreement platform. Each conflict is broken into pivotal moments — "beats" — and each beat is narrated by contributors who identify with that side, then cross-reviewed by the other. Agreed facts sit in the center. Transparent sourcing throughout.

Not false balance. Not advocacy. Honest multiplicity.

**Live:** [71043c-20260225-biask-dual-narrative-kyl-solutions.pages.dev](https://71043c-20260225-biask-dual-narrative-kyl-solutions.pages.dev)

---

## How It Works

Every beat in biask has three columns:

| Left | Center | Right |
|------|--------|-------|
| Side A narrative | Agreed facts | Side B narrative |
| Written by Side A contributors | Confirmed by both sides | Written by Side B contributors |
| Cross-reviewed by Side B | Bridge statements | Cross-reviewed by Side A |

Each narrative includes provenance: who wrote it, who reviewed it from the other side, what sources it draws from, and when it was last revised.

**The reader comes away understanding *why* each side believes what it does — not which side was "right."**

---

## Conflicts

### Israel / Palestine (1917–Present)
8 beats · 478 contributors · Israeli and Palestinian perspectives

| Beat | Israeli Title | Palestinian Title |
|------|--------------|-------------------|
| 2023 October 7 | The Darkest Day | The Breaking Point |
| 2005 Gaza Disengagement | A Painful Concession | A Repackaged Prison |
| 2000 Camp David | The Offer That Was Refused | The Offer That Wasn't |
| 1993 Oslo Accords | The Handshake That Changed Everything | The Peace That Built Settlements |
| 1987 First Intifada | The Shock of the Stones | The Awakening |
| 1967 Six-Day War | The Miracle & Its Burden | The Second Dispossession |
| 1948 Independence / Nakba | A State Is Born | The Catastrophe |
| 1917 Balfour Declaration | A People Returns Home | A Land Promised by Strangers |

### Ukraine / Russia (1991–Present)
7 beats · 25 contributors · Ukrainian and Russian perspectives

### January 6th (2016–Present)
6 beats · 21 contributors · Institutional and Populist perspectives

---

## Contributing

biask is open source and pre-launch. We're looking for **first voices** on each topic — people who understand that engaging with the other side's reasoning is the work, not the concession.

### Review an existing narrative

Click **Review This Page** on any conflict page. You'll walk through a 5-step structured review:

1. Select a claim from the current beat
2. Agree, disagree, or add nuance
3. Declare your basis (academic, journalistic, firsthand, institutional)
4. Provide sources
5. State your perspective

Your review is submitted as a GitHub Issue with structured labels for editorial triage.

### Submit a new conflict

Click **+ Submit a Conflict** in the header. You'll walk through:

1. Name the conflict, region, and parties
2. What do most people get wrong about this? (the biask hook)
3. Identify key turning points (these become beats)
4. Provide sources from both sides
5. Declare your perspective and willingness to contribute

---

## Architecture

```
src/
  app/
    page.tsx               — Landing page (conflict grid)
    [conflict]/page.tsx    — Conflict timeline (three-column layout)
    about/page.tsx         — About / methodology
  components/
    Header.tsx             — Sticky header with biask wordmark + CTAs
    Hero.tsx               — Conflict hero section
    HowItWorks.tsx         — Three-pillar methodology explainer
    ConflictTimeline.tsx   — Main timeline with scrubber navigation
    BeatSection.tsx        — Three-column beat layout
    NarrativeCard.tsx      — Side narrative panel
    AgreedFacts.tsx        — Center column consensus + bridge statements
    CausalConnector.tsx    — "What preceded this?" linking between beats
    ProvenanceBar.tsx      — Attribution, cross-review stats, sources
    CommunityComposition.tsx — Contributor balance visualization
    TimelineScrubber.tsx   — Draggable timeline with beat waypoints
    ReviewFlow.tsx         — 5-step structured review (→ GitHub Issue)
    SubmitConflictFlow.tsx — 5-step conflict submission (→ GitHub Issue)
    FlowOverlay.tsx        — Shared modal with progress bar
    DisclosureBanner.tsx   — AI content disclosure
content/
  israel-palestine/        — 8 beats + meta.json
  ukraine/                 — 7 beats + meta.json
  january-6/              — 6 beats + meta.json
functions/
  api/
    review.ts              — CF Pages Function → GitHub Issue
    submit-conflict.ts     — CF Pages Function → GitHub Issue
```

### Tech stack

- **Framework:** Next.js 16 + React 19
- **Styling:** Tailwind CSS 4
- **Animation:** Framer Motion
- **Content:** JSON files (no database — contributor-friendly, version-controlled)
- **Hosting:** Cloudflare Pages (static export)
- **Contribution pipeline:** Cloudflare Pages Functions → GitHub Issues (12 custom labels)

### Running locally

```bash
git clone https://github.com/kyl-solutions/biask.git
cd biask
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000).

---

## Design Principles

1. **Ambient, not aggressive** — Information reveals itself
2. **Symmetry is structural** — Both sides get equal visual weight
3. **Depth is optional** — Surface reading works; deep dives are available
4. **No hidden editorial** — Every judgment is visible
5. **Typography over color** — Editorial gravitas through type, not decoration
6. **Reverse by default** — Present → past (people think backwards from consequences to causes)
7. **Rigour without institution** — Trust signals feel social-native, not bureaucratic

---

## Trust Architecture

biask anticipates four reader instincts and answers each structurally:

| Reader instinct | biask answer |
|----------------|--------------|
| "Who wrote this?" | Provenance bars on every narrative: editorial board, cross-review count, revision history |
| "Can I trust the structure?" | System-level design (visual symmetry, methodology strip) > individual authority |
| "Is this secretly one-sided?" | Contributor composition stats, balance visualization, cross-review badges |
| "Where do they actually agree?" | Center column: agreed facts, bridge statements, consensus/disputed indicators |

---

## License

Open source. Built by [KYL Solutions](https://kyl.solutions).
