/**
 * From prisma.io/docs:
 *
 * Prisma ORM: is a next-generation Node.js and Typescript ORM that unlocks a new level of developer
 * experience when working with databases thanks to its intuitive data model, automated migrations,
 * type-safety & auto-completion
 *
 * Primsa Accelerate: is a global database cache with ascalable connection pooling to make your queries fast
 * (scale database connection, enable set caching strategy at query level and work at edge)
 */

// driver configutarion imports: -----------------

// import { PrismaClient } from "@prisma/client";
// import { PrismaNeon } from "@prisma/adapter-neon";
// import { Pool } from "@neondatabase/serverless";

// accelerate configuration imports: -----------------

import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

/**
 * // if not needing to be edge compatible
 * export const prisma = globalForPrisma.prisma || new PrismaClient();
 */

/**
 * // trun into edge compatible by adding neon database driver adapter:
 * // you must the driver over HTTP, and you can't do it by setting a websocket
 *
 * let _prisma = globalForPrisma.prisma;
 *
 * if (!_prisma) {
 * const connectionString = process.env.DATABASE_URL;
 * const pool = new Pool({ connectionString });
 * const adapter = new PrismaNeon(pool);
 * _prisma = new PrismaClient({ adapter });
 * }
 */

// additionally, you can integrate prisma accelerate, which is edge compatible,
// and doesn't need a special driver to be configured

export const prisma =
  globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
