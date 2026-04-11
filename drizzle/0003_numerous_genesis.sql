CREATE TABLE "brand_contact_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"request_type" text NOT NULL,
	"brand_id" uuid,
	"brand_name" text NOT NULL,
	"contact_name" text NOT NULL,
	"email" text NOT NULL,
	"message" text,
	"status" text DEFAULT 'new',
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "brand_suggestions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"brand_name" text NOT NULL,
	"user_id" uuid,
	"status" text DEFAULT 'pending',
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "platform_feedback" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"suggestion_text" text NOT NULL,
	"status" text DEFAULT 'new',
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "brands" ADD COLUMN "instagram_handle" text;--> statement-breakpoint
ALTER TABLE "brands" ADD COLUMN "drop_assignment" text;--> statement-breakpoint
ALTER TABLE "brands" ADD COLUMN "is_flagged" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "brands" ADD COLUMN "flagged_reason" text;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "measurements_completed_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "review_requests" ADD COLUMN "inquiry_started_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "review_started_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "brand_contact_requests" ADD CONSTRAINT "brand_contact_requests_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "brand_suggestions" ADD CONSTRAINT "brand_suggestions_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "platform_feedback" ADD CONSTRAINT "platform_feedback_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;