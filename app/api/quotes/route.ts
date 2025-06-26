import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq } from "drizzle-orm";
import { insuredClients, properties, quotes, coverage as coverageTable } from "@/database/schema";

// Zod schema for the expected payload
const insuredClientSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  phoneNumber: z.string().optional(),
  insuredType: z.enum(["INDIVIDUAL", "BUSINESS"]),
  businessName: z.string().optional(),
  entityType: z.string().optional(),
  additionalInsuredName: z.string().optional(),
  address: z.string(),
  addressLine2: z.string().optional(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
});

const propertySchema = z.object({
  address: z.string(),
  addressLine2: z.string().optional(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  floodZone: z.string().optional(),
  floodZoneVerified: z.boolean().optional(),
  correctedFloodZone: z.string().optional(),
  bfe: z.number().optional(),
  propertyElevation: z.number().optional(),
  buildingType: z.string(),
  yearBuilt: z.coerce.number(),
  squareFootage: z.coerce.number(),
  numberOfFloors: z.number().optional(),
  basementType: z.string().optional(),
  occupancyType: z.string().optional(),
  numberOfStories: z.number().optional(),
  numberOfFamilies: z.number().optional(),
  numberOfUnits: z.number().optional(),
  condoType: z.string().optional(),
  commercialOccupancy: z.string().optional(),
  numberOfResidentialUnits: z.number().optional(),
  numberOfCommercialUnits: z.number().optional(),
  foundationType: z.string().optional(),
  isProperlyVented: z.boolean().optional(),
  certificateElevation: z.string().optional(),
  numberOfSteps: z.number().optional(),
  constructionType: z.string().optional(),
  constructionDocs: z.string().optional(),
});

const quoteSchema = z.object({
  userId: z.string(),
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]).optional(),
  coverageAmount: z.number(),
  premium: z.number(),
  effectiveDate: z.string(),
  expirationDate: z.string(),
  waitingPeriodType: z.enum(["STANDARD", "LOAN"]),
});

const coverageSchema = z.object({
  buildingReplacementCost: z.number(),
  contentsReplacementCost: z.number(),
  buildingCoverage: z.number(),
  contentsCoverage: z.number(),
  lossOfUseCoverage: z.number().optional(),
  deductible: z.number(),
});

const payloadSchema = z.object({
  insuredClient: insuredClientSchema,
  property: propertySchema,
  quote: quoteSchema,
  coverage: coverageSchema,
});

function getDrizzleClient() {
  const connectionString = process.env.POSTGRES_URL!;
  const sql = postgres(connectionString, { max: 1 });
  return drizzle(sql);
}

