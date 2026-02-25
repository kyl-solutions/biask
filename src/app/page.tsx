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
import { beats, conflictMeta } from "@/lib/content";

export default function Home() {
  const [activeBeatIndex, setActiveBeatIndex] = useState(0);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [submitOpen, setSubmitOpen] = useState(false);

  const handleBeatChange = useCallback((index: number) => {
    setActiveBeatIndex(index);
  }, []);

  const activeBeat = beats[activeBeatIndex];
  const nextBeat =
    activeBeatIndex < beats.length - 1 ? beats[activeBeatIndex + 1] : null;

  return (
    <div className="min-h-screen">
      <Header
        onReview={() => setReviewOpen(true)}
        onSubmitConflict={() => setSubmitOpen(true)}
      />
      <HowItWorks meta={conflictMeta} />
      <Hero meta={conflictMeta} />
      <CommunityComposition meta={conflictMeta} />

      {/* Timeline */}
      <div className="bg-page-bg">
        {/* Column headers */}
        <div className="mx-auto hidden max-w-7xl grid-cols-[1fr_minmax(340px,400px)_1fr] gap-6 px-6 pt-8 md:grid">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-israeli-accent">
              {conflictMeta.sideA.adjective} Narrative
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-agreed">
              Agreed Facts
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-palestinian-accent">
              {conflictMeta.sideB.adjective} Narrative
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
            meta={conflictMeta}
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
          <p className="flex items-baseline justify-center gap-0 text-lg">
            <span className="font-[--font-body] font-semibold text-text-primary">
              bi
            </span>
            <span className="font-[--font-display] italic text-text-primary">
              ask
            </span>
          </p>
          <p className="mt-2 text-xs text-text-muted">
            Open source · Built by contributors who disagree · Not who is
            right — why each side believes what it does
          </p>
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
            <span>
              {conflictMeta.israeliContributors +
                conflictMeta.palestinianContributors}{" "}
              contributors
            </span>
          </div>
        </div>
      </footer>

      {/* Flow overlays */}
      <ReviewFlow
        open={reviewOpen}
        onClose={() => setReviewOpen(false)}
        beat={activeBeat}
        meta={conflictMeta}
      />
      <SubmitConflictFlow
        open={submitOpen}
        onClose={() => setSubmitOpen(false)}
      />
    </div>
  );
}
