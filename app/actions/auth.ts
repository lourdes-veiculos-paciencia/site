"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const usuario = formData.get("usuario");
  const senha = formData.get("senha");

  if (
    usuario === process.env.ADMIN_USER &&
    senha === process.env.ADMIN_PASSWORD
  ) {
    const cookieStore = await cookies();

    cookieStore.set("admin-auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    redirect("/admin");
  }

  redirect("/login?erro=1");
}

export async function logout() {
  const cookieStore = await cookies();

  cookieStore.delete("admin-auth");

  redirect("/login");
}