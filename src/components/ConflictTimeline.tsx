"use client";

import { useState, useCallback } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import CommunityComposition from "@/components/CommunityComposition";
import TimelineScrubber from "@/components/TimelineScrubber";
import BeatSection from "@/components/BeatSection";
import ReviewFlow from "@/components/ReviewFlow";
import SubmitConflictFlow from "@/components/SubmitConflictFlow";
import DisclosureBanner from "@/components/DisclosureBanner";
import type { Beat, ConflictMeta } from "@/lib/types";
import type { CSSProperties } from "react";

interface ConflictTimelineProps {
  meta: ConflictMeta;
  beats: Beat[];
  conflictId: string;
  allConflicts: Array<{ id: string; meta: ConflictMeta }>;
}

export default function ConflictTimeline({
  meta,
  beats,
  conflictId,
  allConflicts,
}: ConflictTimelineProps) {
  const [activeBeatIndex, setActiveBeatIndex] = useState(0);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [submitOpen, setSubmitOpen] = useState(false);

  const handleBeatChange = useCallback((index: number) => {
    setActiveBeatIndex(index);
  }, []);

  const activeBeat = beats[activeBeatIndex];
  const nextBeat =
    activeBeatIndex < beats.length - 1 ? beats[activeBeatIndex + 1] : null;

  // Apply conflict-specific theme colors via CSS custom properties
  const themeStyle: CSSProperties & Record<string, string> = {
    "--color-side-a-bg": meta.theme.sideA.bg,
    "--color-side-a-accent": meta.theme.sideA.accent,
    "--color-side-a-prov": meta.theme.sideA.prov,
    "--color-side-b-bg": meta.theme.sideB.bg,
    "--color-side-b-accent": meta.theme.sideB.accent,
    "--color-side-b-prov": meta.theme.sideB.prov,
  };

  return (
    <div className="min-h-screen" style={themeStyle}>
      <Header
        onReview={() => setReviewOpen(true)}
        onSubmitConflict={() => setSubmitOpen(true)}
        conflicts={allConflicts}
        activeConflictId={conflictId}
      />
      <DisclosureBanner />
      <HowItWorks meta={meta} />
      <Hero meta={meta} />
      <CommunityComposition meta={meta} />

      {/* Timeline */}
      <div className="bg-page-bg">
        {/* Column headers */}
        <div className="mx-auto hidden max-w-7xl grid-cols-[1fr_minmax(340px,400px)_1fr] gap-6 px-6 pt-8 md:grid">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-side-a-accent">
              {meta.sideA.adjective} Narrative
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-agreed">
              Agreed Facts
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-side-b-accent">
              {meta.sideB.adjective} Narrative
            </p>
          </div>
        </div>

        {/* Scrubber */}
        <div className="sticky top-14 z-40 border-b border-border-light bg-page-bg/95 backdrop-blur-sm">
          <TimelineScrubber
            beats={beats}
            activeBeatIndex={activeBeatIndex}
            onBeatChange={handleBeatChange}
          />
        </div>

        {/* Active beat */}
        <div className="mx-auto max-w-7xl px-6 py-8">
          <BeatSection
            beat={activeBeat}
            meta={meta}
            index={activeBeatIndex}
            causalLink={activeBeat.causalLink}
            nextBeatYear={nextBeat?.year?.toString()}
            nextBeatTitle={nextBeat?.title}
            onNavigateNext={
              nextBeat
                ? () => handleBeatChange(activeBeatIndex + 1)
                : undefined
            }
          />

          {/* End state - deepest beat */}
          {!nextBeat && (
            <div className="mx-auto mt-8 max-w-md text-center">
              <div className="h-px w-full bg-border-light" />
              <p className="mt-6 font-[--font-display] text-xl italic text-text-secondary">
                You&rsquo;ve reached the beginning.
              </p>
              <p className="mt-2 text-sm text-text-muted">
                Every event on this timeline traces back to competing
                promises made over the same land. The question is not who
                started it — but whether understanding both sides can help
                end it.
              </p>
              <button
                onClick={() => handleBeatChange(0)}
                className="mt-4 text-sm font-medium text-text-primary underline decoration-text-muted underline-offset-4 transition-colors hover:decoration-text-primary"
              >
                Return to the present →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border-light bg-surface px-6 py-8">
        <div className="mx-auto max-w-4xl text-center">
          <a href="/" className="inline-flex items-baseline gap-0 text-lg">
            <span className="font-[--font-body] font-semibold text-text-primary">
              bi
            </span>
            <span className="font-[--font-display] italic text-text-primary">
              ask
            </span>
          </a>
          <p className="mt-2 text-xs text-text-muted">
            Open source · Built by contributors who disagree · Not who is
            right — why each side believes what it does
          </p>

          {/* Other conflicts */}
          {allConflicts.length > 1 && (
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                Also on biask
              </p>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
                {allConflicts
                  .filter((c) => c.id !== conflictId)
                  .map((c) => (
                    <a
                      key={c.id}
                      href={`/${c.id}`}
                      className="text-sm font-medium text-text-secondary underline decoration-text-muted underline-offset-4 transition-colors hover:text-text-primary hover:decoration-text-primary"
                    >
                      {c.meta.title}
                    </a>
                  ))}
              </div>
            </div>
          )}

          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-text-muted">
            <a
              href="https://github.com/kyl-solutions/biask"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-text-secondary"
            >
              Contribute on GitHub
            </a>
            <span>·</span>
            <a
              href="/about"
              className="underline underline-offset-2 hover:text-text-secondary"
            >
              What We Believe
            </a>
            <span>·</span>
            <span>
              {meta.sideAContributors + meta.sideBContributors} contributors
            </span>
          </div>
        </div>
      </footer>

      {/* Flow overlays */}
      <ReviewFlow
        open={reviewOpen}
        onClose={() => setReviewOpen(false)}
        beat={activeBeat}
        meta={meta}
      />
      <SubmitConflictFlow
        open={submitOpen}
        onClose={() => setSubmitOpen(false)}
      />
    </div>
  );
}
