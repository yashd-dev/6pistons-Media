import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const { pathname } = request.nextUrl;

  // Handle cms.6pistons.com subdomain
  if (host.startsWith("cms.")) {
    // If request does not already start with /studio, rewrite internally to /studio
    if (!pathname.startsWith("/studio")) {
      const url = request.nextUrl.clone();
      url.pathname = `/studio${pathname}`;
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, images, videos, robots.txt, sitemap.xml
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
