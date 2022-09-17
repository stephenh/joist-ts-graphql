import { Author } from "src/entities";
import { MutationResolvers } from "src/generated/graphql-types";
// import { saveEntity } from "src/resolvers/mutations/utils";

export const saveAuthor: Pick<MutationResolvers, "saveAuthor"> = {
  async saveAuthor(root, args, ctx) {
    // return { author: await saveEntity(ctx, Author, args.input) };
    throw new Error("Asdf");
  },
};
