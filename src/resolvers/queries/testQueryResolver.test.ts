import { Context } from "src/context";
import { QueryTestQueryArgs } from "src/generated/graphql-types";
import { testQuery } from "src/resolvers/queries/testQueryResolver";
import { run } from "src/resolvers/testUtils";

describe("testQuery", () => {
  it("handles this business case", () => {
    fail();
  });
});

async function runTestQuery(ctx: Context, argsFn: () => QueryTestQueryArgs) {
  return await run(ctx, async () => {
    return testQuery.testQuery({}, argsFn(), ctx, undefined!);
  });
}
