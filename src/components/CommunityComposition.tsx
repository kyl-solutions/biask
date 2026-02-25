"use client";

import type { ConflictMeta } from "@/lib/types";

interface CommunityCompositionProps {
  meta: ConflictMeta;
}

export default function CommunityComposition({
  meta,
}: CommunityCompositionProps) {
  const total =
    meta.sideAContributors +
    meta.sideBContributors +
    meta.independentReviewers;
  const sideAPct = Math.round(
    (meta.sideAContributors / total) * 100
  );
  const sideBPct = Math.round(
    (meta.sideBContributors / total) * 100
  );

  return (
    <section className="bg-page-bg px-6 py-6">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm text-text-secondary">
          Built by{" "}
          <span className="font-semibold text-side-a-accent">
            {meta.sideAContributors} {meta.sideA.adjective}
          </span>{" "}
          ·{" "}
          <span className="font-semibold text-side-b-accent">
            {meta.sideBContributors} {meta.sideB.adjective}
          </span>{" "}
          contributors ·{" "}
          <span className="font-semibold text-text-primary">
            {meta.independentReviewers} independent reviewers
          </span>
        </p>

        {/* Balance bar */}
        <div className="mx-auto mt-3 flex h-2 max-w-md overflow-hidden rounded-full">
          <div
            className="bg-side-a-accent transition-all"
            style={{ width: `${sideAPct}%` }}
          />
          <div
            className="bg-side-b-accent transition-all"
            style={{ width: `${sideBPct}%` }}
          />
          <div className="flex-1 bg-text-muted/30" />
        </div>
      </div>
    </section>
  );
}
