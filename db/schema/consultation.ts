import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

import { profiles } from "./core";

// ============================================
// MEASUREMENT CONSULTATION
// ============================================

// Consultation sessions
export const consultationSessions = pgTable("consultation_sessions", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  userId: uuid("user_id").references(() => profiles.id, {
    onDelete: "cascade",
  }),

  // Progress tracking
  currentStep: integer("current_step").default(1),
  completedSteps: integer("completed_steps")
    .array()
    .default(sql`'{}'::int[]`),

  // Measurements captured
  heightCm: integer("height_cm"),
  weightKg: integer("weight_kg"),
  bustCm: integer("bust_cm"),
  waistCm: integer("waist_cm"),
  hipsCm: integer("hips_cm"),
  inseamCm: integer("inseam_cm"),
  shoulderWidthCm: integer("shoulder_width_cm"),
  armLengthCm: integer("arm_length_cm"),

  // Status
  status: text("status", {
    enum: ["in_progress", "completed", "abandoned"],
  }).default("in_progress"),

  startedAt: timestamp("started_at", { withTimezone: true }).defaultNow(),
  completedAt: timestamp("completed_at", { withTimezone: true }),
});
