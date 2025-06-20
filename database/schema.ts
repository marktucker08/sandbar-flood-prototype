import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  uuid,
  pgEnum,
  boolean,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";

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

export const accounts = pgTable(
  "accounts",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("sessions", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationTokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

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