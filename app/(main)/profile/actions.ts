"use server";

import { profiles } from "@/db/schema/core";
import { createClient } from "@/lib/supabase/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { revalidatePath } from "next/cache";

export async function updateProfile(data: any) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // Update profile
  const {
    displayName,
    username,
    bio,
    location,
    avatarUrl,
    heightCm,
    weightKg,
    bustCm,
    waistCm,
    hipsCm,
    styleVibes,
  } = data;

  const profileValues = {
    id: user.id,
    email: user.email ?? "",
    displayName,
    username,
    bio,
    location,
    avatarUrl,
    heightCm,
    weightKg,
    bustCm,
    waistCm,
    hipsCm,
    styleVibes,
    updatedAt: new Date(),
  };

  await db
    .insert(profiles)
    .values(profileValues)
    .onConflictDoUpdate({
      target: profiles.id,
      set: profileValues,
    });

  revalidatePath("/profile");
  revalidatePath("/profile/edit");

  return { success: true };
}

export async function getProfile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.id, user.id),
  });

  const authFallback = {
    id: user.id,
    email: user.email ?? null,
    displayName:
      user.user_metadata?.full_name ??
      user.user_metadata?.name ??
      null,
    username:
      user.user_metadata?.user_name ??
      user.user_metadata?.preferred_username ??
      null,
    avatarUrl:
      user.user_metadata?.avatar_url ??
      user.user_metadata?.picture ??
      null,
    bio: null,
    location: null,
    heightCm: null,
    weightKg: null,
    bustCm: null,
    waistCm: null,
    hipsCm: null,
    inseamCm: null,
    shoulderWidthCm: null,
    armLengthCm: null,
    sizeTop: null,
    sizeBottom: null,
    sizeDress: null,
    sizeShoe: null,
    bodyType: null,
    styleVibes: [],
    fitPreference: null,
    followersCount: 0,
    followingCount: 0,
    reviewsCount: 0,
    isActive: true,
    emailVerified: false,
    measurementCompleted: false,
    createdAt: null,
    updatedAt: null,
  };

  if (!profile) {
    return authFallback;
  }

  return {
    ...authFallback,
    ...profile,
    displayName: profile.displayName ?? authFallback.displayName,
    username: profile.username ?? authFallback.username,
    avatarUrl: profile.avatarUrl ?? authFallback.avatarUrl,
  };
}
