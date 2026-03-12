import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// ============================================
// CORE TABLES
// ============================================

// Profiles table (extends auth.users)
export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey(),
  email: text("email").unique().notNull(),
  role: text("role", {
    enum: ["admin", "brand", "user", "reviewer"],
  })
    .notNull()
    .default("user"),

  // Profile basics
  displayName: text("display_name"),
  username: text("username").unique(),
  avatarUrl: text("avatar_url"),
  bio: text("bio"),

  // Body measurements
  heightCm: integer("height_cm"),
  weightKg: integer("weight_kg"),
  bustCm: integer("bust_cm"),
  waistCm: integer("waist_cm"),
  hipsCm: integer("hips_cm"),
  inseamCm: integer("inseam_cm"),
  shoulderWidthCm: integer("shoulder_width_cm"),
  armLengthCm: integer("arm_length_cm"),

  // Size preferences
  sizeTop: text("size_top"),
  sizeBottom: text("size_bottom"),
  sizeDress: text("size_dress"),
  sizeShoe: text("size_shoe"),

  // Style & fit
  bodyType: text("body_type"),
  styleVibes: text("style_vibes")
    .array()
    .default(sql`'{}'::text[]`),
  fitPreference: text("fit_preference", {
    enum: ["tight", "fitted", "loose", "oversized"],
  }),

  // Social stats
  followersCount: integer("followers_count").default(0),
  followingCount: integer("following_count").default(0),
  reviewsCount: integer("reviews_count").default(0),

  // Status
  isActive: boolean("is_active").default(true),
  emailVerified: boolean("email_verified").default(false),
  measurementCompleted: boolean("measurement_completed").default(false),

  // Timestamps
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Admin profiles
export const admins = pgTable("admins", {
  id: uuid("id")
    .primaryKey()
    .references(() => profiles.id, { onDelete: "cascade" }),
  permissions: jsonb("permissions").default(sql`'["full_access"]'`),
  lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
});

// Brand profiles
export const brands = pgTable("brands", {
  id: uuid("id")
    .primaryKey()
    .references(() => profiles.id, { onDelete: "cascade" }),

  // Brand info
  brandName: text("brand_name").notNull(),
  brandSlug: text("brand_slug").unique(),
  tagline: text("tagline"),
  description: text("description"),
  website: text("website"),
  logoUrl: text("logo_url"),
  coverImageUrl: text("cover_image_url"),

  // Business details
  foundedYear: integer("founded_year"),
  location: text("location"),
  minorityOwned: boolean("minority_owned").default(false),
  sustainable: boolean("sustainable").default(false),

  // Product range
  sizeRangeMin: text("size_range_min"),
  sizeRangeMax: text("size_range_max"),
  priceTier: text("price_tier", {
    enum: ["$", "$$", "$$$", "$$$$"],
  }),
  styleCategories: text("style_categories")
    .array()
    .default(sql`'{}'::text[]`),

  // Verification & subscription
  verified: boolean("verified").default(false),
  subscriptionTier: text("subscription_tier", {
    enum: ["capsule", "pro", "partner"],
  }),
  subscriptionStatus: text("subscription_status", {
    enum: ["active", "inactive", "cancelled", "past_due"],
  }).default("inactive"),
  subscriptionExpiresAt: timestamp("subscription_expires_at", {
    withTimezone: true,
  }),

  // Capsule evaluation
  capsuleScore: integer("capsule_score"),
  watchlistCriteria: jsonb("watchlist_criteria").default(sql`'{}'`),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Reviewer stats
export const reviewerStats = pgTable("reviewer_stats", {
  id: uuid("id")
    .primaryKey()
    .references(() => profiles.id, { onDelete: "cascade" }),
  totalReviews: integer("total_reviews").default(0),
  helpfulVotesReceived: integer("helpful_votes_received").default(0),
  verifiedPurchaser: boolean("verified_purchaser").default(false),
  expertiseAreas: text("expertise_areas")
    .array()
    .default(sql`'{}'::text[]`),
  badge: text("badge"),
  earningsTotal: text("earnings_total").default("0"),
  responseRate: integer("response_rate").default(0),
});
