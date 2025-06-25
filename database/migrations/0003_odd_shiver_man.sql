CREATE TYPE "public"."document_type" AS ENUM('CONSTRUCTION', 'ELEVATION', 'OTHER');--> statement-breakpoint
CREATE TABLE "coverage" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"quote_id" uuid NOT NULL,
	"building_replacement_cost" numeric(10, 2) CHECK (building_replacement_cost >= 0),
	"contents_replacement_cost" numeric(10, 2) CHECK (contents_replacement_cost >= 0),
	"building_coverage" numeric(10, 2) CHECK (building_coverage >= 0),
	"contents_coverage" numeric(10, 2) CHECK (contents_coverage >= 0),
	"loss_of_use_coverage" numeric(10, 2) CHECK (loss_of_use_coverage >= 0),
	"deductible" numeric(10, 2) CHECK (deductible >= 0)
);
--> statement-breakpoint
CREATE TABLE "documents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"property_id" uuid,
	"document_type" "document_type",
	"file_path" text,
	"uploaded_at" timestamp DEFAULT now(),
	"uploaded_by" uuid
);
--> statement-breakpoint
ALTER TABLE "coverage" ADD CONSTRAINT "coverage_quote_id_quotes_id_fk" FOREIGN KEY ("quote_id") REFERENCES "public"."quotes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_property_id_properties_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_uploaded_by_users_id_fk" FOREIGN KEY ("uploaded_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;