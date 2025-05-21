CREATE TYPE "public"."construction_type" AS ENUM('FRAME', 'MASONRY', 'SUPERIOR');--> statement-breakpoint
CREATE TYPE "public"."document_type" AS ENUM('CONSTRUCTION', 'ELEVATION', 'OTHER');--> statement-breakpoint
CREATE TYPE "public"."entity_type" AS ENUM('INDIVIDUAL', 'CORPORATION', 'PARTNERSHIP', 'LLC', 'LIMITED_PARTNERSHIP', 'UNLIMITED_LLC', 'UNLIMITED_PARTNERSHIP', 'OTHER');--> statement-breakpoint
CREATE TYPE "public"."foundation_type" AS ENUM('SLAB', 'RAISED', 'UNFINISHED', 'FINISHED', 'PILINGS_ENCLOSURE', 'PILINGS_NO_ENCLOSURE', 'FULL_WALL');--> statement-breakpoint
CREATE TYPE "public"."insured_type" AS ENUM('INDIVIDUAL', 'BUSINESS');--> statement-breakpoint
CREATE TYPE "public"."occupancy_type" AS ENUM('PRIMARY', 'SECONDARY', 'SEASONAL', 'RENTAL');--> statement-breakpoint
CREATE TYPE "public"."policy_status" AS ENUM('ACTIVE', 'CANCELLED', 'EXPIRED');--> statement-breakpoint
CREATE TYPE "public"."quote_status" AS ENUM('PENDING', 'APPROVED', 'REJECTED');--> statement-breakpoint
CREATE TYPE "public"."waiting_period" AS ENUM('STANDARD', 'LOAN');--> statement-breakpoint
CREATE TABLE "agencies" (
	"agency_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"main_contact_email" varchar(255) NOT NULL,
	"main_contact_first_name" varchar(50),
	"main_contact_last_name" varchar(50),
	"company_name" varchar(100) NOT NULL,
	"main_phone_number" varchar(20),
	"street_address" varchar(255),
	"address_line_2" varchar(255),
	"city" varchar(100),
	"state" varchar(50),
	"zip_code" varchar(10)
);
--> statement-breakpoint
CREATE TABLE "audit_logs" (
	"log_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"action" varchar(255),
	"table_name" varchar(100),
	"record_id" uuid,
	"old_value" json,
	"new_value" json,
	"timestamp" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "base_rates" (
	"base_rates_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"zone_type" varchar(10),
	"foundation_type" varchar(50),
	"elevation_diff" varchar(20),
	"rate" numeric(5, 3)
);
--> statement-breakpoint
CREATE TABLE "coverage" (
	"coverage_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"quote_id" uuid,
	"building_replacement_cost" numeric(10, 2),
	"contents_replacement_cost" numeric(10, 2),
	"building_coverage" numeric(10, 2),
	"contents_coverage" numeric(10, 2),
	"loss_of_use_coverage" numeric(10, 2),
	"deductible" numeric(10, 2)
);
--> statement-breakpoint
CREATE TABLE "documents" (
	"document_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"property_id" uuid,
	"document_type" "document_type",
	"file_path" varchar(255),
	"uploaded_at" timestamp DEFAULT now(),
	"uploaded_by" uuid
);
--> statement-breakpoint
CREATE TABLE "insured_clients" (
	"client_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(50),
	"last_name" varchar(50),
	"email" varchar(255),
	"phone_number" varchar(20),
	"insured_type" "insured_type" NOT NULL,
	"business_name" varchar(100),
	"entity_type" "entity_type",
	"additional_insured_name" varchar(100),
	"address" varchar(255),
	"address_line_2" varchar(255),
	"city" varchar(100),
	"state" varchar(50),
	"zip_code" varchar(10),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"created_by" uuid
);
--> statement-breakpoint
CREATE TABLE "policies" (
	"policy_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"quote_id" uuid,
	"policy_number" varchar(50),
	"status" "policy_status" DEFAULT 'ACTIVE',
	"effective_date" date,
	"expiration_date" date,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	CONSTRAINT "policies_policy_number_unique" UNIQUE("policy_number")
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"profile_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"agency_id" uuid,
	"role_id" uuid NOT NULL,
	"first_name" varchar(50),
	"last_name" varchar(50),
	"company_name" varchar(100),
	"phone_number" varchar(20),
	"created_at" timestamp DEFAULT now(),
	"last_login" timestamp,
	CONSTRAINT "profiles_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "properties" (
	"property_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"client_id" uuid,
	"address" varchar(255),
	"city" varchar(100),
	"state" varchar(50),
	"zip_code" varchar(10),
	"flood_zone" varchar(10),
	"bfe" integer,
	"hag" integer,
	"building_type" varchar(50),
	"year_built" integer,
	"square_footage" integer,
	"number_of_floors" integer,
	"basement_type" varchar(50),
	"occupancy_type" "occupancy_type",
	"waiting_period" "waiting_period",
	"number_of_stories" integer,
	"number_of_families" integer,
	"foundation_type" "foundation_type",
	"construction_type" "construction_type",
	"construction_docs" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "quotes" (
	"quote_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"property_id" uuid,
	"user_id" uuid,
	"status" "quote_status" DEFAULT 'PENDING',
	"coverage_amount" numeric(10, 2),
	"premium" numeric(10, 2),
	"deductible" numeric(10, 2),
	"effective_date" date,
	"expiration_date" date,
	"waiting_period_type" "waiting_period",
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "rate_adjustment" (
	"rate_adjustment_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"base_rates_id" uuid,
	"zip_code" varchar(10),
	"factor_name" varchar(100),
	"factor_value" numeric(10, 4)
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"role_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(50) NOT NULL,
	"description" varchar(255)
);
--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_profiles_profile_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("profile_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "coverage" ADD CONSTRAINT "coverage_quote_id_quotes_quote_id_fk" FOREIGN KEY ("quote_id") REFERENCES "public"."quotes"("quote_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_property_id_properties_property_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("property_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_uploaded_by_profiles_profile_id_fk" FOREIGN KEY ("uploaded_by") REFERENCES "public"."profiles"("profile_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "insured_clients" ADD CONSTRAINT "insured_clients_created_by_profiles_profile_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."profiles"("profile_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "policies" ADD CONSTRAINT "policies_quote_id_quotes_quote_id_fk" FOREIGN KEY ("quote_id") REFERENCES "public"."quotes"("quote_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_role_id_roles_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("role_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "properties" ADD CONSTRAINT "properties_client_id_insured_clients_client_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."insured_clients"("client_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quotes" ADD CONSTRAINT "quotes_property_id_properties_property_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("property_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quotes" ADD CONSTRAINT "quotes_user_id_profiles_profile_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("profile_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rate_adjustment" ADD CONSTRAINT "rate_adjustment_base_rates_id_base_rates_base_rates_id_fk" FOREIGN KEY ("base_rates_id") REFERENCES "public"."base_rates"("base_rates_id") ON DELETE no action ON UPDATE no action;