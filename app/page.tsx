"use client";

import Image from "next/image";
import { useState, MouseEvent } from "react";
import { signIn } from "next-auth/react";

type SectionId = "features" | "analytics" | "pricing";

function scrollToSection(id: SectionId) {
  if (typeof document === "undefined") return;
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/* ----------------------- Auth Modal ----------------------- */

function AuthModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSignIn = async () => {
    try {
      setLoading(true);
      await signIn("google", { callbackUrl: "/dashboard" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-md rounded-2xl bg-slate-950 border border-slate-800 p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Sign in to SceneCraft AI
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Use your Google account to access the workspace, Scene Analyzer
              and Full Script tools.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-300 text-lg leading-none"
          >
            ×
          </button>
        </div>

        <button
          onClick={handleSignIn}
          disabled={loading}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white text-slate-900 px-4 py-3 text-sm font-medium hover:bg-slate-100 disabled:opacity-70"
        >
          {loading ? "Connecting to Google…" : "Continue with Google"}
        </button>

        <p className="mt-3 text-xs text-slate-500">
          Session lasts ~1 hour. Admin access is automatically granted to
          pavanagnihotri82@gmail.com.
        </p>
      </div>
    </div>
  );
}

/* ----------------------- Header ----------------------- */

function Header({
  onAuthClick,
}: {
  onAuthClick: () => void;
}) {
  const handleNavClick = (e: MouseEvent<HTMLButtonElement>, id: SectionId) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="rounded-lg bg-slate-900 px-2.5 py-1 text-xs font-semibold text-slate-200">
            SceneCraft <span className="text-indigo-400">AI</span>
          </span>
          <span className="hidden text-xs text-slate-500 sm:inline">
            Cinematic Intelligence for Writers
          </span>
        </div>

        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <button
            onClick={(e) => handleNavClick(e, "features")}
            className="hover:text-white"
          >
            Features
          </button>
          <button
            onClick={(e) => handleNavClick(e, "analytics")}
            className="hover:text-white"
          >
            Analytics
          </button>
          <button
            onClick={(e) => handleNavClick(e, "pricing")}
            className="hover:text-white"
          >
            Pricing
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onAuthClick}
            className="rounded-xl border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-900"
          >
            Sign In
          </button>
          <button
            onClick={onAuthClick}
            className="hidden rounded-xl bg-indigo-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-400 sm:inline"
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}

/* ----------------------- Sections ----------------------- */

function AboutSection({ onAuthClick }: { onAuthClick: () => void }) {
  return (
    <section className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
        <div>
          <div className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs text-slate-300">
            Empowering Creative Storytellers
          </div>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Professional Screenplay
            <br />
            Analysis Made
            <br />
            Collaborative
          </h1>
          <p className="mt-6 max-w-xl text-base text-slate-300 sm:text-lg">
            SceneCraft AI transforms how writers develop scenes and scripts.
            Diagnose beats, see cinematic health scores, and iterate with your
            creative team in one workspace.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={onAuthClick}
              className="rounded-xl bg-indigo-500 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-400"
            >
              Try Scene Analyzer
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-medium text-slate-200 hover:bg-slate-900"
            >
              View Pricing
            </button>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Built for studio writers, OTT writers, ad filmmakers, and emerging
            screenwriters who care about cinematic realism and audience impact.
          </p>
        </div>

        <div className="relative h-[260px] overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 shadow-xl sm:h-[320px]">
          <Image
            src="/creative-screenwriters-film-set-discussion.jpg"
            alt="Screenwriters collaborating on a film set"
            fill
            priority
            className="object-cover object-center opacity-90"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-200">
            <div>
              <p className="font-semibold">Live Scene Review</p>
              <p className="text-slate-400">
                Beat map • Emotional curve • Dialogue realism
              </p>
            </div>
            <div className="rounded-full bg-slate-900/80 px-3 py-1 text-[10px]">
              7-Pass Cinematic Analysis
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      title: "Scene Analyzer",
      emoji: "🎬",
      description:
        "Deep, psychologically informed scene breakdowns with structure, pacing, and realism checks.",
      tag: "Scene Tool",
    },
    {
      title: "Full Script Analysis",
      emoji: "📚",
      description:
        "High-level diagnosis of arcs, recurring motifs, and audience resonance across the full script.",
      tag: "Script Tool",
    },
    {
      title: "Collaborative Workspaces",
      emoji: "🤝",
      description:
        "Share scenes, pin comments to beats, and track revisions like a script room or writers’ room.",
      tag: "Workspace",
    },
    {
      title: "Analytics Dashboards",
      emoji: "📈",
      description:
        "Visualize tension curves, dialogue density, and character presence with heat maps and graphs.",
      tag: "Analytics",
    },
    {
      title: "Version History",
      emoji: "🕒",
      description:
        "Compare drafts side by side and understand how rewrites impact cinematic clarity.",
      tag: "Versions",
    },
    {
      title: "Producer-Ready Outputs",
      emoji: "🎟️",
      description:
        "Summaries and talking points you can walk into a room with—concise, cinematic, professional.",
      tag: "Delivery",
    },
  ];

  return (
    <section id="features" className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">
              Features built for serious storytellers
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-400 sm:text-base">
              Every tool is designed to feel like collaborating with a script
              doctor, not a chatbot. No scene generation—your voice stays
              intact.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800 text-lg">
                  {f.emoji}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {f.title}
                  </h3>
                  <span className="mt-0.5 inline-flex rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-300">
                    {f.tag}
                  </span>
                </div>
              </div>
              <p className="mt-3 text-xs text-slate-400 sm:text-sm">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnalyticsSection() {
  return (
    <section
      id="analytics"
      className="border-b border-slate-800 bg-slate-950/95"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">
              Analytics that respect the craft
            </h2>
            <p className="mt-2 text-sm text-slate-400 sm:text-base">
              SceneCraft doesn’t reduce your story to a score. It surfaces
              patterns—pace, emotional spikes, character presence—so you can
              direct the rewrite with clarity.
            </p>
            <ul className="mt-6 space-y-4 text-sm text-slate-300">
              <li>• Beat heat maps to see where tension drops or spikes.</li>
              <li>• Dialogue vs action balance across scenes and acts.</li>
              <li>• Character presence curves and emotional load.</li>
            </ul>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <p className="text-xs text-slate-400">Pacing Health</p>
              <p className="mt-1 text-3xl font-semibold text-white">87</p>
              <p className="mt-1 text-xs text-slate-400">
                Strong mid-scene momentum. Slight dip in final third.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <p className="text-xs text-slate-400">Dialogue Realism</p>
              <p className="mt-1 text-3xl font-semibold text-white">92</p>
              <p className="mt-1 text-xs text-slate-400">
                Natural, grounded exchanges aligned with character psychology.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <p className="text-xs text-slate-400">Genre Alignment</p>
              <p className="mt-1 text-3xl font-semibold text-white">81</p>
              <p className="mt-1 text-xs text-slate-400">
                Meets audience expectations for your chosen genre.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <p className="text-xs text-slate-400">Rewrite Impact</p>
              <p className="mt-1 text-3xl font-semibold text-white">+24%</p>
              <p className="mt-1 text-xs text-slate-400">
                Measured uplift after last revision pass.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSection({ onAuthClick }: { onAuthClick: () => void }) {
  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "for 2 scene analyses",
      highlight: "Great to try the engine",
      features: [
        "2 Scene Analyzer runs",
        "Basic cinematic breakdown",
        "Workspace access for 1 user",
      ],
      cta: "Get Started",
    },
    {
      name: "Pro",
      price: "TBD",
      period: "per month",
      highlight: "For active writers & small rooms",
      features: [
        "Generous monthly scene quota",
        "Full Script Analyzer access",
        "Collaboration & comments",
        "Priority analysis speed",
      ],
      cta: "Join Waitlist",
    },
    {
      name: "Studio / Enterprise",
      price: "Custom",
      period: "",
      highlight: "For studios, OTT & agencies",
      features: [
        "Multi-writer workspaces",
        "Custom analytics dashboards",
        "Dedicated onboarding",
        "Priority support & SLAs",
      ],
      cta: "Talk to Us",
    },
  ];

  return (
    <section id="pricing" className="bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            Start with a few scenes. Scale when you&apos;re ready.
          </h2>
          <p className="mt-2 text-sm text-slate-400 sm:text-base">
            SceneCraft AI is designed to grow with you—from single scenes to
            season bibles and full-length features.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-sm"
            >
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-white">
                  {plan.name}
                </h3>
                <p className="mt-1 text-xs text-indigo-400">
                  {plan.highlight}
                </p>
              </div>
              <div className="mb-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-white">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-xs text-slate-400">
                      {plan.period}
                    </span>
                  )}
                </div>
              </div>
              <ul className="mb-6 flex-1 space-y-2 text-xs text-slate-300">
                {plan.features.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
              <button
                onClick={onAuthClick}
                className="mt-auto w-full rounded-xl bg-indigo-500 px-4 py-2.5 text-xs font-medium text-white hover:bg-indigo-400"
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const handleClick = (id: SectionId) => scrollToSection(id);

  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-semibold text-slate-300">
            SceneCraft AI – Cinematic Intelligence Engine
          </p>
          <p className="mt-1">
            Built for writers who care about realism, psychology, and audience
            resonance.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <button onClick={() => handleClick("features")}>Features</button>
          <button onClick={() => handleClick("analytics")}>Analytics</button>
          <button onClick={() => handleClick("pricing")}>Pricing</button>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </div>
      </div>
    </footer>
  );
}

/* ----------------------- Page ----------------------- */

export default function HomePage() {
  const [authOpen, setAuthOpen] = useState(false);

  const openAuth = () => setAuthOpen(true);
  const closeAuth = () => setAuthOpen(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Header onAuthClick={openAuth} />
      <main>
        <AboutSection onAuthClick={openAuth} />
        <FeaturesSection />
        <AnalyticsSection />
        <PricingSection onAuthClick={openAuth} />
      </main>
      <Footer />
      <AuthModal open={authOpen} onClose={closeAuth} />
    </div>
  );
}
