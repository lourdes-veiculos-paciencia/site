"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  children: React.ReactNode;
  mobile?: boolean;
};

export default function NavItem({
  href,
  children,
  mobile = false,
}: Props) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`
        font-medium
        transition-colors
        hover:text-red-600

        ${
          mobile
            ? `block rounded-lg px-4 py-3 text-base hover:bg-zinc-100 ${active ? "bg-red-50 text-red-700" : "text-zinc-800"}`
            : `rounded-full px-4 py-2.5 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 ${active ? "bg-white text-red-600 shadow-sm" : "text-zinc-600 hover:bg-white/70"}`
        }
      `}
    >
      {children}
    </Link>
  );
}
