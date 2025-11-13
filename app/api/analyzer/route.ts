import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const backendBase = process.env.BACKEND_API_BASE;
  const apiKey = process.env.BACKEND_API_KEY;

  if (!backendBase || !apiKey) {
    return NextResponse.json(
      { error: "Backend not configured (BACKEND_API_BASE / BACKEND_API_KEY)." },
      { status: 500 }
    );
  }

  const analyzePath = process.env.BACKEND_ANALYZER_PATH ?? "/analyze";
  const url = backendBase.replace(/\/$/, "") + analyzePath;

  const payload = await req.json();

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(payload),
    });

    const text = await res.text();

    try {
      const json = JSON.parse(text);
      return NextResponse.json(json, { status: res.status });
    } catch {
      return new NextResponse(text, { status: res.status });
    }
  } catch (err) {
    console.error("Analyzer proxy error:", err);
    return NextResponse.json(
      { error: "Failed to reach SceneCraft backend analyzer." },
      { status: 502 }
    );
  }
}
