import { MutationResolvers } from "src/generated/graphql-types";
import { deleteAuthor } from "src/resolvers/mutations/author/deleteAuthorResolver";
import { saveAuthor } from "src/resolvers/mutations/author/saveAuthorResolver";
import { saveBook } from "src/resolvers/mutations/book/saveBookResolver";

// This file is auto-generated

export const mutationResolvers: MutationResolvers = { ...deleteAuthor, ...saveAuthor, ...saveBook };
