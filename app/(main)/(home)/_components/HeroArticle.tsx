import Image from "next/image";
import Link from "next/link";

export default function HeroArticle() {
  return (
    <div className="container mx-auto w-full px-4 md:px-0 text-white/90">
      <div className="flex w-full items-start justify-between gap-8">
        <div className="flex max-w-[380px] flex-col gap-2">
          <p className="text-md md:text-[24px] font-normal font-cormorant leading-[28.8px] uppercase">
            The Trust Layer For Fashion
          </p>
          <span className="text-sm md:text-[14px] text-white/70 text-end">
            EST2026
          </span>
        </div>

        <div className="flex max-w-[380px] flex-col items-end gap-4 text-right">
          <p className="text-md md:text-[24px] font-normal font-cormorant leading-[28.8px] uppercase">
            Start your shopping journey with confidence
          </p>
          <div className="flex flex-col items-end gap-2">
            <Link
              href="/the-lookbook"
              className="text-md md:text-[24px] font-normal font-cormorant leading-[28.8px] uppercase underline underline-offset-4 hover:text-white"
            >
              Explore Reviews
            </Link>
            <Link
              href="/the-collective"
              className="text-md md:text-[24px] font-normal font-cormorant leading-[28.8px] uppercase underline underline-offset-4 hover:text-white"
            >
              Discover Brands
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <Image
          src="/vector-logo.svg"
          alt="Vector logo"
          width={120}
          height={40}
          className="opacity-80"
        />
      </div>
    </div>
  );
}
