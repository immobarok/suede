import { createClient } from "@/lib/supabase/server";
import { syncUserProfile } from "@/lib/auth/sync-profile";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    const next = searchParams.get("next") ?? "/";
    const error_description = searchParams.get("error_description");

    // Handle OAuth error responses from the provider
    if (error_description) {
        console.error("[auth/callback] OAuth error:", error_description);
        const loginUrl = new URL(`${origin}/auth/login`);
        loginUrl.searchParams.set("error", error_description);
        return NextResponse.redirect(loginUrl.toString());
    }

    if (code) {
        const supabase = await createClient();
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);

        if (error) {
            console.error("[auth/callback] Code exchange failed:", error.message);
            const loginUrl = new URL(`${origin}/auth/login`);
            loginUrl.searchParams.set("error", "auth-code-error");
            return NextResponse.redirect(loginUrl.toString());
        }

        // Sync user profile to the database
        if (data.user) {
            const result = await syncUserProfile(supabase, data.user);
            if (!result.success) {
                console.warn("[auth/callback] Profile sync failed (non-blocking):", result.error);
            }

            // Role-based redirect for admin users
            const userRole = data.user.user_metadata?.role as string | undefined;
            if (userRole === "admin" && next === "/") {
                return NextResponse.redirect(`${origin}/admin`);
            }
        }

        return NextResponse.redirect(`${origin}${next}`);
    }

    // No code parameter — redirect to login with error
    console.error("[auth/callback] No auth code received");
    const loginUrl = new URL(`${origin}/auth/login`);
    loginUrl.searchParams.set("error", "auth-code-error");
    return NextResponse.redirect(loginUrl.toString());
}
