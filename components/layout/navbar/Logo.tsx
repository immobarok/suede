import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  isHome?: boolean;
}

export function Logo({ isHome }: LogoProps) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={100}
        height={100}
        className={isHome ? "brightness-0 invert" : ""}
      />
    </Link>
  );
}
