import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const cases = pgTable("cases", {
  id: serial("id").primaryKey(),
  vin: varchar("vin", { length: 17 }).notNull(),
  name: varchar("name", { length: 50 }).notNull(),
  surname: varchar("surname", { length: 50 }).notNull(),
});