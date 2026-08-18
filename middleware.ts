import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "pulse_admin";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const session = req.cookies.get(COOKIE_NAME)?.value;
    if (!session || session !== process.env.ADMIN_PASSWORD) {
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
