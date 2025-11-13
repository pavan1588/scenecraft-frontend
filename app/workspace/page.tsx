"use client";

import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function WorkspacePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/");
  }, [status, router]);

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-50">
        <div className="mx-auto flex max-w-5xl items-center justify-center px-4 py-24">
          <p className="text-sm text-slate-400">Loading your workspace</p>
        </div>
      </main>
    );
  }

  if (!session) return null;

  const displayName = session.user?.name || session.user?.email;
  const isAdmin = session.user?.email === "pavanagnihotri82@gmail.com";

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-10">

        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <p className="text-xs uppercase tracking-[0.25em] text-emerald-400">Workspace</p>
              {isAdmin && (
                <span className="rounded-full border border-amber-400/50 bg-amber-400/10 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                  Admin
                </span>
              )}
            </div>

            <h1 className="mt-2 text-3xl font-semibold">
              Welcome back, <span className="text-emerald-300">{displayName}</span>
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              This is your SceneCraft hub. Start a new scene analysis, refine a draft, 
              or soon evaluate a full script — all from one place.
            </p>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="inline-flex items-center justify-center rounded-full border border-slate-600 px-4 py-2 text-xs font-medium text-slate-100 hover:bg-slate-800 hover:border-slate-400 transition"
          >
            Sign out
          </button>
        </header>

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          <Link href="/scene-analyzer" className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-5 hover:-translate-y-1 hover:border-emerald-400/80 transition">
            <p className="text-xs font-semibold text-emerald-400">Scene Tool</p>
            <h2 className="mt-2 text-lg font-semibold">Scene Analyzer</h2>
            <p className="mt-2 text-sm text-slate-400">
              Multi-layer cinematic diagnosis: structure, pacing, realism & emotional depth.
            </p>
            <div className="mt-4 text-xs font-medium text-emerald-300 flex items-center">Open analyzer </div>
          </Link>

          <Link href="/scene-editor" className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-5 hover:-translate-y-1 hover:border-sky-400/80 transition">
            <p className="text-xs font-semibold text-sky-400">Rewrite Studio</p>
            <h2 className="mt-2 text-lg font-semibold">Scene Editor</h2>
            <p className="mt-2 text-sm text-slate-400">
              Line-by-line rewrite engine that enhances your voice, tone & emotional clarity.
            </p>
            <div className="mt-4 text-xs font-medium text-sky-300 flex items-center">Open editor </div>
          </Link>

          <Link href="/full-script-analyzer" className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-5 hover:-translate-y-1 hover:border-fuchsia-400/80 transition">
            <p className="text-xs font-semibold text-fuchsia-400">Coming soon</p>
            <h2 className="mt-2 text-lg font-semibold">Full Script Analyzer</h2>
            <p className="mt-2 text-sm text-slate-400">
              Prepare your full script for advanced cinematic diagnosis (launching soon).
            </p>
            <div className="mt-4 text-xs font-medium text-fuchsia-300 flex items-center">Preview </div>
          </Link>

        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
          <h3 className="text-sm font-semibold">Recent activity & analytics</h3>
          <p className="mt-2 text-sm text-slate-400">
            Analytics and recent workspace actions will appear here as we deploy the visual modules.
          </p>
        </section>

      </div>
    </main>
  );
}
