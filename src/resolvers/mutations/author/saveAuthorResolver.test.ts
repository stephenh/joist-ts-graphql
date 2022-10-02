import { Context } from "src/context";
import { SaveAuthorInput } from "src/generated/graphql-types";
import { saveAuthor } from "src/resolvers/mutations/author/saveAuthorResolver";
import { makeRunInputMutation, run } from "src/resolvers/testUtils";

describe("saveAuthor", () => {
  it.withCtx("can create", async (ctx) => {
    const { em } = ctx;
    const result = await runSaveAuthor(ctx, () => ({ firstName: "a1" }));
    // Update template to use toMatchEntity
    await expect(result.author).toMatchEntity({ firstName: "a1" });
  });
});

const runSaveAuthor = makeRunInputMutation(saveAuthor);
