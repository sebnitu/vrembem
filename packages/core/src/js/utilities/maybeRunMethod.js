export async function maybeRunMethod(name, ...args) {
  if (name in this && typeof this[name] === "function") {
    await this[name](...args);
  }
}
