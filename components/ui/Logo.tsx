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
    },
    md: {
      width: 170,
      height: 58,
    },
    lg: {
      width: 220,
      height: 75,
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
        style={{
          width: "auto",
          height: "auto",
          maxWidth: "100%",
        }}
      />
    </Link>
  );
}