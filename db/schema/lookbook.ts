import {
  boolean,
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
// LOOKBOOK (REVIEWS & INQUIRIES)
// ============================================

// Reviews
export const reviews = pgTable("reviews", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  userId: uuid("user_id").references(() => profiles.id, {
    onDelete: "cascade",
  }),

  // Product info
  brandId: uuid("brand_id").references(() => brands.id),
  productName: text("product_name").notNull(),
  productUrl: text("product_url"),
  productImageUrl: text("product_image_url"),
  category: text("category"),

  // Purchase details
  sizePurchased: text("size_purchased"),
  colorPurchased: text("color_purchased"),
  pricePaid: decimal("price_paid", { precision: 10, scale: 2 }),

  // Ratings (1-5 stars)
  sizingAccuracy: integer("sizing_accuracy"),
  materialQuality: integer("material_quality"),
  valueForPrice: integer("value_for_price"),
  trueToPhotos: integer("true_to_photos"),
  customerService: integer("customer_service"),

  // Review content
  reviewText: text("review_text").notNull(),
  fitExperience: text("fit_experience", {
    enum: [
      "too_small",
      "slightly_small",
      "true_to_size",
      "slightly_large",
      "too_large",
    ],
  }),
  wouldRecommend: boolean("would_recommend"),

  // Photos
  photos: text("photos")
    .array()
    .default(sql`'{}'::text[]`),

  // Engagement
  helpfulCount: integer("helpful_count").default(0),
  viewCount: integer("view_count").default(0),

  // Status
  isPublished: boolean("is_published").default(true),
  isFeatured: boolean("is_featured").default(false),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Review requests / Inquiries
export const reviewRequests = pgTable("review_requests", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  userId: uuid("user_id").references(() => profiles.id, {
    onDelete: "cascade",
  }),

  // Product info
  productName: text("product_name").notNull(),
  brandName: text("brand_name").notNull(),
  brandId: uuid("brand_id").references(() => brands.id),
  productUrl: text("product_url"),
  productImageUrl: text("product_image_url"),
  category: text("category"),

  // Question details
  sizeInterested: text("size_interested"),
  specificQuestions: text("specific_questions").notNull(),

  // Status
  status: text("status", {
    enum: ["open", "answered", "closed"],
  }).default("open"),
  responsesCount: integer("responses_count").default(0),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Inquiry responses
export const inquiryResponses = pgTable("inquiry_responses", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  inquiryId: uuid("inquiry_id").references(() => reviewRequests.id, {
    onDelete: "cascade",
  }),
  userId: uuid("user_id").references(() => profiles.id, {
    onDelete: "cascade",
  }),

  // Response content
  responseText: text("response_text").notNull(),
  isReviewLink: boolean("is_review_link").default(false),
  linkedReviewId: uuid("linked_review_id").references(() => reviews.id),

  // Engagement
  helpfulCount: integer("helpful_count").default(0),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Review reactions (helpful votes)
export const reviewReactions = pgTable(
  "review_reactions",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`uuid_generate_v4()`),
    reviewId: uuid("review_id").references(() => reviews.id, {
      onDelete: "cascade",
    }),
    userId: uuid("user_id").references(() => profiles.id, {
      onDelete: "cascade",
    }),
    reaction: text("reaction", { enum: ["helpful"] }).default("helpful"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    unique("review_reactions_unique").on(table.reviewId, table.userId),
  ]
);

// Saved items (bookmarks)
export const savedItems = pgTable(
  "saved_items",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`uuid_generate_v4()`),
    userId: uuid("user_id").references(() => profiles.id, {
      onDelete: "cascade",
    }),
    itemType: text("item_type", {
      enum: ["review", "inquiry", "listing", "brand"],
    }).notNull(),
    itemId: uuid("item_id").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    unique("saved_items_unique").on(table.userId, table.itemType, table.itemId),
  ]
);
