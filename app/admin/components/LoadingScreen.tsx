import Image from "next/image";
import LogoTiny from "@/public/icons/logo_small.png";

interface LoadingScreenProps {
  text?: string;
}

export default function LoadingScreen({
  text = "Loading...",
}: LoadingScreenProps) {
  return (
    <section className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Logo Animation */}
        <div className="relative h-16 w-32">
          <div className="border-primary/30 absolute -inset-4 animate-[spin_8s_linear_infinite] rounded-full border-2 border-dashed" />
          <div className="border-t-primary/60 border-b-primary/60 absolute -inset-2 animate-[spin_3s_linear_infinite] rounded-full border-2 border-r-transparent border-l-transparent" />

          <div className="relative h-full w-full animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]">
            <Image
              src={LogoTiny}
              alt="Loading"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Text Only */}
        <p className="text-muted-foreground animate-pulse text-xs tracking-[0.25em] uppercase">
          {text}
        </p>
      </div>
    </section>
  );
}
