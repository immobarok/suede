import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

import { profiles } from "./core";
import { brands } from "./core";

// ============================================
// ADMIN DASHBOARD
// ============================================

// Brand Suggestions Queue
export const brandSuggestions = pgTable("brand_suggestions", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  brandName: text("brand_name").notNull(),
  userId: uuid("user_id").references(() => profiles.id),
  status: text("status", {
    enum: ["pending", "approved", "rejected"],
  }).default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Platform Feedback Suggestion Box
export const platformFeedback = pgTable("platform_feedback", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: uuid("user_id").references(() => profiles.id), // Nullable for anonymous
  suggestionText: text("suggestion_text").notNull(),
  status: text("status", {
    enum: ["new", "reviewed"],
  }).default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Brand Contact Requests
export const brandContactRequests = pgTable("brand_contact_requests", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  type: text("request_type", {
    enum: ["capsule_owner", "general_inquiry"],
  }).notNull(),
  brandId: uuid("brand_id").references(() => brands.id), // Optional, set if capsule_owner selects a brand
  brandName: text("brand_name").notNull(), // User-provided text or brand.brandName
  contactName: text("contact_name").notNull(),
  email: text("email").notNull(),
  message: text("message"),
  status: text("status", {
    enum: ["new", "reviewed"],
  }).default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
