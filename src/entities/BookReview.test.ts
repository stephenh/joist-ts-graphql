import { Author, newAuthor, newBookReview } from "src/entities";

describe("BookReview", () => {
  it.withCtx("can be created", async ({ em }) => {
    const br = newBookReview(em);
    await em.flush();
  });
});
