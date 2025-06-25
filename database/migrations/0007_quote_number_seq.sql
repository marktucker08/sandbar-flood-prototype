-- Add a sequence for quote numbers
CREATE SEQUENCE IF NOT EXISTS quote_number_seq START 1000001;

-- Add a new column to the quotes table for the user-friendly quote number
ALTER TABLE "quotes" ADD COLUMN IF NOT EXISTS "quote_number" bigint UNIQUE;

-- Optionally, set default value for new quotes (Postgres 13+)
ALTER TABLE "quotes" ALTER COLUMN "quote_number" SET DEFAULT nextval('quote_number_seq');

-- For existing rows, you may want to backfill quote_number manually if needed. 