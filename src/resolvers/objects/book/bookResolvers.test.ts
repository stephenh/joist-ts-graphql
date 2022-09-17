import { newBook } from "src/entities";
import { bookResolvers } from "src/resolvers/objects/book/bookResolvers";
import { makeRunResolver, makeRunResolverKeys } from "src/resolvers/testUtils";

describe("bookResolvers", () => {
  it.withCtx("can return", async (ctx) => {
    const { em } = ctx;
    // Given a Book
    const b = newBook(em);
    // Then we can query it
    const result = await runBookKeys(ctx, b, ["title", "createdAt", "updatedAt"]);
    expect(b).toMatchObject(result);
  });
});

const runBookKeys = makeRunResolverKeys(bookResolvers);
const runBook = makeRunResolver(bookResolvers);
