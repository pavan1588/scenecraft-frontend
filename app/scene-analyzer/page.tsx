"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SceneAnalyzerPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/");
  }, [status, router]);

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center">
        <p className="text-sm text-slate-400">Preparing Scene Analyzer</p>
      </main>
    );
  }

  if (!session) return null;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-2xl font-semibold">Scene Analyzer</h1>
        <p className="text-sm text-slate-400 mt-2">
          This is the placeholder for the 7-pass SceneCraft cinematic analyzer UI.
        </p>
      </div>
    </main>
  );
}
