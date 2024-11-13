export async function maybeRunMethod(obj, name, ...args) {
  if (name in obj && typeof obj[name] === "function") {
    await obj[name](...args);
  }
}
