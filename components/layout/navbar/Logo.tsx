import Image from "next/image";
import Link from "next/link";

export function Logo({ isHeroMode }: { isHeroMode?: boolean }) {
  const logoSrc = isHeroMode ? "/Logo_white.svg" : "/Logo_black.svg";

  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src={logoSrc}
        alt="Logo"
        width={100}
        height={40}
        className="object-contain"
        priority
      />
    </Link>
  );
}
