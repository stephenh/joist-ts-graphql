import { Author } from "src/entities";
import { MutationResolvers } from "src/generated/graphql-types";
// Update template to use saveEntity from here
import { saveEntity } from "src/resolvers/saveEntity";

export const saveAuthor: Pick<MutationResolvers, "saveAuthor"> = {
  async saveAuthor(root, args, ctx) {
    return { author: await saveEntity(ctx, Author, args.input) };
  },
};
