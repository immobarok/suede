import Image from "next/image";
import LogoTiny from "@/public/icons/logo_small.svg";

export function LogoSmall() {

  return (
    <div className="flex items-center gap-2">
      <Image
        src={LogoTiny}
        alt="Logo"
        width={100}
        height={40}
        className="object-contain"
        priority
      />
    </div>
  );
}
