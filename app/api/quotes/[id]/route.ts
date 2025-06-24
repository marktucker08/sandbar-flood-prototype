import { NextRequest, NextResponse } from "next/server";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq } from "drizzle-orm";
import { quotes, properties, insuredClients, coverage as coverageTable } from "@/database/schema";

function getDrizzleClient() {
  const connectionString = process.env.DATABASE_URL!;
  const sql = postgres(connectionString, { max: 1 });
  return drizzle(sql);
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
    return NextResponse.json({ quote, property, insuredClient, coverage });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 