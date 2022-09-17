import { createTestContext } from "src/setupTests";

it.withCtx = (name: string, fnOrOpts: jest.itWithCtxFn | jest.ContextOpts, maybeFn?: jest.itWithCtxFn) => {
  const fn: jest.itWithCtxFn = typeof fnOrOpts === "function" ? fnOrOpts : maybeFn!;
  const opts: jest.ContextOpts = typeof fnOrOpts === "function" ? {} : fnOrOpts;
  it(name, async () => fn(await createTestContext(opts)));
};

it.skip.withCtx = (name: string, fnOrOpts: jest.itWithCtxFn | jest.ContextOpts, maybeFn?: jest.itWithCtxFn) =>
  it.skip(name, () => {});
it.only.withCtx = (name: string, fnOrOpts: jest.itWithCtxFn | jest.ContextOpts, maybeFn?: jest.itWithCtxFn) => {
  const fn: jest.itWithCtxFn = typeof fnOrOpts === "function" ? fnOrOpts : maybeFn!;
  const opts: jest.ContextOpts = typeof fnOrOpts === "function" ? {} : fnOrOpts;
  it.only(name, async () => fn(await createTestContext(opts)));
};
xit.withCtx = it.skip.withCtx;
fit.withCtx = it.only.withCtx;
