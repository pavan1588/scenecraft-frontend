export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const path = url.searchParams.get("path") ?? "health";
    const target = `${process.env.SCENECRAFT_BACKEND_URL}/${path}`;

    const r = await fetch(target, {
      method: "GET",
      headers: { "x-api-key": process.env.SCENECRAFT_BACKEND_API_KEY! }
    });

    const body = await r.text();
    return new Response(body, { status: r.status, headers: { "content-type": r.headers.get("content-type") ?? "text/plain" }});
  } catch (e) {
    return new Response("Upstream error", { status: 502 });
  }
}
