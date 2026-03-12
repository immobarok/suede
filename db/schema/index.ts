// Core tables
export {
  profiles,
  admins,
  brands,
  reviewerStats,
} from "./core";

// Capsule (Brand Directory)
export {
  featuredBrands,
  brandEvaluations,
} from "./capsule";

// Lookbook (Reviews & Inquiries)
export {
  reviews,
  reviewRequests,
  inquiryResponses,
  reviewReactions,
  savedItems,
} from "./lookbook";

// Collective (Social)
export {
  follows,
  matchScores,
} from "./collective";

// Consign (Marketplace)
export {
  listings,
  offers,
  orders,
} from "./consign";

// Messaging
export {
  conversations,
  messages,
  messageRequests,
} from "./messaging";

// Notifications
export {
  notifications,
  activityFeed,
} from "./notifications";

// Brand Portal
export {
  brandApplications,
  brandClaims,
  brandAnalytics,
} from "./brand-portal";

// Consultation
export {
  consultationSessions,
} from "./consultation";

// Relations
export * from "./relations";
