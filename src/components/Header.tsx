"use client";

import { useState } from "react";
import type { ConflictMeta } from "@/lib/types";

interface HeaderProps {
  onReview?: () => void;
  onSubmitConflict?: () => void;
  conflicts?: Array<{ id: string; meta: ConflictMeta }>;
  activeConflictId?: string;
  activePage?: "home" | "about";
}

export default function Header({
  onReview,
  onSubmitConflict,
  conflicts,
  activeConflictId,
  activePage,
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const isOnConflictPage = !!activeConflictId;

  return (
    <header className="sticky top-0 z-50 bg-header-bg text-white">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        {/* Left: Wordmark + nav links */}
        <div className="flex items-center gap-1 sm:gap-3">
          <a
            href="/"
            className={`flex items-baseline gap-0 text-xl tracking-tight ${
              activePage === "home" ? "text-white" : "text-white/90 hover:text-white"
            }`}
          >
            <span className="font-[--font-body] font-semibold">bi</span>
            <span className="font-[--font-display] italic">ask</span>
          </a>

          {/* Desktop nav */}
          {conflicts && conflicts.length > 0 && (
            <nav className="hidden items-center gap-0.5 sm:flex">
              <span className="mx-2 text-white/20">|</span>
              {conflicts.map((c) => (
                <a
                  key={c.id}
                  href={`/${c.id}`}
                  className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                    c.id === activeConflictId
                      ? "bg-white/20 text-white"
                      : "text-white/50 hover:bg-white/10 hover:text-white/80"
                  }`}
                >
                  {c.meta.title}
                </a>
              ))}
              <a
                href="/about"
                className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                  activePage === "about"
                    ? "bg-white/20 text-white"
                    : "text-white/50 hover:bg-white/10 hover:text-white/80"
                }`}
              >
                About
              </a>
            </nav>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Conflict-page-specific actions */}
          {isOnConflictPage && (
            <>
              <a
                href="#how-it-works"
                className="hidden text-sm text-white/70 transition-colors hover:text-white lg:inline"
              >
                How It Works
              </a>
              <button
                onClick={onReview}
                className="hidden rounded-md border border-white/25 px-3 py-1.5 text-xs font-medium text-white/80 transition-all hover:border-white/50 hover:text-white sm:inline-flex"
              >
                Review This Page
              </button>
              <button
                onClick={onSubmitConflict}
                className="hidden rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-black transition-all hover:bg-white/90 sm:inline-flex"
              >
                + Submit a Conflict
              </button>
            </>
          )}

          {/* GitHub — always visible */}
          <a
            href="https://github.com/kyl-solutions/biask"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 transition-colors hover:text-white"
            aria-label="GitHub"
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </a>

          {/* Mobile menu toggle — only on sm */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="sm:hidden text-white/70 hover:text-white"
            aria-label="Menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <nav className="border-t border-white/10 bg-header-bg px-6 pb-4 pt-2 sm:hidden">
          <div className="flex flex-col gap-1">
            {conflicts?.map((c) => (
              <a
                key={c.id}
                href={`/${c.id}`}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  c.id === activeConflictId
                    ? "bg-white/15 text-white"
                    : "text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                {c.meta.title}
              </a>
            ))}
            <a
              href="/about"
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                activePage === "about"
                  ? "bg-white/15 text-white"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              What We Believe
            </a>
            {isOnConflictPage && (
              <>
                <div className="my-1 h-px bg-white/10" />
                <button
                  onClick={() => { onReview?.(); setMobileOpen(false); }}
                  className="rounded-md px-3 py-2 text-left text-sm font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                >
                  Review This Page
                </button>
                <button
                  onClick={() => { onSubmitConflict?.(); setMobileOpen(false); }}
                  className="rounded-md px-3 py-2 text-left text-sm font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                >
                  + Submit a Conflict
                </button>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
