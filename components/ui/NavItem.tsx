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
            ? "block rounded-lg px-4 py-3 text-lg hover:bg-gray-100"
            : "text-gray-700"
        }
      `}
    >
      {children}
    </Link>
  );
}