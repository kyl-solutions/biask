"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "biask-disclosure-dismissed";

export default function DisclosureBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // SSR or private browsing — silently fail
    }
  };

  return (
    <div className="border-b border-amber-200 bg-amber-50 px-6 py-3">
      <div className="mx-auto flex max-w-7xl items-start justify-between gap-4">
        <p className="text-xs leading-relaxed text-amber-900">
          <span className="font-semibold">Pre-launch.</span> These seed
          narratives demonstrate the editorial format. Contributor numbers
          represent our target editorial board for launch — not current
          participants.{" "}
          <a
            href="/about"
            className="underline underline-offset-2 hover:text-amber-950"
          >
            What we believe →
          </a>
        </p>
        <button
          onClick={dismiss}
          className="shrink-0 text-amber-400 transition-colors hover:text-amber-600"
          aria-label="Dismiss"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
