import {createDBClient} from "./db.js";
import { SQL, sql } from "drizzle-orm";

import {cases} from "./schema.js";

export async function createDataService() {
    const {db, migrateDB} = createDBClient();
    await migrateDB();

    const addCase = async (vin: string, name: string, surname: string) => {
        await db.insert(cases).values({vin, name, surname});
    }

    const getAllCases = async () => {
        return db.select().from(cases)
    }
    const searchCase = async (term: string) => {
        const allCases = await db.select().from(cases);
        const results = allCases.filter((c) => c.vin.includes(term) || c.name.includes(term) || c.surname.includes(term));
        return results
    }

    const searchCaseFuzzy = async (query: string) => {
        const queryTerms = query.split(" ").join(" | ");
        const queryILIKEQuery = query.split(" ")
            .map(term => sql`content ILIKE ${'%' + term + '%'}`)
        const callback = (acc: SQL, condition: SQL) => { return acc ? sql`${acc} OR ${condition}` : condition }
        const combinedIlikeCondition = queryILIKEQuery
            .reduce(
                callback, 
                sql``
            );
        // console.log(`queryILIKEQuery`, queryILIKEQuery)
        const results = await db
            .select()
            .from(cases)
            .where(
                sql`${cases.contentSearch} @@ to_tsquery('english', ${queryTerms})`
            ).orderBy(
                sql`ts_rank(${cases.contentSearch}, websearch_to_tsquery('english', ${queryTerms})) DESC`
            );
        return results;
    }

    const clearDB = async () => {
        await db.delete(cases).execute()
    }

    return {
        addCase, 
        searchCase,
        clearDB,
        getAllCases,
        searchCaseFuzzy
    };
}

export const dataService = await createDataService();