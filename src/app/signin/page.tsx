"use client";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-sm w-full rounded-xl border p-6 space-y-4">
        <h1 className="text-xl font-semibold">Sign in to SceneCraft</h1>
        <button
          onClick={() => signIn("google", { callbackUrl: "/workspace" })}
          className="w-full rounded-lg border px-4 py-2"
        >
          Continue with Google
        </button>
        <p className="text-xs text-gray-500">Session auto-expires in 1 hour.</p>
      </div>
    </main>
  );
}