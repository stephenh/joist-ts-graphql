import knex, { Knex } from "knex";
import { Driver, PostgresDriver } from "joist-orm";
import { newPgConnectionConfig } from "joist-utils";
import { FastifyRequest } from "fastify";

/** App-level dependencies like connection pools/etc. */
export interface AppContext {
  knex: Knex;
  driver: Driver,
  close(): Promise<void>;
}

/** Request-level dependencies. */
export interface ReqContext extends AppContext {
  req: FastifyRequest;
}


export async function newAppContextForStage(): Promise<AppContext> {
  return newAppContext();
}

/** Creates a production AppContext against our production slack, sendgrid, etc. vendors. */
async function newAppContext(): Promise<AppContext> {
  const knex = createKnex();
  const driver = new PostgresDriver(knex);

  async function close() {
    await knex.destroy();
  }

  return { knex, driver, close, };
}

function createKnex(): Knex {
  return knex({
    client: "pg",
    connection: newPgConnectionConfig(),
    debug: false,
  });
}

