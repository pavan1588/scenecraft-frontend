import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function Workspace() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/signin");

  return (
    <main className="min-h-screen p-8 space-y-8">
      <h1 className="text-4xl font-bold">Your Project Space</h1>
      <p className="text-slate-600">
        Welcome, {session.user?.name ?? "creator"}.
      </p>

      <section className="grid gap-4 md:grid-cols-2">
        <a href="/analyzer" className="rounded-2xl border p-6 hover:bg-slate-50">
          <h2 className="font-semibold text-xl">Scene Analyzer</h2>
          <p className="text-sm text-slate-600">Analyze scenes and save results.</p>
        </a>
        <a href="/collab" className="rounded-2xl border p-6 hover:bg-slate-50">
          <h2 className="font-semibold text-xl">Collaboration</h2>
          <p className="text-sm text-slate-600">Invite reviewers and collect comments.</p>
        </a>
      </section>
    </main>
  );
}
