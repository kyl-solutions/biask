"use client";

import { motion } from "framer-motion";
import type { Narrative } from "@/lib/types";
import ProvenanceBar from "./ProvenanceBar";

interface NarrativeCardProps {
  narrative: Narrative;
  side: "a" | "b";
  opposingSideLabel: string;
}

export default function NarrativeCard({
  narrative,
  side,
  opposingSideLabel,
}: NarrativeCardProps) {
  const bgColor =
    side === "a" ? "bg-side-a-bg" : "bg-side-b-bg";
  const accentColor =
    side === "a" ? "text-side-a-accent" : "text-side-b-accent";

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`rounded-xl ${bgColor} p-6`}
    >
      <h3
        className={`font-[--font-display] text-2xl italic ${accentColor}`}
      >
        {narrative.title}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-text-primary">
        {narrative.body}
      </p>

      {/* Context block */}
      <div className="mt-4 border-l-2 border-current/10 pl-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
          Context
        </p>
        <p className="mt-1 text-xs leading-relaxed text-text-secondary">
          {narrative.context.text}
        </p>
      </div>

      {/* Sources */}
      <p className="mt-3 text-[11px] text-text-muted">
        <span className="font-semibold">Sources:</span> {narrative.sources}
      </p>

      {/* Provenance bar */}
      <ProvenanceBar
        provenance={narrative.provenance}
        side={side}
        opposingSideLabel={opposingSideLabel}
      />
    </motion.article>
  );
}
