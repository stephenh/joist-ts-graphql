import { Context as Context } from "src/context";
import { BaseEntity, DeepPartialOrNull, EntityConstructor, OptsOf } from "joist-orm";

export async function saveEntity<T extends BaseEntity>(
  ctx: Context,
  type: EntityConstructor<T>,
  input: DeepPartialOrNull<T>,
  opts: { recordUserEvent?: true | "updated" | "created"; flush?: boolean } = {},
): Promise<T> {
  return saveEntities(ctx, type, [input], opts).then((r) => r[0]);
}

export async function saveEntities<T extends BaseEntity>(
  ctx: Context,
  type: EntityConstructor<T>,
  input: readonly DeepPartialOrNull<T>[],
  opts: { flush?: boolean; opts?: Partial<OptsOf<T>> } = {},
): Promise<T[]> {
  const { em } = ctx;
  const { opts: entityOpts = {}, flush = true } = opts;
  // logger.info({ input }, `Creating/updating ${input.length} ${type.name} entities`);
  const entities = await Promise.all(input.map((input) => em.createOrUpdatePartial(type, { ...entityOpts, ...input })));
  if (flush) {
    await ctx.em.flush();
  }
  return entities;
}
