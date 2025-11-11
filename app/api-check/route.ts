export const dynamic = "force-dynamic"; // no caching
export async function GET() {
  const url = (process.env.SCENECRAFT_BACKEND_URL ?? "").replace(/\/+$/,"") + "/health";
  try {
    const r = await fetch(url, {
      headers: { "x-api-key": process.env.SCENECRAFT_BACKEND_API_KEY ?? "" }
    });
    return new Response(await r.text(), { status: r.status });
  } catch (e) {
    return new Response("Upstream error", { status: 502 });
  }
}