import { DeepNew, FactoryOpts, newTestInstance } from "joist-orm";
import { Reviewer } from "./entities";
import type { EntityManager } from "./entities";

export function newReviewer(em: EntityManager, opts: FactoryOpts<Reviewer> = {}): DeepNew<Reviewer> {
  return newTestInstance(em, Reviewer, opts, { age: 40 });
}
