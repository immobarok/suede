import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { profiles } from "@/db/schema/core";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profile = await db.query.profiles.findFirst({
      where: eq(profiles.id, user.id),
      columns: {
        heightCm: true,
        bustCm: true,
        waistCm: true,
        hipsCm: true,
      },
    });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    // Convert cm to inches for display
    const convertCmToInches = (cm: number | null): string => {
      if (!cm) return "N/A";
      const inches = cm / 2.54;
      const feet = Math.floor(inches / 12);
      const remainingInches = Math.round(inches % 12);
      return `${feet}'${remainingInches}"`;
    };

    const measurements = [
      {
        label: "Height",
        value: convertCmToInches(profile.heightCm),
      },
      {
        label: "Bust",
        value: profile.bustCm ? `${Math.round(profile.bustCm / 2.54)}"` : "N/A",
      },
      {
        label: "Waist",
        value: profile.waistCm
          ? `${Math.round(profile.waistCm / 2.54)}"`
          : "N/A",
      },
      {
        label: "Hips",
        value: profile.hipsCm ? `${Math.round(profile.hipsCm / 2.54)}"` : "N/A",
      },
    ];

    return NextResponse.json(measurements);
  } catch (error) {
    console.error("Error fetching measurements:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
