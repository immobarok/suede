import {
  date,
  decimal,
  integer,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

import { brands, profiles } from "./core";

// ============================================
// BRAND PORTAL
// ============================================

// Brand applications
export const brandApplications = pgTable("brand_applications", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  applicantId: uuid("applicant_id").references(() => profiles.id),

  // Company info
  companyName: text("company_name").notNull(),
  companyEmail: text("company_email").notNull(),
  website: text("website"),
  instagram: text("instagram"),

  // Brand details
  description: text("description"),
  productCategories: text("product_categories")
    .array()
    .default(sql`'{}'::text[]`),
  priceRange: text("price_range"),
  sizeRange: text("size_range"),

  // Application status
  status: text("status", {
    enum: ["pending", "approved", "rejected"],
  }).default("pending"),
  reviewedBy: uuid("reviewed_by").references(() => profiles.id),
  reviewedAt: timestamp("reviewed_at", { withTimezone: true }),
  rejectionReason: text("rejection_reason"),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Brand claims (for existing brands)
export const brandClaims = pgTable("brand_claims", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  brandId: uuid("brand_id").references(() => brands.id),
  claimantId: uuid("claimant_id").references(() => profiles.id),

  // Verification
  companyEmail: text("company_email").notNull(),
  verificationMethod: text("verification_method", {
    enum: ["email", "dns", "social"],
  }),
  verificationCode: text("verification_code"),
  verifiedAt: timestamp("verified_at", { withTimezone: true }),

  status: text("status", {
    enum: ["pending", "verified", "rejected"],
  }).default("pending"),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Brand analytics (monthly snapshots)
export const brandAnalytics = pgTable(
  "brand_analytics",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`uuid_generate_v4()`),
    brandId: uuid("brand_id").references(() => brands.id),
    month: date("month").notNull(),

    // Metrics
    profileViews: integer("profile_views").default(0),
    clickThroughs: integer("click_throughs").default(0),
    reviewsReceived: integer("reviews_received").default(0),
    avgRating: decimal("avg_rating", { precision: 2, scale: 1 }),
    salesReferrals: integer("sales_referrals").default(0),
  },
  (table) => [unique("brand_analytics_unique").on(table.brandId, table.month)]
);
