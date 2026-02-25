"use client";

import { motion, AnimatePresence } from "framer-motion";

interface FlowOverlayProps {
  open: boolean;
  onClose: () => void;
  step: number;
  totalSteps: number;
  title: string;
  children: React.ReactNode;
}

export default function FlowOverlay({
  open,
  onClose,
  step,
  totalSteps,
  title,
  children,
}: FlowOverlayProps) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97 }}
          transition={{ duration: 0.25 }}
          className="relative mx-4 w-full max-w-lg rounded-xl bg-surface shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border-light px-6 py-4">
            <div>
              <h2 className="text-sm font-semibold text-text-primary">
                {title}
              </h2>
              <p className="mt-0.5 text-xs text-text-muted">
                Step {step} of {totalSteps}
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-md p-1.5 text-text-muted transition-colors hover:bg-page-bg hover:text-text-primary"
              aria-label="Close"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </div>

          {/* Progress bar */}
          <div className="h-0.5 w-full bg-border-light">
            <div
              className="h-full bg-text-primary transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>

          {/* Content */}
          <div className="px-6 py-6">{children}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
