CREATE TYPE "public"."construction_type" AS ENUM('FRAME', 'MASONRY', 'SUPERIOR');--> statement-breakpoint
CREATE TYPE "public"."entity_type" AS ENUM('INDIVIDUAL', 'CORPORATION', 'PARTNERSHIP', 'LLC', 'LIMITED_PARTNERSHIP', 'UNLIMITED_LLC', 'UNLIMITED_PARTNERSHIP', 'OTHER');--> statement-breakpoint
CREATE TYPE "public"."foundation_type" AS ENUM('CRAWLSPACE', 'SLAB', 'RAISED', 'UNFINISHED', 'FINISHED', 'PILINGS_ENCLOSURE', 'PILINGS_NO_ENCLOSURE', 'FULL_WALL');--> statement-breakpoint
CREATE TYPE "public"."insured_type" AS ENUM('INDIVIDUAL', 'BUSINESS');--> statement-breakpoint
CREATE TYPE "public"."occupancy_type" AS ENUM('PRIMARY', 'SECONDARY', 'SEASONAL', 'RENTAL');--> statement-breakpoint
CREATE TABLE "insured_clients" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" text,
	"last_name" text,
	"email" text,
	"phone_number" text,
	"insured_type" "insured_type" NOT NULL,
	"business_name" text,
	"entity_type" "entity_type",
	"additional_insured_name" text,
	"address" text,
	"address_line_2" text,
	"city" text,
	"state" text,
	"zip_code" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"created_by" uuid
);
--> statement-breakpoint
CREATE TABLE "properties" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"client_id" uuid,
	"address" text,
	"address_line_2" text,
	"city" text,
	"state" text,
	"zip_code" text,
	"latitude" numeric(10, 6),
	"longitude" numeric(10, 6),
	"flood_zone" text,
	"flood_zone_verified" boolean,
	"corrected_flood_zone" text,
	"bfe" numeric(6, 2),
	"property_elevation" numeric(6, 2),
	"building_type" text,
	"year_built" integer,
	"square_footage" integer,
	"number_of_floors" integer,
	"basement_type" text,
	"occupancy_type" "occupancy_type",
	"number_of_stories" integer,
	"number_of_families" integer,
	"number_of_units" integer,
	"condo_type" text,
	"commercial_occupancy" text,
	"number_of_residential_units" integer,
	"number_of_commercial_units" integer,
	"foundation_type" "foundation_type",
	"is_properly_vented" boolean,
	"certificate_elevation" text,
	"number_of_steps" integer,
	"construction_type" "construction_type",
	"construction_docs" text
);
--> statement-breakpoint
ALTER TABLE "insured_clients" ADD CONSTRAINT "insured_clients_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "properties" ADD CONSTRAINT "properties_client_id_insured_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."insured_clients"("id") ON DELETE no action ON UPDATE no action;