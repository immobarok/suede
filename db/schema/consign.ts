import {
  boolean,
  decimal,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

import { brands, profiles } from "./core";

// ============================================
// CONSIGN (MARKETPLACE)
// ============================================

// Listings
export const listings = pgTable("listings", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  sellerId: uuid("seller_id").references(() => profiles.id, {
    onDelete: "cascade",
  }),

  // Item details
  title: text("title").notNull(),
  description: text("description"),
  brandId: uuid("brand_id").references(() => brands.id),
  brandName: text("brand_name"),
  category: text("category"),

  // Sizing
  size: text("size").notNull(),
  measurements: text("measurements"),

  // Condition & pricing
  condition: text("condition", {
    enum: ["new_with_tags", "new_without_tags", "like_new", "good", "fair"],
  }),
  askingPrice: decimal("asking_price", {
    precision: 10,
    scale: 2,
  }).notNull(),
  originalPrice: decimal("original_price", { precision: 10, scale: 2 }),
  negotiable: boolean("negotiable").default(false),
  acceptOffers: boolean("accept_offers").default(false),
  minimumOffer: decimal("minimum_offer", { precision: 10, scale: 2 }),

  // Photos
  photos: text("photos")
    .array()
    .default(sql`'{}'::text[]`),

  // Shipping
  shippingCost: decimal("shipping_cost", {
    precision: 10,
    scale: 2,
  }).default("0"),
  shipsFrom: text("ships_from"),

  // Status
  status: text("status", {
    enum: ["active", "reserved", "sold", "removed", "suspended"],
  }).default("active"),

  // Stats
  viewCount: integer("view_count").default(0),
  saveCount: integer("save_count").default(0),
  offerCount: integer("offer_count").default(0),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Offers
export const offers = pgTable("offers", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  listingId: uuid("listing_id").references(() => listings.id, {
    onDelete: "cascade",
  }),
  buyerId: uuid("buyer_id").references(() => profiles.id, {
    onDelete: "cascade",
  }),
  offerAmount: decimal("offer_amount", {
    precision: 10,
    scale: 2,
  }).notNull(),
  message: text("message"),
  status: text("status", {
    enum: ["pending", "accepted", "rejected", "expired"],
  }).default("pending"),
  expiresAt: timestamp("expires_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Orders
export const orders = pgTable("orders", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  listingId: uuid("listing_id").references(() => listings.id),
  buyerId: uuid("buyer_id").references(() => profiles.id),
  sellerId: uuid("seller_id").references(() => profiles.id),

  // Pricing breakdown
  itemPrice: decimal("item_price", { precision: 10, scale: 2 }).notNull(),
  shippingCost: decimal("shipping_cost", {
    precision: 10,
    scale: 2,
  }).default("0"),
  platformFee: decimal("platform_fee", {
    precision: 10,
    scale: 2,
  }).notNull(),
  sellerPayout: decimal("seller_payout", {
    precision: 10,
    scale: 2,
  }).notNull(),
  totalAmount: decimal("total_amount", {
    precision: 10,
    scale: 2,
  }).notNull(),

  // Stripe references
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  stripeTransferId: text("stripe_transfer_id"),

  // Status tracking
  status: text("status", {
    enum: [
      "pending_payment",
      "payment_confirmed",
      "awaiting_shipment",
      "shipped",
      "in_inspection",
      "completed",
      "cancelled",
      "disputed",
    ],
  }).default("pending_payment"),

  // Shipping
  trackingNumber: text("tracking_number"),
  shippedAt: timestamp("shipped_at", { withTimezone: true }),
  estimatedDelivery: timestamp("estimated_delivery", { withTimezone: true }),

  // Inspection period (72 hours)
  deliveredAt: timestamp("delivered_at", { withTimezone: true }),
  inspectionDeadline: timestamp("inspection_deadline", { withTimezone: true }),
  inspectionCompleted: boolean("inspection_completed").default(false),

  // Dispute
  disputeReason: text("dispute_reason"),
  disputeStatus: text("dispute_status", {
    enum: [
      "none",
      "opened",
      "under_review",
      "resolved_buyer",
      "resolved_seller",
    ],
  }),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});
