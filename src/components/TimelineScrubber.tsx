"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import type { Beat } from "@/lib/types";

interface TimelineScrubberProps {
  beats: Beat[];
  activeBeatIndex: number;
  onBeatChange: (index: number) => void;
}

export default function TimelineScrubber({
  beats,
  activeBeatIndex,
  onBeatChange,
}: TimelineScrubberProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const getIndexFromPosition = useCallback(
    (clientX: number) => {
      if (!trackRef.current || beats.length < 2) return 0;
      const rect = trackRef.current.getBoundingClientRect();
      const ratio = Math.max(
        0,
        Math.min(1, (clientX - rect.left) / rect.width)
      );
      // Reversed: left = past (last index), right = present (index 0)
      return Math.round((1 - ratio) * (beats.length - 1));
    },
    [beats.length]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      setIsDragging(true);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      onBeatChange(getIndexFromPosition(e.clientX));
    },
    [getIndexFromPosition, onBeatChange]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      onBeatChange(getIndexFromPosition(e.clientX));
    },
    [isDragging, getIndexFromPosition, onBeatChange]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Keyboard nav — right/up = toward present, left/down = toward past
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        onBeatChange(Math.max(0, activeBeatIndex - 1));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        onBeatChange(Math.min(beats.length - 1, activeBeatIndex + 1));
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeBeatIndex, beats.length, onBeatChange]);

  // Reversed: index 0 (Now) → 100% (right), last index (1917) → 0% (left)
  const thumbPosition =
    beats.length > 1
      ? ((beats.length - 1 - activeBeatIndex) / (beats.length - 1)) * 100
      : 0;

  return (
    <div className="hide-scrollbar mx-auto w-full max-w-2xl px-6 py-4">
      {/* Track */}
      <div
        ref={trackRef}
        className="relative h-10 cursor-pointer touch-none select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        role="slider"
        aria-label="Timeline scrubber"
        aria-valuemin={0}
        aria-valuemax={beats.length - 1}
        aria-valuenow={activeBeatIndex}
        tabIndex={0}
      >
        {/* Rail */}
        <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-border-light" />

        {/* Filled portion */}
        <div
          className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-text-primary transition-all duration-200"
          style={{ width: `${thumbPosition}%` }}
        />

        {/* Waypoint dots */}
        {beats.map((beat, i) => {
          const pos =
            beats.length > 1
              ? ((beats.length - 1 - i) / (beats.length - 1)) * 100
              : 0;
          const isActive = i === activeBeatIndex;

          return (
            <button
              key={beat.id}
              onClick={() => onBeatChange(i)}
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${pos}%` }}
              aria-label={`${beat.year} — ${beat.title}`}
            >
              <div
                className={`rounded-full transition-all duration-200 ${
                  isActive
                    ? "h-4 w-4 bg-text-primary shadow-md"
                    : "h-2.5 w-2.5 bg-text-muted hover:bg-text-secondary"
                }`}
              />
            </button>
          );
        })}

        {/* Thumb */}
        <div
          className="absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-text-primary bg-surface shadow-lg transition-all duration-200"
          style={{ left: `${thumbPosition}%` }}
        />
      </div>

      {/* Date labels */}
      <div className="relative mt-1 h-6">
        {beats.map((beat, i) => {
          const pos =
            beats.length > 1
              ? ((beats.length - 1 - i) / (beats.length - 1)) * 100
              : 0;
          const isActive = i === activeBeatIndex;

          return (
            <span
              key={beat.id}
              className={`absolute -translate-x-1/2 text-xs transition-all duration-200 ${
                isActive
                  ? "font-semibold text-text-primary"
                  : "text-text-muted"
              }`}
              style={{ left: `${pos}%` }}
            >
              {i === 0 ? "Now" : beat.year}
            </span>
          );
        })}
      </div>
    </div>
  );
}
