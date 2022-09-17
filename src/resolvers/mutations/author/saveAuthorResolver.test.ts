import { Context } from "src/context";
import { SaveAuthorInput } from "src/generated/graphql-types";
import { saveAuthor } from "src/resolvers/mutations/author/saveAuthorResolver";
import { run } from "src/resolvers/testUtils";

import "src/setupDbTests";

describe("saveAuthor", () => {
  it.withCtx("can create", async (ctx) => {
    const { em } = ctx;
    const result = await runSaveAuthor(ctx, () => ({}));
    expect(result).toBeDefined();
  });
});

function runSaveAuthor(ctx: Context, inputFn: () => SaveAuthorInput) {
  return run(ctx, (ctx) => saveAuthor.saveAuthor({}, { input: inputFn() }, ctx, undefined!));
}
