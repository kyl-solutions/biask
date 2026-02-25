# Mental Models & Trust Architecture

**Date:** 2026-02-25
**Status:** Translated into UI — see Pencil design (node `a50Ti`)

---

## The Core Insight

The problem isn't information - it's **trust infrastructure**.

People don't evaluate facts. They evaluate *sources*. And they evaluate sources through:

1. **Tribal affiliation** - Is this person "on my side"?
2. **Credibility attacks** - What disqualifying thing have they said/done?
3. **Funding/motive suspicion** - Who benefits from me believing this?
4. **Social proof** - Do people I respect take this seriously?

**Community Notes works because it's *adversarial consensus*** - people who disagree on conclusions agreeing on facts. That's the magic. It's not "neutral experts" (nobody trusts those anymore). It's "even people who hate each other can't dispute this."

---

## Mental Modes We Need to Engage

### 1. The Motive Detective
> "Who's paying for this? What's their angle?"

**Our response:** Full transparency on funding, methodology, editorial decisions. Not buried in an "About" page - woven into the experience.

*"This beat was written by [X], reviewed by [Y], disputed by [Z]."*

---

### 2. The Source Assassin
> "I found a tweet from 2014 where this historian said something problematic, therefore..."

**Our response:** Don't rely on individual authority. The *structure* is the authority. Both sides get equal space by design, not by editorial grace.

**The system is the credibility, not any person.**

---

### 3. The Tribal Scanner
> "Is this site pro-Israel or pro-Palestine?"

**Our response:** The answer has to be "yes" - genuinely both. Not "neither" (which reads as hiding something). The site has to *feel* like it was built by both sides together, even if it wasn't.

---

### 4. The Consensus Seeker
> "What do most reasonable people think?"

**Our response:** Community Notes model. Make the consensus *and* the dissensus visible.

*"Contributors from both perspectives agree that [X] happened. They disagree about [Y]."*

---

## Implications for the Build

Before we go full history nerd, we need **a trust architecture, not just a content architecture.**

### Questions to Resolve

- Who writes beats? How are they selected?
- Who reviews? What's the adversarial check?
- How do we show our work? (Edit history? Dispute log?)
- How do we handle genuine factual disputes where even "what happened" is contested?

### The Community Notes Insight

**Credibility comes from unlikely agreement, not from authority claims.**

Possible pivot: Maybe the counterfactual layer isn't AI-generated speculation - maybe it's *crowdsourced* counterfactuals that have achieved cross-tribal consensus?

*"Contributors who disagree on the ethics of the Balfour Declaration agree that honoring Hussein-McMahon would likely have resulted in..."*

---

## UI Translation (Completed 2026-02-25)

Each mental model now has concrete UI elements in the Pencil design:

| Mental Model | UI Element | Location |
|---|---|---|
| Motive Detective | Provenance bar ("Written by editorial board · 12 revisions") | Bottom of each narrative card |
| Source Assassin | Cross-review line ("Reviewed by 3 Palestinian contributors") | Each narrative card, with opposing-side dot color |
| Tribal Scanner | Structural symmetry + equal visual weight | Three-column layout, blue = terracotta |
| Consensus Seeker | Center column = "Agreed Across the Divide" + Bridge statements | Center column is the bedrock |

### Key Language Decision
**Never** "Adversarially Reviewed" — that's mechanism language, not trust language. Instead:
- "Agreed across the divide" (tagline)
- Bridge statements: "Contributors who disagree about [X] agree that [Y]" (per-beat)
- This mirrors how trust actually works in social conversation, not how engineers describe it.

### Center Column Architecture
The center column is no longer just a timeline — it's the **consensus bedrock**. Only facts both sides confirm live there. Disputed items get flagged (⚡) and pushed to the side panels. The visual density of center vs. sides tells you the consensus story at a glance: fat center = high agreement, thin center + fat sides = deep division.

---

## Open Question

Do we try to build **adversarial consensus** into the contribution model from day one, or do we start with a smaller **editorial board** approach and scale later?

### Option A: Adversarial Consensus (Community Notes Model)
- Harder to bootstrap
- More credible if it works
- Requires critical mass of contributors from both sides
- Risk: Gets gamed, brigaded, or just never reaches consensus

### Option B: Editorial Board
- Easier to launch
- Can establish quality baseline
- Risk: "Who appointed these people?" credibility attacks
- Could evolve into Option A over time

### Option C: Hybrid
- Editorial board for initial content
- Community layer for validation/dispute
- Transparent about the transition plan

---

## Related Reading (To Explore)

- How Community Notes actually works (bridging algorithm)
- Wikipedia's NPOV wars and what they learned
- AllSides media bias methodology
- Kialo (structured debate platform)

---

## Structural Principle: Reverse Chronology (Added 2026-02-25, Session 2)

### The Insight

People don't think about conflict chronologically. They think **backwards**.

They start with NOW — the latest attack, the latest vote, the latest outrage — and when challenged, they regress to an assumption about what preceded it. "That only happened because of the occupation" → "The occupation happened because of '67" → "'67 happened because of '48" → "'48 happened because the British..."

**This is how every argument on X works.** Nobody starts at 1917. They start at the latest event and pull backward. Each regression is a causal claim: "this happened BECAUSE of that."

