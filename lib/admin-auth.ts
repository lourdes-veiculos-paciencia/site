import "server-only";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, validarSessaoAdmin } from "./admin-session";

export async function exigirAdmin() {
  if (!validarSessaoAdmin((await cookies()).get(ADMIN_COOKIE)?.value)) {
    throw new Error("Sessão administrativa inválida ou expirada. Entre novamente no painel.");
  }
}
