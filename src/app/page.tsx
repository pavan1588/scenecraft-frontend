export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] text-white text-center px-6">
      <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
        SceneCraft AI
      </h1>
      <p className="max-w-xl text-lg opacity-80 mb-8">
        The cinematic writing assistant that analyzes, edits, and elevates your scenes with human insight.
      </p>
      <a href="/api/auth/signin" className="rounded-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-3 transition">
        Get Started 
      </a>
    </main>
  );
}
