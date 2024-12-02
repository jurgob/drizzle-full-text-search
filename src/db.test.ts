import {createDBClient} from "./db.js";
import {describe, it, expect} from "vitest";

describe("db - migrateDB", () => {
    it("migrateDB should not throw", async () => {
     const {migrateDB} = createDBClient();
      await expect(migrateDB()).resolves.not.toThrow();
    });
});
  