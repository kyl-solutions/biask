"use client";

import type { ConflictMeta } from "@/lib/types";

interface HowItWorksProps {
  meta: ConflictMeta;
}

/* Inline SVG icons — elegant, single-stroke style */

function HandshakeIcon() {
  return (
    <svg
      className="mx-auto h-7 w-7 text-text-secondary"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Two hands meeting */}
      <path d="M2 14l4-4 3 3 4-4 3 3 4-4" />
      <path d="M6 10l-4 4" />
      <path d="M18 10l4-4" />
      <path d="M9 13l-2 2" />
      <path d="M15 9l-2 2" />
      <path d="M7 17l1.5-1.5" />
      <path d="M11 17l2-2" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg
      className="mx-auto h-7 w-7 text-text-secondary"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function CrossReviewIcon() {
  return (
    <svg
      className="mx-auto h-7 w-7 text-text-secondary"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Two overlapping circles with arrows — cross-review */}
      <circle cx="9" cy="12" r="5" />
      <circle cx="15" cy="12" r="5" />
      <path d="M12 9v6" />
      <path d="M9 12h6" />
    </svg>
  );
}

export default function HowItWorks({ meta }: HowItWorksProps) {
  return (
    <section
      id="how-it-works"
      className="border-b border-border-light bg-surface px-6 py-6"
    >
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-xs font-semibold uppercase tracking-widest text-text-muted">
          How This Works
        </h2>
        <div className="mt-5 grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <HandshakeIcon />
            <h3 className="mt-2 text-sm font-semibold text-text-primary">
              Built by Both Sides
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              {meta.israeliContributors} {meta.sideA.adjective} and{" "}
              {meta.palestinianContributors} {meta.sideB.adjective} contributors
              wrote and reviewed every word on this page.
            </p>
          </div>
          <div className="text-center">
            <ShieldCheckIcon />
            <h3 className="mt-2 text-sm font-semibold text-text-primary">
              Agreed Across the Divide
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              The center column contains only facts that contributors from{" "}
              <em>both sides</em> confirm are accurate. Disputed claims are
              clearly labeled.
            </p>
          </div>
          <div className="text-center">
            <CrossReviewIcon />
            <h3 className="mt-2 text-sm font-semibold text-text-primary">
              Cross-Reviewed Narratives
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Every Israeli narrative is reviewed by Palestinian contributors and
              vice versa. Not for agreement — for accuracy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