// --- MAPPING HELPERS ---
function mapEntityType(val?: string):
  | "INDIVIDUAL"
  | "CORPORATION"
  | "PARTNERSHIP"
  | "LLC"
  | "LIMITED_PARTNERSHIP"
  | "UNLIMITED_LLC"
  | "UNLIMITED_PARTNERSHIP"
  | "OTHER"
  | null {
  if (!val) return null;
  const allowed = [
    "INDIVIDUAL","CORPORATION","PARTNERSHIP","LLC","LIMITED_PARTNERSHIP","UNLIMITED_LLC","UNLIMITED_PARTNERSHIP","OTHER"
  ] as const;
  const upper = val.toUpperCase();
  return (allowed as readonly string[]).includes(upper)
    ? (upper as typeof allowed[number])
    : null;
}
function mapOccupancyType(val?: string): "PRIMARY" | "SECONDARY" | "SEASONAL" | "RENTAL" | null {
  if (!val) return null;
  const allowed = ["PRIMARY","SECONDARY","SEASONAL","RENTAL"] as const;
  const upper = val.toUpperCase();
  return (allowed as readonly string[]).includes(upper)
    ? (upper as typeof allowed[number])
    : null;
}
function mapFoundationType(val?: string):
  | "CRAWLSPACE"
  | "SLAB"
  | "RAISED"
  | "UNFINISHED"
  | "FINISHED"
  | "PILINGS_ENCLOSURE"
  | "PILINGS_NO_ENCLOSURE"
  | "FULL_WALL"
  | null {
  if (!val) return null;
  const map = {
    "crawlspace": "CRAWLSPACE",
    "slab": "SLAB",
    "raised": "RAISED",
    "unfinished": "UNFINISHED",
    "finished": "FINISHED",
    "pilings-enclosure": "PILINGS_ENCLOSURE",
    "pilings-no-enclosure": "PILINGS_NO_ENCLOSURE",
    "full-wall": "FULL_WALL"
  } as const;
  return (val in map ? map[val as keyof typeof map] : null);
}
function mapConstructionType(val?: string): "FRAME" | "MASONRY" | "SUPERIOR" | null {
  if (!val) return null;
  const map = {
    "frame": "FRAME",
    "brick": "MASONRY",
    "joisted": "SUPERIOR"
  } as const;
  return (val in map ? map[val as keyof typeof map] : null);
}
function toStr(val: unknown): string | null { return val !== undefined && val !== null ? String(val) : null; }

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = payloadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const { insuredClient, property, quote, coverage } = parsed.data;
    const db = getDrizzleClient();

    // 1. Upsert insured client by email (if email provided), else always insert
    let clientId: string | undefined;
    const insuredClientInsert = {
      ...insuredClient,
      entityType: mapEntityType(insuredClient.entityType),
    };
    if (insuredClient.email) {
      const existing = await db
        .select({ id: insuredClients.id })
        .from(insuredClients)
        .where(eq(insuredClients.email, insuredClient.email));
      if (existing.length > 0) {
        clientId = existing[0].id;
      } else {
        const [inserted] = await db
          .insert(insuredClients)
          .values(insuredClientInsert)
          .returning({ id: insuredClients.id });
        clientId = inserted.id;
      }
    } else {
      const [inserted] = await db
        .insert(insuredClients)
        .values(insuredClientInsert)
        .returning({ id: insuredClients.id });
      clientId = inserted.id;
    }

    // 2. Insert property (with clientId)
    const propertyInsert = {
      ...property,
      clientId,
      occupancyType: mapOccupancyType(property.occupancyType),
      foundationType: mapFoundationType(property.foundationType),
      constructionType: mapConstructionType(property.constructionType),
      yearBuilt: property.yearBuilt !== undefined ? property.yearBuilt : null,
      squareFootage: property.squareFootage !== undefined ? property.squareFootage : null,
      numberOfStories: property.numberOfStories !== undefined ? property.numberOfStories : null,
      numberOfFamilies: property.numberOfFamilies !== undefined ? property.numberOfFamilies : null,
      numberOfUnits: property.numberOfUnits !== undefined ? property.numberOfUnits : null,
      numberOfResidentialUnits: property.numberOfResidentialUnits !== undefined ? property.numberOfResidentialUnits : null,
      numberOfCommercialUnits: property.numberOfCommercialUnits !== undefined ? property.numberOfCommercialUnits : null,
      bfe: property.bfe !== undefined && property.bfe !== null ? String(property.bfe) : null,
      propertyElevation: property.propertyElevation !== undefined && property.propertyElevation !== null ? String(property.propertyElevation) : null,
      numberOfSteps: property.numberOfSteps !== undefined ? property.numberOfSteps : null,
    };
    const [propertyInserted] = await db
      .insert(properties)
      .values(propertyInsert)
      .returning({ id: properties.id });
    const propertyId = propertyInserted.id;

    // 3. Insert quote (with propertyId, userId)
    const quoteInsert = {
      ...quote,
      propertyId,
      coverageAmount: toStr(quote.coverageAmount),
      premium: toStr(quote.premium),
    };
    const [quoteInserted] = await db
      .insert(quotes)
      .values(quoteInsert)
      .returning({ id: quotes.id, quoteNumber: quotes.quoteNumber });
    const quoteId = quoteInserted.id;
    const quoteNumber = quoteInserted.quoteNumber;

    // 4. Insert coverage (with quoteId)
    const coverageInsert = {
      ...coverage,
      quoteId,
      buildingReplacementCost: toStr(coverage.buildingReplacementCost),
      contentsReplacementCost: toStr(coverage.contentsReplacementCost),
      buildingCoverage: toStr(coverage.buildingCoverage),
      contentsCoverage: toStr(coverage.contentsCoverage),
      lossOfUseCoverage: coverage.lossOfUseCoverage !== undefined ? toStr(coverage.lossOfUseCoverage) : undefined,
      deductible: toStr(coverage.deductible),
    };
    const [coverageInserted] = await db
      .insert(coverageTable)
      .values(coverageInsert)
      .returning({ id: coverageTable.id });
    const coverageId = coverageInserted.id;

    return NextResponse.json({
      clientId,
      propertyId,
      quoteId,
      quoteNumber,
      coverageId,
      message: "Quote created successfully."
    }, { status: 201 });
  } catch (error) {
    console.error('Quote creation error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }

    if (error instanceof Error && error.message.includes('duplicate key')) {
      return NextResponse.json(
        { error: "Duplicate quote detected" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        error: "Failed to create quote",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
} 