import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
};

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const classes =
    variant === "primary"
      ? "bg-red-600 hover:bg-red-700 text-white"
      : "bg-white border border-red-600 text-red-600 hover:bg-red-600 hover:text-white";

  if (href) {
    return (
      <Link
        href={href}
        className={`${classes} px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${className}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${classes} px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
}