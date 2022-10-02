import { newAuthor } from "src/entities";
import { authorResolvers } from "src/resolvers/objects/author/authorResolvers";
import { makeRunObject, makeRunObjectFields } from "src/resolvers/testUtils";

describe("authorResolvers", () => {
  it.withCtx("can return", async (ctx) => {
    const { em } = ctx;
    // Given an Author
    const a = newAuthor(em);
    // Then we can query it
    const result = await runAuthorKeys(ctx, a, ["firstName", "lastName"]);
    await expect(a).toMatchEntity(result);
  });
});

const runAuthorKeys = makeRunObjectFields(authorResolvers);
const runAuthor = makeRunObject(authorResolvers);
