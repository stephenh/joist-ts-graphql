import { newReviewer } from "src/entities";
import { reviewerResolvers } from "src/resolvers/objects/reviewer/reviewerResolvers";
import { makeRunResolver, makeRunResolverKeys } from "src/resolvers/testUtils";

describe("reviewerResolvers", () => {
  it.withCtx("can return", async (ctx) => {
    const { em } = ctx;
    // Given a Reviewer
    const r = newReviewer(em);
    // Then we can query it
    const result = await runReviewerKeys(ctx, r, ["name", "age", "createdAt", "updatedAt"]);
    expect(r).toMatchEntity(result);
  });
});

const runReviewerKeys = makeRunResolverKeys(reviewerResolvers);
const runReviewer = makeRunResolver(reviewerResolvers);
