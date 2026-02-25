"use client";

import type { ConflictMeta } from "@/lib/types";

interface CommunityCompositionProps {
  meta: ConflictMeta;
}

export default function CommunityComposition({
  meta,
}: CommunityCompositionProps) {
  const total =
    meta.israeliContributors +
    meta.palestinianContributors +
    meta.independentReviewers;
  const israeliPct = Math.round(
    (meta.israeliContributors / total) * 100
  );
  const palestinianPct = Math.round(
    (meta.palestinianContributors / total) * 100
  );

  return (
    <section className="bg-page-bg px-6 py-6">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm text-text-secondary">
          Built by{" "}
          <span className="font-semibold text-israeli-accent">
            {meta.israeliContributors} {meta.sideA.adjective}
          </span>{" "}
          ·{" "}
          <span className="font-semibold text-palestinian-accent">
            {meta.palestinianContributors} {meta.sideB.adjective}
          </span>{" "}
          contributors ·{" "}
          <span className="font-semibold text-text-primary">
            {meta.independentReviewers} independent reviewers
          </span>
        </p>

        {/* Balance bar */}
        <div className="mx-auto mt-3 flex h-2 max-w-md overflow-hidden rounded-full">
          <div
            className="bg-israeli-accent transition-all"
            style={{ width: `${israeliPct}%` }}
          />
          <div
            className="bg-palestinian-accent transition-all"
            style={{ width: `${palestinianPct}%` }}
          />
          <div className="flex-1 bg-text-muted/30" />
        </div>
      </div>
    </section>
  );
}
