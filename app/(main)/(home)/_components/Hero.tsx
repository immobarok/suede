import Image from "next/image";
import HeroArticle from "./HeroArticle";
import { NavLink } from "@/components/layout/navbar/nav-link";
import { listPublishedAboutContent } from "@/app/actions/about-content";

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
];

const Hero = async () => {
  const publishedBanners = await listPublishedAboutContent("landing_hero");
  const banner = publishedBanners[0];

  const imageUrl =
    banner?.publicUrl ||
    "https://i.ibb.co/JWpSj3rb/Image-With-Fallback-4.png";
  const title = banner?.title || undefined;
  const subtext = banner?.body || undefined;

  return (
    <section className="bg-primary text-primary-foreground relative h-screen w-full overflow-hidden">
      <Image
        src={imageUrl}
        alt={title || "Hero Image"}
        fill
        className="object-cover"
        priority
      />
      {/* Optional overlay to make text in navbar readable over image */}
      <div className="absolute inset-0 bg-linear-to-b from-black/15 via-black/40 to-black/70" />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20">
        <HeroArticle title={title} subtext={subtext} />
      </div>
      {/* Bottom Navigation Links */}
      <div className="absolute inset-x-0 bottom-16 z-20 container mx-auto">
        <div className="hidden items-center justify-between px-0 md:flex">
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
      </div>
    </section>
  );
};

export default Hero;
