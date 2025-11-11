"use client";
import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <main className="min-h-[70vh] grid place-items-center p-8">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl font-semibold">Sign in to SceneCraft</h1>
        <p className="text-slate-500">Continue with your Google account.</p>
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="rounded-xl px-5 py-3 bg-black text-white hover:opacity-90"
        >
          Continue with Google
        </button>
      </div>
    </main>
  );
}
