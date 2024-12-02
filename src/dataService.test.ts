import { describe, it, expect,beforeEach, afterEach, test } from "vitest";  
import { dataService } from "./dataService.js";
// import { afterEach } from "node:test";


afterEach(async () => {
  await dataService.clearDB(); // Clear the database before each test
});

describe("data service - add cases", () => {
  it("should add a new case", async () => {
    await dataService.addCase("1HGCM82633A12V001", "John", "Doe");
    const allCases = await dataService.getAllCases();
    expect(allCases).toHaveLength(1);
    expect(allCases[0].vin).toBe("1HGCM82633A12V001");
  });

  

 

//   it("should return no matches for unrelated terms", async () => {
//     await addCase("1HGCM82633A12V001", "John", "Doe");
//     const results = await searchCase("Alice");
//     expect(results).toEqual([]);
//   });
});


describe("data service - search", () => {
  beforeEach(async () => {
    // Add some test data
    await dataService.addCase("1HGCM82633A12V001", "John", "Doe");
    await dataService.addCase("1HGCM82633A65V002", "Alice", "Smith");
    await dataService.addCase("2HGCM82633A65V003", "Jonny", "Smith");
    await dataService.addCase("1HGCM82633A78V004", "Bob", "Johnson");
    await dataService.addCase("2HGCM82633A78V005", "Alfredo", "Di Stefano");
    await dataService.addCase("2HGCM82633A78V006", "Stefano", "Accorsi");
    await dataService.addCase("2HGCM82633A78V007", "Anna", "Doe");
  });
  
  const testCasesFuzzy = [
    { term: "John", expected: ["1HGCM82633A12V001"] },
    { term: "John Doe", expected: ["1HGCM82633A12V001","2HGCM82633A78V007"] },
    { term: "john doe", expected: ["1HGCM82633A12V001","2HGCM82633A78V007"] },
    { term: "Doe", expected: ["1HGCM82633A12V001", "2HGCM82633A78V007"] },
    { term: "Alice", expected: ["1HGCM82633A65V002"] },
    { term: "alice", expected: ["1HGCM82633A65V002"] },
    { term: "Smith", expected: ["1HGCM82633A65V002","2HGCM82633A65V003"] },
    { term: "Johnson", expected: ["1HGCM82633A78V004"] },
    { term: "1HGCM:*", expected: ["1HGCM82633A12V001", "1HGCM82633A65V002", "1HGCM82633A78V004"] },
    { term: "XYZ", expected: [] }, // Test for no matches
  ];

  test.each(testCasesFuzzy)(" dataService.searchCaseFuzzy -> should find cases matching term '$term'", async ({ term, expected }) => {
    const results = await dataService.searchCaseFuzzy(term);
    const vins = results.map((r) => r.vin); // Extract VINs from the results
    expect(vins).toEqual(expected);
  });


  /*
  const testCases = [
    { term: "John", expected: ["1HGCM82633A12V001","1HGCM82633A78V004"] },
    { term: "Alice", expected: ["1HGCM82633A65V002"] },
    // { term: "alice", expected: ["1HGCM82633A65V002"] },
    { term: "Smith", expected: ["1HGCM82633A65V002","2HGCM82633A65V003"] },
    { term: "Johnson", expected: ["1HGCM82633A78V004"] },
    { term: "1HGCM", expected: ["1HGCM82633A12V001", "1HGCM82633A65V002", "1HGCM82633A78V004"] },
    { term: "XYZ", expected: [] }, // Test for no matches
  ];

  test.each(testCases)(" dataService.searchCase -> should find cases matching term '$term'", async ({ term, expected }) => {
    const results = await dataService.searchCase(term);
    const vins = results.map((r) => r.vin); 
    expect(vins).toEqual(expected);
  });
  */

  




});