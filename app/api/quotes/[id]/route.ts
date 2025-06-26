import { NextRequest, NextResponse } from "next/server";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq } from "drizzle-orm";
import { quotes, properties, insuredClients, coverage as coverageTable } from "@/database/schema";

// Module-level singleton for Postgres client and Drizzle instance
let drizzleClient: ReturnType<typeof drizzle> | null = null;

function getDrizzleClient() {
  if (!drizzleClient) {
    const connectionString = process.env.DATABASE_URL!;
    // The 'postgres' package manages its own pool; reuse the same instance
    const sql = postgres(connectionString, { max: 1 }); // Use a reasonable pool size
    drizzleClient = drizzle(sql);
  }
  return drizzleClient;
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const db = getDrizzleClient();
    const quoteId = params.id;
    // Fetch the quote
    const quoteRows = await db.select().from(quotes).where(eq(quotes.id, quoteId));
    if (!quoteRows.length) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }
    const quote = quoteRows[0];
    // Add user-friendly quote ID if available
    const userFriendlyQuoteId = quote.quoteNumber ? `Q-${quote.quoteNumber}` : null;
    // Fetch related property
    const propertyRows = await db.select().from(properties).where(eq(properties.id, quote.propertyId!));
    const property = propertyRows[0] || null;
    // Fetch related insured client
    let insuredClient = null;
    if (property?.clientId) {
      const clientRows = await db.select().from(insuredClients).where(eq(insuredClients.id, property.clientId));
      insuredClient = clientRows[0] || null;
    }
    // Fetch related coverage
    const coverageRows = await db.select().from(coverageTable).where(eq(coverageTable.quoteId, quoteId));
    const coverage = coverageRows[0] || null;
    return NextResponse.json({ quote: { ...quote, userFriendlyQuoteId }, property, insuredClient, coverage });
  } catch (error) {
    console.error('Error fetching quote by id:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 