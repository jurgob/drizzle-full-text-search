import { PGlite } from '@electric-sql/pglite';
import { drizzle as drizzlePgLite } from 'drizzle-orm/pglite';
import { migrate  } from "drizzle-orm/pglite/migrator"


const dbFile = "database.sqlite";
const client = new PGlite({
    database: dbFile,
});
export const db = drizzlePgLite(client);

export const migrateDB = async () => {
  await migrate(db, { migrationsFolder: "./drizzle" });
};