"use client";

import type { Provenance } from "@/lib/types";

interface ProvenanceBarProps {
  provenance: Provenance;
  side: "a" | "b";
  opposingSideLabel: string;
}

export default function ProvenanceBar({
  provenance,
  side,
  opposingSideLabel,
}: ProvenanceBarProps) {
  const bgColor =
    side === "a" ? "bg-side-a-prov" : "bg-side-b-prov";
  const accentColor =
    side === "a" ? "text-side-a-accent" : "text-side-b-accent";

  return (
    <div className={`mt-4 rounded-lg ${bgColor} px-4 py-3`}>
      <p className={`text-[10px] font-bold uppercase tracking-widest ${accentColor}`}>
        Editorial Provenance
      </p>
      <p className="mt-1 text-xs text-text-secondary">
        Written by {provenance.writtenBy} · Reviewed by{" "}
        <span className="font-medium text-text-primary">
          {provenance.reviewCount} {opposingSideLabel} contributors
        </span>
      </p>
      <p className="mt-0.5 text-[11px] text-text-muted">
        {provenance.revisions} revisions · Updated {provenance.lastUpdated}
      </p>
    </div>
  );
}
