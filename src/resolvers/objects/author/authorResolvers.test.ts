import { newAuthor } from "src/entities";
import { authorResolvers } from "src/resolvers/objects/author/authorResolvers";
import { makeRunResolver, makeRunResolverKeys } from "src/resolvers/testUtils";

describe("authorResolvers", () => {
  it.withCtx("can return", async (ctx) => {
    const { em } = ctx;
    // Given a Author
    const a = newAuthor(em);
    // Then we can query it
    const result = await runAuthorKeys(ctx, a, ["firstName", "lastName", "createdAt", "updatedAt"]);
    expect(a).toMatchObject(result);
  });
});

const runAuthorKeys = makeRunResolverKeys(authorResolvers);
const runAuthor = makeRunResolver(authorResolvers);
