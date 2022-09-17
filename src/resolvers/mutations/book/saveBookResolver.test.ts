import { Context } from "src/context";
import { SaveBookInput } from "src/generated/graphql-types";
import { saveBook } from "src/resolvers/mutations/book/saveBookResolver";
import { run } from "src/resolvers/testUtils";

import "src/setupDbTests";

describe("saveBook", () => {
  it.withCtx("can create", async (ctx) => {
    const { em } = ctx;
    const result = await runSaveBook(ctx, () => ({}));
    expect(result).toBeDefined();
  });
});

function runSaveBook(ctx: Context, inputFn: () => SaveBookInput) {
  return run(ctx, (ctx) => saveBook.saveBook({}, { input: inputFn() }, ctx, undefined!));
}
