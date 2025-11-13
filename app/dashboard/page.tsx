'use client';

export const dynamic = 'force-dynamic';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { isAdmin } from "@/lib/roles";

export default function AdminDashboardPage() {
  const sessionResult = useSession();
  const session = sessionResult?.data;
  const status = sessionResult?.status ?? 'unauthenticated';
  const router = useRouter();

  const email = session?.user?.email ?? null;
  const admin = isAdmin(email);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/signin");
    } else if (status === "authenticated" && !admin) {
      router.replace("/workspace");
    }
  }, [status, admin, router]);

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <p className="text-sm text-slate-400">Checking admin access</p>
      </main>
    );
  }

  if (!admin) return null;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">
              SceneCraft AI
            </p>
            <h1 className="text-xl font-semibold text-slate-50">
              Admin dashboard
            </h1>
          </div>
          <p className="text-xs text-slate-400">Admin: {email}</p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-10 space-y-8">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <p className="text-xs font-medium text-slate-400">
              Active users (session-based)
            </p>
            <p className="mt-3 text-2xl font-semibold text-slate-50">—</p>
            <p className="mt-1 text-[11px] text-slate-500">
              Hook this up to backend metrics when ready.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <p className="text-xs font-medium text-slate-400">
              Scene analyses today
            </p>
            <p className="mt-3 text-2xl font-semibold text-slate-50">—</p>
            <p className="mt-1 text-[11px] text-slate-500">
              You can pipe stats from Cloud Run / FastAPI here.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <p className="text-xs font-medium text-slate-400">
              Editor rewrites today
            </p>
            <p className="mt-3 text-2xl font-semibold text-slate-50">—</p>
            <p className="mt-1 text-[11px] text-slate-500">
              Placeholder cards ready for backend wiring.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
          <h2 className="text-sm font-semibold text-slate-100">
            Roadmap / notes
          </h2>
          <p className="mt-2 text-xs text-slate-400">
            This space is reserved for deeper analytics: per-user quotas,
            success rates, latency, GPU usage, etc. For now it serves as a
            private admin-only control panel.
          </p>
        </div>
      </section>
    </main>
  );
}

