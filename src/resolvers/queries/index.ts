import { QueryResolvers } from "src/generated/graphql-types";
import { author } from "src/resolvers/queries/author/authorResolver";
import { books } from "src/resolvers/queries/book/booksResolver";
import { testQuery } from "src/resolvers/queries/testQueryResolver";

// This file is auto-generated

export const queryResolvers: QueryResolvers = { ...author, ...books, ...testQuery };
