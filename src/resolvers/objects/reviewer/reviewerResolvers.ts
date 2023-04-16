import { getMetadata } from "joist-orm";
import { Reviewer } from "src/entities";
import { ReviewerResolvers } from "src/generated/graphql-types";
import { entityResolver } from "src/resolvers/utils";

export const reviewerResolvers: ReviewerResolvers = { ...entityResolver(getMetadata(Reviewer)) };
