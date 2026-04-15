import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Edit } from "lucide-react";
import { LookBookGrid } from "../the-lookbook/_components/LookbookGrid";
import { Suspense } from "react";
import ProfileTabs from "./_components/ProfileTabs";
import { getProfile } from "./actions";
import UserInquiries from "./_components/UserInquiries";

export const metadata: Metadata = {
  title: "Profile | SUEDE",
  description: "User profile on SUEDE",
};

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view = "reviews" } = await searchParams;
  const profile = await getProfile();

  if (!profile) {
    return (
      <main className="relative min-h-screen overflow-hidden">
        <div className="relative z-10 container mx-auto px-4 md:px-0 pt-24 pb-12">
          <h1 className="font-cormorant text-[42px] leading-tight text-black">
            Please sign in
          </h1>
          <p className="mt-2 text-[16px] text-black/60">
            You need to be logged in to view your profile.
          </p>
        </div>
      </main>
    );
  }

  // Map backend data to UI fields
  const userData = {
    name: profile.displayName || "—",
    username: profile.username ? `@${profile.username.replace(/^@/, "")}` : "—",
    avatar: profile.avatarUrl || null,
    measurements: {
      height: profile.heightCm
        ? `${Math.floor(profile.heightCm / 30.48)}'${Math.round(
            (profile.heightCm % 30.48) / 2.54
          )}"`
        : null,
      bust: profile.bustCm ? `${profile.bustCm}"` : null,
      waist: profile.waistCm ? `${profile.waistCm}"` : null,
      hips: profile.hipsCm ? `${profile.hipsCm}"` : null,
    },
    stylePreferences: profile.styleVibes ?? [],
    stats: [
      { label: "Followers", value: profile.followersCount ?? 0 },
      { label: "Reviews", value: profile.reviewsCount ?? 0 },
      { label: "Brands Followed", value: profile.followingCount ?? 0 },
    ],
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <Image
        src="https://i.ibb.co/nsvQbBSQ/41ddd7debba1acf170f27b180927b8514ffaebd3.jpg"
        alt="Background"
        fill
        className="object-cover opacity-25 grayscale"
        priority
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/20 to-white/10" />

      <div className="relative z-10 container mx-auto px-4 md:px-0 pt-24 pb-12">
        <Link
          href="/the-collective"
          className="mb-8 inline-flex items-center gap-2 text-[12px] uppercase tracking-wider text-black/60 hover:text-black"
        >
          ← Back to The Collective
        </Link>

        <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
          <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full border-2 border-white/50 shadow-lg bg-neutral-100 flex items-center justify-center">
            {userData.avatar ? (
              <Image
                src={userData.avatar}
                alt={userData.name}
                fill
                className="object-cover"
              />
            ) : (
              <span className="text-[24px] text-black/40">
                {userData.name !== "—"
                  ? userData.name
                      .split(" ")
                      .map((part: string) => part[0])
                      .slice(0, 2)
                      .join("")
                  : "?"}
              </span>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h1 className="font-cormorant text-[42px] leading-tight text-black">
                {userData.name}
              </h1>
              <Link
                href="/profile/edit"
                className="p-2 hover:bg-black/5 rounded-full transition-colors"
              >
                <Edit className="h-5 w-5 text-black" />
              </Link>
            </div>
            <p className="font-darker text-[16px] text-black/40 mb-6">
              {userData.username}
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="font-darker text-[12px] uppercase tracking-[0.2em] text-black/60 mb-3">
                  Body Measurements
                </h3>
                <div className="flex flex-wrap gap-x-8 gap-y-2">
                  {Object.entries(userData.measurements)
                    .filter(([, val]) => !!val)
                    .map(([key, val]) => (
                      <div key={key} className="flex gap-2">
                        <span className="font-darker text-[14px] text-black/40 capitalize">
                          {key}:
                        </span>
                        <span className="font-darker text-[14px] font-medium text-black">
                          {val}
                        </span>
                      </div>
                    ))}
                  {Object.values(userData.measurements).every((val) => !val) && (
                    <span className="font-darker text-[14px] text-black/40">
                      No measurements yet
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-darker text-[12px] uppercase tracking-[0.2em] text-black/60 mb-3">
                  Style Preferences
                </h3>
                <div className="flex flex-wrap gap-2">
                  {userData.stylePreferences.length > 0 ? (
                    userData.stylePreferences.map((style) => (
                      <span
                        key={style}
                        className="bg-black/5 px-3 py-1 text-[12px] text-black/60 font-darker"
                      >
                        {style}
                      </span>
                    ))
                  ) : (
                    <span className="text-[12px] text-black/40 font-darker">
                      No style preferences yet
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12 py-8 border-t border-black/10">
          {userData.stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-[32px] font-light text-black mb-1">
                {stat.value}
              </div>
              <div className="text-[12px] uppercase tracking-widest text-black/40">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <ProfileTabs activeView={view} />

        <div className="mt-8">
          <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
            {view === "reviews" ? <LookBookGrid /> : <UserInquiries profile={profile} />}
          </Suspense>
        </div>
      </div>
    </main>
  );
}
