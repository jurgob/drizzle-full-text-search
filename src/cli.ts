import { Command } from "commander";
import { addCase } from "./commands/addCase";
import { searchCase } from "./commands/searchCase";

const program = new Command();

program
  .name("drizzle-cli")
  .description("A CLI app to manage cases")
  .version("1.0.0");

program
  .command("add")
  .description("Add a new case")
  .requiredOption("-v, --vin <vin>", "Vehicle Identification Number (VIN)")
  .requiredOption("-n, --name <name>", "Name of the person")
  .requiredOption("-s, --surname <surname>", "Surname of the person")
  .action((options) => {
    addCase(options.vin, options.name, options.surname);
  });

program
  .command("search")
  .description("Search for cases")
  .requiredOption("-t, --term <term>", "Search term")
  .action((options) => {
    searchCase(options.term);
  });

program.parse(process.argv);
