import { relations } from "drizzle-orm";

import { admins, brands, profiles, reviewerStats } from "./core";
import { brandEvaluations, featuredBrands } from "./capsule";
import {
  inquiryResponses,
  reviewReactions,
  reviewRequests,
  reviews,
  savedItems,
} from "./lookbook";
import { follows, matchScores } from "./collective";
import { listings, offers, orders } from "./consign";
import { conversations, messageRequests, messages } from "./messaging";
import { activityFeed, notifications } from "./notifications";
import {
  brandAnalytics,
  brandApplications,
  brandClaims,
} from "./brand-portal";
import { consultationSessions } from "./consultation";

// ============================================
// RELATIONS
// ============================================

export const profilesRelations = relations(profiles, ({ one, many }) => ({
  admin: one(admins, {
    fields: [profiles.id],
    references: [admins.id],
  }),
  brand: one(brands, {
    fields: [profiles.id],
    references: [brands.id],
  }),
  reviewerStat: one(reviewerStats, {
    fields: [profiles.id],
    references: [reviewerStats.id],
  }),
  reviews: many(reviews),
  reviewRequests: many(reviewRequests),
  listings: many(listings),
  notifications: many(notifications),
  savedItems: many(savedItems),
  consultationSessions: many(consultationSessions),
}));

export const brandsRelations = relations(brands, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [brands.id],
    references: [profiles.id],
  }),
  reviews: many(reviews),
  listings: many(listings),
  featuredBrands: many(featuredBrands),
  evaluations: many(brandEvaluations),
  analytics: many(brandAnalytics),
  applications: many(brandApplications),
  claims: many(brandClaims),
}));

export const reviewsRelations = relations(reviews, ({ one, many }) => ({
  user: one(profiles, {
    fields: [reviews.userId],
    references: [profiles.id],
  }),
  brand: one(brands, {
    fields: [reviews.brandId],
    references: [brands.id],
  }),
  reactions: many(reviewReactions),
  inquiryResponses: many(inquiryResponses),
}));

export const reviewRequestsRelations = relations(
  reviewRequests,
  ({ one, many }) => ({
    user: one(profiles, {
      fields: [reviewRequests.userId],
      references: [profiles.id],
    }),
    brand: one(brands, {
      fields: [reviewRequests.brandId],
      references: [brands.id],
    }),
    responses: many(inquiryResponses),
  })
);

export const inquiryResponsesRelations = relations(
  inquiryResponses,
  ({ one }) => ({
    inquiry: one(reviewRequests, {
      fields: [inquiryResponses.inquiryId],
      references: [reviewRequests.id],
    }),
    user: one(profiles, {
      fields: [inquiryResponses.userId],
      references: [profiles.id],
    }),
    linkedReview: one(reviews, {
      fields: [inquiryResponses.linkedReviewId],
      references: [reviews.id],
    }),
  })
);

export const listingsRelations = relations(listings, ({ one, many }) => ({
  seller: one(profiles, {
    fields: [listings.sellerId],
    references: [profiles.id],
  }),
  brand: one(brands, {
    fields: [listings.brandId],
    references: [brands.id],
  }),
  offers: many(offers),
  orders: many(orders),
  conversations: many(conversations),
}));

export const offersRelations = relations(offers, ({ one }) => ({
  listing: one(listings, {
    fields: [offers.listingId],
    references: [listings.id],
  }),
  buyer: one(profiles, {
    fields: [offers.buyerId],
    references: [profiles.id],
  }),
}));

export const ordersRelations = relations(orders, ({ one }) => ({
  listing: one(listings, {
    fields: [orders.listingId],
    references: [listings.id],
  }),
  buyer: one(profiles, {
    fields: [orders.buyerId],
    references: [profiles.id],
  }),
  seller: one(profiles, {
    fields: [orders.sellerId],
    references: [profiles.id],
  }),
}));

export const conversationsRelations = relations(
  conversations,
  ({ one, many }) => ({
    listing: one(listings, {
      fields: [conversations.listingId],
      references: [listings.id],
    }),
    buyer: one(profiles, {
      fields: [conversations.buyerId],
      references: [profiles.id],
    }),
    seller: one(profiles, {
      fields: [conversations.sellerId],
      references: [profiles.id],
    }),
    messages: many(messages),
  })
);

