import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

import { profiles } from "./core";
import { reviews } from "./lookbook";
import { listings } from "./consign";

// ============================================
// MESSAGING
// ============================================

// Conversations (Consign only)
export const conversations = pgTable(
  "conversations",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`uuid_generate_v4()`),
    listingId: uuid("listing_id").references(() => listings.id, {
      onDelete: "cascade",
    }),
    buyerId: uuid("buyer_id").references(() => profiles.id, {
      onDelete: "cascade",
    }),
    sellerId: uuid("seller_id").references(() => profiles.id, {
      onDelete: "cascade",
    }),

    lastMessageAt: timestamp("last_message_at", {
      withTimezone: true,
    }).defaultNow(),
    buyerUnreadCount: integer("buyer_unread_count").default(0),
    sellerUnreadCount: integer("seller_unread_count").default(0),

    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    unique("conversations_unique").on(table.listingId, table.buyerId),
  ]
);

// Messages
export const messages = pgTable("messages", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  conversationId: uuid("conversation_id").references(() => conversations.id, {
    onDelete: "cascade",
  }),
  senderId: uuid("sender_id").references(() => profiles.id, {
    onDelete: "cascade",
  }),
  content: text("content").notNull(),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Message requests (Review-context only)
export const messageRequests = pgTable("message_requests", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  senderId: uuid("sender_id").references(() => profiles.id, {
    onDelete: "cascade",
  }),
  recipientId: uuid("recipient_id").references(() => profiles.id, {
    onDelete: "cascade",
  }),

  // Context (review only)
  contextType: text("context_type", { enum: ["review"] }).default("review"),
  contextId: uuid("context_id").references(() => reviews.id),

  // Message
  message: text("message").notNull(),

  // Status
  status: text("status", {
    enum: ["pending", "accepted", "declined", "blocked"],
  }).default("pending"),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  respondedAt: timestamp("responded_at", { withTimezone: true }),
});
