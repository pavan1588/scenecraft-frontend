"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function WorkspacePage() {
  const { data: session, status } = useSession();
  const email = session?.user?.email ?? "";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold">SceneCraft AI</span>
          </div>

          <nav className="flex items-center gap-6 text-sm">
            <Link href="/" className="hover:text-slate-200">
              Features
            </Link>
            <Link href="/#analytics" className="hover:text-slate-200">
              Analytics
            </Link>
            <Link href="/#pricing" className="hover:text-slate-200">
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-4 text-xs">
            {email && (
              <span className="hidden text-slate-400 sm:inline">
                Signed in as{" "}
                <span className="text-slate-100">{email}</span>
              </span>
            )}
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="rounded-full border border-slate-700 px-3 py-1 text-xs font-medium hover:bg-slate-800"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-3xl font-semibold tracking-tight">Workspace</h1>
        <p className="mt-3 text-slate-300">
          This is your SceneCraft workspace. From here we'll plug in Scene
          Analyzer, Full Script tools and other features.
        </p>
      </main>
    </div>
  );
}
