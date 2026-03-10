import Image from "next/image"

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
    </section>
  )
}

export default Hero