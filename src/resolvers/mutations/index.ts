import { MutationResolvers } from "src/generated/graphql-types";
import { deleteAuthor } from "src/resolvers/mutations/author/deleteAuthorResolver";
import { saveAuthor } from "src/resolvers/mutations/author/saveAuthorResolver";
import { saveBook } from "src/resolvers/mutations/book/saveBookResolver";
import { saveBookReview } from "src/resolvers/mutations/bookReview/saveBookReviewResolver";

// This file is auto-generated

export const mutationResolvers: MutationResolvers = { ...deleteAuthor, ...saveAuthor, ...saveBook, ...saveBookReview };
