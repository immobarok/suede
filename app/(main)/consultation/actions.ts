"use server";

import { db } from "@/db";
import { profiles } from "@/db/schema/core";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

type SaveConsultationInput = {
  heightFeet?: number;
  heightInches?: number;
  weight?: number;
  bust?: number;
  waist?: number;
  hips?: number;
  inseam?: number;
  shoulderWidth?: number;
  armLength?: number;
};

const inchesToCm = (value: number) => Math.round(value * 2.54);
const lbsToKg = (value: number) => Math.round(value * 0.45359237);
const heightToCm = (feet: number, inches: number) =>
  Math.round((feet * 12 + inches) * 2.54);

export async function saveConsultationMeasurements(
  input: SaveConsultationInput,
) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    const values = {
      id: user.id,
      email: user.email ?? `${user.id}@no-email.local`,
      heightCm:
        input.heightFeet !== undefined
          ? heightToCm(input.heightFeet, input.heightInches ?? 0)
          : null,
      weightKg: input.weight !== undefined ? lbsToKg(input.weight) : null,
      bustCm: input.bust !== undefined ? inchesToCm(input.bust) : null,
      waistCm: input.waist !== undefined ? inchesToCm(input.waist) : null,
      hipsCm: input.hips !== undefined ? inchesToCm(input.hips) : null,
      inseamCm: input.inseam !== undefined ? inchesToCm(input.inseam) : null,
      shoulderWidthCm:
        input.shoulderWidth !== undefined
          ? inchesToCm(input.shoulderWidth)
          : null,
      armLengthCm:
        input.armLength !== undefined ? inchesToCm(input.armLength) : null,
      measurementCompleted: true,
      updatedAt: new Date(),
    };

    await db
      .insert(profiles)
      .values(values)
      .onConflictDoUpdate({
        target: profiles.id,
        set: {
          email: values.email,
          heightCm: values.heightCm,
          weightKg: values.weightKg,
          bustCm: values.bustCm,
          waistCm: values.waistCm,
          hipsCm: values.hipsCm,
          inseamCm: values.inseamCm,
          shoulderWidthCm: values.shoulderWidthCm,
          armLengthCm: values.armLengthCm,
          measurementCompleted: true,
          updatedAt: new Date(),
        },
      });

    revalidatePath("/profile");
    revalidatePath("/profile/edit");

    return { success: true };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to save measurements";
    return { success: false, error: message };
  }
}
