import { MigrationBuilder } from "node-pg-migrate";
import { createEntityTable, foreignKey } from "joist-migration-utils";

export async function up(b: MigrationBuilder): Promise<void> {
  // Add book reviews
  createEntityTable(b, "book_reviews", {
    book_id: foreignKey("books", { notNull: true }),
    rating: { type: "integer", notNull: true },
  });
}
