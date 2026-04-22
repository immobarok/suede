import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Edit } from "lucide-react";
import ProfileTabs from "./_components/ProfileTabs";
import { getProfile } from "./actions";
import { buildDisplayMeasurements } from "@/lib/measurement-display";

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
        <div className="relative z-10 container mx-auto px-4 pt-24 pb-12 md:px-0">
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

  const displayMeasurements = buildDisplayMeasurements({
    heightCm: profile.heightCm,
    weightKg: profile.weightKg,
    bustCm: profile.bustCm,
    waistCm: profile.waistCm,
    hipsCm: profile.hipsCm,
    inseamCm: profile.inseamCm,
    shoulderWidthCm: profile.shoulderWidthCm,
    armLengthCm: profile.armLengthCm,
  }).filter((item) => item.value);

  // Map backend data to UI fields
  const userData = {
    name: profile.displayName || "—",
    username: profile.username ? `@${profile.username.replace(/^@/, "")}` : "—",
    avatar: profile.avatarUrl || null,
    measurements: displayMeasurements,
    bodyType: profile.bodyType || null,
    stylePreferences: profile.styleVibes ?? [],
    stats: [
      { label: "Reviews", value: profile.reviewsCount ?? 0 },
      { label: "Inquiries", value: profile.inquiriesCount ?? 0 },
      { label: "Brands Followed", value: profile.followingCount ?? 0 },
      { label: "Followers", value: profile.followersCount ?? 0 },
    ],
  };

  return (
    <main className="relative min-h-screen bg-[#F5F5F0]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-screen">
        <Image
          src="https://i.ibb.co/JWpSj3rb/Image-With-Fallback-4.png"
          alt="Background"
          fill
          className="object-cover opacity-25 grayscale"
          priority
        />
        <div className="absolute inset-0 bg-white/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white" />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-24 pb-12 md:px-0">
        <Link
          href="/the-collective"
          className="mb-8 inline-flex items-center gap-2 text-[12px] tracking-wider text-black/60 uppercase hover:text-black"
        >
          ← Back to The Collective
        </Link>

        <div className="mb-12 flex flex-col items-start gap-8 md:flex-row">
          <div className="relative flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white/50 bg-neutral-100 shadow-lg">
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
            <div className="mb-2 flex items-center justify-between">
              <h1 className="font-cormorant text-[42px] leading-tight text-black">
                {userData.name}
              </h1>
              <Link
                href="/profile/edit"
                className="rounded-full p-2 transition-colors hover:bg-black/5"
              >
                <Edit className="h-5 w-5 text-black" />
              </Link>
            </div>
            <p className="font-darker mb-6 text-[16px] text-black/40">
              {userData.username}
            </p>

            <div className="mb-6 space-y-6 md:mb-10">
              <div>
                <h3 className="font-darker mb-3 text-[12px] tracking-[0.2em] text-black/60 uppercase">
                  Body Measurements
                </h3>
                <div className="flex flex-wrap gap-x-8 gap-y-2">
                  {userData.measurements.map((item) => (
                    <div key={item.label} className="flex gap-2">
                      <span className="font-darker text-[14px] text-black/40 capitalize">
                        {item.label}:
                      </span>
                      <span className="font-darker text-[14px] font-medium text-black">
                        {item.value}
                      </span>
                    </div>
                  ))}
                  {userData.measurements.length === 0 && (
                    <span className="font-darker text-[14px] text-black/40">
                      No measurements yet
                    </span>
                  )}
                </div>
              </div>

              {userData.bodyType && (
                <div>
                  <h3 className="font-darker mb-3 text-[12px] tracking-[0.2em] text-black/60 uppercase">
                    Body Type
                  </h3>
                  <span className="font-darker bg-black/5 px-3 py-1 text-[12px] text-black/60">
                    {userData.bodyType}
                  </span>
                </div>
              )}

              <div>
                <h3 className="font-darker mb-3 text-[12px] tracking-[0.2em] text-black/60 uppercase">
                  Style Preferences
                </h3>
                <div className="flex flex-wrap gap-2">
                  {userData.stylePreferences.length > 0 ? (
                    userData.stylePreferences.map((style) => (
                      <span
                        key={style}
                        className="font-darker bg-black/5 px-3 py-1 text-[12px] text-black/60"
                      >
                        {style}
                      </span>
                    ))
                  ) : (
                    <span className="font-darker text-[12px] text-black/40">
                      No style preferences yet
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="mb-0 grid grid-cols-2 gap-8 border-t border-black/10 py-0 md:grid-cols-4">
              {userData.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="mb-1 text-[32px] font-light text-black">
                    {stat.value}
                  </div>
                  <div className="text-[12px] tracking-widest text-black/40 uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <ProfileTabs activeView={view} profile={profile} />
      </div>
    </main>
  );
}
