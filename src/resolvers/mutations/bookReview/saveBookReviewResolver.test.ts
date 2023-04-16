import { Context } from "src/context";
import { SaveBookReviewInput } from "src/generated/graphql-types";
import { saveBookReview } from "src/resolvers/mutations/bookReview/saveBookReviewResolver";
import { run } from "src/resolvers/testUtils";

describe("saveBookReview", () => {
  it.withCtx("can create", async (ctx) => {
    const { em } = ctx;
    const result = await runSaveBookReview(ctx, () => ({}));
    expect(result).toBeDefined();
  });
});

function runSaveBookReview(ctx: Context, inputFn: () => SaveBookReviewInput) {
  return run(ctx, (ctx) => saveBookReview.saveBookReview({}, { input: inputFn() }, ctx, undefined!));
}
