export function getValue<T>(
  obj: T | ((...args: any[]) => T),
  ...args: any[]
): T {
  return typeof obj === "function" ? (obj as Function)(...args) : obj;
}
