declare namespace jest {
  type ContextOpts = Partial<import("./context").Context & import("./context").AppContext>;
  type itWithCtxFn = (ctx: import("./context").Context) => Promise<void>;

  interface It {
    withCtx(name: string, fn: itWithCtxFn): void;
    withCtx(name: string, opts: ContextOpts, fn: itWithCtxFn): void;
  }
}
