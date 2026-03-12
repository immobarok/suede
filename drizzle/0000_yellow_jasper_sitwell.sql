CREATE TABLE "brand_analytics" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"brand_id" uuid,
	"month" date NOT NULL,
	"profile_views" integer DEFAULT 0,
	"click_throughs" integer DEFAULT 0,
	"reviews_received" integer DEFAULT 0,
	"avg_rating" numeric(2, 1),
	"sales_referrals" integer DEFAULT 0,
	CONSTRAINT "brand_analytics_unique" UNIQUE("brand_id","month")
);
--> statement-breakpoint
CREATE TABLE "brand_applications" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"applicant_id" uuid,
	"company_name" text NOT NULL,
	"company_email" text NOT NULL,
	"website" text,
	"instagram" text,
	"description" text,
	"product_categories" text[] DEFAULT '{}'::text[],
	"price_range" text,
	"size_range" text,
	"status" text DEFAULT 'pending',
	"reviewed_by" uuid,
	"reviewed_at" timestamp with time zone,
	"rejection_reason" text,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "brand_claims" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"brand_id" uuid,
	"claimant_id" uuid,
	"company_email" text NOT NULL,
	"verification_method" text,
	"verification_code" text,
	"verified_at" timestamp with time zone,
	"status" text DEFAULT 'pending',
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "brand_evaluations" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"brand_id" uuid,
	"evaluator_id" uuid,
	"design_innovation" integer,
	"size_inclusivity" integer,
	"quality_craftsmanship" integer,
	"sustainability" integer,
	"community_alignment" integer,
	"notes" text,
	"status" text DEFAULT 'pending',
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "featured_brands" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"brand_id" uuid,
	"feature_type" text,
	"start_date" timestamp with time zone DEFAULT now(),
	"end_date" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "follows" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"follower_id" uuid,
	"following_id" uuid,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "follows_unique" UNIQUE("follower_id","following_id"),
	CONSTRAINT "no_self_follow" CHECK ("follows"."follower_id" != "follows"."following_id")
);
--> statement-breakpoint
CREATE TABLE "match_scores" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"user_id" uuid,
	"target_id" uuid,
	"score" integer,
	"match_tier" text,
	"calculated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "match_scores_unique" UNIQUE("user_id","target_id")
);
--> statement-breakpoint
CREATE TABLE "listings" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"seller_id" uuid,
	"title" text NOT NULL,
	"description" text,
	"brand_id" uuid,
	"brand_name" text,
	"category" text,
	"size" text NOT NULL,
	"measurements" text,
	"condition" text,
	"asking_price" numeric(10, 2) NOT NULL,
	"original_price" numeric(10, 2),
	"negotiable" boolean DEFAULT false,
	"accept_offers" boolean DEFAULT false,
	"minimum_offer" numeric(10, 2),
	"photos" text[] DEFAULT '{}'::text[],
	"shipping_cost" numeric(10, 2) DEFAULT '0',
	"ships_from" text,
	"status" text DEFAULT 'active',
	"view_count" integer DEFAULT 0,
	"save_count" integer DEFAULT 0,
	"offer_count" integer DEFAULT 0,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "offers" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"listing_id" uuid,
	"buyer_id" uuid,
	"offer_amount" numeric(10, 2) NOT NULL,
	"message" text,
	"status" text DEFAULT 'pending',
	"expires_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"listing_id" uuid,
	"buyer_id" uuid,
	"seller_id" uuid,
	"item_price" numeric(10, 2) NOT NULL,
	"shipping_cost" numeric(10, 2) DEFAULT '0',
	"platform_fee" numeric(10, 2) NOT NULL,
	"seller_payout" numeric(10, 2) NOT NULL,
	"total_amount" numeric(10, 2) NOT NULL,
	"stripe_payment_intent_id" text,
	"stripe_transfer_id" text,
	"status" text DEFAULT 'pending_payment',
	"tracking_number" text,
	"shipped_at" timestamp with time zone,
	"estimated_delivery" timestamp with time zone,
	"delivered_at" timestamp with time zone,
	"inspection_deadline" timestamp with time zone,
	"inspection_completed" boolean DEFAULT false,
	"dispute_reason" text,
	"dispute_status" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "consultation_sessions" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"user_id" uuid,
	"current_step" integer DEFAULT 1,
	"completed_steps" integer[] DEFAULT '{}'::int[],
	"height_cm" integer,
	"weight_kg" integer,
	"bust_cm" integer,
	"waist_cm" integer,
	"hips_cm" integer,
	"inseam_cm" integer,
	"shoulder_width_cm" integer,
	"arm_length_cm" integer,
	"status" text DEFAULT 'in_progress',
	"started_at" timestamp with time zone DEFAULT now(),
	"completed_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "admins" (
	"id" uuid PRIMARY KEY NOT NULL,
	"permissions" jsonb DEFAULT '["full_access"]',
	"last_login_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "brands" (
	"id" uuid PRIMARY KEY NOT NULL,
	"brand_name" text NOT NULL,
	"brand_slug" text,
	"tagline" text,
	"description" text,
	"website" text,
	"logo_url" text,
	"cover_image_url" text,
	"founded_year" integer,
	"location" text,
	"minority_owned" boolean DEFAULT false,
	"sustainable" boolean DEFAULT false,
	"size_range_min" text,
	"size_range_max" text,
	"price_tier" text,
	"style_categories" text[] DEFAULT '{}'::text[],
	"verified" boolean DEFAULT false,
	"subscription_tier" text,
	"subscription_status" text DEFAULT 'inactive',
	"subscription_expires_at" timestamp with time zone,
	"capsule_score" integer,
	"watchlist_criteria" jsonb DEFAULT '{}',
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "brands_brand_slug_unique" UNIQUE("brand_slug")
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"role" text DEFAULT 'user' NOT NULL,
	"display_name" text,
	"username" text,
	"avatar_url" text,
	"bio" text,
	"height_cm" integer,
	"weight_kg" integer,
	"bust_cm" integer,
	"waist_cm" integer,
	"hips_cm" integer,
	"inseam_cm" integer,
	"shoulder_width_cm" integer,
	"arm_length_cm" integer,
	"size_top" text,
	"size_bottom" text,
	"size_dress" text,
	"size_shoe" text,
	"body_type" text,
	"style_vibes" text[] DEFAULT '{}'::text[],
	"fit_preference" text,
	"followers_count" integer DEFAULT 0,
	"following_count" integer DEFAULT 0,
	"reviews_count" integer DEFAULT 0,
	"is_active" boolean DEFAULT true,
	"email_verified" boolean DEFAULT false,
	"measurement_completed" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "profiles_email_unique" UNIQUE("email"),
	CONSTRAINT "profiles_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "reviewer_stats" (
	"id" uuid PRIMARY KEY NOT NULL,
	"total_reviews" integer DEFAULT 0,
	"helpful_votes_received" integer DEFAULT 0,
	"verified_purchaser" boolean DEFAULT false,
	"expertise_areas" text[] DEFAULT '{}'::text[],
	"badge" text,
	"earnings_total" text DEFAULT '0',
	"response_rate" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "activity_feed" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"user_id" uuid,
	"type" text NOT NULL,
	"actor_id" uuid,
	"target_type" text,
	"target_id" uuid,
	"metadata" jsonb DEFAULT '{}',
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "conversations" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"listing_id" uuid,
	"buyer_id" uuid,
	"seller_id" uuid,
	"last_message_at" timestamp with time zone DEFAULT now(),
	"buyer_unread_count" integer DEFAULT 0,
	"seller_unread_count" integer DEFAULT 0,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "conversations_unique" UNIQUE("listing_id","buyer_id")
);
--> statement-breakpoint
CREATE TABLE "inquiry_responses" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"inquiry_id" uuid,
	"user_id" uuid,
	"response_text" text NOT NULL,
	"is_review_link" boolean DEFAULT false,
	"linked_review_id" uuid,
	"helpful_count" integer DEFAULT 0,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "message_requests" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"sender_id" uuid,
	"recipient_id" uuid,
	"context_type" text DEFAULT 'review',
	"context_id" uuid,
	"message" text NOT NULL,
	"status" text DEFAULT 'pending',
	"created_at" timestamp with time zone DEFAULT now(),
	"responded_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"conversation_id" uuid,
	"sender_id" uuid,
	"content" text NOT NULL,
	"is_read" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"user_id" uuid,
	"type" text NOT NULL,
	"actor_id" uuid,
	"target_type" text,
	"target_id" uuid,
	"title" text NOT NULL,
	"body" text,
	"image_url" text,
	"is_read" boolean DEFAULT false,
	"metadata" jsonb DEFAULT '{}',
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "review_reactions" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"review_id" uuid,
	"user_id" uuid,
	"reaction" text DEFAULT 'helpful',
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "review_reactions_unique" UNIQUE("review_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "review_requests" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"user_id" uuid,
	"product_name" text NOT NULL,
	"brand_name" text NOT NULL,
	"brand_id" uuid,
	"product_url" text,
	"product_image_url" text,
	"category" text,
	"size_interested" text,
	"specific_questions" text NOT NULL,
	"status" text DEFAULT 'open',
	"responses_count" integer DEFAULT 0,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"user_id" uuid,
	"brand_id" uuid,
	"product_name" text NOT NULL,
	"product_url" text,
	"product_image_url" text,
	"category" text,
	"size_purchased" text,
	"color_purchased" text,
	"price_paid" numeric(10, 2),
	"sizing_accuracy" integer,
	"material_quality" integer,
	"value_for_price" integer,
	"true_to_photos" integer,
	"customer_service" integer,
	"review_text" text NOT NULL,
	"fit_experience" text,
	"would_recommend" boolean,
	"photos" text[] DEFAULT '{}'::text[],
	"helpful_count" integer DEFAULT 0,
	"view_count" integer DEFAULT 0,
	"is_published" boolean DEFAULT true,
	"is_featured" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "saved_items" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"user_id" uuid,
	"item_type" text NOT NULL,
	"item_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "saved_items_unique" UNIQUE("user_id","item_type","item_id")
);
--> statement-breakpoint
ALTER TABLE "brand_analytics" ADD CONSTRAINT "brand_analytics_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "brand_applications" ADD CONSTRAINT "brand_applications_applicant_id_profiles_id_fk" FOREIGN KEY ("applicant_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "brand_applications" ADD CONSTRAINT "brand_applications_reviewed_by_profiles_id_fk" FOREIGN KEY ("reviewed_by") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "brand_claims" ADD CONSTRAINT "brand_claims_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "brand_claims" ADD CONSTRAINT "brand_claims_claimant_id_profiles_id_fk" FOREIGN KEY ("claimant_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "brand_evaluations" ADD CONSTRAINT "brand_evaluations_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "brand_evaluations" ADD CONSTRAINT "brand_evaluations_evaluator_id_profiles_id_fk" FOREIGN KEY ("evaluator_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "featured_brands" ADD CONSTRAINT "featured_brands_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "follows" ADD CONSTRAINT "follows_follower_id_profiles_id_fk" FOREIGN KEY ("follower_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "follows" ADD CONSTRAINT "follows_following_id_profiles_id_fk" FOREIGN KEY ("following_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "match_scores" ADD CONSTRAINT "match_scores_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "match_scores" ADD CONSTRAINT "match_scores_target_id_profiles_id_fk" FOREIGN KEY ("target_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listings" ADD CONSTRAINT "listings_seller_id_profiles_id_fk" FOREIGN KEY ("seller_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listings" ADD CONSTRAINT "listings_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "offers" ADD CONSTRAINT "offers_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "offers" ADD CONSTRAINT "offers_buyer_id_profiles_id_fk" FOREIGN KEY ("buyer_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_buyer_id_profiles_id_fk" FOREIGN KEY ("buyer_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_seller_id_profiles_id_fk" FOREIGN KEY ("seller_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "consultation_sessions" ADD CONSTRAINT "consultation_sessions_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "admins" ADD CONSTRAINT "admins_id_profiles_id_fk" FOREIGN KEY ("id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "brands" ADD CONSTRAINT "brands_id_profiles_id_fk" FOREIGN KEY ("id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviewer_stats" ADD CONSTRAINT "reviewer_stats_id_profiles_id_fk" FOREIGN KEY ("id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activity_feed" ADD CONSTRAINT "activity_feed_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activity_feed" ADD CONSTRAINT "activity_feed_actor_id_profiles_id_fk" FOREIGN KEY ("actor_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_buyer_id_profiles_id_fk" FOREIGN KEY ("buyer_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_seller_id_profiles_id_fk" FOREIGN KEY ("seller_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inquiry_responses" ADD CONSTRAINT "inquiry_responses_inquiry_id_review_requests_id_fk" FOREIGN KEY ("inquiry_id") REFERENCES "public"."review_requests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inquiry_responses" ADD CONSTRAINT "inquiry_responses_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inquiry_responses" ADD CONSTRAINT "inquiry_responses_linked_review_id_reviews_id_fk" FOREIGN KEY ("linked_review_id") REFERENCES "public"."reviews"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message_requests" ADD CONSTRAINT "message_requests_sender_id_profiles_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message_requests" ADD CONSTRAINT "message_requests_recipient_id_profiles_id_fk" FOREIGN KEY ("recipient_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message_requests" ADD CONSTRAINT "message_requests_context_id_reviews_id_fk" FOREIGN KEY ("context_id") REFERENCES "public"."reviews"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_conversation_id_conversations_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "public"."conversations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_id_profiles_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_actor_id_profiles_id_fk" FOREIGN KEY ("actor_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review_reactions" ADD CONSTRAINT "review_reactions_review_id_reviews_id_fk" FOREIGN KEY ("review_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review_reactions" ADD CONSTRAINT "review_reactions_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review_requests" ADD CONSTRAINT "review_requests_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review_requests" ADD CONSTRAINT "review_requests_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_items" ADD CONSTRAINT "saved_items_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;