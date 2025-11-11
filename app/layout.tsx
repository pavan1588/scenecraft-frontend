import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SceneCraft AI — Professional Screenplay Analysis",
  description: "Analyze & Inspire",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-white text-slate-900 antialiased">
        <header className="border-b">
          <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
            <div className="font-semibold tracking-tight">SceneCraft AI</div>
            <nav className="flex items-center gap-6 text-sm">
              <a className="hover:opacity-80" href="#features">Features</a>
              <a className="hover:opacity-80" href="#analytics">Analytics</a>
              <a className="hover:opacity-80" href="#pricing">Pricing</a>
              <a className="hover:opacity-80" href="/signin">Sign In</a>
              <a className="rounded-xl bg-slate-900 text-white px-4 py-2 hover:opacity-90" href="#get-started">Get Started</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="mt-24 border-t">
          <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-slate-500">
             {new Date().getFullYear()} SceneCraft AI
          </div>
        </footer>
      </body>
    </html>
  );
}
