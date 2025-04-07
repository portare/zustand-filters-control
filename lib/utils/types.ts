export type AwaitedReturnType<Fn extends (...args: unknown[]) => unknown> = Awaited<ReturnType<Fn>>;
export type PromisedReturnType<Fn extends (...args: unknown[]) => unknown> =
  AwaitedReturnType<Fn> extends infer Value ? Promise<Value> : never;

export function isAsyncFunction<Args extends unknown[], ReturnValue>(
  fn:
    | ((...args: Args) => Awaited<ReturnValue>)
    | ((...args: Args) => Promise<Awaited<ReturnValue>>),
): fn is (...args: Args) => Promise<Awaited<ReturnValue>> {
  return fn.constructor.name === 'AsyncFunction';
}