export const messagesRelations = relations(messages, ({ one }) => ({
  conversation: one(conversations, {
    fields: [messages.conversationId],
    references: [conversations.id],
  }),
  sender: one(profiles, {
    fields: [messages.senderId],
    references: [profiles.id],
  }),
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(profiles, {
    fields: [notifications.userId],
    references: [profiles.id],
  }),
  actor: one(profiles, {
    fields: [notifications.actorId],
    references: [profiles.id],
  }),
}));

export const featuredBrandsRelations = relations(featuredBrands, ({ one }) => ({
  brand: one(brands, {
    fields: [featuredBrands.brandId],
    references: [brands.id],
  }),
}));

export const brandEvaluationsRelations = relations(
  brandEvaluations,
  ({ one }) => ({
    brand: one(brands, {
      fields: [brandEvaluations.brandId],
      references: [brands.id],
    }),
    evaluator: one(profiles, {
      fields: [brandEvaluations.evaluatorId],
      references: [profiles.id],
    }),
  })
);

export const brandAnalyticsRelations = relations(
  brandAnalytics,
  ({ one }) => ({
    brand: one(brands, {
      fields: [brandAnalytics.brandId],
      references: [brands.id],
    }),
  })
);

export const brandApplicationsRelations = relations(
  brandApplications,
  ({ one }) => ({
    applicant: one(profiles, {
      fields: [brandApplications.applicantId],
      references: [profiles.id],
    }),
    reviewer: one(profiles, {
      fields: [brandApplications.reviewedBy],
      references: [profiles.id],
    }),
    brand: one(brands, {
      fields: [brandApplications.applicantId],
      references: [brands.id],
    }),
  })
);

export const brandClaimsRelations = relations(brandClaims, ({ one }) => ({
  brand: one(brands, {
    fields: [brandClaims.brandId],
    references: [brands.id],
  }),
  claimant: one(profiles, {
    fields: [brandClaims.claimantId],
    references: [profiles.id],
  }),
}));

export const reviewReactionsRelations = relations(
  reviewReactions,
  ({ one }) => ({
    review: one(reviews, {
      fields: [reviewReactions.reviewId],
      references: [reviews.id],
    }),
    user: one(profiles, {
      fields: [reviewReactions.userId],
      references: [profiles.id],
    }),
  })
);

export const savedItemsRelations = relations(savedItems, ({ one }) => ({
  user: one(profiles, {
    fields: [savedItems.userId],
    references: [profiles.id],
  }),
}));

export const followsRelations = relations(follows, ({ one }) => ({
  follower: one(profiles, {
    fields: [follows.followerId],
    references: [profiles.id],
  }),
  following: one(profiles, {
    fields: [follows.followingId],
    references: [profiles.id],
  }),
}));

export const matchScoresRelations = relations(matchScores, ({ one }) => ({
  user: one(profiles, {
    fields: [matchScores.userId],
    references: [profiles.id],
  }),
  target: one(profiles, {
    fields: [matchScores.targetId],
    references: [profiles.id],
  }),
}));

export const messageRequestsRelations = relations(
  messageRequests,
  ({ one }) => ({
    sender: one(profiles, {
      fields: [messageRequests.senderId],
      references: [profiles.id],
    }),
    recipient: one(profiles, {
      fields: [messageRequests.recipientId],
      references: [profiles.id],
    }),
    context: one(reviews, {
      fields: [messageRequests.contextId],
      references: [reviews.id],
    }),
  })
);

export const consultationSessionsRelations = relations(
  consultationSessions,
  ({ one }) => ({
    user: one(profiles, {
      fields: [consultationSessions.userId],
      references: [profiles.id],
    }),
  })
);

export const activityFeedRelations = relations(activityFeed, ({ one }) => ({
  user: one(profiles, {
    fields: [activityFeed.userId],
    references: [profiles.id],
  }),
  actor: one(profiles, {
    fields: [activityFeed.actorId],
    references: [profiles.id],
  }),
}));
