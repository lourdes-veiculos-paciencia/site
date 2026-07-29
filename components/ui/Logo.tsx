import Image from "next/image";
import Link from "next/link";

import { CONFIG } from "@/lib/config";

type Props = {
  size?: "sm" | "md" | "lg";
};

export default function Logo({
  size = "md",
}: Props) {
  const sizes = {
    sm: {
      width: 130,
      height: 44,
      className: "h-7 w-auto sm:h-8 md:h-10",
    },
    md: {
      width: 170,
      height: 58,
      className: "h-8 w-auto sm:h-10 md:h-14",
    },
    lg: {
      width: 220,
      height: 75,
      className: "h-10 w-auto sm:h-12 md:h-16",
    },
  };

  return (
    <Link
      href="/"
      className="flex items-center"
    >
      <Image
        src="/logo/logo.png"
        alt={CONFIG.empresa}
        width={sizes[size].width}
        height={sizes[size].height}
        priority
        className={sizes[size].className}
      />
    </Link>
  );
}
