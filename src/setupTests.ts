import { EntityManager } from "src/entities";
import { toMatchEntity } from "joist-test-utils";
import { AppContext, newAppContext, Context } from "src/context";
import "src/setupIt";

let appContext: AppContext | undefined = undefined;
let appContextPromise: Promise<AppContext>;

export async function getAppContext(): Promise<AppContext> {
  if (!appContext) {
    appContextPromise ??= newAppContext().then((ctx) => (appContext = ctx));
    await appContextPromise;
  }
  return appContext!;
}

beforeEach(async () => {
  const { knex } = await getAppContext();
  await knex.select(knex.raw("flush_database()"));
});

afterAll(async () => {
  await (await getAppContext()).close();
});

type ContextOpts = Partial<Context>;

export async function createTestContext(opts: ContextOpts = {}): Promise<Context> {
  const appContext = await getAppContext();
  const ctx = { ...appContext };
  const em = opts.em ?? new EntityManager(ctx as Context, appContext.driver);
  const req = null!;
  return Object.assign(ctx, { em, req });
}

expect.extend({ toMatchEntity });
