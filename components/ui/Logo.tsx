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
    sm: "h-8 md:h-10",
    md: "h-10 md:h-14",
    lg: "h-12 md:h-16",
  };

  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/logo/logo.png"
        alt={CONFIG.empresa}
        width={220}
        height={75}
        priority
        className={`${sizes[size]} w-auto object-contain`}
      />
    </Link>
  );
}
