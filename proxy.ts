import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, validarSessaoAdmin } from "@/lib/admin-session";

export function proxy(request: NextRequest) {
  const autenticado = validarSessaoAdmin(request.cookies.get(ADMIN_COOKIE)?.value);

  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    !autenticado
  ) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  if (
    request.nextUrl.pathname === "/login" &&
    autenticado
  ) {
    return NextResponse.redirect(
      new URL("/admin", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
