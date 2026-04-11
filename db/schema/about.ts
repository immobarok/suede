import {
  jsonb,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

import { admins } from "./core";

// ============================================
// ABOUT PAGE CONTENT (ADMIN MANAGED)
// ============================================

export const aboutContentUploads = pgTable("about_content_uploads", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),

  section: text("section", {
    enum: ["hero", "mission", "story", "values", "quote"],
  }).notNull(),

  contentType: text("content_type", {
    enum: ["image", "video", "text", "json"],
  }).notNull(),

  title: text("title"),
  body: text("body"),

  storageBucket: text("storage_bucket"),
  storagePath: text("storage_path"),
  publicUrl: text("public_url"),

  metadata: jsonb("metadata").default(sql`'{}'::jsonb`),
  sortOrder: integer("sort_order").default(0),

  status: text("status", {
    enum: ["draft", "published", "archived"],
  }).default("draft"),

  // FK to admins enforces that only admin identities can be upload owners.
  uploadedBy: uuid("uploaded_by")
    .notNull()
    .references(() => admins.id, { onDelete: "restrict" }),

  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});
