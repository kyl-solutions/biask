"use client";

import { motion } from "framer-motion";
import type { ConflictMeta } from "@/lib/types";

interface HeroProps {
  meta: ConflictMeta;
}

export default function Hero({ meta }: HeroProps) {
  return (
    <section className="bg-surface py-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl px-6"
      >
        <h1 className="font-[--font-display] text-5xl italic leading-tight text-text-primary">
          {meta.title}
        </h1>
        <p className="mt-3 text-base text-text-secondary">
          {meta.description}
        </p>
        <p className="mt-1 font-mono text-xs text-text-muted">
          {meta.dateRange}
        </p>
      </motion.div>
    </section>
  );
}
