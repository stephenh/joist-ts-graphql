import { MigrationBuilder } from "node-pg-migrate";
import { createEntityTable, addColumns, foreignKey } from "joist-migration-utils";

export async function up(b: MigrationBuilder): Promise<void> {
  // Keep track of who is making reviews
  createEntityTable(b, "reviewers", {
    name: { type: "text", notNull: true },
    age: { type: "integer", notNull: true },
  });
  // Assume we don't have any reviews in the database yet
  addColumns(b, "book_reviews", {
    reviewer_id: foreignKey("reviewers", { notNull: true }),
  });
}
