// import { db, cases } from "../db";
import {dataService} from "../dataService.js";

export async function addCase(vin: string, name: string, surname: string) {
  await dataService.addCase(vin, name, surname);
  console.log("Case added successfully!");
}