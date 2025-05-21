import { pgTable, uuid, varchar, integer, decimal, timestamp, date, json, pgEnum } from 'drizzle-orm/pg-core';

// ENUMS
export const insuredTypeEnum = pgEnum('insured_type', ['INDIVIDUAL', 'BUSINESS']);
export const entityTypeEnum = pgEnum('entity_type', ['INDIVIDUAL', 'CORPORATION', 'PARTNERSHIP', 'LLC', 'LIMITED_PARTNERSHIP', 'UNLIMITED_LLC', 'UNLIMITED_PARTNERSHIP', 'OTHER']);
export const occupancyTypeEnum = pgEnum('occupancy_type', ['PRIMARY', 'SECONDARY', 'SEASONAL', 'RENTAL']);
export const waitingPeriodEnum = pgEnum('waiting_period', ['STANDARD', 'LOAN']);
export const foundationTypeEnum = pgEnum('foundation_type', ['SLAB', 'RAISED', 'UNFINISHED', 'FINISHED', 'PILINGS_ENCLOSURE', 'PILINGS_NO_ENCLOSURE', 'FULL_WALL']);
export const constructionTypeEnum = pgEnum('construction_type', ['FRAME', 'MASONRY', 'SUPERIOR']);
export const quoteStatusEnum = pgEnum('quote_status', ['PENDING', 'APPROVED', 'REJECTED']);
export const policyStatusEnum = pgEnum('policy_status', ['ACTIVE', 'CANCELLED', 'EXPIRED']);
export const documentTypeEnum = pgEnum('document_type', ['CONSTRUCTION', 'ELEVATION', 'OTHER']);

