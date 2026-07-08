import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get("admin-auth");

  const { pathname } = request.nextUrl;

  // Protege todas as rotas /admin
  if (pathname.startsWith("/admin")) {
    if (!cookie) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Se já estiver logado e tentar acessar /login
  if (pathname === "/login" && cookie) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};