A chronological timeline (1917 → present) is how historians think. It's not how the audience thinks. Building chronologically is building for historians. Building in reverse is building for the people actually arguing.

### What This Means for the Build

**Default direction: Present → Past.** The user lands on the most recent beat (the thing they're actually arguing about) and navigates backward through causation.

**Navigation is a scrubber, not buttons:**
- No "What preceded this?" / "This led to →" buttons — those are still discrete steps, still structured
- Instead: a **draggable timeline scrubber** — beats are waypoints, you drag to move through time
- Current position highlighted (large dot), other beats visible as smaller dots
- You're not clicking between beats, you're *moving through time*
- The scrubber gives agency: "you're here, go wherever you want" vs buttons that say "here are your two choices"
- Causal connectors between beats ("Both sides agree this is rooted in") still appear as you scroll past them — they're the connective tissue, not the navigation

**Any beat is a valid entry point.** The share surface (see below) means someone can land on any beat from X and start pulling backward from there. The site doesn't have a "start" — it has a "wherever you are."

**Bidirectional by design.** The default is reverse (present → past) because that's how the audience thinks. But the user can flip to chronological at any point — like a time traveler who can move in either direction. Some users will want to understand "what happened next?" after regressing. The timeline serves both directions without privileging either.

**The center column becomes a causal chain.** At each regression, the bridge statement links backward: "Contributors who disagree about [current event] agree that [preceding event] is what led to it." The consensus bedrock isn't just a list of agreed facts — it's a chain of agreed CAUSATION. That's enormously powerful: you're not just showing what happened, you're showing the causal links both sides accept.

### How This Interacts with the Trust Architecture

| Mental Model | What reverse chronology gives them |
|---|---|
| Motive Detective | "They're not telling me where to start — I started where I cared, and I'm pulling the thread myself" |
| Source Assassin | Entry point irrelevant — the structure works from any beat, so you can't dismiss it as "starting with a biased framing" |
| Tribal Scanner | Both sides' narratives appear at every beat — no chronological privilege where one side's story "comes first" |
| Consensus Seeker | The causal chain IS the consensus — "both sides agree this led to that" — built link by link through regression |

### The Socratic Effect

By the time a user has regressed from 2023 to 1917, they've built the understanding themselves. Nobody lectured them. Nobody told them to "start at the beginning." They asked "why?" five times and traced the chain of agreed-upon causation to its root. That's Socratic — discovery through inquiry, not instruction through authority.

---

## Two-Layer Model: Share Surface + Deep Surface (Added 2026-02-25, Session 2)

### The Problem

The current design aesthetic is editorial/authoritative — Instrument Serif italic, "EDITORIAL PROVENANCE" blocks, methodology links. This reads as institutional. The target audience lives on X and is allergic to institutional authority. The Tribal Scanner will dismiss the packaging before reading the content.

But the trust architecture DEPENDS on signals of rigour. Strip them out and you lose what makes this different from partisan thread takes.

### The Solution: Two Layers, Not Two Modes

**Layer 1: The Share Surface** — what someone sees when a beat gets dropped into an X timeline.
- Looks like a Community Notes card
- Shows ONLY: the beat title, the bridge statement, the contributor composition
- Example: "1917: The Balfour Declaration — Contributors who disagree about the Balfour Declaration agree that Britain made contradictory promises to both Arabs and Jews. ✓ Agreed by 247 Israeli and 231 Palestinian contributors"
- No three columns, no provenance blocks, no methodology link
- Native to social feeds. Doesn't ask anyone to trust an institution.

**Layer 2: The Deep Surface** — what you get when you tap through from the share card.
- The full three-column layout with narratives, context, provenance
- The trust architecture lives here — provenance bars, cross-review, methodology
- You earn your way here through curiosity, not because we forced it on you

### Why Not a "Mode Toggle"

A switch that says "Social Mode / Deep Dive Mode" tells the social user there's a smarter version they're not using. That's patronising. The layers should feel like a natural zoom — you see the headline, you're curious, you go deeper. No one chose a mode. They just kept reading.

### Connection to Reverse Chronology

The share surface and reverse chronology reinforce each other:
1. Someone shares the latest beat on X
2. The share card shows the bridge statement (consensus fact)
3. Recipient taps through → lands on that beat (not the "beginning")
4. Center column says "What preceded this?" → they pull backward
5. At every regression, another consensus fact, another bridge statement
6. By the time they reach the root, they built the understanding themselves

The share surface is the front door. Reverse chronology is the hallway. The deep surface is every room along the way.

---

## Design Language Tension (Added 2026-02-25, Session 2)

### The Question

Can you signal rigour without signalling institution?

Community Notes solved this. Nobody thinks of it as "editorial" — but it IS editorial. It has reviewers, consensus mechanisms, dispute resolution. People trust it because:
- It looks native to the platform
- The language is plain ("Readers added context")
- The authority is the crowd, not the masthead

Our current design does the LOGIC of Community Notes but wraps it in the AESTHETIC of Foreign Affairs magazine. The deep surface can keep that aesthetic (it's earned — the user chose to go deeper). But the share surface and the entry experience need to feel social-native, not institutional.

---

*This document captures conversation from 2026-02-25. Updated with structural principles (reverse chronology, two-layer model, design language tension).*
