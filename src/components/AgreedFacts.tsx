"use client";

import { motion } from "framer-motion";
import type { AgreedFact } from "@/lib/types";

interface AgreedFactsProps {
  facts: AgreedFact[];
  bridgeStatement: string;
}

export default function AgreedFacts({
  facts,
  bridgeStatement,
}: AgreedFactsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl bg-surface p-6 shadow-sm"
    >
      <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
        Agreed Across the Divide
      </p>

      <ul className="mt-4 space-y-3">
        {facts.map((fact, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <span
              className={`mt-0.5 inline-block h-2 w-2 flex-shrink-0 rounded-full ${
                fact.status === "agreed" ? "bg-agreed" : "bg-disputed"
              }`}
            />
            <span
              className={
                fact.status === "agreed"
                  ? "text-text-primary"
                  : "italic text-text-secondary"
              }
            >
              {fact.text}
              {fact.status === "disputed" && (
                <span className="ml-1 inline-block rounded bg-disputed/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-disputed">
                  Disputed
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>

      {/* Bridge statement */}
      <div className="mt-5 border-t border-border-light pt-4">
        <p className="text-center text-xs italic leading-relaxed text-text-secondary">
          &ldquo;{bridgeStatement}&rdquo;
        </p>
      </div>
    </motion.div>
  );
}
