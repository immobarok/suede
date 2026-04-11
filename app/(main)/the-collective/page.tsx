import type { Metadata } from "next";
import Link from "next/link";
import { RippleButton } from "@/components/ui/ripple-button";
import { createClient } from "@/lib/supabase/server";
import { AnimatedSectionHeader } from "@/components/ui/section-header";
import { CollectiveCard } from "./_components/CollectiveCard";
import { CollectiveSearchBar } from "./_components/CollectiveSearchBar";

export const metadata: Metadata = {
  title: "The Collective | Community",
  description:
    "Style discussions, fit questions, and community connections on SUEDE.",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const members = [
  {
    name: "Kikiola Akanbi",
    username: "@kikiolaakanbi",
    avatarUrl:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop",
    stats: { height: "5'5\"", bust: '33"', waist: '29"', hips: '40"' },
    counts: { reviews: 1, inquiries: 0, capsuleBrands: 1 },
  },
  {
    name: "Amara Johnson",
    username: "@amaraj",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    stats: { height: "5'7\"", bust: '35"', waist: '27"', hips: '38"' },
    counts: { reviews: 12, inquiries: 3, capsuleBrands: 5 },
  },
  {
    name: "Sarah Chen",
    username: "@sarahc",
    avatarUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    stats: { height: "5'4\"", bust: '34"', waist: '28"', hips: '36"' },
    counts: { reviews: 8, inquiries: 1, capsuleBrands: 2 },
  },
  {
    name: "Zoe Williams",
    username: "@zoew",
    avatarUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
    stats: { height: "5'9\"", bust: '36"', waist: '30"', hips: '42"' },
    counts: { reviews: 24, inquiries: 7, capsuleBrands: 8 },
  },
  {
    name: "Priya Patel",
    username: "@priyap",
    avatarUrl:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop",
    stats: { height: "5'2\"", bust: '32"', waist: '26"', hips: '35"' },
    counts: { reviews: 15, inquiries: 4, capsuleBrands: 3 },
  },
  {
    name: "Emma Rodriguez",
    username: "@emmar",
    avatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    stats: { height: "5'6\"", bust: '38"', waist: '32"', hips: '44"' },
    counts: { reviews: 6, inquiries: 2, capsuleBrands: 1 },
  },
  {
    name: "Nina Kowalski",
    username: "@ninak",
    avatarUrl:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop",
    stats: { height: "5'8\"", bust: '34"', waist: '26"', hips: '37"' },
    counts: { reviews: 19, inquiries: 5, capsuleBrands: 6 },
  },
  {
    name: "Olivia Kim",
    username: "@oliviak",
    avatarUrl:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=400&fit=crop",
    stats: { height: "5'3\"", bust: '33"', waist: '25"', hips: '36"' },
    counts: { reviews: 3, inquiries: 0, capsuleBrands: 2 },
  },
  {
    name: "Maya Thompson",
    username: "@mayat",
    avatarUrl:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop",
    stats: { height: "5'10\"", bust: '37"', waist: '29"', hips: '41"' },
    counts: { reviews: 31, inquiries: 12, capsuleBrands: 9 },
  },
];

const CollectivePage = async (props: { searchParams: SearchParams }) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAuthenticated = !!user;

  const searchParams = await props.searchParams;
  const rawPage = Array.isArray(searchParams.page)
    ? searchParams.page[0]
    : searchParams.page;
  const pageSize = 6;
  const totalPages = Math.ceil(members.length / pageSize);
  const requestedPage = Number.parseInt(rawPage ?? "1", 10);
  const currentPage = Number.isNaN(requestedPage)
    ? 1
    : Math.min(Math.max(requestedPage, 1), totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const visibleMembers = members.slice(startIndex, startIndex + pageSize);

  return (
    <main className="min-h-screen bg-[#F5F5F0] pt-24 pb-20">
      <section className="mb-12 px-4">
        <AnimatedSectionHeader
          topText="COMMUNITY"
          middleText="The Collective"
          bottomText="Style discussions, fit questions, and community connections."
        />
      </section>

      <CollectiveSearchBar />

      <div className="relative container mx-auto mt-12 px-4 md:px-0">
        {!isAuthenticated && (
          <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-[32%] w-full bg-linear-to-b from-transparent via-[#F5F5F0]/98 via-70% to-[#F5F5F0]" />
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {visibleMembers.map((member, index) => {
            const isGuestRow = !isAuthenticated && index >= 4;

            return (
              <div
                key={startIndex + index}
                className={`relative ${isGuestRow ? "pointer-events-none" : ""}`}
              >
                <CollectiveCard {...member} index={index} />
              </div>
            );
          })}
        </div>

        {!isAuthenticated ? (
          <div className="pointer-events-auto relative z-20 -mt-44 flex w-full flex-col items-center justify-center pt-20 pb-8">
            <p className="mb-6 text-[14px] font-medium tracking-[2.24px] text-black uppercase">
              SIGN IN TO SEE MORE
            </p>
            <Link href="/auth/login">
              <RippleButton className="rounded-full border-none bg-black px-14 py-3 text-white">
                Sign In
              </RippleButton>
            </Link>
          </div>
        ) : null}

        {isAuthenticated && totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-4 text-sm text-neutral-700">
            {currentPage > 1 ? (
              <Link
                href={`/the-collective?page=${currentPage - 1}`}
                className="px-2 py-1 text-neutral-400 hover:text-neutral-900"
                aria-label="Previous page"
              >
                ←
              </Link>
            ) : (
              <span
                className="px-2 py-1 text-neutral-300"
                aria-label="Previous page"
              >
                ←
              </span>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) =>
              page === currentPage ? (
                <span
                  key={page}
                  className="px-2 py-1 text-neutral-900 underline underline-offset-4"
                >
                  {page}
                </span>
              ) : (
                <Link
                  key={page}
                  href={`/the-collective?page=${page}`}
                  className="px-2 py-1 text-neutral-500 hover:text-neutral-900"
                >
                  {page}
                </Link>
              ),
            )}

            {currentPage < totalPages ? (
              <Link
                href={`/the-collective?page=${currentPage + 1}`}
                className="px-2 py-1 text-neutral-400 hover:text-neutral-900"
                aria-label="Next page"
              >
                →
              </Link>
            ) : (
              <span
                className="px-2 py-1 text-neutral-300"
                aria-label="Next page"
              >
                →
              </span>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default CollectivePage;
