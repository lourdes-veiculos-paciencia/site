import Link from "next/link";

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
  return (
    <Link
      href={href}
      className={`
        font-medium
        transition-colors
        hover:text-red-600

        ${
          mobile
            ? "block rounded-lg px-4 py-3 text-base text-zinc-800 hover:bg-zinc-100"
            : "text-sm uppercase tracking-[0.14em] text-zinc-700"
        }
      `}
    >
      {children}
    </Link>
  );
}