// ROLES TABLE
export const roles = pgTable('roles', {
  roleId: uuid('role_id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 50 }).notNull(), // AGENT, AGENCY_ADMIN, etc.
  description: varchar('description', { length: 255 }),
});

// PROFILES TABLE (links to Supabase Auth users)
export const profiles = pgTable('profiles', {
  profileId: uuid('profile_id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().unique(), // Supabase Auth user UUID
  agencyId: uuid('agency_id'),
  roleId: uuid('role_id').notNull().references(() => roles.roleId),
  firstName: varchar('first_name', { length: 50 }),
  lastName: varchar('last_name', { length: 50 }),
  companyName: varchar('company_name', { length: 100 }),
  phoneNumber: varchar('phone_number', { length: 20 }),
  createdAt: timestamp('created_at').defaultNow(),
  lastLogin: timestamp('last_login'),
});

// AGENCY TABLE
export const agencies = pgTable('agencies', {
  agencyId: uuid('agency_id').primaryKey().defaultRandom(),
  mainContactEmail: varchar('main_contact_email', { length: 255 }).notNull(),
  mainContactFirstName: varchar('main_contact_first_name', { length: 50 }),
  mainContactLastName: varchar('main_contact_last_name', { length: 50 }),
  companyName: varchar('company_name', { length: 100 }).notNull(),
  mainPhoneNumber: varchar('main_phone_number', { length: 20 }),
  streetAddress: varchar('street_address', { length: 255 }),
  addressLine2: varchar('address_line_2', { length: 255 }),
  city: varchar('city', { length: 100 }),
  state: varchar('state', { length: 50 }),
  zipCode: varchar('zip_code', { length: 10 }),
});

// INSURED CLIENTS TABLE
export const insuredClients = pgTable('insured_clients', {
  clientId: uuid('client_id').primaryKey().defaultRandom(),
  firstName: varchar('first_name', { length: 50 }),
  lastName: varchar('last_name', { length: 50 }),
  email: varchar('email', { length: 255 }),
  phoneNumber: varchar('phone_number', { length: 20 }),
  insuredType: insuredTypeEnum('insured_type').notNull(),
  businessName: varchar('business_name', { length: 100 }),
  entityType: entityTypeEnum('entity_type'),
  additionalInsuredName: varchar('additional_insured_name', { length: 100 }),
  address: varchar('address', { length: 255 }),
  addressLine2: varchar('address_line_2', { length: 255 }),
  city: varchar('city', { length: 100 }),
  state: varchar('state', { length: 50 }),
  zipCode: varchar('zip_code', { length: 10 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
  createdBy: uuid('created_by').references(() => profiles.profileId),
});

// PROPERTIES TABLE
export const properties = pgTable('properties', {
  propertyId: uuid('property_id').primaryKey().defaultRandom(),
  clientId: uuid('client_id').references(() => insuredClients.clientId),
  address: varchar('address', { length: 255 }),
  city: varchar('city', { length: 100 }),
  state: varchar('state', { length: 50 }),
  zipCode: varchar('zip_code', { length: 10 }),
  floodZone: varchar('flood_zone', { length: 10 }),
  bfe: integer('bfe'),
  hag: integer('hag'),
  buildingType: varchar('building_type', { length: 50 }),
  yearBuilt: integer('year_built'),
  squareFootage: integer('square_footage'),
  numberOfFloors: integer('number_of_floors'),
  basementType: varchar('basement_type', { length: 50 }),
  occupancyType: occupancyTypeEnum('occupancy_type'),
  waitingPeriod: waitingPeriodEnum('waiting_period'),
  numberOfStories: integer('number_of_stories'),
  numberOfFamilies: integer('number_of_families'),
  foundationType: foundationTypeEnum('foundation_type'),
  constructionType: constructionTypeEnum('construction_type'),
  constructionDocs: varchar('construction_docs', { length: 255 }),
});

// QUOTES TABLE
export const quotes = pgTable('quotes', {
  quoteId: uuid('quote_id').primaryKey().defaultRandom(),
  propertyId: uuid('property_id').references(() => properties.propertyId),
  userId: uuid('user_id').references(() => profiles.profileId),
  status: quoteStatusEnum('status').default('PENDING'),
  coverageAmount: decimal('coverage_amount', { precision: 10, scale: 2 }),
  premium: decimal('premium', { precision: 10, scale: 2 }),
  deductible: decimal('deductible', { precision: 10, scale: 2 }),
  effectiveDate: date('effective_date'),
  expirationDate: date('expiration_date'),
  waitingPeriodType: waitingPeriodEnum('waiting_period_type'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
});

// POLICIES TABLE
export const policies = pgTable('policies', {
  policyId: uuid('policy_id').primaryKey().defaultRandom(),
  quoteId: uuid('quote_id').references(() => quotes.quoteId),
  policyNumber: varchar('policy_number', { length: 50 }).unique(),
  status: policyStatusEnum('status').default('ACTIVE'),
  effectiveDate: date('effective_date'),
  expirationDate: date('expiration_date'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
});

// BASE RATES TABLE
export const baseRates = pgTable('base_rates', {
  baseRatesId: uuid('base_rates_id').primaryKey().defaultRandom(),
  zoneType: varchar('zone_type', { length: 10 }),
  foundationType: varchar('foundation_type', { length: 50 }),
  elevationDiff: varchar('elevation_diff', { length: 20 }),
  rate: decimal('rate', { precision: 5, scale: 3 }),
});

// RATE ADJUSTMENT TABLE
export const rateAdjustment = pgTable('rate_adjustment', {
  rateAdjustmentId: uuid('rate_adjustment_id').primaryKey().defaultRandom(),
  baseRatesId: uuid('base_rates_id').references(() => baseRates.baseRatesId),
  zipCode: varchar('zip_code', { length: 10 }),
  factorName: varchar('factor_name', { length: 100 }),
  factorValue: decimal('factor_value', { precision: 10, scale: 4 }),
});

// AUDIT LOGS TABLE
export const auditLogs = pgTable('audit_logs', {
  logId: uuid('log_id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => profiles.profileId),
  action: varchar('action', { length: 255 }),
  tableName: varchar('table_name', { length: 100 }),
  recordId: uuid('record_id'),
  oldValue: json('old_value'),
  newValue: json('new_value'),
  timestamp: timestamp('timestamp').defaultNow(),
});

// COVERAGE TABLE
export const coverage = pgTable('coverage', {
  coverageId: uuid('coverage_id').primaryKey().defaultRandom(),
  quoteId: uuid('quote_id').references(() => quotes.quoteId),
  buildingReplacementCost: decimal('building_replacement_cost', { precision: 10, scale: 2 }),
  contentsReplacementCost: decimal('contents_replacement_cost', { precision: 10, scale: 2 }),
  buildingCoverage: decimal('building_coverage', { precision: 10, scale: 2 }),
  contentsCoverage: decimal('contents_coverage', { precision: 10, scale: 2 }),
  lossOfUseCoverage: decimal('loss_of_use_coverage', { precision: 10, scale: 2 }),
  deductible: decimal('deductible', { precision: 10, scale: 2 }),
});

// DOCUMENTS TABLE
export const documents = pgTable('documents', {
  documentId: uuid('document_id').primaryKey().defaultRandom(),
  propertyId: uuid('property_id').references(() => properties.propertyId),
  documentType: documentTypeEnum('document_type'),
  filePath: varchar('file_path', { length: 255 }),
  uploadedAt: timestamp('uploaded_at').defaultNow(),
  uploadedBy: uuid('uploaded_by').references(() => profiles.profileId),
}); 