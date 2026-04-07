import type { Metadata } from "next";
import { AnimatedSectionHeader } from "@/components/ui/section-header";
import { CollectiveCard } from "./_components/CollectiveCard";
import { CollectiveSearchBar } from "./_components/CollectiveSearchBar";

export const metadata: Metadata = {
  title: "The Collective | Community",
  description: "Style discussions, fit questions, and community connections on SUEDE.",
};

const members = [
  {
    name: "Amara K.",
    username: "@amara",
    avatarUrl: "https://i.ibb.co/RpMwpMHM/Container-2.png",
    stats: {
      height: "5'6\"",
      bust: "33\"", // Matching screenshot values
      waist: "28\"",
      hips: "40\"",
    },
    counts: {
        reviews: 1,
        inquiries: 0,
        capsuleBrands: 1
    }
  },
  {
    name: "Amara K.",
    username: "@amara",
    avatarUrl: "https://i.ibb.co/RpMwpMHM/Container-2.png",
    stats: {
      height: "5'6\"",
      bust: "33\"",
      waist: "28\"",
      hips: "40\"",
    },
    counts: {
        reviews: 1,
        inquiries: 0,
        capsuleBrands: 1
    }
  },
  {
    name: "Amara K.",
    username: "@amara",
    avatarUrl: "https://i.ibb.co/RpMwpMHM/Container-2.png",
    stats: {
      height: "5'6\"",
      bust: "33\"",
      waist: "28\"",
      hips: "40\"",
    },
    counts: {
        reviews: 1,
        inquiries: 0,
        capsuleBrands: 1
    }
  },
  {
    name: "Amara K.",
    username: "@amara",
    avatarUrl: "https://i.ibb.co/RpMwpMHM/Container-2.png",
    stats: {
      height: "5'6\"",
      bust: "33\"",
      waist: "28\"",
      hips: "40\"",
    },
    counts: {
        reviews: 1,
        inquiries: 0,
        capsuleBrands: 1
    }
  },
  {
    name: "Amara K.",
    username: "@amara",
    avatarUrl: "https://i.ibb.co/RpMwpMHM/Container-2.png",
    stats: {
      height: "5'6\"",
      bust: "33\"",
      waist: "28\"",
      hips: "40\"",
    },
    counts: {
        reviews: 1,
        inquiries: 0,
        capsuleBrands: 1
    }
  },
  {
    name: "Amara K.",
    username: "@amara",
    avatarUrl: "https://i.ibb.co/RpMwpMHM/Container-2.png",
    stats: {
      height: "5'6\"",
      bust: "33\"",
      waist: "28\"",
      hips: "40\"",
    },
    counts: {
        reviews: 1,
        inquiries: 0,
        capsuleBrands: 1
    }
  },
];

const CollectivePage = () => {
  return (
    <main className="min-h-screen bg-[#F5F5F0] pt-24 pb-20">
      <section className="px-4 mb-12">
        <AnimatedSectionHeader
          topText="COMMUNITY"
          middleText="The Collective"
          bottomText="Style discussions, fit questions, and community connections."
        />
      </section>

      <CollectiveSearchBar />

      <div className="container mx-auto px-4 mt-12 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member, index) => (
            <CollectiveCard key={index} {...member} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default CollectivePage;
