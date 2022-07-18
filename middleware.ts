import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;

  const url = req.nextUrl.clone();
  if (!pathname.includes("/_next") && !pathname.includes("/favicon.ico")) {
    if (token && pathname == "/login") {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    if (pathname.includes("/api/auth") || token) {
      return NextResponse.next();
    }

    if (!token && pathname !== "/login") {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  // console.log(pathname, "pathname");

  // allow req if true
  // 1) the token exist
}
