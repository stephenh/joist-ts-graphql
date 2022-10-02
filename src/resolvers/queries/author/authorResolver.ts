import { QueryResolvers } from "src/generated/graphql-types";

export const author: Pick<QueryResolvers, "author"> = {
  async author(root, args, ctx) {
    throw new Error("not implemented");
  },
};
