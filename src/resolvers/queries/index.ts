import { QueryResolvers } from "src/generated/graphql-types";
import { author } from "src/resolvers/queries/author/authorResolver";
import { testQuery } from "src/resolvers/queries/testQueryResolver";

// This file is auto-generated

export const queryResolvers: QueryResolvers = { ...author, ...testQuery };
