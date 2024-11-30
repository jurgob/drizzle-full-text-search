import {db, migrateDB} from "./db.js";
import {cases} from "./schema.js";
import fuzzySearch  from "fuzzysearch";

export async function createDataService() {
    await migrateDB();
    const addCase = async (vin: string, name: string, surname: string) => {
        await db.insert(cases).values({vin, name, surname});
        console.log("Case added successfully!");
    }

    const getAllCases = async () => {
        return db.select().from(cases)
    }
    const searchCase = async (term: string) => {
        const allCases = await db.select().from(cases);
        const results = allCases.filter((c) => c.vin.includes(term) || c.name.includes(term) || c.surname.includes(term));
        return results
    }

    const clearDB = async () => {
        await db.delete(cases).execute()
    }

    return {addCase, searchCase,clearDB,getAllCases};
}

export const dataService = await createDataService();