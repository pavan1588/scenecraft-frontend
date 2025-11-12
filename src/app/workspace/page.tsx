import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function WorkspacePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/signin");
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Workspace</h1>
      <p className="mt-2">Signed in as {session.user?.email}</p>
    </main>
  );
}