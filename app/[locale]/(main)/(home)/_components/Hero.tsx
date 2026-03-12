import Image from "next/image"
import HeroArticle from "./HeroArticle"
import heroImg from "@/public/hero.jpg"

const Hero = () => {
  return (
    <section className="relative w-full h-screen bg-primary text-primary-foreground overflow-hidden">
      <Image
        src={heroImg}
        alt="Hero Image"
        fill
        className="object-cover"
        priority
        placeholder="blur"
      />
      {/* Optional overlay to make text in navbar readable over image */}
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center">
        <HeroArticle />
      </div>
    </section>
  )
}

export default Hero