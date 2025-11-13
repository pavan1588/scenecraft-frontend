import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_HOST = "www.scenecraft-ai.com";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // If someone hits the bare domain, redirect to www
  if (url.hostname === "scenecraft-ai.com") {
    url.hostname = CANONICAL_HOST;
    url.protocol = "https";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

// Run for everything except static assets/images/favicon
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
