import { authorResolvers } from "src/resolvers/objects/author/authorResolvers";
import { bookResolvers } from "src/resolvers/objects/book/bookResolvers";
import { bookReviewResolvers } from "src/resolvers/objects/bookReview/bookReviewResolvers";
import { reviewerResolvers } from "src/resolvers/objects/reviewer/reviewerResolvers";

// This file is auto-generated

export const objectResolvers = {
  Author: authorResolvers,
  Book: bookResolvers,
  BookReview: bookReviewResolvers,
  Reviewer: reviewerResolvers,
};
