import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
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
  const base =
    "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300 active:scale-95";

  const variants = {
    primary:
      "bg-red-600 text-white shadow-sm shadow-red-900/20 hover:bg-red-700 hover:shadow-md hover:shadow-red-900/25",

    secondary:
      "border border-gray-300 bg-white text-gray-900 hover:border-red-600 hover:text-red-700 hover:shadow-sm",
  };

  const classes = `
    ${base}
    ${variants[variant]}
    px-5
    py-3
    text-sm
    sm:px-6
    sm:text-base
    ${className}
  `;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
