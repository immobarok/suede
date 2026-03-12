import {
  boolean,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

import { profiles } from "./core";

// ============================================
// NOTIFICATIONS
// ============================================

export const notifications = pgTable("notifications", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  userId: uuid("user_id").references(() => profiles.id, {
    onDelete: "cascade",
  }),

  // Notification details
  type: text("type", {
    enum: [
      "order_confirmed",
      "order_shipped",
      "order_delivered",
      "payment_received",
      "new_follower",
      "message_request",
      "inquiry_response",
      "offer_received",
      "offer_accepted",
      "offer_declined",
      "review_helpful",
      "listing_sold",
    ],
  }).notNull(),

  // Actor who triggered
  actorId: uuid("actor_id").references(() => profiles.id),

  // Target object
  targetType: text("target_type"),
  targetId: uuid("target_id"),

  // Content
  title: text("title").notNull(),
  body: text("body"),
  imageUrl: text("image_url"),

  // Status
  isRead: boolean("is_read").default(false),

  // Metadata
  metadata: jsonb("metadata").default(sql`'{}'`),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// ============================================
// ACTIVITY FEED
// ============================================

export const activityFeed = pgTable("activity_feed", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  userId: uuid("user_id").references(() => profiles.id, {
    onDelete: "cascade",
  }),
  type: text("type").notNull(),
  actorId: uuid("actor_id").references(() => profiles.id),
  targetType: text("target_type"),
  targetId: uuid("target_id"),
  metadata: jsonb("metadata").default(sql`'{}'`),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
