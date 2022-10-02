import { MutationResolvers } from "src/generated/graphql-types";

export const deleteAuthor: Pick<MutationResolvers, "deleteAuthor"> = {
  async deleteAuthor(root, args, ctx) {
    throw new Error("not implemented");
  },
};
