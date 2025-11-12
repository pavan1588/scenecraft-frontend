import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.Google_CLIENT_SECRET as any || process.env.GOOGLE_CLIENT_SECRET as string
    }),
  ],
  pages: { signIn: "/signin" },
  session: { strategy: "jwt" }
};
