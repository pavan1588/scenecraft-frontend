"use client";
import { useEffect } from "react";
import { signIn } from "next-auth/react";

export default function GetStarted() {
  useEffect(() => {
    signIn("google", { callbackUrl: "/dashboard" });
  }, []);
  return (
    <main className="min-h-[60vh] grid place-items-center p-8">
      <p>Redirecting to Google</p>
    </main>
  );
}
