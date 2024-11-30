import { describe, it, expect, beforeEach, test } from "vitest";  
import { dataService } from "./dataService.js";


beforeEach(async () => {
  await dataService.clearDB(); // Clear the database before each test
});

describe("data service - add cases", () => {
  it("should add a new case", async () => {
    await dataService.addCase("1HGCM82633A123456", "John", "Doe");
    const allCases = await dataService.getAllCases();
    expect(allCases).toHaveLength(1);
    expect(allCases[0].vin).toBe("1HGCM82633A123456");
  });

  

 

//   it("should return no matches for unrelated terms", async () => {
//     await addCase("1HGCM82633A123456", "John", "Doe");
//     const results = await searchCase("Alice");
//     expect(results).toEqual([]);
//   });
});


describe("data service - search", () => {
  beforeEach(async () => {
    // Add some test data
    await dataService.addCase("1HGCM82633A123456", "John", "Doe");
    await dataService.addCase("1HGCM82633A654321", "Alice", "Smith");
    await dataService.addCase("2HGCM82633A654332", "Jonny", "Smith");
    await dataService.addCase("1HGCM82633A789012", "Bob", "Johnson");
    await dataService.addCase("2HGCM82633A789666", "Alfredo", "Di Stefano");
    await dataService.addCase("2HGCM82633A789666", "Stefano", "Accorsi");
  });

  const testCases = [
    { term: "John", expected: ["1HGCM82633A123456","1HGCM82633A789012"] },
    { term: "Alice", expected: ["1HGCM82633A654321"] },
    // { term: "alice", expected: ["1HGCM82633A654321"] },
    { term: "Smith", expected: ["1HGCM82633A654321","2HGCM82633A654332"] },
    { term: "Johnson", expected: ["1HGCM82633A789012"] },
    { term: "1HGCM", expected: ["1HGCM82633A123456", "1HGCM82633A654321", "1HGCM82633A789012"] },
    { term: "XYZ", expected: [] }, // Test for no matches
  ];

  test.each(testCases)("should find cases matching term '$term'", async ({ term, expected }) => {
    const results = await dataService.searchCase(term);
    const vins = results.map((r) => r.vin); // Extract VINs from the results
    console.log(`term:`,term);
    console.log(`vins:`,vins);
    console.log(`results:`,results);
    expect(vins).toEqual(expected);
  });
});