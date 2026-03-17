import { SupabaseClient, User } from "@supabase/supabase-js";

/**
 * Syncs user profile data to the profiles table after authentication.
 * Works for both OAuth (Google, Apple) and email/password sign-ups.
 * Uses upsert to create or update the profile as needed.
 */
export async function syncUserProfile(
  supabase: SupabaseClient,
  user: User
): Promise<{ success: boolean; error?: string }> {
  try {
    const metadata = user.user_metadata ?? {};
    const provider = user.app_metadata?.provider ?? "email";

    // Extract name from various possible metadata fields
    const fullName =
      metadata.full_name ||
      metadata.name ||
      [metadata.first_name, metadata.last_name].filter(Boolean).join(" ") ||
      "";

    const firstName =
      metadata.first_name ||
      metadata.given_name ||
      fullName.split(" ")[0] ||
      "";

    const lastName =
      metadata.last_name ||
      metadata.family_name ||
      fullName.split(" ").slice(1).join(" ") ||
      "";

    const avatarUrl =
      metadata.avatar_url ||
      metadata.picture ||
      "";

    const profileData = {
      id: user.id,
      email: user.email,
      full_name: fullName,
      first_name: firstName,
      last_name: lastName,
      avatar_url: avatarUrl,
      provider: provider,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("profiles")
      .upsert(profileData, {
        onConflict: "id",
        ignoreDuplicates: false,
      });

    if (error) {
      console.error("[sync-profile] Failed to upsert profile:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[sync-profile] Unexpected error:", message);
    return { success: false, error: message };
  }
}
