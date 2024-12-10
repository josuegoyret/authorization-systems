import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool } from "@neondatabase/serverless";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// if not needing to be edge compatible
// export const prisma = globalForPrisma.prisma || new PrismaClient();

// trun into edge compatible by adding neon database driver adapter:
// you must the driver over HTTP, and you can't do it by setting a websocket
let _prisma = globalForPrisma.prisma;

if (!_prisma) {
  const connectionString = process.env.DATABASE_URL;
  const pool = new Pool({ connectionString });
  const adapter = new PrismaNeon(pool);
  _prisma = new PrismaClient({ adapter });
}

// additionally, you can integrate prisma accelerate, which is edge compatible
// and doesn't need a special driver to be configured

export const prisma = _prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
