CREATE TABLE "base_rates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"zone_type" text,
	"foundation_type" text,
	"elevation_diff" text,
	"rate" numeric(5, 3)
);
--> statement-breakpoint
CREATE TABLE "rate_adjustment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"base_rates_id" uuid,
	"zip_code" text,
	"factor_name" text,
	"factor_value" numeric(10, 4)
);
--> statement-breakpoint
ALTER TABLE "rate_adjustment" ADD CONSTRAINT "rate_adjustment_base_rates_id_base_rates_id_fk" FOREIGN KEY ("base_rates_id") REFERENCES "public"."base_rates"("id") ON DELETE no action ON UPDATE no action;