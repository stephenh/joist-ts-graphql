declare namespace jest {
  type ContextOpts = Partial<import("./context").ReqContext & import("./context").AppContext>;
  type itWithCtxFn = (ctx: import("./context").ReqContext) => Promise<void>;

  interface It {
    withCtx(name: string, fn: itWithCtxFn): void;
    withCtx(name: string, opts: ContextOpts, fn: itWithCtxFn): void;
  }
}
