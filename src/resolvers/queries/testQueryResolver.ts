import { QueryResolvers } from "src/generated/graphql-types";

export const testQuery: Pick<QueryResolvers, "testQuery"> = {
  async testQuery(root, args, ctx) {
    throw new Error("not implemented");
  },
};
