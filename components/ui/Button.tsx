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
    "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 active:scale-95";

  const variants = {
    primary:
      "bg-red-600 text-white hover:bg-red-700 shadow-md",

    secondary:
      "border border-red-600 bg-white text-red-600 hover:bg-red-600 hover:text-white",
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