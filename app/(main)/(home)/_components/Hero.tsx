import Image from "next/image"
import HeroArticle from "./HeroArticle"
import { NavLink } from "@/components/layout/navbar/nav-link"

const navItems = [
  {
    href: "/the-capsule",
    label: "The Capsule",
    tooltip: "The Capsule collection",
  },
  {
    href: "/the-lookbook",
    label: "The Lookbook",
    tooltip: "The Lookbook",
  },
  {
    href: "/the-collective",
    label: "The Collective",
    tooltip: "The Collective",
  },
  {
    href: "/the-consign",
    label: "The Consign",
    tooltip: "The Consign",
  },
]

const Hero = () => {
  return (
    <section className="relative w-full h-screen bg-primary text-primary-foreground overflow-hidden">
      <Image
        src="https://i.ibb.co/nsvQbBSQ/41ddd7debba1acf170f27b180927b8514ffaebd3.jpg"
        alt="Hero Image"
        fill
        className="object-cover"
        priority
      />
      {/* Optional overlay to make text in navbar readable over image */}
      <div className="absolute inset-0 bg-linear-to-b from-black/15 via-black/40 to-black/70" />
      <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center">
        <HeroArticle />
      </div>
      {/* Bottom Navigation Links */}
      <div className="absolute bottom-16 inset-x-0 flex justify-between items-center px-0 z-20 container mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            label={item.label}
            tooltip={item.tooltip}
            navTextColor="text-white/70"
            navActiveColor="text-white"
            navHoverColor="hover:text-white"
          />
        ))}
      </div>
    </section>
  )
}

export default Hero