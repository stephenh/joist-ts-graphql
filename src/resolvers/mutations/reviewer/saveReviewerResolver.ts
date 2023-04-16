import { Reviewer } from "src/entities";
import { MutationResolvers } from "src/generated/graphql-types";
import { saveEntity } from "src/resolvers/utils";

export const saveReviewer: Pick<MutationResolvers, "saveReviewer"> = {
  async saveReviewer(root, args, ctx) {
    return { reviewer: await saveEntity(ctx, Reviewer, args.input) };
  },
};
