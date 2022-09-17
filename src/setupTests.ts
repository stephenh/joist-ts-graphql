import { EntityManager } from "src/entities";
import { toMatchEntity } from "joist-test-utils";
import { AppContext, newAppContext, ReqContext } from "src/context";
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

type ContextOpts = Partial<ReqContext>;

export async function createTestContext(opts: ContextOpts = {}): Promise<ReqContext> {
  const appContext = await getAppContext();
  const ctx = { ...appContext };
  const em = opts.em ?? new EntityManager(ctx as ReqContext, appContext.driver);
  const req = null!;
  return Object.assign(ctx, { em, req });
}

expect.extend({ toMatchEntity });
