-- Drop the old sequence if it exists
DROP SEQUENCE IF EXISTS quote_number_seq;

-- Recreate the sequence starting at 1000001
CREATE SEQUENCE quote_number_seq START 1000001;

-- Set the default for the quote_number column to use the new sequence
ALTER TABLE "quotes" ALTER COLUMN "quote_number" SET DEFAULT nextval('quote_number_seq'); 