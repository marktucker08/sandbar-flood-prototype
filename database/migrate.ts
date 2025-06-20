import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in .env.local");
}

const connectionString = process.env.DATABASE_URL;
const sql = postgres(connectionString, { max: 1 });
const db = drizzle(sql);

async function main() {
  console.log("Running migrations...");

  await migrate(db, { migrationsFolder: "database/migrations" });

  console.log("Migrations finished.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
}); 