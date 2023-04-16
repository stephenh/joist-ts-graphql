import { AuthorCodegen, BookReview } from "./entities";
import {
  AsyncProperty,
  Collection,
  hasAsyncProperty,
  hasManyDerived,
  hasManyThrough,
  hasPersistedAsyncProperty,
  PersistedAsyncProperty,
} from "joist-orm";

export class Author extends AuthorCodegen {
  readonly numberOfReviews: PersistedAsyncProperty<Author, number> = hasPersistedAsyncProperty(
    "numberOfReviews",
    { books: { reviews: "isPublic2" } },
    (a) => {
      return a.books.get.flatMap((b) => b.reviews.get.filter((r) => r.isPublic2.get)).length;
    },
  );

  async numberOfReviews0(): Promise<number> {
    const books = await this.books.load();
    const counts = await Promise.all(
      books.map(async (b) => {
        const reviews = await b.reviews.load();
        const publicReviews = await Promise.all(
          reviews.map(async (review) => {
            return (await review.isPublic()) ? review : undefined;
          }),
        );
        return publicReviews.filter((r) => !!r).length;
      }),
    );
    return counts.reduce((a, b) => a + b, 0);
  }

  async numberOfReviews2(): Promise<number> {
    const author = await this.populate({ books: { reviews: "reviewer" } });
    return author.books.get.flatMap((b) => b.reviews.get.filter((r) => r.reviewer.get.age > 18)).length;
  }

  async numberOfReviews3(): Promise<number> {
    const author = await this.populate({ books: { reviews: "isPublic2" } });
    return author.books.get.flatMap((b) => b.reviews.get.filter((r) => r.isPublic2.get)).length;
  }

  readonly numberOfReviews4: AsyncProperty<Author, number> = hasAsyncProperty(
    { books: { reviews: "isPublic2" } },
    (a) => {
      return a.books.get.flatMap((b) => b.reviews.get.filter((r) => r.isPublic2.get)).length;
    },
  );

  readonly reviews: Collection<Author, BookReview> = hasManyThrough((a) => a.books.reviews);

  readonly publicReviews: Collection<Author, BookReview> = hasManyDerived(
    { books: { reviews: "isPublic2" } },
    {
      get(a) {
        return a.books.get.flatMap((b) => b.reviews.get.filter((r) => r.isPublic2.get));
      },
    },
  );
}
