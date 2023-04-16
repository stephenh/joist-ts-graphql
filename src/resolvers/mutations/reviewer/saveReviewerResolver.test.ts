import { Context } from "src/context";
import { SaveReviewerInput } from "src/generated/graphql-types";
import { saveReviewer } from "src/resolvers/mutations/reviewer/saveReviewerResolver";
import { run } from "src/resolvers/testUtils";

describe("saveReviewer", () => {
  it.withCtx("can create", async (ctx) => {
    const { em } = ctx;
    const result = await runSaveReviewer(ctx, () => ({}));
    expect(result).toBeDefined();
  });
});

function runSaveReviewer(ctx: Context, inputFn: () => SaveReviewerInput) {
  return run(ctx, (ctx) => saveReviewer.saveReviewer({}, { input: inputFn() }, ctx, undefined!));
}
