import { QueryResolvers } from "src/generated/graphql-types";
import { Author } from "src/entities";

export const authors: Pick<QueryResolvers, "authors"> = {
  async authors(root, args, ctx) {
    return ctx.em.find(Author, {});
  },
};
