import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

import { brands } from "./core";
import { profiles } from "./core";

// ============================================
// CAPSULE (BRAND DIRECTORY)
// ============================================

// Featured brands
export const featuredBrands = pgTable("featured_brands", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  brandId: uuid("brand_id").references(() => brands.id, {
    onDelete: "cascade",
  }),
  featureType: text("feature_type", {
    enum: ["spotlight", "trending", "new_arrival"],
  }),
  startDate: timestamp("start_date", { withTimezone: true }).defaultNow(),
  endDate: timestamp("end_date", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Brand watchlist evaluations
export const brandEvaluations = pgTable("brand_evaluations", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  brandId: uuid("brand_id").references(() => brands.id, {
    onDelete: "cascade",
  }),
  evaluatorId: uuid("evaluator_id").references(() => profiles.id),

  // Evaluation criteria (1-10)
  designInnovation: integer("design_innovation"),
  sizeInclusivity: integer("size_inclusivity"),
  qualityCraftsmanship: integer("quality_craftsmanship"),
  sustainability: integer("sustainability"),
  communityAlignment: integer("community_alignment"),

  notes: text("notes"),
  status: text("status", {
    enum: ["pending", "approved", "rejected"],
  }).default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
