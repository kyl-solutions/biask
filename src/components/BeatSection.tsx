"use client";

import { motion } from "framer-motion";
import type { Beat, ConflictMeta } from "@/lib/types";
import NarrativeCard from "./NarrativeCard";
import AgreedFacts from "./AgreedFacts";

interface BeatSectionProps {
  beat: Beat;
  meta: ConflictMeta;
  index: number;
  causalLink?: string;
  nextBeatYear?: string;
  nextBeatTitle?: string;
  onNavigateNext?: () => void;
}

export default function BeatSection({
  beat,
  meta,
  index,
  causalLink,
  nextBeatYear,
  nextBeatTitle,
  onNavigateNext,
}: BeatSectionProps) {
  return (
    <motion.section
      key={beat.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      {/* Beat title - visible on mobile above the columns */}
      <div className="mb-6 text-center md:hidden">
        <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">
          {index === 0 ? "Now" : beat.year}
        </p>
        <h2 className="mt-1 font-[--font-display] text-3xl italic text-text-primary">
          {beat.title}
        </h2>
      </div>

      {/* Three-column layout */}
      <div className="grid gap-6 md:grid-cols-[1fr_minmax(340px,400px)_1fr]">
        {/* Israeli column */}
        <div className="order-2 md:order-1">
          <NarrativeCard
            narrative={beat.israeli}
            side="israeli"
            opposingSideLabel={meta.sideB.adjective}
          />
        </div>

        {/* Center column - agreed facts + causal navigation */}
        <div className="order-1 md:order-2">
          {/* Beat title - desktop only, inside center column */}
          <div className="mb-4 hidden text-center md:block">
            <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">
              {index === 0 ? "Now" : beat.year}
            </p>
            <h2 className="mt-1 font-[--font-display] text-3xl italic text-text-primary">
              {beat.title}
            </h2>
          </div>

          <AgreedFacts
            facts={beat.agreedFacts}
            bridgeStatement={beat.bridgeStatement}
          />

          {/* Causal connector — lives IN the center column, directly after consensus */}
          {nextBeatTitle && onNavigateNext && (
            <div className="mt-4">
              {causalLink && (
                <p className="mb-2 text-center text-xs italic text-text-muted">
                  {causalLink}
                </p>
              )}
              <button
                onClick={onNavigateNext}
                className="group w-full rounded-lg border-2 border-text-muted/20 bg-page-bg px-5 py-4 text-center transition-all hover:border-text-primary hover:bg-surface hover:shadow-lg"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted transition-colors group-hover:text-text-secondary">
                  What preceded this?
                </p>
                <p className="mt-1.5 font-[--font-display] text-xl italic text-text-primary">
                  {nextBeatTitle}
                </p>
                <p className="mt-0.5 text-xs font-semibold tabular-nums text-text-muted">
                  {nextBeatYear}
                </p>
                <div className="mx-auto mt-2 h-5 w-5 text-text-muted transition-transform group-hover:translate-y-0.5 group-hover:text-text-primary">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Palestinian column */}
        <div className="order-3">
          <NarrativeCard
            narrative={beat.palestinian}
            side="palestinian"
            opposingSideLabel={meta.sideA.adjective}
          />
        </div>
      </div>
    </motion.section>
  );
}
