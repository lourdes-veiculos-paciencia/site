import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  console.log("=================================");
  console.log("PATH:", request.nextUrl.pathname);
  console.log("COOKIES:", request.cookies.getAll());
  console.log("=================================");

  const autenticado =
    request.cookies.get("admin-auth")?.value === "true";

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