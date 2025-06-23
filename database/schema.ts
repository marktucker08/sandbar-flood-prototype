import {
  timestamp,
  pgTable,
  text,
  integer,
  uuid,
  pgEnum,
  boolean,
  date,
  decimal,
} from "drizzle-orm/pg-core";

export const userRole = pgEnum("user_role", [
  "agent",
  "agency-admin",
  "sandbar-admin",
  "sandbar-employee",
]);

export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  role: userRole("role").default("agent"),
  agencyId: uuid("agency_id").references(() => agencies.id),
});

export const agencies = pgTable("agencies", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insuredTypeEnum = pgEnum("insured_type", ["INDIVIDUAL", "BUSINESS"]);
export const entityTypeEnum = pgEnum("entity_type", [
  "INDIVIDUAL",
  "CORPORATION",
  "PARTNERSHIP",
  "LLC",
  "LIMITED_PARTNERSHIP",
  "UNLIMITED_LLC",
  "UNLIMITED_PARTNERSHIP",
  "OTHER",
]);

export const insuredClients = pgTable("insured_clients", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email"),
  phoneNumber: text("phone_number"),
  insuredType: insuredTypeEnum("insured_type").notNull(),
  businessName: text("business_name"),
  entityType: entityTypeEnum("entity_type"),
  additionalInsuredName: text("additional_insured_name"),
  address: text("address"),
  addressLine2: text("address_line_2"),
  city: text("city"),
  state: text("state"),
  zipCode: text("zip_code"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  createdBy: uuid("created_by").references(() => users.id),
});

export const occupancyTypeEnum = pgEnum("occupancy_type", [
  "PRIMARY",
  "SECONDARY",
  "SEASONAL",
  "RENTAL",
]);
export const foundationTypeEnum = pgEnum("foundation_type", [
  "CRAWLSPACE",
  "SLAB",
  "RAISED",
  "UNFINISHED",
  "FINISHED",
  "PILINGS_ENCLOSURE",
  "PILINGS_NO_ENCLOSURE",
  "FULL_WALL",
]);
export const constructionTypeEnum = pgEnum("construction_type", [
  "FRAME",
  "MASONRY",
  "SUPERIOR",
]);

export const properties = pgTable("properties", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  clientId: uuid("client_id").references(() => insuredClients.id),
  address: text("address"),
  addressLine2: text("address_line_2"),
  city: text("city"),
  state: text("state"),
  zipCode: text("zip_code"),
  latitude: text("latitude"),
  longitude: text("longitude"),
  floodZone: text("flood_zone"),
  floodZoneVerified: boolean("flood_zone_verified"),
  correctedFloodZone: text("corrected_flood_zone"),
  bfe: integer("bfe"),
  propertyElevation: integer("property_elevation"),
  buildingType: text("building_type"),
  yearBuilt: integer("year_built"),
  squareFootage: integer("square_footage"),
  numberOfFloors: integer("number_of_floors"),
  basementType: text("basement_type"),
  occupancyType: occupancyTypeEnum("occupancy_type"),
  numberOfStories: integer("number_of_stories"),
  numberOfFamilies: integer("number_of_families"),
  numberOfUnits: integer("number_of_units"),
  condoType: text("condo_type"),
  commercialOccupancy: text("commercial_occupancy"),
  numberOfResidentialUnits: integer("number_of_residential_units"),
  numberOfCommercialUnits: integer("number_of_commercial_units"),
  foundationType: foundationTypeEnum("foundation_type"),
  isProperlyVented: boolean("is_properly_vented"),
  certificateElevation: text("certificate_elevation"),
  numberOfSteps: integer("number_of_steps"),
  constructionType: constructionTypeEnum("construction_type"),
  constructionDocs: text("construction_docs"),
});

export const quoteStatusEnum = pgEnum("quote_status", [
  "PENDING",
  "APPROVED",
  "REJECTED",
]);
export const waitingPeriodEnum = pgEnum("waiting_period", ["STANDARD", "LOAN"]);

export const quotes = pgTable("quotes", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  propertyId: uuid("property_id").references(() => properties.id),
  userId: uuid("user_id").references(() => users.id),
  status: quoteStatusEnum("status").default("PENDING"),
  coverageAmount: decimal("coverage_amount", { precision: 10, scale: 2 }),
  premium: decimal("premium", { precision: 10, scale: 2 }),
  effectiveDate: date("effective_date"),
  expirationDate: date("expiration_date"),
  waitingPeriodType: waitingPeriodEnum("waiting_period_type"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const policyStatusEnum = pgEnum("policy_status", [
  "ACTIVE",
  "CANCELLED",
  "EXPIRED",
]);

export const policies = pgTable("policies", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  quoteId: uuid("quote_id").references(() => quotes.id),
  policyNumber: text("policy_number"),
  status: policyStatusEnum("status").default("ACTIVE"),
  effectiveDate: date("effective_date"),
  expirationDate: date("expiration_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const coverage = pgTable("coverage", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  quoteId: uuid("quote_id").references(() => quotes.id),
  buildingReplacementCost: decimal("building_replacement_cost", {
    precision: 10,
    scale: 2,
  }),
  contentsReplacementCost: decimal("contents_replacement_cost", {
    precision: 10,
    scale: 2,
  }),
  buildingCoverage: decimal("building_coverage", { precision: 10, scale: 2 }),
  contentsCoverage: decimal("contents_coverage", { precision: 10, scale: 2 }),
  lossOfUseCoverage: decimal("loss_of_use_coverage", {
    precision: 10,
    scale: 2,
  }),
  deductible: decimal("deductible", { precision: 10, scale: 2 }),
});

export const documentTypeEnum = pgEnum("document_type", [
  "CONSTRUCTION",
  "ELEVATION",
  "OTHER",
]);

export const documents = pgTable("documents", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  propertyId: uuid("property_id").references(() => properties.id),
  documentType: documentTypeEnum("document_type"),
  filePath: text("file_path"),
  uploadedAt: timestamp("uploaded_at").defaultNow(),
  uploadedBy: uuid("uploaded_by").references(() => users.id),
});

export const baseRates = pgTable("base_rates", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  zoneType: text("zone_type"),
  foundationType: text("foundation_type"),
  elevationDiff: text("elevation_diff"),
  rate: decimal("rate", { precision: 5, scale: 3 }),
});

export const rateAdjustment = pgTable("rate_adjustment", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  baseRatesId: uuid("base_rates_id").references(() => baseRates.id),
  zipCode: text("zip_code"),
  factorName: text("factor_name"),
  factorValue: decimal("factor_value", { precision: 10, scale: 4 }),
}); 