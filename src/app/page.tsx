import { getAllConflicts } from "@/lib/conflicts";
import Header from "@/components/Header";
import DisclosureBanner from "@/components/DisclosureBanner";

export default function LandingPage() {
  const conflicts = getAllConflicts();

  return (
    <div className="min-h-screen">
      <Header conflicts={conflicts} activePage="home" />
      <DisclosureBanner />

      {/* Hero */}
      <section className="border-b border-border-light bg-surface px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-[--font-display] text-4xl italic leading-tight text-text-primary sm:text-5xl">
            Interrogate your bias.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-text-secondary">
            Structured disagreement on the issues that divide us. Not who is
            right — why each side believes what it does.
          </p>
          <p className="mt-2 text-sm text-text-muted">
            Every narrative is written by one side and reviewed by the other.
          </p>
        </div>
      </section>

      {/* Conflict cards */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-text-muted">
            Explore
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {conflicts.map((c) => (
              <a
                key={c.id}
                href={`/${c.id}`}
                className="group relative overflow-hidden rounded-xl border border-border-light bg-surface p-6 transition-all hover:border-border-light/80 hover:shadow-md"
              >
                {/* Accent stripe */}
                <div
                  className="absolute inset-x-0 top-0 h-1"
                  style={{
                    background: `linear-gradient(to right, ${c.meta.theme.sideA.accent}, ${c.meta.theme.sideB.accent})`,
                  }}
                />
                <h2 className="mt-1 font-[--font-display] text-xl italic text-text-primary">
                  {c.meta.title}
                </h2>
                <p className="mt-1 text-xs font-medium text-text-muted">
                  {c.meta.dateRange}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {c.meta.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-text-muted">
                    {c.meta.sideAContributors + c.meta.sideBContributors}{" "}
                    contributors
                  </span>
                  <span className="text-xs font-medium text-text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Explore →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

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
              href="/about"
              className="underline underline-offset-2 hover:text-text-secondary"
            >
              What We Believe
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
