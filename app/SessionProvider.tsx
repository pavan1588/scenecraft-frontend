"use client";

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

type Props = {
  children: React.ReactNode;
  session?: Session | null;
};

/**
 * SceneCraft SessionProvider
 * - Wraps the entire app in NextAuth's SessionProvider
 * - Lets useSession() work correctly on all client pages
 */
export default function SCSessionProvider({ children, session }: Props) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
