import type { Config } from 'drizzle-kit';
import 'dotenv/config';

export default {
  schema: './database/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
} satisfies Config; 