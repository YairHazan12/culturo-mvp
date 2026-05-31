import Link from "next/link";
import { Logo } from "@/components/Logo";
import { CultureExpansionCard } from "@/components/CultureExpansionCard";
import { cultures } from "@/lib/mock";

const valueCards = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
        <path
          d="M4 6h16v10H8l-4 4V6z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M8 10h8M8 13h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    title: "Deal communication",
    body: "Rewrite emails, proposals, and chat in seconds with cultural risk flags and warmer alternatives.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
        <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
    title: "Negotiation readiness",
    body: "Map the soft signals, hierarchy, and silence patterns before you sit at the table.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
        <path
          d="M12 2l3 6 6 1-4.5 4 1 6L12 16l-5.5 3 1-6L3 9l6-1 3-6z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Partner trust",
    body: "Build the relationship signals that decide whether a Chinese partner says yes — and means it.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
        <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3 9h18M8 4v14" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
    title: "Executive briefings",
    body: "One-page deal-readiness reports for your CEO before every China trip or QBR.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
        <path d="M4 20V8M10 20v-6M16 20V4M22 20H2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    title: "Team analytics",
    body: "See which departments are deal-ready, which deals are at cultural risk, and where to train next.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-paper)]">
      {/* Top nav */}
      <header className="border-b border-[var(--color-line)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-8 h-16">
          <Logo />
          <nav className="hidden md:flex items-center gap-7 text-sm text-navy-700">
            <a href="#product" className="hover:text-navy-900">Product</a>
            <a href="#playbook" className="hover:text-navy-900">China Playbook</a>
            <a href="#markets" className="hover:text-navy-900">Markets</a>
            <a href="#trust" className="hover:text-navy-900">Why teams pick Culturo</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="hidden md:inline-flex text-sm text-navy-700 px-3 py-2 rounded-md hover:bg-navy-50"
            >
              Sign in
            </Link>
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-1.5 bg-navy-900 text-white text-sm px-4 py-2 rounded-md hover:bg-navy-800 transition-colors"
            >
              Start demo
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-16 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-50 border border-navy-100 text-xs text-navy-700">
              <span className="w-1.5 h-1.5 rounded-full bg-red-warm" />
              Launch market: China 🇨🇳 · Built for U.S. business teams
            </div>
            <h1 className="mt-5 text-4xl md:text-6xl font-semibold tracking-tight text-navy-900 leading-[1.05]">
              Win trust.
              <br />
              Avoid missteps.
              <br />
              <span className="text-red-warm">Close better deals</span> in China.
            </h1>
            <p className="mt-6 text-lg text-navy-700 max-w-xl leading-relaxed">
              Culturo gives business teams fast, practical cultural intelligence
              for negotiations, partnerships, and client communication.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/onboarding"
                className="inline-flex items-center gap-2 bg-navy-900 text-white px-5 py-3 rounded-md font-medium hover:bg-navy-800 transition"
              >
                Start demo
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-navy-200 text-navy-900 hover:bg-white transition"
              >
                See a deal-readiness report
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-6 text-xs text-navy-500">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gold-soft border-2 border-white grid place-items-center text-[10px] text-navy-900 font-semibold">JM</div>
                <div className="w-8 h-8 rounded-full bg-red-warm-soft border-2 border-white grid place-items-center text-[10px] text-navy-900 font-semibold">WL</div>
                <div className="w-8 h-8 rounded-full bg-navy-100 border-2 border-white grid place-items-center text-[10px] text-navy-900 font-semibold">PR</div>
              </div>
              Used in prep for $40M+ in cross-border deals (illustrative)
            </div>
          </div>

          {/* Hero card */}
          <div className="lg:col-span-5">
            <div className="exec-card p-5 relative">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.16em] text-navy-500">
                    China Deal Readiness
                  </div>
                  <div className="text-xs text-navy-700 mt-0.5">
                    Sales · Account: Shenzhen Mfg. Group · Sign target: this week
                  </div>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-red-50 text-red-warm-dark border border-red-200">
                  ● High cultural risk
                </span>
              </div>

              <div className="mt-4 flex items-center gap-5">
                <div className="relative">
                  <svg width="120" height="120" className="-rotate-90">
                    <circle cx="60" cy="60" r="48" strokeWidth="10" fill="none" className="score-track" />
                    <circle
                      cx="60"
                      cy="60"
                      r="48"
                      strokeWidth="10"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 48}
                      strokeDashoffset={2 * Math.PI * 48 - (0.54 * 2 * Math.PI * 48)}
                      className="score-fill"
                    />
                  </svg>
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="text-center">
                      <div className="text-3xl font-semibold text-navy-900">54</div>
                      <div className="text-[10px] uppercase tracking-[0.16em] text-navy-500">/ 100</div>
                    </div>
                  </div>
                </div>
                <div className="text-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-warm" />
                    <span className="text-navy-700">Needs prep before Friday call</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <span className="text-navy-700">3 weak skills detected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-navy-700">2 scenarios recommended</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 hairline pt-4">
                <div className="text-[10px] uppercase tracking-[0.16em] text-navy-500">
                  Next recommended action
                </div>
                <div className="mt-2 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-md bg-navy-900 text-white grid place-items-center text-xs shrink-0">
                    01
                  </div>
                  <div>
                    <div className="text-sm font-medium text-navy-900">
                      Practice: "Soft pushback on a tight timeline"
                    </div>
                    <div className="text-xs text-navy-500">
                      Reframe a CEO-driven deadline without breaking the relationship · 4 min
                    </div>
                  </div>
                </div>
              </div>

              <span className="absolute -bottom-3 -right-3 bg-gold text-navy-900 text-[10px] uppercase tracking-[0.18em] font-medium px-2.5 py-1 rounded">
                Sample report
              </span>
            </div>
          </div>
        </div>

        <span className="absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-gold/10 blur-3xl" />
        <span className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-red-warm/5 blur-3xl" />
      </section>

      {/* Value cards */}
      <section id="product" className="border-t border-[var(--color-line)] bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-16">
          <div className="flex items-end justify-between gap-6 mb-8">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-red-warm">
                The Culturo platform
              </div>
              <h2 className="mt-1 text-2xl md:text-3xl font-semibold text-navy-900">
                Five capabilities, one cultural advantage
              </h2>
            </div>
            <Link
              href="/dashboard"
              className="hidden md:inline text-sm text-navy-700 hover:text-navy-900 border-b border-navy-200"
            >
              See it in product →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {valueCards.map((v) => (
              <div key={v.title} className="exec-card p-5">
                <div className="w-9 h-9 rounded-md bg-navy-50 grid place-items-center text-navy-900 mb-3">
                  {v.icon}
                </div>
                <h3 className="text-sm font-semibold text-navy-900">{v.title}</h3>
                <p className="mt-1.5 text-xs text-navy-500 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* China playbook preview */}
      <section id="playbook" className="bg-[var(--color-paper)] border-t border-[var(--color-line)]">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="text-[10px] uppercase tracking-[0.2em] text-red-warm">
              China Deal Playbook
            </div>
            <h2 className="mt-1 text-2xl md:text-3xl font-semibold text-navy-900 leading-tight">
              When &quot;yes&quot; doesn&apos;t mean yes — and 9 more deal-defining moments.
            </h2>
            <p className="mt-4 text-navy-700 leading-relaxed">
              Each module is short, business-first, and ends with a real
              negotiation scenario your team can practice in minutes — not
              theory, not classroom culture facts.
            </p>
            <Link
              href="/playbook"
              className="mt-6 inline-flex items-center gap-2 text-navy-900 font-medium border-b border-gold pb-0.5"
            >
              Browse the playbook
              <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-3">
            {[
              { n: "01", t: "When 'yes' doesn't mean agreement", m: "6 min" },
              { n: "02", t: "Reading soft rejection signals", m: "5 min" },
              { n: "03", t: "Saving face during disagreement", m: "7 min" },
              { n: "04", t: "Building trust before pushing the deal", m: "8 min" },
            ].map((m) => (
              <div key={m.n} className="exec-card p-4">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.16em]">
                  <span className="font-serif text-gold">{m.n}</span>
                  <span className="text-navy-400">{m.m}</span>
                </div>
                <div className="mt-2 text-sm font-medium text-navy-900 leading-snug">
                  {m.t}
                </div>
                <div className="mt-3 h-1 bg-navy-100 rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-navy-900" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Markets */}
      <section id="markets" className="border-t border-[var(--color-line)] bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-16">
          <div className="flex items-end justify-between gap-6 mb-8">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-red-warm">
                Global expansion
              </div>
              <h2 className="mt-1 text-2xl md:text-3xl font-semibold text-navy-900">
                China today. The world&apos;s biggest deal corridors next.
              </h2>
              <p className="mt-2 text-sm text-navy-500 max-w-2xl">
                We&apos;re going deep on China first because the cost of getting it
                wrong is the highest. Japan, Korea, India, UAE, Germany, and
                Brazil are next — request early access for your team.
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cultures.map((c) => (
              <CultureExpansionCard key={c.code} culture={c} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section id="trust" className="border-t border-[var(--color-line)] bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="text-[10px] uppercase tracking-[0.2em] text-gold">
              Built for serious business
            </div>
            <h2 className="mt-1 text-2xl md:text-3xl font-semibold tracking-tight">
              The cultural intelligence layer your CRM doesn&apos;t have.
            </h2>
            <p className="mt-4 text-white/70 leading-relaxed max-w-2xl">
              Salesforce tells you the deal stage. Slack tells you what was
              said. Culturo tells you what your Chinese counterpart actually
              meant — and what to say next.
            </p>
            <div className="mt-8 grid sm:grid-cols-3 gap-6">
              {[
                { k: "12 min", v: "Average prep time per deal" },
                { k: "3.4×", v: "Lift in 'yes meant yes' moments" },
                { k: "$0", v: "To start a 14-day team pilot" },
              ].map((s) => (
                <div key={s.v}>
                  <div className="text-3xl font-semibold text-gold">{s.k}</div>
                  <div className="text-xs text-white/60 mt-1 leading-relaxed">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="bg-white text-navy-900 rounded-xl p-6 shadow-2xl">
              <div className="text-[10px] uppercase tracking-[0.16em] text-navy-500">
                Briefing — Executive view
              </div>
              <div className="mt-3 hairline pt-3">
                <div className="text-sm font-medium">
                  Q3 China deal at risk: $4.2M
                </div>
                <div className="mt-1 text-xs text-navy-500">
                  3 of 6 stakeholders have not been engaged at the correct
                  seniority. Recommended action: senior-to-senior introduction by
                  Friday.
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
                <div>
                  <div className="text-2xl font-semibold text-red-warm">54</div>
                  <div className="text-navy-500">Readiness</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-amber-700">3</div>
                  <div className="text-navy-500">Weak skills</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-emerald-700">+12</div>
                  <div className="text-navy-500">If team trains</div>
                </div>
              </div>
              <div className="mt-5 hairline pt-3 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.16em] text-navy-500">
                  Prepared by Culturo
                </span>
                <span className="text-[10px] text-navy-400">For CEO, Friday 9:00</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-[var(--color-paper)] border-t border-[var(--color-line)]">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-navy-900">
              Get your team deal-ready before the next China call.
            </h3>
            <p className="text-sm text-navy-500 mt-1">
              Onboard in 90 seconds. Mock data, real workflow.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 bg-navy-900 text-white px-5 py-3 rounded-md font-medium hover:bg-navy-800 transition"
            >
              Start demo
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-navy-200 text-navy-900 hover:bg-white transition"
            >
              See admin view
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--color-line)] bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-navy-500">
          <Logo />
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-navy-900">Privacy</a>
            <a href="#" className="hover:text-navy-900">Terms</a>
            <a href="#" className="hover:text-navy-900">Security</a>
            <a href="#" className="hover:text-navy-900">Contact</a>
          </div>
          <div>© {new Date().getFullYear()} Culturo, Inc.</div>
        </div>
      </footer>
    </div>
  );
}
