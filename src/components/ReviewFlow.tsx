"use client";

import { useState } from "react";
import FlowOverlay from "./FlowOverlay";
import type { Beat, ConflictMeta } from "@/lib/types";

interface ReviewFlowProps {
  open: boolean;
  onClose: () => void;
  beat: Beat;
  meta: ConflictMeta;
}

interface ReviewData {
  target: string;
  targetType: "agreed-fact" | "disputed-fact" | "side-a-narrative" | "side-b-narrative" | "bridge-statement" | "";
  stance: "agree" | "disagree" | "nuance" | "";
  basisType: "academic" | "journalistic" | "firsthand" | "institutional" | "other" | "";
  sources: string;
  perspective: string;
}

const TOTAL_STEPS = 5;

export default function ReviewFlow({ open, onClose, beat, meta }: ReviewFlowProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<ReviewData>({
    target: "",
    targetType: "",
    stance: "",
    basisType: "",
    sources: "",
    perspective: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [issueUrl, setIssueUrl] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState(false);

  const reset = () => {
    setStep(1);
    setData({ target: "", targetType: "", stance: "", basisType: "", sources: "", perspective: "" });
    setSubmitted(false);
    setSubmitting(false);
    setIssueUrl(null);
    setSubmitError(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const canAdvance = () => {
    switch (step) {
      case 1: return data.target !== "" && data.targetType !== "";
      case 2: return data.stance !== "";
      case 3: return data.basisType !== "";
      case 4: return data.sources.trim().length > 10;
      case 5: return data.perspective !== "";
      default: return false;
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(false);

    const payload = {
      ...data,
      beatId: beat.id,
      beatTitle: beat.title,
    };

    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const result = await res.json();
        setIssueUrl(result.issueUrl);
      } else {
        // API failed — fall back to localStorage
        console.warn("API submission failed, storing locally");
        setSubmitError(true);
      }
    } catch {
      // Network error — fall back to localStorage
      console.warn("Network error, storing locally");
      setSubmitError(true);
    }

    // Always store locally as backup
    const submissions = JSON.parse(localStorage.getItem("biask-reviews") || "[]");
    submissions.push({ ...payload, timestamp: new Date().toISOString() });
    localStorage.setItem("biask-reviews", JSON.stringify(submissions));

    setSubmitting(false);
    setSubmitted(true);
  };

  // Build selectable claims from the current beat
  const claimOptions = [
    ...beat.agreedFacts.map((f, i) => ({
      label: f.text.length > 80 ? f.text.substring(0, 80) + "…" : f.text,
      value: f.text,
      type: f.status === "agreed" ? "agreed-fact" as const : "disputed-fact" as const,
      badge: f.status,
    })),
    {
      label: `${meta.sideA.adjective} narrative: "${beat.sideA.title}"`,
      value: beat.sideA.title,
      type: "side-a-narrative" as const,
      badge: "narrative",
    },
    {
      label: `${meta.sideB.adjective} narrative: "${beat.sideB.title}"`,
      value: beat.sideB.title,
      type: "side-b-narrative" as const,
      badge: "narrative",
    },
    ...(beat.bridgeStatement
      ? [{
          label: `Bridge: "${beat.bridgeStatement.length > 80 ? beat.bridgeStatement.substring(0, 80) + "…" : beat.bridgeStatement}"`,
          value: beat.bridgeStatement,
          type: "bridge-statement" as const,
          badge: "bridge" as const,
        }]
      : []),
  ];

  if (submitted) {
    return (
      <FlowOverlay open={open} onClose={handleClose} step={TOTAL_STEPS} totalSteps={TOTAL_STEPS} title="Review Submitted">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-agreed/10">
            <svg className="h-6 w-6 text-agreed" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="mt-4 font-[--font-display] text-xl italic text-text-primary">
            Your review has been recorded
          </h3>
          <p className="mt-2 text-sm text-text-secondary">
            {issueUrl
              ? "Your review has been submitted to the editorial board as a tracked issue."
              : submitError
                ? "Stored locally — it will sync when the connection is restored."
                : "The editorial board will review your submission and update the page if your evidence meets the cross-review standard."}
          </p>
          {issueUrl && (
            <a
              href={issueUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-medium text-text-primary underline decoration-text-muted underline-offset-4 transition-colors hover:decoration-text-primary"
            >
              View issue on GitHub →
            </a>
          )}
          <button
            onClick={handleClose}
            className="mt-6 block w-full rounded-md bg-text-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-text-secondary"
          >
            Done
          </button>
        </div>
      </FlowOverlay>
    );
  }

  return (
    <FlowOverlay open={open} onClose={handleClose} step={step} totalSteps={TOTAL_STEPS} title="Review This Page">
      {/* Step 1: Which claim? */}
      {step === 1 && (
        <div>
          <h3 className="font-[--font-display] text-lg italic text-text-primary">
            Which claim are you reviewing?
          </h3>
          <p className="mt-1 text-sm text-text-muted">
            Select a specific fact, narrative, or statement from the current beat.
          </p>
          <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
            {claimOptions.map((opt, i) => (
              <button
                key={i}
                onClick={() => setData({ ...data, target: opt.value, targetType: opt.type })}
                className={`w-full rounded-lg border px-4 py-3 text-left text-sm transition-all ${
                  data.target === opt.value
                    ? "border-text-primary bg-page-bg font-medium text-text-primary"
                    : "border-border-light text-text-secondary hover:border-text-muted"
                }`}
              >
                <span className={`mr-2 inline-block rounded-full px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                  opt.badge === "agreed" ? "bg-agreed/10 text-agreed" :
                  opt.badge === "disputed" ? "bg-disputed/10 text-disputed" :
                  opt.badge === "narrative" ? "bg-page-bg text-text-muted" :
                  "bg-page-bg text-text-muted"
                }`}>
                  {opt.badge}
                </span>
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Agree / Disagree / Nuance */}
      {step === 2 && (
        <div>
          <h3 className="font-[--font-display] text-lg italic text-text-primary">
            Do you agree or disagree?
          </h3>
          <p className="mt-1 text-sm text-text-muted">
            You can also add nuance — context that changes how this should be read.
          </p>
          <div className="mt-5 space-y-3">
            {([
              { value: "agree" as const, label: "I agree — strengthen this claim", desc: "I have additional evidence that supports this." },
              { value: "disagree" as const, label: "I disagree — challenge this claim", desc: "I have evidence that contradicts or complicates this." },
              { value: "nuance" as const, label: "It's more complicated than this", desc: "The claim isn't wrong, but it's missing critical context." },
            ]).map((opt) => (
              <button
                key={opt.value}
                onClick={() => setData({ ...data, stance: opt.value })}
                className={`w-full rounded-lg border px-4 py-3.5 text-left transition-all ${
                  data.stance === opt.value
                    ? "border-text-primary bg-page-bg"
                    : "border-border-light hover:border-text-muted"
                }`}
              >
                <p className={`text-sm font-semibold ${data.stance === opt.value ? "text-text-primary" : "text-text-secondary"}`}>
                  {opt.label}
                </p>
                <p className="mt-0.5 text-xs text-text-muted">{opt.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Basis */}
      {step === 3 && (
        <div>
          <h3 className="font-[--font-display] text-lg italic text-text-primary">
            What is the basis of your position?
          </h3>
          <p className="mt-1 text-sm text-text-muted">
            This helps the editorial board weigh your review appropriately.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {([
              { value: "academic" as const, label: "Academic research", icon: "📚" },
              { value: "journalistic" as const, label: "News / journalism", icon: "📰" },
              { value: "firsthand" as const, label: "Firsthand experience", icon: "👤" },
              { value: "institutional" as const, label: "NGO / govt report", icon: "🏛" },
              { value: "other" as const, label: "Other", icon: "💬" },
            ]).map((opt) => (
              <button
                key={opt.value}
                onClick={() => setData({ ...data, basisType: opt.value })}
                className={`rounded-lg border px-4 py-3 text-center transition-all ${
                  data.basisType === opt.value
                    ? "border-text-primary bg-page-bg"
                    : "border-border-light hover:border-text-muted"
                } ${opt.value === "other" ? "col-span-2" : ""}`}
              >
                <p className="text-lg">{opt.icon}</p>
                <p className={`mt-1 text-xs font-medium ${data.basisType === opt.value ? "text-text-primary" : "text-text-secondary"}`}>
                  {opt.label}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Sources */}
      {step === 4 && (
        <div>
          <h3 className="font-[--font-display] text-lg italic text-text-primary">
            Provide your source(s)
          </h3>
          <p className="mt-1 text-sm text-text-muted">
            Be specific. &ldquo;Everyone knows this&rdquo; isn&rsquo;t a source.
            A strong submission includes author, publication, date, and ideally a link.
          </p>
          <textarea
            value={data.sources}
            onChange={(e) => setData({ ...data, sources: e.target.value })}
            placeholder="e.g. Avi Shlaim, 'The Iron Wall' (2014), Chapter 12. Also: B'Tselem annual report 2005, available at..."
            className="mt-4 w-full rounded-lg border border-border-light px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/60 focus:border-text-primary focus:outline-none focus:ring-1 focus:ring-text-primary"
            rows={5}
          />
          <p className="mt-2 text-xs text-text-muted">
            {data.sources.length < 10
              ? "Minimum 10 characters"
              : `${data.sources.length} characters`}
          </p>
        </div>
      )}

      {/* Step 5: Perspective */}
      {step === 5 && (
        <div>
          <h3 className="font-[--font-display] text-lg italic text-text-primary">
            Which side are you most familiar with?
          </h3>
          <p className="mt-1 text-sm text-text-muted">
            This isn&rsquo;t about which side you support — it&rsquo;s about
            which perspective you can evaluate with depth. Your review will carry
            more weight on the side you know best.
          </p>
          <div className="mt-5 space-y-3">
            {([
              { value: meta.sideA.adjective, color: "side-a-accent" },
              { value: meta.sideB.adjective, color: "side-b-accent" },
              { value: "Both equally", color: "text-primary" },
              { value: "Neither — I'm an outside observer", color: "text-muted" },
            ]).map((opt) => (
              <button
                key={opt.value}
                onClick={() => setData({ ...data, perspective: opt.value })}
                className={`w-full rounded-lg border px-4 py-3 text-left text-sm transition-all ${
                  data.perspective === opt.value
                    ? "border-text-primary bg-page-bg font-medium text-text-primary"
                    : "border-border-light text-text-secondary hover:border-text-muted"
                }`}
              >
                {opt.value}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => step > 1 && setStep(step - 1)}
          className={`text-sm font-medium transition-colors ${
            step > 1 ? "text-text-secondary hover:text-text-primary" : "invisible"
          }`}
        >
          ← Back
        </button>
        {step < TOTAL_STEPS ? (
          <button
            onClick={() => canAdvance() && setStep(step + 1)}
            disabled={!canAdvance()}
            className={`rounded-md px-5 py-2 text-sm font-semibold transition-all ${
              canAdvance()
                ? "bg-text-primary text-white hover:bg-text-secondary"
                : "cursor-not-allowed bg-border-light text-text-muted"
            }`}
          >
            Continue →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!canAdvance() || submitting}
            className={`rounded-md px-5 py-2 text-sm font-semibold transition-all ${
              canAdvance() && !submitting
                ? "bg-text-primary text-white hover:bg-text-secondary"
                : "cursor-not-allowed bg-border-light text-text-muted"
            }`}
          >
            {submitting ? "Submitting…" : "Submit Review"}
          </button>
        )}
      </div>
    </FlowOverlay>
  );
}
