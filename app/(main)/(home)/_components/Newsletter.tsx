import Link from "next/link";

const measurementOptions = [
  {
    title: "AI Body Measurement Quiz",
    description:
      "Answer a few quick questions, get directional measurements. (~90 sec)",
    href: "/consultation",
  },
  {
    title: "Self-Guided Measurement Consultation",
    description:
      "Step-by-step chat guide to measuring yourself at home. Measuring tape required. (~5 min)",
    href: "/consultation",
  },
  {
    title: "I Know My Measurements",
    description: "Complete your Suede profile.",
    href: "/profile/edit",
  },
];

export function NewsletterSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#f8f7f1] px-6 py-8 md:py-24 lg:py-32 text-[#151515] sm:px-10 md:px-12 lg:px-16">
      <div className="mx-auto container">
        <div className="grid items-start gap-10 md:grid-cols-[0.85fr_1fr] lg:gap-16">
          <div className="max-w-105">
            <h2 className="font-cormorant text-[34px] leading-[1.18] font-medium tracking-[0.02em] uppercase sm:text-[42px] md:text-[48px] lg:text-[52px]">
              Don&apos;t know
              <br />
              your body
              <br />
              measurements?
            </h2>
            <p className="mt-5 text-[15px] leading-none font-medium">
              Select one of the following options:
            </p>
          </div>

          <div className="flex flex-col">
            <Link
              href={measurementOptions[0].href}
              className="group mb-6 block max-w-130 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
            >
              <h3 className="text-[16px] leading-tight font-medium underline underline-offset-2 transition-opacity group-hover:opacity-70">
                {measurementOptions[0].title}
              </h3>
              <p className="mt-1 max-w-107.5 text-[15px] leading-[1.28] font-medium italic">
                {measurementOptions[0].description}
              </p>
            </Link>

            <div className="w-full border border-[#151515] px-4 py-5 sm:px-5 sm:py-6">
              <Link
                href={measurementOptions[1].href}
                className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
              >
                <h3 className="text-[16px] leading-tight font-medium underline underline-offset-2 transition-opacity group-hover:opacity-70">
                  {measurementOptions[1].title}
                </h3>
                <p className="mt-1 max-w-120 text-[15px] leading-[1.28] font-medium italic">
                  {measurementOptions[1].description}
                </p>
              </Link>

              <div className="mt-8 flex items-end justify-between gap-4">
                <Link
                  href={measurementOptions[2].href}
                  className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
                >
                  <h3 className="text-[16px] leading-tight font-medium underline underline-offset-2 transition-opacity group-hover:opacity-70">
                    {measurementOptions[2].title}
                  </h3>
                  <p className="mt-1 text-[15px] leading-[1.28] font-medium italic">
                    {measurementOptions[2].description}
                  </p>
                </Link>

                <span className="pb-0.5 text-[12px] leading-none font-medium whitespace-nowrap">
                  Recommended
                </span>
              </div>
            </div>
          </div>
        </div>

        <p className="bg-[#151515] px-4 py-6 text-center font-cormorant text-[15px] leading-tight font-semibold tracking-[0.03em] text-white uppercase sm:text-[17px] mt-8">
          Accurate measurements mean better fit recommendations across Suede
        </p>
      </div>
    </section>
  );
}
