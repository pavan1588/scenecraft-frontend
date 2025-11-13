'use client';

export const dynamic = 'force-dynamic';

import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { addHistoryItem, loadHistory, HistoryItem } from "@/lib/history";

export default function SceneEditorPage() {
  const sessionResult = useSession();
  const session = sessionResult?.data;
  const status = sessionResult?.status ?? 'unauthenticated';
  const router = useRouter();

  const [sceneText, setSceneText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const email = session?.user?.email ?? null;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/signin");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      setHistory(loadHistory(email));
    }
  }, [status, email]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!sceneText.trim()) return;

    setLoading(true);
    setResult("");

    try {
      const response = await fetch("/api/editor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode: "scene_editor",
          text: sceneText,
        }),
      });

      const contentType = response.headers.get("content-type") || "";
      let body: any;

      if (contentType.includes("application/json")) {
        body = await response.json();
      } else {
        body = await response.text();
      }

      const textResult =
        typeof body === "string"
          ? body
          : body.suggestions ??
            body.result ??
            body.output ??
            JSON.stringify(body, null, 2);

      setResult(textResult);

      const firstLine =
        sceneText.split("\n").find((l) => l.trim().length > 0) ?? "Untitled scene";

      addHistoryItem(email, {
        id: `${Date.now()}-editor`,
        type: "editor",
        title: firstLine.slice(0, 80),
        createdAt: new Date().toISOString(),
      });

      setHistory(loadHistory(email));
    } catch (err) {
      console.error(err);
      setResult("Something went wrong reaching the editor. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (status !== "authenticated") {
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold tracking-wide text-sky-300 uppercase">
              Scene Editor
            </p>
            <h1 className="text-xl md:text-2xl font-semibold text-slate-50">
              Line-by-line rewrites
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Signed in as{" "}
            <span className="font-medium text-slate-100">{email}</span>
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-8 grid gap-6 lg:grid-cols-[minmax(0,1.1fr),minmax(0,1fr)]">
        {/* Input side */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
            <h2 className="text-sm font-semibold text-slate-100">
              Paste the scene you want to refine
            </h2>
            <p className="mt-1 text-[11px] text-slate-500">
              The editor focuses on natural, cinematic rewrites while
              preserving your voice.
            </p>

            <form onSubmit={handleSubmit} className="mt-3 space-y-3">
              <textarea
                value={sceneText}
                onChange={(e) => setSceneText(e.target.value)}
                className="w-full h-64 md:h-80 rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-400 resize-vertical"
                placeholder="Paste up to ~2 pages of scene here. SceneCraft will respond with line-by-line suggestions, rationale and director-style notes."
              />

              <div className="flex items-center justify-between gap-3">
                <p className="text-[11px] text-slate-500">
                  You stay in control; SceneCraft only suggests, never overwrites.
                </p>
                <button
                  type="submit"
                  disabled={loading || !sceneText.trim()}
                  className="inline-flex items-center rounded-full bg-sky-500 px-4 py-1.5 text-xs font-semibold text-slate-950 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-sky-400 transition"
                >
                  {loading ? "Generating rewrites" : "Run editor"}
                </button>
              </div>
            </form>
          </div>

          {/* History */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-slate-100">
                Editor history (this device)
              </h3>
              <button
                onClick={() => setHistory(loadHistory(email))}
                className="text-[11px] text-slate-400 hover:text-slate-200"
              >
                Refresh
              </button>
            </div>
            {history.length === 0 ? (
              <p className="mt-2 text-xs text-slate-500">
                Once you run the editor, we&apos;ll keep a local record of your
                sessions.
              </p>
            ) : (
              <ul className="mt-3 space-y-2">
                {history
                  .filter((h) => h.type === "editor")
                  .slice(0, 8)
                  .map((item) => (
                    <li
                      key={item.id}
                      className="rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-2"
                    >
                      <p className="text-xs text-slate-100">{item.title}</p>
                      <p className="mt-0.5 text-[11px] text-slate-500">
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>

        {/* Output side */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col">
          <h2 className="text-sm font-semibold text-slate-100">
            Rewrite suggestions
          </h2>
          <p className="mt-1 text-[11px] text-slate-500">
            Copy the lines or notes you like back into your script; treat this
            as a creative partner, not a replacement.
          </p>
          <div className="mt-3 flex-1 rounded-xl bg-slate-950/60 border border-slate-800 p-3 overflow-auto text-xs whitespace-pre-wrap text-slate-100">
            {loading && (
              <p className="text-slate-400">
                Crafting emotionally intelligent rewrites
              </p>
            )}
            {!loading && !result && (
              <p className="text-slate-500">
                Editor output will appear here once ready.
              </p>
            )}
            {!loading && result && <>{result}</>}
          </div>
        </div>
      </section>
    </main>
  );
}

