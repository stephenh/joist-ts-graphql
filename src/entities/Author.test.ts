import { Author, newAuthor, Reviewer } from "src/entities";
import { newEntityManager, queries, resetQueries, select } from "src/setupTests";

describe("Author", () => {
  it.withCtx("can be created", async ({ em }) => {
    const a = new Author(em, { firstName: "a1" });
    await em.flush();
  });

  it.withCtx("can be created with a factory", async ({ em }) => {
    const a = newAuthor(em);
    await em.flush();
  });

  it.withCtx("can count its number of reviews", async ({ em }) => {
    // Given an author with 3 books with 2 reviews each
    const a = newAuthor(em, {
      books: [{ reviews: [{}, {}] }, { reviews: [{}, {}] }, { reviews: [{}, {}] }],
    });
    await em.flush();
    resetQueries();
    expect(await a.numberOfReviews.load()).toBe(6);
    expect(queries).toEqual([]);

    // When we count the number of reviews
    const em2 = await newEntityManager();
    const a2 = await em2.load(Author, a.idOrFail);
    expect(await a2.numberOfReviews4.load()).toBe(6);
    // Then we made 3 queries
    expect(queries).toEqual([
      `select "a".*, "a".id as id from "authors" as "a" where "a"."id" in ($1) order by "a"."id" ASC, "a"."id" asc limit $2`,
      `select "b".*, "b".id as id from "books" as "b" where "b"."author_id" in ($1) order by "b"."id" asc limit $2`,
      `select "br".*, "br".id as id from "book_reviews" as "br" where "br"."book_id" in ($1, $2, $3) order by "br"."id" asc limit $4`,
      expect.anything(),
    ]);

    expect(await a2.numberOfReviews4.load()).toBe(6);
  });

  it.withCtx("can persisted numberOfReviews", async ({ em }) => {
    // Given an author with 3 books with 2 reviews each
    const a = newAuthor(em, {
      books: [{ reviews: [{}, {}] }, { reviews: [{}, {}] }, { reviews: [{}, {}] }],
    });
    await em.flush();
    expect((await select("authors"))[0]).toMatchObject({
      id: 1,
      first_name: "firstName",
      number_of_reviews: 6,
    });
    // And when the reviewer is young
    const em2 = await newEntityManager();
    const r = await em2.load(Reviewer, "r:1");
    r.age = 15;
    await em2.flush();
    // Then the reviews are no longer public
    expect((await select("authors"))[0]).toMatchObject({
      id: 1,
      first_name: "firstName",
      number_of_reviews: 0,
    });
  });
});
