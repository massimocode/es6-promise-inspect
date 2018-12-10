import { inspect } from "util";

export function getStatus<T>(promise: Promise<T>): string {
  if (Promise.toString().indexOf("[native code]") === -1) {
    throw new Error(
      "Promise has been polyfilled so cannot be inspected with this utility"
    );
  }
  if (promise instanceof Promise === false) {
    throw new Error("The provided argument was not an ES6 promise");
  }
  const inspected = inspect(promise);
  if (inspected.includes("rejected")) {
    promise.catch(() => {});
    return "rejected";
  }
  if (inspected.includes("pending")) {
    return "pending";
  }
  return "resolved";
}
