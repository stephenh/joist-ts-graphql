import { Context } from "src/context";
import { authors } from "src/resolvers/queries/author/authorsResolver";
import { run } from "src/resolvers/testUtils";

describe("authors", () => {
  it("handles this business case", () => {
    fail();
  });
});

async function runAuthors(ctx: Context, argsFn: () => {}) {
  return await run(ctx, async () => {
    return authors.authors({}, argsFn(), ctx, undefined!);
  });
}
