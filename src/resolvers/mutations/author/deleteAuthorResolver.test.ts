import { Context } from "src/context";
import { ID } from "src/generated/graphql-types";
import { deleteAuthor } from "src/resolvers/mutations/author/deleteAuthorResolver";
import { run } from "src/resolvers/testUtils";

describe("deleteAuthor", () => {
  it("handles this business case", () => {
    fail();
  });
});

async function runDeleteAuthor(ctx: Context, inputFn: () => ID) {
  return await run(ctx, async (ctx) => {
    return deleteAuthor.deleteAuthor({}, { input: inputFn() }, ctx, undefined!);
  });
}
