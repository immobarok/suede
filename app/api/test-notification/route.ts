import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options),
              );
            } catch {
              // Server Component - middleware handles refresh
              console.error("Failed to set cookies");
            }
          },
        },
      },
    );

    const channel = supabase.channel("notifications");
    channel.subscribe();

    const result = await channel.send({
      type: "broadcast",
      event: "notification",
      payload: {
        message: "Test notification sent at " + new Date().toISOString(),
      },
    });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error sending test notification:", error);
    return NextResponse.json(
      { error: "Failed to send notification" },
      { status: 500 },
    );
  }
}
