import { BookReviewCodegen } from "./entities";

import { bookReviewConfig as config } from "./entities";
import { AsyncProperty, hasAsyncProperty, hasReactiveAsyncProperty } from "joist-orm";

export class BookReview extends BookReviewCodegen {
  async isPublic(): Promise<boolean> {
    const reviewer = await this.reviewer.load();
    return reviewer.age > 18;
  }

  readonly isPublic2: AsyncProperty<BookReview, boolean> = hasReactiveAsyncProperty({ reviewer: "age" }, (br) => {
    return br.reviewer.get.age > 18;
  });
}

// remove once you have actual rules/hooks
config.placeholder();
