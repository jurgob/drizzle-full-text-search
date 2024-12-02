import { PGlite } from '@electric-sql/pglite';
import { drizzle as drizzlePgLite } from 'drizzle-orm/pglite';
import { migrate  } from "drizzle-orm/pglite/migrator"

// const dbFile = "database.sqlite";
// const pool = createPool({
//   database: dbFile,
// });


export function createDBClient(){
    const client = new PGlite();
    const db = drizzlePgLite(client);
    
    // Run migrations on startup
    const migrateDB = async () => {
      await migrate(db, { migrationsFolder: "./drizzle" });
    };

    return {db, migrateDB};
}

// export { cases };
