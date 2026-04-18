import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { profiles } from "@/db/schema/core";
import { eq } from "drizzle-orm";
import { buildDisplayMeasurements } from "@/lib/measurement-display";

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
        weightKg: true,
        bustCm: true,
        waistCm: true,
        hipsCm: true,
        inseamCm: true,
        shoulderWidthCm: true,
        armLengthCm: true,
      },
    });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const measurements = buildDisplayMeasurements(profile).filter(
      (item) => item.value,
    );

    return NextResponse.json(measurements);
  } catch (error) {
    console.error("Error fetching measurements:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
