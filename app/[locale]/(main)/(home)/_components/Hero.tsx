import Image from "next/image"
import HeroArticle from "./HeroArticle"

const Hero = () => {
  return (
    <section className="relative w-full h-screen bg-primary text-primary-foreground">
      <Image
        src="/hero.jpg"
        alt="Hero Image"
        fill
        className="object-cover"
        priority
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