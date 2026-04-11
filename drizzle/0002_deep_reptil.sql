CREATE TABLE "about_content_uploads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"section" text NOT NULL,
	"content_type" text NOT NULL,
	"title" text,
	"body" text,
	"storage_bucket" text,
	"storage_path" text,
	"public_url" text,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"sort_order" integer DEFAULT 0,
	"status" text DEFAULT 'draft',
	"uploaded_by" uuid NOT NULL,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
ALTER TABLE "about_content_uploads" ADD CONSTRAINT "about_content_uploads_uploaded_by_admins_id_fk" FOREIGN KEY ("uploaded_by") REFERENCES "public"."admins"("id") ON DELETE restrict ON UPDATE no action;