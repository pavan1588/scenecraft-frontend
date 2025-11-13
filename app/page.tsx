export default function Page() {
  return (
    <>
      <section className="relative isolate">
        <div className="mx-auto max-w-6xl px-6 pt-24 pb-16">
          <div className="mb-6 inline-flex items-center rounded-full border px-3 py-1 text-xs text-slate-600">
            Empowering Creative Storytellers
          </div>
          <h1 className="max-w-4xl text-5xl/tight sm:text-6xl/tight font-extrabold tracking-tight">
            Professional Screenplay<br/>Analysis Made<br/>Collaborative
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-slate-600">
            SceneCraft AI transforms how writers develop scenes and scripts. Analyze, get feedback, and collaborate—seamlessly.
          </p>
          <div className="mt-8 flex gap-4">
            <a href="/api/auth/signin?callbackUrl=/workspace" className="rounded-xl bg-slate-900 text-white px-5 py-3 text-sm font-medium hover:opacity-90">Try Scene Analyzer</a>
            <a href="#pricing" className="rounded-xl border px-5 py-3 text-sm font-medium hover:bg-slate-50">Pricing</a>
          </div>
        </div>

        <div id="features" className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border p-6">
              <h3 className="font-semibold">Cinematic Intelligence</h3>
              <p className="mt-2 text-sm text-slate-600">Deep, psychologically informed scene analysis aligned to industry benchmarks.</p>
            </div>
            <div className="rounded-2xl border p-6">
              <h3 className="font-semibold">Collaborative Reviews</h3>
              <p className="mt-2 text-sm text-slate-600">Invite peers to comment, discuss beats, and iterate together.</p>
            </div>
            <div className="rounded-2xl border p-6">
              <h3 className="font-semibold">Workspace & Versions</h3>
              <p className="mt-2 text-sm text-slate-600">Save drafts, compare revisions, and keep a timeline of changes.</p>
            </div>
          </div>
        </div>

        <div id="analytics" className="mx-auto max-w-6xl px-6 mt-16">
          <h2 className="text-2xl font-semibold">Analytics</h2>
          <p className="mt-2 text-sm text-slate-600">Visual dashboards (heat maps, beat graphs, pace curves) plug-in here.</p>
        </div>

        <div id="pricing" className="mx-auto max-w-6xl px-6 mt-16 pb-24">
          <h2 className="text-2xl font-semibold">Pricing</h2>
          <p className="mt-2 text-sm text-slate-600">Free trials available. Pay as you scale.</p>
        </div>
      </section>
    </>
  );
}

