"use client";

import { useEffect } from "react";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  useEffect(() => {
    // Trigger Google sign-in immediately; fallback button remains visible.
    signIn("google", { callbackUrl: "/workspace" });
  }, []);

  return (
    <main className="min-h-screen grid place-items-center p-6">
      <div className="max-w-md text-center space-y-6">
        <h1 className="text-3xl font-bold">Sign in to SceneCraft AI</h1>
        <p>Continue with Google to access your workspace.</p>
        <button
          onClick={() => signIn("google", { callbackUrl: "/workspace" })}
          className="rounded-xl bg-slate-900 px-4 py-2 text-white"
        >
          Continue with Google
        </button>
      </div>
    </main>
  );
}
