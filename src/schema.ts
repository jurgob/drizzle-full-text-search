import { SQL, sql } from "drizzle-orm";
import { pgTable, serial, varchar ,customType, index} from "drizzle-orm/pg-core";
const tsVector = customType<{ data: string }>({
  dataType() {
    return "tsvector";
  },
});


export const cases = pgTable("cases", {
  id: serial("id").primaryKey(),
  vin: varchar("vin", { length: 17 }).notNull(),
  name: varchar("name", { length: 50 }).notNull(),
  surname: varchar("surname", { length: 50 }).notNull(),
  contentSearch: tsVector("content_search").generatedAlwaysAs(
    (): SQL => sql`to_tsvector('english', ${cases.vin} || ' ' || ${cases.name} || ' ' || ${cases.surname})`
  ),
}
);