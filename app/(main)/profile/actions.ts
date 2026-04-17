"use server";

import { profiles } from "@/db/schema/core";
import { createClient } from "@/lib/supabase/server";
import { eq, count } from "drizzle-orm";
import { reviewRequests } from "@/db/schema/lookbook";

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
    inseamCm,
    shoulderWidthCm,
    armLengthCm,
    topsLetterSizes,
    topsNumericSizes,
    bottomsLetterSizes,
    bottomsNumericSizes,
    bottomsWaistSizes,
    plusSizes,
    sizeDress,
    sizeShoe,
    styleVibes,
    fitPreference,
    bodyType,
  } = data;

  // Check if measurements are completed for the first time
  const currentProfile = await db.query.profiles.findFirst({
    where: eq(profiles.id, user.id),
  });

  const allMeasurementsPresent =
    bustCm !== undefined &&
    waistCm !== undefined &&
    hipsCm !== undefined &&
    bustCm &&
    waistCm &&
    hipsCm;
  const isFirstTimeCompletion =
    allMeasurementsPresent && !currentProfile?.measurementsCompletedAt;

  const profileValues: any = {
    id: user.id,
    email: user.email ?? "",
    updatedAt: new Date(),
  };

  // Only update fields that are provided
  if (displayName !== undefined) profileValues.displayName = displayName;
  if (username !== undefined) profileValues.username = username;
  if (bio !== undefined) profileValues.bio = bio;
  if (location !== undefined) profileValues.location = location;
  if (avatarUrl !== undefined) profileValues.avatarUrl = avatarUrl;
  if (heightCm !== undefined) profileValues.heightCm = heightCm;
  if (weightKg !== undefined) profileValues.weightKg = weightKg;
  if (bustCm !== undefined) profileValues.bustCm = bustCm;
  if (waistCm !== undefined) profileValues.waistCm = waistCm;
  if (hipsCm !== undefined) profileValues.hipsCm = hipsCm;
  if (inseamCm !== undefined) profileValues.inseamCm = inseamCm;
  if (shoulderWidthCm !== undefined)
    profileValues.shoulderWidthCm = shoulderWidthCm;
  if (armLengthCm !== undefined) profileValues.armLengthCm = armLengthCm;
  if (topsLetterSizes !== undefined || topsNumericSizes !== undefined) {
    profileValues.sizeTop = [
      ...(topsLetterSizes || []),
      ...(topsNumericSizes || []),
    ].join(",");
  }
  if (
    bottomsLetterSizes !== undefined ||
    bottomsNumericSizes !== undefined ||
    bottomsWaistSizes !== undefined
  ) {
    profileValues.sizeBottom = [
      ...(bottomsLetterSizes || []),
      ...(bottomsNumericSizes || []),
      ...(bottomsWaistSizes || []),
    ].join(",");
  }
  if (plusSizes !== undefined) {
    profileValues.sizeDress = (plusSizes || []).join(",");
  }
  if (sizeShoe !== undefined)
    profileValues.sizeShoe = (sizeShoe || []).join(",");
  if (styleVibes !== undefined) profileValues.styleVibes = styleVibes;
  if (fitPreference !== undefined) profileValues.fitPreference = fitPreference;
  if (bodyType !== undefined) profileValues.bodyType = bodyType;

  if (allMeasurementsPresent) {
    profileValues.measurementCompleted = true;
    if (isFirstTimeCompletion) {
      profileValues.measurementsCompletedAt = new Date();
    }
  }

  await db.insert(profiles).values(profileValues).onConflictDoUpdate({
    target: profiles.id,
    set: profileValues,
  });

  revalidatePath("/profile");
  revalidatePath("/profile/edit");
  revalidatePath("/admin");

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
      user.user_metadata?.full_name ?? user.user_metadata?.name ?? null,
    username:
      user.user_metadata?.user_name ??
      user.user_metadata?.preferred_username ??
      null,
    avatarUrl:
      user.user_metadata?.avatar_url ?? user.user_metadata?.picture ?? null,
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
    inquiriesCount: 0,
    isActive: true,

    emailVerified: false,
    measurementCompleted: false,
    createdAt: null,
    updatedAt: null,
  };

  const inquiryCountResult = await db
    .select({ total: count() })
    .from(reviewRequests)
    .where(eq(reviewRequests.userId, user.id));

  const enquiriesCount = inquiryCountResult[0]?.total ?? 0;

  if (!profile) {
    return {
      ...authFallback,
      inquiriesCount: enquiriesCount,
      topsLetterSizes: [],
      topsNumericSizes: [],
      bottomsLetterSizes: [],
      bottomsNumericSizes: [],
      bottomsWaistSizes: [],
      plusSizes: [],
      sizeDress: [],
      sizeShoe: [],
    };
  }

  // Parse size fields from JSON or comma-separated strings
  const parseSizeField = (field: string | null): string[] => {
    if (!field) return [];
    try {
      const parsed = JSON.parse(field);
      if (Array.isArray(parsed)) return parsed;
      if (typeof parsed === "object" && parsed !== null) {
        const result: string[] = [];
        if (parsed.letter) result.push(...parsed.letter);
        if (parsed.numeric) result.push(...parsed.numeric);
        if (parsed.waist) result.push(...parsed.waist);
        if (parsed.plus) result.push(...parsed.plus);
        return result;
      }
      throw new Error();
    } catch {
      return field
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s !== "");
    }
  };

  const sizeTopArray = parseSizeField(profile?.sizeTop);
  const sizeBottomArray = parseSizeField(profile?.sizeBottom);
  const sizeDressArray = parseSizeField(profile?.sizeDress);
  const sizeShoeArray = parseSizeField(profile?.sizeShoe);

  // Split sizeTop into letter and numeric sizes
  const topsLetterSizes = sizeTopArray.filter((size) =>
    ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL", "OS"].includes(size),
  );
  const topsNumericSizes = sizeTopArray.filter((size) =>
    ["0", "2", "4", "6", "8", "10", "12", "14", "16", "18", "20"].includes(
      size,
    ),
  );

  // Split sizeBottom into letter, numeric, and waist sizes
  const bottomsLetterSizes = sizeBottomArray.filter((size) =>
    ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"].includes(size),
  );
  const bottomsNumericSizes = sizeBottomArray.filter((size) =>
    ["0", "2", "4", "6", "8", "10", "12", "14", "16", "18", "20"].includes(
      size,
    ),
  );
  const bottomsWaistSizes = sizeBottomArray.filter((size) =>
    ["24", "26", "28", "30", "32", "34", "36", "38", "40", "42", "44"].includes(
      size,
    ),
  );

  // Filter plus sizes
  const plusSizes = sizeDressArray.filter((size) =>
    ["1X", "2X", "3X", "4X", "5X"].includes(size),
  );

  return {
    ...authFallback,
    ...profile,
    inquiriesCount: enquiriesCount,
    displayName: profile.displayName ?? authFallback.displayName,
    username: profile.username ?? authFallback.username,
    avatarUrl: profile.avatarUrl ?? authFallback.avatarUrl,
    topsLetterSizes,
    topsNumericSizes,
    bottomsLetterSizes,
    bottomsNumericSizes,
    bottomsWaistSizes,
    plusSizes,
    sizeDress: sizeDressArray,
    sizeShoe: sizeShoeArray,
  };
}
