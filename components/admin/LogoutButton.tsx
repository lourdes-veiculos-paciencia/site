"use client";

import { logout } from "@/app/actions/auth";

export default function LogoutButton() {
  return (
    <form action={logout} className="w-full">
      <button
        type="submit"
        className="w-full rounded-lg bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700"
      >
        🚪 Sair
      </button>
    </form>
  );
}
