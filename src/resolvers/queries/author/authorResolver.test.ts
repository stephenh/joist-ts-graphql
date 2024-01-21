import { Context } from "src/context";
import { QueryAuthorArgs } from "src/generated/graphql-types";
import { author } from "src/resolvers/queries/author/authorResolver";
import { run } from "src/resolvers/testUtils";

describe.skip("author", () => {
  it("handles this business case", () => {
    fail();
  });
});

async function runAuthor(ctx: Context, argsFn: () => QueryAuthorArgs) {
  return await run(ctx, async () => {
    return author.author({}, argsFn(), ctx, undefined!);
  });
}
