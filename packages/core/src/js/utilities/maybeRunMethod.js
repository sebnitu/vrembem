export async function maybeRunMethod(obj, fun, ...args) {
  if (fun in obj && typeof obj[fun] === "function") {
    await obj[fun](...args);
  }
}
