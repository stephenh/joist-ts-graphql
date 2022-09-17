import { Entity, EntityManager, isEntity } from "joist-orm";
import { ReqContext as Context } from "src/context";
import { Resolver } from "src/generated/graphql-types";

type MaybePromise<T> = T | Promise<T>;

/** Runs the `fn` in a dedicated / non-test Unit of Work . */
export async function run<T>(ctx: Context, fn: (ctx: Context) => MaybePromise<T>): Promise<T> {
  const { em } = ctx;
  // Ensure any test data we've setup is flushed
  await em.flush();
  const result = await runWithNewCtx(ctx, fn);
  // We expect `fn` (i.e. a resolver) to do it's own UoW management, so don't flush.
  await em.refresh({ deepLoad: true });
  return mapResultToOriginalEm(em, result);
}

/** Runs the `fn` in a dedicated / non-test Unit of Work for each value in `values */
export async function runEach<T, U>(
  ctx: Context,
  valuesFn: () => U[],
  fn: (ctx: Context, value: U) => MaybePromise<T>,
): Promise<T[]> {
  const { em } = ctx;
  // Ensure any test data we've setup is flushed
  await em.flush();
  const results = await Promise.all(valuesFn().map((value) => runWithNewCtx(ctx, (ctx) => fn(ctx, value))));
  // We expect `fn` (i.e. a resolver) to do it's own UoW management, so don't flush.
  await em.refresh({ deepLoad: true });
  return mapResultToOriginalEm(em, results);
}

/** Runs the `fn` in a dedicated / non-test Unit of Work. */
async function runWithNewCtx<T>(ctx: Context, fn: (ctx: Context) => MaybePromise<T>): Promise<T> {
  const { em } = ctx;
  const newCtx = { ...ctx };
  const newEm = new EntityManager(newCtx, em.driver);
  return fn(newCtx);
}

function gatherEntities(result: any): Entity[] {
  if (isEntity(result)) {
    return [result];
  } else if (Array.isArray(result)) {
    return result.flatMap(gatherEntities);
  } else if (result !== null && typeof result === "object") {
    return Object.values(result).flatMap(gatherEntities);
  } else {
    return [];
  }
}

async function mapResultToOriginalEm<R>(em: EntityManager, result: R): Promise<R> {
  const newEmEntities = gatherEntities(result);
  // load any entities that don't exist in the original em
  await Promise.all(newEmEntities.filter((e) => !em.findExistingInstance(e.idOrFail)).map((e) => em.load(e.idOrFail)));
  // generate a cache of id -> entity in original em
  const cache = Object.fromEntries(
    newEmEntities.map((e) => [e.idOrFail, em.findExistingInstance(e.idOrFail) as Entity]),
  );
  function doMap(value: any): any {
    if (isEntity(value)) {
      return cache[value.idOrFail];
    } else if (Array.isArray(value)) {
      return value.map(doMap) as any;
    } else if (typeof value === "object" && value?.constructor === Object) {
      return Object.fromEntries(Object.entries(value).map(([key, value]: [string, any]) => [key, doMap(value)]));
    } else {
      return value;
    }
  }
  return doMap(result);
}

// Returns the keys of resolver T that only take no arguments.
export type ResolverRoot<T> = T extends { [key in keyof T]: infer F }
  ? F extends Resolver<infer R, any, any>
    ? R
    : never
  : never;
export type ResolverArgs<T, K extends keyof T> = T[K] extends Resolver<any, infer U, any> ? U : never;
export type ResolverResult<T, K extends keyof T> = T[K] extends Resolver<any, any, infer U> ? U : never;

// The return type of `makeRunResolver`
type RunResolverMethod<T, R> = <K extends keyof T, A extends ResolverArgs<T, K>>(
  ctx: Context,
  root: R,
  key: K,
  args?: A | (() => A), // Support either the resolver arg directly or a lambda to create the args post-flush
) => Promise<ResolverResult<T, K>>;

/** Creates a `runResolver` method to invoke a specific resolver key with that key's args. */
export function makeRunResolver<T, R extends ResolverRoot<T>>(resolvers: T): RunResolverMethod<T, R> {
  return (ctx, root, key, args) =>
    run(ctx, async (ctx) => {
      const _root = isEntity(root) ? await ctx.em.load((root as any).idOrFail) : root;
      return (resolvers[key] as any)(_root, args instanceof Function ? args() : args ?? {}, ctx, undefined!);
    });
}

// The return type for makeRunResolverKeys
type RunKeysResolverMethod<T, R extends ResolverRoot<T>> = <K extends (keyof T)[]>(
  ctx: Context,
  root: R,
  keys: K,
) => Promise<{ [k in K[number]]: ResolverResult<T, k> }>;

/** Creates a `runResolverKeys` method that can invoke multiple keys against a resolver. */
export function makeRunResolverKeys<T, R extends ResolverRoot<T>>(resolver: T): RunKeysResolverMethod<T, R> {
  return (ctx, root, keys) => {
    return run(ctx, async (ctx) => {
      const _root = isEntity(root) ? await ctx.em.load((root as any).idOrFail) : root;
      // Build a result with each key, where keys might return a promise, so we `await` to make assertions easier
      return Object.fromEntries(
        await Promise.all(keys.map(async (key) => [key, await (resolver[key] as any)(_root, {}, ctx, undefined!)])),
      );
    });
  };
}
