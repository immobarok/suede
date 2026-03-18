import {
  jsonb,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

// Affiliates (The partners)
export const affiliates = pgTable("affiliates", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Affiliate Links (The URLs the partner promotes)
export const affiliateLinks = pgTable("affiliate_links", {
  id: uuid("id").primaryKey().defaultRandom(),
  affiliateId: uuid("affiliate_id")
    .references(() => affiliates.id, { onDelete: "cascade" })
    .notNull(),
  destinationUrl: text("destination_url").notNull(),
  campaignName: text("campaign_name"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Affiliate Clicks (Tracking user clicks before redirecting)
export const affiliateClicks = pgTable("affiliate_clicks", {
  id: uuid("id").primaryKey().defaultRandom(),
  affiliateLinkId: uuid("affiliate_link_id")
    .references(() => affiliateLinks.id, { onDelete: "cascade" })
    .notNull(),
  suedeRedirectId: text("suede_redirect_id").unique().notNull(),
  ipHash: text("ip_hash").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Affiliate Conversions (Webhook payloads from the network)
export const affiliateConversions = pgTable("affiliate_conversions", {
  id: uuid("id").primaryKey().defaultRandom(),
  suedeRedirectId: text("suede_redirect_id").references(
    () => affiliateClicks.suedeRedirectId,
    { onDelete: "set null" }
  ),
  networkEventId: text("network_event_id").unique().notNull(),
  rawPayload: jsonb("raw_payload").notNull(),
  commissionAmount: numeric("commission_amount", {
    precision: 10,
    scale: 2,
  }),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

