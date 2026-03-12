import {
  check,
  integer,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

import { profiles } from "./core";

// ============================================
// COLLECTIVE (SOCIAL FEATURES)
// ============================================

// Follows
export const follows = pgTable(
  "follows",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`uuid_generate_v4()`),
    followerId: uuid("follower_id").references(() => profiles.id, {
      onDelete: "cascade",
    }),
    followingId: uuid("following_id").references(() => profiles.id, {
      onDelete: "cascade",
    }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    unique("follows_unique").on(table.followerId, table.followingId),
    check("no_self_follow", sql`${table.followerId} != ${table.followingId}`),
  ]
);

// Match scores (cached calculations)
export const matchScores = pgTable(
  "match_scores",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`uuid_generate_v4()`),
    userId: uuid("user_id").references(() => profiles.id, {
      onDelete: "cascade",
    }),
    targetId: uuid("target_id").references(() => profiles.id, {
      onDelete: "cascade",
    }),
    score: integer("score"),
    matchTier: text("match_tier", {
      enum: ["suede_match", "close_match", "no_match"],
    }),
    calculatedAt: timestamp("calculated_at", {
      withTimezone: true,
    }).defaultNow(),
  },
  (table) => [unique("match_scores_unique").on(table.userId, table.targetId)]
);
