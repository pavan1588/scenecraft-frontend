import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const ADMIN_EMAIL = "pavanagnihotri82@gmail.com";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: { strategy: "jwt", maxAge: 60 * 60 }, // 1 hour
  pages: { signIn: "/signin" },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile && "email" in profile!) {
        token.email = (profile as any).email;
        token.role = token.email === ADMIN_EMAIL ? "admin" : "user";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) (session.user as any).role = token.role;
      return session;
    },
  },
};