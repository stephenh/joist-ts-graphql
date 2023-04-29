import { MigrationBuilder } from "node-pg-migrate";
import { addColumns } from "joist-migration-utils";

export async function up(b: MigrationBuilder): Promise<void> {
  // Given the datalake easy access to our business logic
  addColumns(b, "authors", {
    number_of_reviews: { type: "int", notNull: true, default: 0 },
  });
}
