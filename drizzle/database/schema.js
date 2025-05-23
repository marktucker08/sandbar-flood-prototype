"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.documents = exports.coverage = exports.auditLogs = exports.rateAdjustment = exports.baseRates = exports.policies = exports.quotes = exports.properties = exports.insuredClients = exports.agencies = exports.profiles = exports.roles = exports.documentTypeEnum = exports.policyStatusEnum = exports.quoteStatusEnum = exports.constructionTypeEnum = exports.foundationTypeEnum = exports.waitingPeriodEnum = exports.occupancyTypeEnum = exports.entityTypeEnum = exports.insuredTypeEnum = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
// ENUMS
exports.insuredTypeEnum = (0, pg_core_1.pgEnum)('insured_type', ['INDIVIDUAL', 'BUSINESS']);
exports.entityTypeEnum = (0, pg_core_1.pgEnum)('entity_type', ['INDIVIDUAL', 'CORPORATION', 'PARTNERSHIP', 'LLC', 'LIMITED_PARTNERSHIP', 'UNLIMITED_LLC', 'UNLIMITED_PARTNERSHIP', 'OTHER']);
exports.occupancyTypeEnum = (0, pg_core_1.pgEnum)('occupancy_type', ['PRIMARY', 'SECONDARY', 'SEASONAL', 'RENTAL']);
exports.waitingPeriodEnum = (0, pg_core_1.pgEnum)('waiting_period', ['STANDARD', 'LOAN']);
exports.foundationTypeEnum = (0, pg_core_1.pgEnum)('foundation_type', ['SLAB', 'RAISED', 'UNFINISHED', 'FINISHED', 'PILINGS_ENCLOSURE', 'PILINGS_NO_ENCLOSURE', 'FULL_WALL']);
exports.constructionTypeEnum = (0, pg_core_1.pgEnum)('construction_type', ['FRAME', 'MASONRY', 'SUPERIOR']);
exports.quoteStatusEnum = (0, pg_core_1.pgEnum)('quote_status', ['PENDING', 'APPROVED', 'REJECTED']);
exports.policyStatusEnum = (0, pg_core_1.pgEnum)('policy_status', ['ACTIVE', 'CANCELLED', 'EXPIRED']);
exports.documentTypeEnum = (0, pg_core_1.pgEnum)('document_type', ['CONSTRUCTION', 'ELEVATION', 'OTHER']);
// ROLES TABLE
exports.roles = (0, pg_core_1.pgTable)('roles', {
    roleId: (0, pg_core_1.uuid)('role_id').primaryKey().defaultRandom(),
    name: (0, pg_core_1.varchar)('name', { length: 50 }).notNull(), // AGENT, AGENCY_ADMIN, etc.
    description: (0, pg_core_1.varchar)('description', { length: 255 }),
});
// PROFILES TABLE (links to Supabase Auth users)
exports.profiles = (0, pg_core_1.pgTable)('profiles', {
    profileId: (0, pg_core_1.uuid)('profile_id').primaryKey().defaultRandom(),
    userId: (0, pg_core_1.uuid)('user_id').notNull().unique(), // Supabase Auth user UUID
    agencyId: (0, pg_core_1.uuid)('agency_id'),
    roleId: (0, pg_core_1.uuid)('role_id').notNull().references(function () { return exports.roles.roleId; }),
    firstName: (0, pg_core_1.varchar)('first_name', { length: 50 }),
    lastName: (0, pg_core_1.varchar)('last_name', { length: 50 }),
    companyName: (0, pg_core_1.varchar)('company_name', { length: 100 }),
    phoneNumber: (0, pg_core_1.varchar)('phone_number', { length: 20 }),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    lastLogin: (0, pg_core_1.timestamp)('last_login'),
});
// AGENCY TABLE
exports.agencies = (0, pg_core_1.pgTable)('agencies', {
    agencyId: (0, pg_core_1.uuid)('agency_id').primaryKey().defaultRandom(),
    mainContactEmail: (0, pg_core_1.varchar)('main_contact_email', { length: 255 }).notNull(),
    mainContactFirstName: (0, pg_core_1.varchar)('main_contact_first_name', { length: 50 }),
    mainContactLastName: (0, pg_core_1.varchar)('main_contact_last_name', { length: 50 }),
    companyName: (0, pg_core_1.varchar)('company_name', { length: 100 }).notNull(),
    mainPhoneNumber: (0, pg_core_1.varchar)('main_phone_number', { length: 20 }),
    streetAddress: (0, pg_core_1.varchar)('street_address', { length: 255 }),
    addressLine2: (0, pg_core_1.varchar)('address_line_2', { length: 255 }),
    city: (0, pg_core_1.varchar)('city', { length: 100 }),
    state: (0, pg_core_1.varchar)('state', { length: 50 }),
    zipCode: (0, pg_core_1.varchar)('zip_code', { length: 10 }),
});
// INSURED CLIENTS TABLE
exports.insuredClients = (0, pg_core_1.pgTable)('insured_clients', {
    clientId: (0, pg_core_1.uuid)('client_id').primaryKey().defaultRandom(),
    firstName: (0, pg_core_1.varchar)('first_name', { length: 50 }),
    lastName: (0, pg_core_1.varchar)('last_name', { length: 50 }),
    email: (0, pg_core_1.varchar)('email', { length: 255 }),
    phoneNumber: (0, pg_core_1.varchar)('phone_number', { length: 20 }),
    insuredType: (0, exports.insuredTypeEnum)('insured_type').notNull(),
    businessName: (0, pg_core_1.varchar)('business_name', { length: 100 }),
    entityType: (0, exports.entityTypeEnum)('entity_type'),
    additionalInsuredName: (0, pg_core_1.varchar)('additional_insured_name', { length: 100 }),
    address: (0, pg_core_1.varchar)('address', { length: 255 }),
    addressLine2: (0, pg_core_1.varchar)('address_line_2', { length: 255 }),
    city: (0, pg_core_1.varchar)('city', { length: 100 }),
    state: (0, pg_core_1.varchar)('state', { length: 50 }),
    zipCode: (0, pg_core_1.varchar)('zip_code', { length: 10 }),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at'),
    createdBy: (0, pg_core_1.uuid)('created_by').references(function () { return exports.profiles.profileId; }),
});
// PROPERTIES TABLE
exports.properties = (0, pg_core_1.pgTable)('properties', {
    propertyId: (0, pg_core_1.uuid)('property_id').primaryKey().defaultRandom(),
    clientId: (0, pg_core_1.uuid)('client_id').references(function () { return exports.insuredClients.clientId; }),
    address: (0, pg_core_1.varchar)('address', { length: 255 }),
    city: (0, pg_core_1.varchar)('city', { length: 100 }),
    state: (0, pg_core_1.varchar)('state', { length: 50 }),
    zipCode: (0, pg_core_1.varchar)('zip_code', { length: 10 }),
    floodZone: (0, pg_core_1.varchar)('flood_zone', { length: 10 }),
    bfe: (0, pg_core_1.integer)('bfe'),
    hag: (0, pg_core_1.integer)('hag'),
    buildingType: (0, pg_core_1.varchar)('building_type', { length: 50 }),
    yearBuilt: (0, pg_core_1.integer)('year_built'),
    squareFootage: (0, pg_core_1.integer)('square_footage'),
    numberOfFloors: (0, pg_core_1.integer)('number_of_floors'),
    basementType: (0, pg_core_1.varchar)('basement_type', { length: 50 }),
    occupancyType: (0, exports.occupancyTypeEnum)('occupancy_type'),
    waitingPeriod: (0, exports.waitingPeriodEnum)('waiting_period'),
    numberOfStories: (0, pg_core_1.integer)('number_of_stories'),
    numberOfFamilies: (0, pg_core_1.integer)('number_of_families'),
    foundationType: (0, exports.foundationTypeEnum)('foundation_type'),
    constructionType: (0, exports.constructionTypeEnum)('construction_type'),
    constructionDocs: (0, pg_core_1.varchar)('construction_docs', { length: 255 }),
});
// QUOTES TABLE
exports.quotes = (0, pg_core_1.pgTable)('quotes', {
    quoteId: (0, pg_core_1.uuid)('quote_id').primaryKey().defaultRandom(),
    propertyId: (0, pg_core_1.uuid)('property_id').references(function () { return exports.properties.propertyId; }),
    userId: (0, pg_core_1.uuid)('user_id').references(function () { return exports.profiles.profileId; }),
    status: (0, exports.quoteStatusEnum)('status').default('PENDING'),
    coverageAmount: (0, pg_core_1.decimal)('coverage_amount', { precision: 10, scale: 2 }),
    premium: (0, pg_core_1.decimal)('premium', { precision: 10, scale: 2 }),
    deductible: (0, pg_core_1.decimal)('deductible', { precision: 10, scale: 2 }),
    effectiveDate: (0, pg_core_1.date)('effective_date'),
    expirationDate: (0, pg_core_1.date)('expiration_date'),
    waitingPeriodType: (0, exports.waitingPeriodEnum)('waiting_period_type'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at'),
});
// POLICIES TABLE
exports.policies = (0, pg_core_1.pgTable)('policies', {
    policyId: (0, pg_core_1.uuid)('policy_id').primaryKey().defaultRandom(),
    quoteId: (0, pg_core_1.uuid)('quote_id').references(function () { return exports.quotes.quoteId; }),
    policyNumber: (0, pg_core_1.varchar)('policy_number', { length: 50 }).unique(),
    status: (0, exports.policyStatusEnum)('status').default('ACTIVE'),
    effectiveDate: (0, pg_core_1.date)('effective_date'),
    expirationDate: (0, pg_core_1.date)('expiration_date'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at'),
});
// BASE RATES TABLE
exports.baseRates = (0, pg_core_1.pgTable)('base_rates', {
    baseRatesId: (0, pg_core_1.uuid)('base_rates_id').primaryKey().defaultRandom(),
    zoneType: (0, pg_core_1.varchar)('zone_type', { length: 10 }),
    foundationType: (0, pg_core_1.varchar)('foundation_type', { length: 50 }),
    elevationDiff: (0, pg_core_1.varchar)('elevation_diff', { length: 20 }),
    rate: (0, pg_core_1.decimal)('rate', { precision: 5, scale: 3 }),
});
// RATE ADJUSTMENT TABLE
exports.rateAdjustment = (0, pg_core_1.pgTable)('rate_adjustment', {
    rateAdjustmentId: (0, pg_core_1.uuid)('rate_adjustment_id').primaryKey().defaultRandom(),
    baseRatesId: (0, pg_core_1.uuid)('base_rates_id').references(function () { return exports.baseRates.baseRatesId; }),
    zipCode: (0, pg_core_1.varchar)('zip_code', { length: 10 }),
    factorName: (0, pg_core_1.varchar)('factor_name', { length: 100 }),
    factorValue: (0, pg_core_1.decimal)('factor_value', { precision: 10, scale: 4 }),
});
// AUDIT LOGS TABLE
exports.auditLogs = (0, pg_core_1.pgTable)('audit_logs', {
    logId: (0, pg_core_1.uuid)('log_id').primaryKey().defaultRandom(),
    userId: (0, pg_core_1.uuid)('user_id').references(function () { return exports.profiles.profileId; }),
    action: (0, pg_core_1.varchar)('action', { length: 255 }),
    tableName: (0, pg_core_1.varchar)('table_name', { length: 100 }),
    recordId: (0, pg_core_1.uuid)('record_id'),
    oldValue: (0, pg_core_1.json)('old_value'),
    newValue: (0, pg_core_1.json)('new_value'),
    timestamp: (0, pg_core_1.timestamp)('timestamp').defaultNow(),
});
// COVERAGE TABLE
exports.coverage = (0, pg_core_1.pgTable)('coverage', {
    coverageId: (0, pg_core_1.uuid)('coverage_id').primaryKey().defaultRandom(),
    quoteId: (0, pg_core_1.uuid)('quote_id').references(function () { return exports.quotes.quoteId; }),
    buildingReplacementCost: (0, pg_core_1.decimal)('building_replacement_cost', { precision: 10, scale: 2 }),
    contentsReplacementCost: (0, pg_core_1.decimal)('contents_replacement_cost', { precision: 10, scale: 2 }),
    buildingCoverage: (0, pg_core_1.decimal)('building_coverage', { precision: 10, scale: 2 }),
    contentsCoverage: (0, pg_core_1.decimal)('contents_coverage', { precision: 10, scale: 2 }),
    lossOfUseCoverage: (0, pg_core_1.decimal)('loss_of_use_coverage', { precision: 10, scale: 2 }),
    deductible: (0, pg_core_1.decimal)('deductible', { precision: 10, scale: 2 }),
});
// DOCUMENTS TABLE
exports.documents = (0, pg_core_1.pgTable)('documents', {
    documentId: (0, pg_core_1.uuid)('document_id').primaryKey().defaultRandom(),
    propertyId: (0, pg_core_1.uuid)('property_id').references(function () { return exports.properties.propertyId; }),
    documentType: (0, exports.documentTypeEnum)('document_type'),
    filePath: (0, pg_core_1.varchar)('file_path', { length: 255 }),
    uploadedAt: (0, pg_core_1.timestamp)('uploaded_at').defaultNow(),
    uploadedBy: (0, pg_core_1.uuid)('uploaded_by').references(function () { return exports.profiles.profileId; }),
});
