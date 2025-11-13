'use client';

export const dynamic = 'force-dynamic';

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { isAdmin } from "@/lib/roles";
import { loadHistory, HistoryItem } from "@/lib/history";

export default function WorkspacePage() {
  const sessionResult = useSession();
  const session = sessionResult?.data;
  const status = sessionResult?.status ?? 'unauthenticated';
  const router = useRouter();
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const email = session?.user?.email ?? null;
  const admin = isAdmin(email);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/signin");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      setHistory(loadHistory(email));
    }
  }, [status, email]);

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <p className="text-sm text-slate-400">Loading your workspace</p>
      </main>
    );
  }

  if (status !== "authenticated") {
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold tracking-wide text-slate-400">
              SceneCraft AI
            </span>
            <span className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-emerald-300">
              Workspace
            </span>
            {admin && (
              <span className="ml-2 inline-flex items-center rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-300">
                Admin
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-slate-400 md:inline">
              Signed in as{" "}
              <span className="font-medium text-slate-100">{email}</span>
            </span>
            {admin && (
              <Link
                href="/dashboard"
                className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-100 hover:border-amber-400 hover:text-amber-200 transition"
              >
                Admin Dashboard
              </Link>
            )}
            <button
              onClick={() =>
                signOut({
                  callbackUrl: "/",
                })
              }
              className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-900 hover:bg-slate-200 transition"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-10 space-y-10">
        {/* Hero */}
        <div className="grid gap-8 md:grid-cols-[minmax(0,2fr),minmax(0,1.3fr)] items-start">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold text-slate-50 tracking-tight">
              Workspace
            </h1>
            <p className="mt-3 text-sm md:text-base text-slate-400 max-w-xl">
              This is your SceneCraft workspace. From here you can access the{" "}
              <span className="font-medium text-slate-100">
                Scene Analyzer
              </span>
              ,{" "}
              <span className="font-medium text-slate-100">Scene Editor</span>,
              and the upcoming{" "}
              <span className="font-medium text-slate-100">
                Full Script tools
              </span>
              .
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <Link
                href="/scene-analyzer"
                className="group rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 px-4 py-4 hover:border-emerald-400/60 hover:from-slate-900 hover:to-slate-900 transition flex flex-col justify-between"
              >
                <div>
                  <p className="text-xs font-medium text-emerald-300">
                    Scene Analyzer
                  </p>
                  <h2 className="mt-1 text-base font-semibold text-slate-50">
                    Diagnose any scene
                  </h2>
                  <p className="mt-2 text-xs text-slate-400">
                    7-pass cinematic analysis, realism checks and genre-aware
                    feedback.
                  </p>
                </div>
                <span className="mt-3 text-[11px] font-semibold text-emerald-300 group-hover:translate-x-0.5 transition">
                  Open Analyzer 
                </span>
              </Link>

              <Link
                href="/scene-editor"
                className="group rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 px-4 py-4 hover:border-sky-400/60 hover:from-slate-900 hover:to-slate-900 transition flex flex-col justify-between"
              >
                <div>
                  <p className="text-xs font-medium text-sky-300">
                    Scene Editor
                  </p>
                  <h2 className="mt-1 text-base font-semibold text-slate-50">
                    Line-by-line rewrites
                  </h2>
                  <p className="mt-2 text-xs text-slate-400">
                    Smarter dialogue and action polish without losing your
                    voice.
                  </p>
                </div>
                <span className="mt-3 text-[11px] font-semibold text-sky-300 group-hover:translate-x-0.5 transition">
                  Open Editor 
                </span>
              </Link>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 px-4 py-4 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-400">
                    Full Script
                  </p>
                  <h2 className="mt-1 text-base font-semibold text-slate-200">
                    Coming soon
                  </h2>
                  <p className="mt-2 text-xs text-slate-500">
                    End-to-end script companion with act-level diagnostics and
                    rewrite lanes.
                  </p>
                </div>
                <span className="mt-3 text-[11px] font-semibold text-slate-500">
                  In development
                </span>
              </div>
            </div>
          </div>

          {/* History summary */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-slate-100">
                Recent activity
              </h3>
              <Link
                href="/scene-analyzer#history"
                className="text-[11px] text-slate-400 hover:text-slate-200"
              >
                View full history
              </Link>
            </div>
            {history.length === 0 ? (
              <p className="mt-3 text-xs text-slate-500">
                No saved runs yet. Analyze or edit a scene and we&apos;ll keep a
                private history on this device.
              </p>
            ) : (
              <ul className="mt-3 space-y-2">
                {history.slice(0, 4).map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-2"
                  >
                    <div>
                      <p className="text-xs font-medium text-slate-100">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-500">
                        {item.type === "analyzer" ? "Analyzer" : "Editor"} {" "}
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

