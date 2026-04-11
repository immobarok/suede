import { Marquee } from "@/components/ui/marquee";
import HowitworksCarousal from "./HowitworksCarousal";

const Howitworks = () => {
  return (
    <main className="bg-[#f9f8f6] pb-8 md:pb-16 lg:pb-32">
      <section className="flex h-30.75 items-center overflow-hidden bg-[#000000] text-white">
        <div className="container mx-auto">
          <Marquee className="[--duration:20s]">
            <h1 className="font-cormorant px-4 text-center text-[16px] leading-[28.8px] font-normal whitespace-nowrap uppercase md:text-[20px]">
              CURATED COLLECTION OF MINORITY-OWNED AND SLOW FASHION BRANDS THAT
              DESERVE YOUR ATTENTION
            </h1>
          </Marquee>
        </div>  
      </section>
      <section className="">
        <HowitworksCarousal />
      </section>
    </main>
  );
};

export default Howitworks;