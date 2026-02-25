import { getAllConflicts } from "@/lib/conflicts";
import Header from "@/components/Header";

export default function AboutPage() {
  const conflicts = getAllConflicts();

  return (
    <div className="min-h-screen">
      <Header conflicts={conflicts} activePage="about" />

      {/* Content */}
      <article className="px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-[--font-display] text-3xl italic text-text-primary sm:text-4xl">
            What We Believe
          </h1>

          <div className="mt-10 space-y-10 text-[15px] leading-relaxed text-text-secondary">
            {/* The Problem */}
            <section>
              <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-text-muted">
                The Problem
              </h2>
              <p>
                Most conflict discourse is built to confirm what you already
                believe. Algorithms serve the narrative your engagement rewards.
                Media selects for outrage over understanding. The result: people
                who disagree about a conflict often disagree about what actually
                happened — not just what it means.
              </p>
              <p className="mt-3">
                biask exists because the gap between &ldquo;I disagree with
                you&rdquo; and &ldquo;I understand why you believe what you
                do&rdquo; is the most important gap in public discourse. And
                almost nothing is built to close it.
              </p>
            </section>

            {/* The Model */}
            <section>
              <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-text-muted">
                The Model
              </h2>
              <p>
                Every conflict on biask is structured the same way: a timeline
                of pivotal events, told simultaneously from both sides. Not
                false balance — honest multiplicity. Both narratives are written
                by contributors who identify with that perspective, then
                cross-reviewed by contributors from the other side.
              </p>
              <p className="mt-3">
                The agreed facts in the center column represent what
                contributors on both sides accept as true — even when they
                disagree about everything else. This is the foundation.
                Agreement on what happened creates space for disagreement about
                what it means.
              </p>
            </section>

            {/* The Principles */}
            <section>
              <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-text-muted">
                The Principles
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-text-primary">
                    Cooperative flourishing compounds.
                  </h3>
                  <p className="mt-1">
                    When people interact in ways that produce genuine
                    understanding, the gains are superlinear — they compound
                    beyond the sum of individual inputs. A community that
                    understands two perspectives is worth more than twice a
                    community that understands one. This is the engine biask is
                    built on.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">
                    Negative compounding destroys faster than we can build.
                  </h3>
                  <p className="mt-1">
                    It takes years to build trust and seconds to destroy it.
                    This asymmetry means protecting the conditions for dialogue
                    carries more weight than any individual contribution to it.
                    Every editorial choice on biask — the cross-review
                    requirement, the provenance bars, the bridge statements — is
                    designed to make it harder to weaponize the platform against
                    the understanding it exists to build.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">
                    Action must be proportional to understanding and quality of
                    evidence.
                  </h3>
                  <p className="mt-1">
                    The greater the intervention you propose against another
                    person or position, the greater your burden of certainty.
                    This is the epistemic governor — a structural brake on the
                    engine. It exists because throughout history, every atrocity
                    committed in the name of collective good was justified by
                    people who were certain they were right. biask builds in its
                    own brake: cross-review, provenance, transparent sourcing.
                  </p>
                </div>
              </div>
            </section>

            {/* The Standard */}
            <section>
              <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-text-muted">
                The Standard
              </h2>
              <p>
                biask is open source. The editorial model, the code, and the
                content are all visible. We believe transparency is the only
                credible foundation for a project that asks people to engage
                with perspectives they find uncomfortable.
              </p>
              <p className="mt-3">
                We are not neutral. We believe understanding is better than
                ignorance, that honest multiplicity is better than false
                balance, and that people who disagree can still build something
                together. If that&rsquo;s a bias, we wear it openly.
              </p>
            </section>

            {/* Framework Credit */}
            <section className="rounded-lg border border-border-light bg-surface p-5">
              <p className="text-sm text-text-muted">
                biask&rsquo;s editorial principles are grounded in{" "}
                <a
                  href="https://superlinear.kyl.solutions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-text-primary underline underline-offset-2"
                >
                  The Superlinear Framework
                </a>{" "}
                — an ethical architecture developed by{" "}
                <span className="font-medium text-text-primary">
                  KYL Solutions
                </span>
                . The framework articulates how cooperative systems produce
                compounding returns — and why protecting those systems from bad
                actors is a structural duty, not just a preference.
              </p>
            </section>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-border-light bg-surface px-6 py-8">
        <div className="mx-auto max-w-4xl text-center">
          <a href="/" className="inline-flex items-baseline gap-0 text-lg">
            <span className="font-[--font-body] font-semibold text-text-primary">
              bi
            </span>
            <span className="font-[--font-display] italic text-text-primary">
              ask
            </span>
          </a>
          <p className="mt-2 text-xs text-text-muted">
            Open source · Built by contributors who disagree · Infrastructure
            for structured disagreement
          </p>
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-text-muted">
            <a
              href="https://github.com/kyl-solutions/biask"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-text-secondary"
            >
              Contribute on GitHub
            </a>
            <span>·</span>
            <a
              href="/"
              className="underline underline-offset-2 hover:text-text-secondary"
            >
              All Topics
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
