"use client";

import { useSession } from "next-auth/react";

export default function WorkspacePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-slate-500">Checking your session</p>
      </main>
    );
  }

  if (!session) {
    if (typeof window !== "undefined") {
      window.location.href = "/api/auth/signin?callbackUrl=/workspace";
    }
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="flex items-center justify-between border-b bg-white px-6 py-4">
        <div className="font-semibold">SceneCraft AI</div>
        <p className="text-sm text-slate-600">
          Signed in as <span className="font-medium">{session.user?.email}</span>
        </p>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-10 space-y-4">
        <h1 className="text-2xl font-bold text-slate-900">
          Workspace
        </h1>
        <p className="text-sm text-slate-600">
          This is your SceneCraft workspace. From here well plug in Scene Analyzer,
          Full Script tools and other features.
        </p>
      </section>
    </main>
  );
}
