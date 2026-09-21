import "server-only";
import { createHmac, timingSafeEqual, randomBytes } from "node:crypto";

export const ADMIN_COOKIE = "admin-auth";
export const SESSION_SECONDS = 60 * 5;

export function expiracaoSessaoAdmin(token?: string) {
  if (!validarSessaoAdmin(token)) return 0;
  return JSON.parse(Buffer.from(token!.split(".")[0], "base64url").toString("utf8")).exp * 1000 as number;
}

function segredo() {
  const value = process.env.ADMIN_SESSION_SECRET;
  if (!value || value.length < 32) throw new Error("Configure ADMIN_SESSION_SECRET com pelo menos 32 caracteres aleatórios no servidor.");
  return value;
}

function assinar(payload: string) {
  return createHmac("sha256", segredo())
    .update(JSON.stringify(["lourdes-admin-v1", process.env.ADMIN_USER, process.env.ADMIN_PASSWORD, payload]))
    .digest("base64url");
}

export function credenciaisValidas(usuario: unknown, senha: unknown) {
  const user = process.env.ADMIN_USER;
  const password = process.env.ADMIN_PASSWORD;
  if (!user || !password || typeof usuario !== "string" || typeof senha !== "string") return false;
  const hash = (valor: string) => createHmac("sha256", "lourdes-login-comparison").update(valor).digest();
  return timingSafeEqual(hash(usuario), hash(user)) && timingSafeEqual(hash(senha), hash(password));
}

export function criarSessaoAdmin(agora = Date.now()) {
  if (!process.env.ADMIN_USER || !process.env.ADMIN_PASSWORD) throw new Error("Credenciais administrativas não configuradas.");
  const payload = Buffer.from(JSON.stringify({ exp: Math.floor(agora / 1000) + SESSION_SECONDS, nonce: randomBytes(24).toString("base64url") })).toString("base64url");
  return `${payload}.${assinar(payload)}`;
}

export function validarSessaoAdmin(token?: string, agora = Date.now()) {
  try {
    if (!token || token.length > 1024 || !process.env.ADMIN_USER || !process.env.ADMIN_PASSWORD) return false;
    const partes = token.split(".");
    if (partes.length !== 2 || !/^[A-Za-z0-9_-]+$/.test(partes[0]) || !/^[A-Za-z0-9_-]{43}$/.test(partes[1])) return false;
    const esperado = Buffer.from(assinar(partes[0]));
    if (!timingSafeEqual(esperado, Buffer.from(partes[1]))) return false;
    const dados = JSON.parse(Buffer.from(partes[0], "base64url").toString("utf8"));
    const agoraSegundos = Math.floor(agora / 1000);
    return Number.isSafeInteger(dados.exp) && dados.exp > agoraSegundos && dados.exp <= agoraSegundos + SESSION_SECONDS && typeof dados.nonce === "string";
  } catch {
    return false;
  }
}
