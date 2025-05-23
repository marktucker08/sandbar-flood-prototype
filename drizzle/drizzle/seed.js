"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_postgres_1 = require("drizzle-orm/node-postgres");
const pg_1 = require("pg");
const schema_1 = require("../database/schema");
const drizzle_orm_1 = require("drizzle-orm");
// Load env
require("dotenv/config");
const pool = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
const db = (0, node_postgres_1.drizzle)(pool);
async function seed() {
    // 1. Seed roles
    const roleData = [
        { name: 'AGENT', description: 'General agent access' },
        { name: 'AGENCY_ADMIN', description: 'Agency admin access' },
        { name: 'SANDBAR_ADMIN', description: 'Full system admin access' },
        { name: 'SANDBAR_EMPLOYEE', description: 'Sandbar employee access' },
    ];
    for (const role of roleData) {
        await db.insert(schema_1.roles).values(role).onConflictDoNothing();
    }
    // 2. Seed a sample agency
    const [agency] = await db.insert(schema_1.agencies).values({
        mainContactEmail: 'admin@sampleagency.com',
        mainContactFirstName: 'Alice',
        mainContactLastName: 'Anderson',
        companyName: 'Sample Agency Inc.',
        mainPhoneNumber: '555-123-4567',
        streetAddress: '123 Main St',
        addressLine2: '',
        city: 'Sampleville',
        state: 'CA',
        zipCode: '90001',
    }).returning();
    // 3. Seed a sample profile (link to agency and a role)
    // TODO: Replace this with a real Supabase Auth user UUID
    const sampleUserId = '00000000-0000-0000-0000-000000000000';
    // Get AGENT roleId
    const agentRole = await db.select().from(schema_1.roles).where((0, drizzle_orm_1.eq)(schema_1.roles.name, 'AGENT'));
    await db.insert(schema_1.profiles).values({
        userId: sampleUserId,
        agencyId: agency.agencyId,
        roleId: agentRole[0].roleId,
        firstName: 'Test',
        lastName: 'User',
        companyName: 'Sample Agency Inc.',
        phoneNumber: '555-987-6543',
    }).onConflictDoNothing();
    console.log('Seed complete!');
    await pool.end();
}
seed().catch((e) => {
    console.error(e);
    process.exit(1);
});
