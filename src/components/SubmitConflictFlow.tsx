"use client";

import { useState } from "react";
import FlowOverlay from "./FlowOverlay";

interface SubmitConflictFlowProps {
  open: boolean;
  onClose: () => void;
}

interface ConflictSubmission {
  name: string;
  region: string;
  parties: string;
  biasGap: string;
  turningPoints: string;
  sources: string;
  perspective: string;
  willContribute: boolean;
}

const TOTAL_STEPS = 5;

export default function SubmitConflictFlow({ open, onClose }: SubmitConflictFlowProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<ConflictSubmission>({
    name: "",
    region: "",
    parties: "",
    biasGap: "",
    turningPoints: "",
    sources: "",
    perspective: "",
    willContribute: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const reset = () => {
    setStep(1);
    setData({ name: "", region: "", parties: "", biasGap: "", turningPoints: "", sources: "", perspective: "", willContribute: false });
    setSubmitted(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const canAdvance = () => {
    switch (step) {
      case 1: return data.name.trim().length > 2 && data.parties.trim().length > 2;
      case 2: return data.biasGap.trim().length > 20;
      case 3: return data.turningPoints.trim().length > 10;
      case 4: return data.sources.trim().length > 10;
      case 5: return data.perspective.trim().length > 0;
      default: return false;
    }
  };

  const handleSubmit = () => {
    const submissions = JSON.parse(localStorage.getItem("biask-conflict-submissions") || "[]");
    submissions.push({
      ...data,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem("biask-conflict-submissions", JSON.stringify(submissions));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <FlowOverlay open={open} onClose={handleClose} step={TOTAL_STEPS} totalSteps={TOTAL_STEPS} title="Conflict Submitted">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-agreed/10">
            <svg className="h-6 w-6 text-agreed" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="mt-4 font-[--font-display] text-xl italic text-text-primary">
            {data.name} has been submitted
          </h3>
          <p className="mt-2 text-sm text-text-secondary">
            The editorial board will review your submission and begin sourcing
            contributors from both sides. You&rsquo;ll be notified when the page
            is ready for community review.
          </p>
          <button
            onClick={handleClose}
            className="mt-6 rounded-md bg-text-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-text-secondary"
          >
            Done
          </button>
        </div>
      </FlowOverlay>
    );
  }

  return (
    <FlowOverlay open={open} onClose={handleClose} step={step} totalSteps={TOTAL_STEPS} title="Submit a Conflict">
      {/* Step 1: What is the conflict? */}
      {step === 1 && (
        <div>
          <h3 className="font-[--font-display] text-lg italic text-text-primary">
            What is the conflict?
          </h3>
          <p className="mt-1 text-sm text-text-muted">
            Name it the way people talk about it — not the academic title.
          </p>
          <div className="mt-4 space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Conflict name
              </label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                placeholder="e.g. Russia / Ukraine, Rwandan Genocide, The Troubles"
                className="mt-1.5 w-full rounded-lg border border-border-light px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted/60 focus:border-text-primary focus:outline-none focus:ring-1 focus:ring-text-primary"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Region
              </label>
              <input
                type="text"
                value={data.region}
                onChange={(e) => setData({ ...data, region: e.target.value })}
                placeholder="e.g. Eastern Europe, Central Africa, Northern Ireland"
                className="mt-1.5 w-full rounded-lg border border-border-light px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted/60 focus:border-text-primary focus:outline-none focus:ring-1 focus:ring-text-primary"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Primary parties
              </label>
              <input
                type="text"
                value={data.parties}
                onChange={(e) => setData({ ...data, parties: e.target.value })}
                placeholder="e.g. Russia and Ukraine, Hutu and Tutsi, Republicans and Loyalists"
                className="mt-1.5 w-full rounded-lg border border-border-light px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted/60 focus:border-text-primary focus:outline-none focus:ring-1 focus:ring-text-primary"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 2: The biask hook */}
      {step === 2 && (
        <div>
          <h3 className="font-[--font-display] text-lg italic text-text-primary">
            What do most people get wrong about this conflict?
          </h3>
          <p className="mt-1 text-sm text-text-muted">
            This is the most important question. The answer tells us where the
            bias gap lives — and that&rsquo;s exactly what biask exists to close.
          </p>
          <textarea
            value={data.biasGap}
            onChange={(e) => setData({ ...data, biasGap: e.target.value })}
            placeholder="e.g. Most Western coverage frames this as a clear aggressor vs. victim story. But on the ground, the history is far more entangled — both sides have grievances that go back decades, and neither population chose the leaders who escalated..."
            className="mt-4 w-full rounded-lg border border-border-light px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/60 focus:border-text-primary focus:outline-none focus:ring-1 focus:ring-text-primary"
            rows={6}
          />
          <p className="mt-2 text-xs text-text-muted">
            {data.biasGap.length < 20
              ? `${20 - data.biasGap.length} more characters needed`
              : `${data.biasGap.length} characters`}
          </p>
        </div>
      )}

      {/* Step 3: Turning points */}
      {step === 3 && (
        <div>
          <h3 className="font-[--font-display] text-lg italic text-text-primary">
            What are the key turning points?
          </h3>
          <p className="mt-1 text-sm text-text-muted">
            List 3–5 moments where the conflict changed direction. These become
            the &ldquo;beats&rdquo; — the backbone of the timeline.
          </p>
          <textarea
            value={data.turningPoints}
            onChange={(e) => setData({ ...data, turningPoints: e.target.value })}
            placeholder={"1. The initial trigger / founding event\n2. The first escalation\n3. The failed peace attempt\n4. The point of no return\n5. Where we are now"}
            className="mt-4 w-full rounded-lg border border-border-light px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/60 focus:border-text-primary focus:outline-none focus:ring-1 focus:ring-text-primary"
            rows={7}
          />
          <p className="mt-2 text-xs text-text-muted">
            These don&rsquo;t need to be perfect — the editorial board will refine them.
          </p>
        </div>
      )}

      {/* Step 4: Sources */}
      {step === 4 && (
        <div>
          <h3 className="font-[--font-display] text-lg italic text-text-primary">
            What sources should the editorial board start with?
          </h3>
          <p className="mt-1 text-sm text-text-muted">
            Include sources from <em>both sides</em> if you can. Books,
            documentaries, news outlets, academic papers, firsthand accounts —
            anything that helps tell the full story.
          </p>
          <textarea
            value={data.sources}
            onChange={(e) => setData({ ...data, sources: e.target.value })}
            placeholder={"Side A perspective:\n- [Author/outlet, title, year]\n\nSide B perspective:\n- [Author/outlet, title, year]\n\nNeutral / academic:\n- [Author/outlet, title, year]"}
            className="mt-4 w-full rounded-lg border border-border-light px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/60 focus:border-text-primary focus:outline-none focus:ring-1 focus:ring-text-primary"
            rows={7}
          />
        </div>
      )}

      {/* Step 5: Your perspective + willingness to contribute */}
      {step === 5 && (
        <div>
          <h3 className="font-[--font-display] text-lg italic text-text-primary">
            Which perspective can you personally contribute?
          </h3>
          <p className="mt-1 text-sm text-text-muted">
            biask pages are built by people with real knowledge of the conflict.
            We need contributors from both sides.
          </p>
          <div className="mt-5 space-y-3">
            {[
              "I can represent one side's perspective",
              "I can represent both sides",
              "I'm an outside researcher / academic",
              "I just want to suggest it — I can't contribute directly",
            ].map((opt) => (
              <button
                key={opt}
                onClick={() => setData({ ...data, perspective: opt })}
                className={`w-full rounded-lg border px-4 py-3 text-left text-sm transition-all ${
                  data.perspective === opt
                    ? "border-text-primary bg-page-bg font-medium text-text-primary"
                    : "border-border-light text-text-secondary hover:border-text-muted"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          {data.perspective && data.perspective !== "I just want to suggest it — I can't contribute directly" && (
            <label className="mt-4 flex items-center gap-3 rounded-lg border border-border-light px-4 py-3">
              <input
                type="checkbox"
                checked={data.willContribute}
                onChange={(e) => setData({ ...data, willContribute: e.target.checked })}
                className="h-4 w-4 rounded border-border-light accent-text-primary"
              />
              <span className="text-sm text-text-secondary">
                I&rsquo;m willing to write or review content for this page
              </span>
            </label>
          )}
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
            disabled={!canAdvance()}
            className={`rounded-md px-5 py-2 text-sm font-semibold transition-all ${
              canAdvance()
                ? "bg-text-primary text-white hover:bg-text-secondary"
                : "cursor-not-allowed bg-border-light text-text-muted"
            }`}
          >
            Submit Conflict
          </button>
        )}
      </div>
    </FlowOverlay>
  );
}
