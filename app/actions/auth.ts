"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, SESSION_SECONDS, criarSessaoAdmin, credenciaisValidas } from "@/lib/admin-session";

export async function login(formData: FormData) {
  const usuario = formData.get("usuario");
  const senha = formData.get("senha");

  if (
    credenciaisValidas(usuario, senha)
  ) {
    const cookieStore = await cookies();

    cookieStore.set({
      name: ADMIN_COOKIE,
      value: criarSessaoAdmin(),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_SECONDS,
    });

    redirect("/admin");
  }

  redirect("/login?erro=1");
}

export async function logout() {
  const cookieStore = await cookies();

  cookieStore.delete(ADMIN_COOKIE);

  redirect("/login");
}
